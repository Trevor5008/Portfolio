import { Link } from "react-router";
import CircuitHero from "../components/CircuitHero";
import ProjectCard from "../components/ProjectCard";
import { useTheme } from "../components/useTheme";
import { themeColors } from "../data/themes";
import { site } from "../data/site";
import { featuredProjects } from "../data/projects";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home = () => {
  const { theme } = useTheme();
  const palette = themeColors[theme];

  useDocumentTitle(`${site.name} | ${site.role}`);

  return (
    <div>
      <CircuitHero />

      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-16 sm:px-6">
        {/* 2. Featured projects */}
        <section aria-labelledby="featured-projects-heading">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2
              id="featured-projects-heading"
              className={`text-2xl font-bold tracking-tight ${palette.text}`}
            >
              Featured Projects
            </h2>
            <Link
              to="/projects"
              className={`inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4 ${palette.text} ${palette.focusRing} rounded-md px-1`}
            >
              See all projects
            </Link>
          </div>
          <p className={`mt-2 max-w-2xl text-sm ${palette.mutedText}`}>
            Selected software, interactive cryptography, and local-first mobile
            systems.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* 3. What I work on */}
        <section aria-labelledby="pillars-heading">
          <h2
            id="pillars-heading"
            className={`text-2xl font-bold tracking-tight ${palette.text}`}
          >
            What I Work On
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {site.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`rounded-xl border p-6 ${palette.border} ${palette.surface}`}
              >
                <h3 className={`text-lg font-semibold ${palette.text}`}>
                  {pillar.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${palette.bodyText}`}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. About snapshot */}
        <section
          aria-labelledby="about-snapshot-heading"
          className={`rounded-xl border p-6 sm:p-8 ${palette.border} ${palette.surface}`}
        >
          <h2
            id="about-snapshot-heading"
            className={`text-2xl font-bold tracking-tight ${palette.text}`}
          >
            About
          </h2>
          <p
            className={`mt-4 max-w-[70ch] text-base leading-relaxed ${palette.bodyText}`}
          >
            {site.aboutSnapshot}
          </p>
          <div className="mt-5">
            <Link
              to="/about"
              className={`inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4 ${palette.text} ${palette.focusRing} rounded-md px-1`}
            >
              More about my background
            </Link>
          </div>
        </section>

        {/* 5. Contact CTA */}
        <section
          aria-labelledby="contact-cta-heading"
          className={`border-t pt-12 ${palette.border}`}
        >
          <h2
            id="contact-cta-heading"
            className={`text-2xl font-bold tracking-tight ${palette.text}`}
          >
            Get in Touch
          </h2>
          <p className={`mt-3 max-w-xl text-base ${palette.bodyText}`}>
            Open to software engineering and applied AI opportunities, technical
            collaborations, and conversations around reliable systems.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold ring-1 transition-colors duration-150 ${palette.ring} ${palette.text} ${palette.hover} ${palette.focusRing}`}
            >
              Email me
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors duration-150 ${palette.border} ${palette.bodyText} ${palette.subtleHover} ${palette.focusRing}`}
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors duration-150 ${palette.border} ${palette.bodyText} ${palette.subtleHover} ${palette.focusRing}`}
            >
              LinkedIn
            </a>
            {site.resumeUrl ? (
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors duration-150 ${palette.border} ${palette.bodyText} ${palette.subtleHover} ${palette.focusRing}`}
              >
                Resume
              </a>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
