import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import App from "../App";
import { ThemeProvider } from "../components/ThemeContext";
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

describe("Portfolio structure and accessibility", () => {
  beforeEach(() => {
    localStorage.clear();
    site.resumeUrl = "";
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
    expect(document.getElementById("mobile-primary-menu")).not.toBeNull();

    await user.keyboard("{Escape}");
    expect(
      screen.getByRole("button", { name: /open navigation menu/i }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("mobile-primary-menu")).toBeNull();

    // Reopen and navigate via mobile link
    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );
    const mobileMenu = document.getElementById("mobile-primary-menu");
    await user.click(within(mobileMenu).getByRole("link", { name: "About" }));

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

    expect(
      screen.getByRole("link", { name: `${rsaProject.title} live demo` }),
    ).toHaveAttribute("href", rsaProject.links.demo);

    expect(
      screen.getByRole("link", {
        name: `${rsaProject.title} GitHub repository`,
      }),
    ).toHaveAttribute("href", rsaProject.links.repo);
  });

  it("renders known case-study slugs and renders NotFound for unknown slugs", () => {
    const { unmount } = renderAtRoute("/projects/rsa-learning-lab");

    expect(
      screen.getByRole("heading", { level: 1, name: "RSA Learning Lab" }),
    ).toBeInTheDocument();
    expect(document.title).toBe("RSA Learning Lab | Trevor Werner");

    unmount();
    renderAtRoute("/projects/non-existent-project");

    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
  });

  it("omits empty optional case-study sections and shows in-preparation state when narrative is empty", () => {
    const targetProject = projects.find((p) => p.slug === "palander");
    const originalCaseStudy = targetProject.caseStudy;

    // Default empty narrative -> shows preparation callout, omits empty section headings
    const { unmount } = renderAtRoute("/projects/palander");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Case study in preparation",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Problem" }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Engineering decisions",
      }),
    ).toBeNull();
    unmount();

    // Partial narrative -> renders populated sections and omits empty optional sections
    targetProject.caseStudy = {
      ...originalCaseStudy,
      problem: "Fragmented task lists lose domain and objective context.",
      solution: "Unified daily timeline backed by PostgreSQL constraints.",
      contribution: [],
      stackNotes: [],
      decisions: [],
      evidence: [],
      outcome: "",
      limitations: "",
    };

    try {
      renderAtRoute("/projects/palander");
      expect(
        screen.getByRole("heading", { level: 2, name: "Problem" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Solution" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", {
          level: 2,
          name: "Role and contribution",
        }),
      ).toBeNull();
      expect(
        screen.queryByRole("heading", {
          level: 2,
          name: "Engineering decisions",
        }),
      ).toBeNull();
      expect(
        screen.queryByRole("heading", { level: 2, name: "Evidence" }),
      ).toBeNull();
      expect(
        screen.queryByRole("heading", {
          level: 2,
          name: "Outcome and limitations",
        }),
      ).toBeNull();
    } finally {
      targetProject.caseStudy = originalCaseStudy;
    }
  });

  it("omits conditional Resume links across routes when resumeUrl is empty", () => {
    site.resumeUrl = "";

    for (const route of ["/", "/about", "/contact"]) {
      const { unmount } = renderAtRoute(route);
      expect(screen.queryByRole("link", { name: /resume/i })).toBeNull();
      unmount();
    }
  });

  it("maintains a single h1 per route across all primary routes", () => {
    for (const route of [
      "/",
      "/projects",
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
});
