import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { themeColors } from "../data/themes";
import { useTheme } from "../components/useTheme";

const Projects = () => {
  const { theme } = useTheme();
  const palette = themeColors[theme];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className={`text-3xl font-bold tracking-tight ${palette.text}`}>
          Projects
        </h1>
        <p className={`mt-3 text-base leading-relaxed ${palette.bodyText}`}>
          Full-stack software systems, interactive cryptography tools,
          local-first mobile apps, contract-driven data pipelines, and applied
          machine learning studies.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
