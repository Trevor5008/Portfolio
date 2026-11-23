import { Link } from "react-router";
import { useTheme } from "./useTheme";
import { themeColors } from "../data/themes";

const STATUS_META = {
  live: { label: "Live", indicator: "●" },
  "in-progress": { label: "In Progress", indicator: "◌" },
  archived: { label: "Archived", indicator: "▪" },
};

const hasPositiveDimension = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const ProjectCard = ({ project }) => {
  const { theme } = useTheme();
  const palette = themeColors[theme];
  const statusInfo = STATUS_META[project.status] || STATUS_META["in-progress"];
  const visibleStack = project.stack.slice(0, 4);
  const thumbnailMeta = project.caseStudy?.evidence?.find(
    (item) => item && item.src === project.thumbnail,
  );
  const thumbWidth = project.thumbnailWidth || thumbnailMeta?.width;
  const thumbHeight = project.thumbnailHeight || thumbnailMeta?.height;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border ${palette.border} ${palette.cardHoverBorder} ${palette.surface} transition-all duration-150 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none`}
    >
      <div
        className={`aspect-[16/10] w-full overflow-hidden border-b ${palette.border} ${palette.bgColor}`}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={`${project.title} preview`}
            width={hasPositiveDimension(thumbWidth) ? thumbWidth : undefined}
            height={hasPositiveDimension(thumbHeight) ? thumbHeight : undefined}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center"
          >
            <span
              className={`text-xs font-semibold uppercase tracking-widest ${palette.mutedText}`}
            >
              {project.stack[0] || "Software"}
            </span>
            <span className={`text-lg font-bold ${palette.text}`}>
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-xs font-medium ${palette.mutedText}`}>
            {project.role}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${palette.pill}`}
          >
            <span aria-hidden="true">{statusInfo.indicator}</span>
            {statusInfo.label}
          </span>
        </div>

        <h3 className={`mt-3 text-lg font-bold tracking-tight ${palette.text}`}>
          <Link
            to={`/projects/${project.slug}`}
            className={`after:absolute after:inset-0 rounded-sm ${palette.focusRing}`}
          >
            {project.title}
          </Link>
        </h3>

        <p className={`mt-2 flex-1 text-sm leading-relaxed ${palette.bodyText}`}>
          {project.summary}
        </p>

        {visibleStack.length > 0 && (
          <ul
            aria-label={`${project.title} technologies`}
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {visibleStack.map((tech) => (
              <li
                key={tech}
                className={`rounded-md border px-2 py-0.5 text-xs ${palette.pill}`}
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {(project.links?.demo || project.links?.repo) && (
          <div
            className={`relative z-10 mt-4 flex flex-wrap items-center gap-4 border-t pt-3 ${palette.border}`}
          >
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className={`inline-flex min-h-11 items-center text-xs font-semibold underline underline-offset-4 ${palette.text} ${palette.focusRing} rounded-sm px-1`}
              >
                Live Demo
              </a>
            ) : null}
            {project.links.repo ? (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className={`inline-flex min-h-11 items-center text-xs font-medium underline underline-offset-4 ${palette.mutedText} ${palette.hoverText} ${palette.focusRing} rounded-sm px-1`}
              >
                Repository
              </a>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
