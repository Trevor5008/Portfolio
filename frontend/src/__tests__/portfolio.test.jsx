import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { gsap } from "gsap";
import App from "../App";
import { ThemeProvider } from "../components/ThemeContext";
import { resetCircuitIntro } from "../components/introState";
import ProjectCard from "../components/ProjectCard";
import { projects, featuredProjects } from "../data/projects";
import { site } from "../data/site";

const renderAtRoute = (initialEntry = "/") =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>,
  );

const withSyntheticProject = (overrides, runTest) => {
  const syntheticProject = {
    slug: "synthetic-fixture-project",
    title: "Synthetic Fixture Project",
    summary: "Synthetic fixture used to verify CaseStudy renderer states.",
    status: "in-progress",
    featured: false,
    role: "Solo Author",
    timeline: "",
    stack: ["Python", "React"],
    thumbnail: "",
    links: {
      demo: "",
      repo: "https://github.com/example/synthetic-fixture",
    },
    caseStudy: {
      tldr: "",
      problem: "",
      contribution: [],
      solution: "",
      stackNotes: [],
      decisions: [],
      evidence: [],
      outcome: "",
      limitations: "",
      architecture: "",
      evidenceLinks: [],
      limitationItems: [],
      deferredItems: [],
      availabilityNote: "",
    },
    ...overrides,
  };

  projects.push(syntheticProject);
  try {
    return runTest(syntheticProject);
  } finally {
    const idx = projects.indexOf(syntheticProject);
    if (idx !== -1) {
      projects.splice(idx, 1);
    }
  }
};

describe("Portfolio structure and accessibility", () => {
  beforeEach(() => {
    localStorage.clear();
    resetCircuitIntro();
    gsap.timeline.mockClear();
    site.resumeUrl = "/resume.pdf";
  });

  it("renders Header, active-route main content, and Footer inside Layout", () => {
    renderAtRoute("/");

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: site.name }),
    ).toBeInTheDocument();
  });

  it("exposes Home, Projects, About, and Contact links in primary navigation", () => {
    renderAtRoute("/projects");

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(nav).getByRole("link", { name: `${site.name}, home` }),
    ).toHaveAttribute("href", "/");

    const projectsLink = within(nav).getByRole("link", { name: "Projects" });
    expect(projectsLink).toHaveAttribute("href", "/projects");
    expect(projectsLink).toHaveAttribute("aria-current", "page");

    expect(within(nav).getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(within(nav).getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("opens mobile menu with aria-expanded, closes on Escape, and closes after navigation", async () => {
    const user = userEvent.setup();
    renderAtRoute("/");

    const menuButton = screen.getByRole("button", {
      name: /open navigation menu/i,
    });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-primary-menu")).toBeNull();

    await user.click(menuButton);
    const closeButton = screen.getByRole("button", {
      name: /close navigation menu/i,
    });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    const mobileMenu = document.getElementById("mobile-primary-menu");
    expect(mobileMenu).not.toBeNull();
    expect(primaryNav.contains(mobileMenu)).toBe(true);
    expect(
      within(primaryNav).getAllByRole("link", { name: "Projects" }).length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      within(primaryNav).getAllByRole("link", { name: "About" }).length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      within(primaryNav).getAllByRole("link", { name: "Contact" }).length,
    ).toBeGreaterThanOrEqual(2);

    await user.keyboard("{Escape}");
    expect(
      screen.getByRole("button", { name: /open navigation menu/i }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-primary-menu")).toBeNull();

    // Reopen and navigate via mobile link
    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );
    const reopenedMenu = document.getElementById("mobile-primary-menu");
    await user.click(within(reopenedMenu).getByRole("link", { name: "About" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "About" }),
    ).toBeInTheDocument();
    expect(document.getElementById("mobile-primary-menu")).toBeNull();
  });

  it("renders ThemeSwitch as an accessible button with action-specific label and toggles theme", async () => {
    const user = userEvent.setup();
    renderAtRoute("/");

    const toggleButtons = screen.getAllByRole("button", {
      name: "Switch to light theme",
    });
    expect(toggleButtons.length).toBeGreaterThan(0);

    await user.click(toggleButtons[0]);

    expect(
      screen.getAllByRole("button", { name: "Switch to dark theme" })[0],
    ).toBeInTheDocument();
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("renders all six projects on the Projects index from the single data source", () => {
    renderAtRoute("/projects");

    expect(projects).toHaveLength(6);
    projects.forEach((project) => {
      expect(
        screen.getByRole("link", { name: project.title }),
      ).toHaveAttribute("href", `/projects/${project.slug}`);
    });
  });

  it("renders only featured projects on Home", () => {
    renderAtRoute("/");

    const featuredSection = screen.getByRole("region", {
      name: "Featured Projects",
    });

    featuredProjects.forEach((project) => {
      expect(
        within(featuredSection).getByRole("link", { name: project.title }),
      ).toBeInTheDocument();
    });

    projects
      .filter((project) => !project.featured)
      .forEach((nonFeatured) => {
        expect(
          within(featuredSection).queryByRole("link", {
            name: nonFeatured.title,
          }),
        ).toBeNull();
      });
  });

  it("provides a primary case-study link on ProjectCard without nested anchors and keeps repo/demo links reachable", () => {
    const rsaProject = projects.find((p) => p.slug === "rsa-learning-lab");
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <ProjectCard project={rsaProject} />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(container.querySelectorAll("a a")).toHaveLength(0);

    expect(
      screen.getByRole("link", { name: rsaProject.title }),
    ).toHaveAttribute("href", `/projects/${rsaProject.slug}`);

    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getAllByText("Live Demo")).toHaveLength(1);

    expect(
      screen.getByRole("link", { name: `${rsaProject.title} live demo` }),
    ).toHaveAttribute("href", rsaProject.links.demo);

    expect(
      screen.getByRole("link", {
        name: `${rsaProject.title} GitHub repository`,
      }),
    ).toHaveAttribute("href", rsaProject.links.repo);
  });

  it("renders the full Palander case study with intrinsic screenshot dimensions, repository evidence links, truthful availability, and no Live Demo link", () => {
    const palanderProject = projects.find((p) => p.slug === "palander");

    // Card check: intrinsic thumbnail dimensions + repo link + no Live Demo link
    const cardView = render(
      <MemoryRouter>
        <ThemeProvider>
          <ProjectCard project={palanderProject} />
        </ThemeProvider>
      </MemoryRouter>,
    );
    const cardImg = screen.getByRole("img", { name: "Palander preview" });
    expect(cardImg).toHaveAttribute("width", "1356");
    expect(cardImg).toHaveAttribute("height", "826");
    expect(
      screen.queryByRole("link", { name: /live demo/i }),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "Palander GitHub repository" }),
    ).toHaveAttribute("href", "https://github.com/Trevor5008/Palander");
    cardView.unmount();

    // Full CaseStudy route check
    renderAtRoute("/projects/palander");

    expect(
      screen.getByRole("heading", { level: 1, name: "Palander" }),
    ).toBeInTheDocument();
    expect(document.title).toBe("Palander | Trevor Werner");
    expect(
      document.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute("href", "https://trevorwerner.com/projects/palander");

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Case study in preparation",
      }),
    ).toBeNull();

    for (const sectionHeading of [
      "Availability",
      "Problem",
      "Role and contribution",
      "Solution",
      "Architecture",
      "Stack",
      "Engineering decisions",
      "Evidence",
      "Outcome and limitations",
      "Deferred and future work",
      "Project links",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: sectionHeading }),
      ).toBeInTheDocument();
    }

    // No Live Demo link anywhere on the Palander page; repo links remain intact
    expect(screen.queryByRole("link", { name: /live demo/i })).toBeNull();
    expect(
      screen.getByRole("link", { name: "View Repository" }),
    ).toHaveAttribute("href", "https://github.com/Trevor5008/Palander");
    expect(
      screen.getByRole("link", { name: "Source Repository on GitHub" }),
    ).toHaveAttribute("href", "https://github.com/Trevor5008/Palander");

    // Availability note explicitly communicates no hosted demo and no published GitHub Release
    const availabilityNote = screen.getByText(
      /Palander currently runs locally via Docker Compose/i,
    );
    expect(availabilityNote).toHaveTextContent(/no public hosted demo/i);
    expect(availabilityNote).toHaveTextContent(
      /no GitHub Release or GHCR container tag has been published/i,
    );

    // Every Palander evidence image (hero + 3 gallery screenshots, no duplicate asset) has descriptive alt text and intrinsic dimensions
    const article = screen.getByRole("article");
    const evidenceImages = within(article).getAllByRole("img");
    expect(evidenceImages).toHaveLength(4);
    const uniqueSrcs = new Set(
      evidenceImages.map((img) => img.getAttribute("src")),
    );
    expect(uniqueSrcs.size).toBe(4);
    evidenceImages.forEach((img) => {
      expect(img.getAttribute("alt")?.trim().length).toBeGreaterThan(30);
      expect(img).toHaveAttribute("width", "1356");
      expect(img).toHaveAttribute("height", "826");
    });

    // Public repository evidence links have accessible labels and open safely
    const repoEvidenceHeading = screen.getByRole("heading", {
      level: 3,
      name: "Public repository evidence",
    });
    const repoEvidenceBlock = repoEvidenceHeading.parentElement;
    const evidenceAnchors = within(repoEvidenceBlock).getAllByRole("link");
    expect(evidenceAnchors.length).toBeGreaterThanOrEqual(8);
    evidenceAnchors.forEach((anchor) => {
      expect(anchor.textContent.trim().length).toBeGreaterThan(10);
      expect(anchor.getAttribute("href")).toMatch(
        /^https:\/\/github\.com\/Trevor5008\/Palander\/blob\/main\//,
      );
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("renders the full structured RSA Learning Lab case study including string-based limitations and NotFound for unknown slugs", () => {
    const { unmount } = renderAtRoute("/projects/rsa-learning-lab");

    expect(
      screen.getByRole("heading", { level: 1, name: "RSA Learning Lab" }),
    ).toBeInTheDocument();
    expect(document.title).toBe("RSA Learning Lab | Trevor Werner");
    expect(
      document.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute(
      "href",
      "https://trevorwerner.com/projects/rsa-learning-lab",
    );

    for (const sectionHeading of [
      "Problem",
      "Role and contribution",
      "Solution",
      "Stack",
      "Engineering decisions",
      "Outcome and limitations",
      "Project links",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: sectionHeading }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getByText(/unpadded textbook RSA strictly for education/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Availability" }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Architecture" }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Deferred and future work",
      }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Case study in preparation",
      }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Evidence" }),
    ).toBeNull();

    unmount();
    renderAtRoute("/projects/non-existent-project");

    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it("shows in-preparation state on a synthetic empty fixture without creating empty optional headings", () => {
    withSyntheticProject({}, (fixture) => {
      renderAtRoute(`/projects/${fixture.slug}`);

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: "Case study in preparation",
        }),
      ).toBeInTheDocument();

      for (const omittedHeading of [
        "Availability",
        "Problem",
        "Role and contribution",
        "Solution",
        "Architecture",
        "Stack",
        "Engineering decisions",
        "Evidence",
        "Outcome and limitations",
        "Deferred and future work",
      ]) {
        expect(
          screen.queryByRole("heading", { level: 2, name: omittedHeading }),
        ).toBeNull();
      }
    });
  });

  it("renders Architecture, Availability, Evidence links, string limitations, and separate limitation vs deferred lists only when populated", () => {
    // 1. Partial fixture without Architecture, Availability, or Deferred items -> omits their headings cleanly while rendering string limitations
    withSyntheticProject(
      {
        caseStudy: {
          problem: "Synthetic problem statement.",
          solution: "Synthetic solution summary.",
          architecture: "   ",
          availabilityNote: "",
          limitations: "Legacy string-based limitation note remains supported.",
          limitationItems: [],
          deferredItems: [],
          evidenceLinks: [],
        },
      },
      (fixture) => {
        const { unmount } = renderAtRoute(`/projects/${fixture.slug}`);
        expect(
          screen.getByRole("heading", { level: 2, name: "Problem" }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("heading", { level: 2, name: "Solution" }),
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            "Legacy string-based limitation note remains supported.",
          ),
        ).toBeInTheDocument();
        expect(
          screen.queryByRole("heading", { level: 2, name: "Architecture" }),
        ).toBeNull();
        expect(
          screen.queryByRole("heading", { level: 2, name: "Availability" }),
        ).toBeNull();
        expect(
          screen.queryByRole("heading", { level: 2, name: "Evidence" }),
        ).toBeNull();
        expect(
          screen.queryByRole("heading", {
            level: 2,
            name: "Deferred and future work",
          }),
        ).toBeNull();
        expect(
          screen.queryByRole("heading", {
            level: 3,
            name: "Current limitations",
          }),
        ).toBeNull();
        unmount();
      },
    );

    // 2. Populated optional fields -> renders Architecture, Availability, Evidence links, and strictly separates limitationItems from deferredItems
    withSyntheticProject(
      {
        caseStudy: {
          problem: "Synthetic problem.",
          architecture:
            "React UI communicates with FastAPI over Bearer JWT.\n\nPostgreSQL enforces foreign-key constraints.",
          availabilityNote:
            "Runs locally via Docker Compose; no public hosted demo.",
          evidenceLinks: [
            {
              label: "Clean-Checkout Setup Guide",
              url: "https://github.com/example/repo/blob/main/docs/clean-checkout.md",
              note: "Verified setup instructions.",
            },
          ],
          outcome: "All automated checks green.",
          limitations: "",
          limitationItems: ["Current limitation item alpha"],
          deferredItems: ["Deferred future item beta"],
        },
      },
      (fixture) => {
        renderAtRoute(`/projects/${fixture.slug}`);

        expect(
          screen.getByRole("heading", { level: 2, name: "Availability" }),
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            "Runs locally via Docker Compose; no public hosted demo.",
          ),
        ).toBeInTheDocument();

        const archHeading = screen.getByRole("heading", {
          level: 2,
          name: "Architecture",
        });
        expect(archHeading).toBeInTheDocument();
        expect(
          within(archHeading.parentElement).getByText(
            /PostgreSQL enforces foreign-key constraints/i,
          ),
        ).toBeInTheDocument();

        const evidenceLink = screen.getByRole("link", {
          name: "Clean-Checkout Setup Guide",
        });
        expect(evidenceLink).toHaveAttribute(
          "href",
          "https://github.com/example/repo/blob/main/docs/clean-checkout.md",
        );
        expect(evidenceLink).toHaveAttribute("target", "_blank");
        expect(evidenceLink).toHaveAttribute("rel", "noopener noreferrer");

        const outcomeSection = screen.getByRole("heading", {
          level: 2,
          name: "Outcome and limitations",
        }).parentElement;
        const deferredSection = screen.getByRole("heading", {
          level: 2,
          name: "Deferred and future work",
        }).parentElement;

        expect(
          within(outcomeSection).getByText("Current limitation item alpha"),
        ).toBeInTheDocument();
        expect(
          within(outcomeSection).queryByText("Deferred future item beta"),
        ).toBeNull();

        expect(
          within(deferredSection).getByText("Deferred future item beta"),
        ).toBeInTheDocument();
        expect(
          within(deferredSection).queryByText("Current limitation item alpha"),
        ).toBeNull();
      },
    );
  });

  it("renders working /resume.pdf links across Home, About, Contact, and Footer by default and omits them when empty", () => {
    // Default configured state (/resume.pdf)
    const homeView = renderAtRoute("/");
    const homeResumeLinks = screen.getAllByRole("link", { name: /resume/i });
    expect(homeResumeLinks.length).toBeGreaterThanOrEqual(2);
    homeResumeLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/resume.pdf");
    });
    homeView.unmount();

    const aboutView = renderAtRoute("/about");
    expect(
      screen.getByRole("link", { name: "View Resume" }),
    ).toHaveAttribute("href", "/resume.pdf");
    expect(
      screen.getByRole("heading", { level: 2, name: "Experience" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Education & Certifications",
      }),
    ).toBeInTheDocument();
    aboutView.unmount();

    const contactView = renderAtRoute("/contact");
    expect(
      screen.getByRole("link", { name: /download \/ view pdf/i }),
    ).toHaveAttribute("href", "/resume.pdf");
    contactView.unmount();

    // Empty fallback
    site.resumeUrl = "";
    try {
      for (const route of ["/", "/about", "/contact"]) {
        const { unmount } = renderAtRoute(route);
        expect(screen.queryByRole("link", { name: /resume/i })).toBeNull();
        expect(
          screen.queryByRole("link", { name: /download \/ view pdf/i }),
        ).toBeNull();
        unmount();
      }
    } finally {
      site.resumeUrl = "/resume.pdf";
    }
  });

  it("maintains a single h1 per route across all primary routes", () => {
    for (const route of [
      "/",
      "/projects",
      "/projects/palander",
      "/projects/rsa-learning-lab",
      "/about",
      "/contact",
      "/unknown-route",
    ]) {
      const { unmount } = renderAtRoute(route);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      unmount();
    }
  });

  it("does not replay the circuit intro after navigating away mid-animation and returning Home", async () => {
    const user = userEvent.setup();
    const killSpy = vi.fn();

    // Simulate a 3.5s animation still in flight (onComplete never fires before unmount)
    gsap.timeline.mockImplementationOnce(() => ({
      add: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      kill: killSpy,
    }));

    renderAtRoute("/");
    expect(gsap.timeline).toHaveBeenCalledTimes(1);

    // Navigate away before the 3.5s intro completes
    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    await user.click(
      within(primaryNav).getAllByRole("link", { name: "About" })[0],
    );
    expect(killSpy).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "About" }),
    ).toBeInTheDocument();

    // Return Home: intro must NOT replay
    await user.click(
      within(primaryNav).getByRole("link", { name: `${site.name}, home` }),
    );
    expect(
      screen.getByRole("heading", { level: 1, name: site.name }),
    ).toBeInTheDocument();
    expect(gsap.timeline).toHaveBeenCalledTimes(1);
  });

  it("bypasses GSAP timeline animation completely when prefers-reduced-motion is active", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    try {
      renderAtRoute("/");
      expect(gsap.timeline).not.toHaveBeenCalled();
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });
});
