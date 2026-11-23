import { Link, useParams } from "react-router";
import NotFound from "./NotFound";
import { getProjectBySlug } from "../data/projects";
import { site } from "../data/site";
import { themeColors } from "../data/themes";
import { useTheme } from "../components/useTheme";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;
const hasPositiveDimension = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const CaseStudy = () => {
  const { slug } = useParams();
  const { theme } = useTheme();
  const palette = themeColors[theme];
  const project = getProjectBySlug(slug);

  useDocumentTitle(project ? `${project.title} | ${site.name}` : "", {
    canonical: Boolean(project),
  });

  if (!project) {
    return <NotFound />;
  }

  const cs = project.caseStudy || {};
  const highlights = (cs.highlights || []).filter(hasText);
  const contributions = (cs.contribution || []).filter(hasText);
  const stackNotes = (cs.stackNotes || []).filter(
    (item) => item && hasText(item.tech) && hasText(item.why),
  );
  const decisions = (cs.decisions || []).filter(
    (item) =>
      item &&
      (hasText(item.title) ||
        hasText(item.options) ||
        hasText(item.choice) ||
        hasText(item.tradeoff)),
  );
  const evidenceItems = (cs.evidence || []).filter(
    (item) => item && hasText(item.src) && hasText(item.alt),
  );
  const evidenceLinks = (cs.evidenceLinks || []).filter(
    (item) => item && hasText(item.label) && hasText(item.url),
  );
  const limitationItems = (cs.limitationItems || []).filter(hasText);
  const deferredItems = (cs.deferredItems || []).filter(hasText);
  const architectureParagraphs = hasText(cs.architecture)
    ? cs.architecture
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  const heroImage = evidenceItems[0] || null;
  const galleryImages = heroImage ? evidenceItems.slice(1) : evidenceItems;

  const hasCaseStudyBody =
    hasText(cs.problem) ||
    contributions.length > 0 ||
    hasText(cs.solution) ||
    architectureParagraphs.length > 0 ||
    stackNotes.length > 0 ||
    decisions.length > 0 ||
    evidenceItems.length > 0 ||
    evidenceLinks.length > 0 ||
    hasText(cs.outcome) ||
    hasText(cs.limitations) ||
    limitationItems.length > 0 ||
    deferredItems.length > 0;

  const hasLinks = Boolean(
    hasText(project.links?.demo) || hasText(project.links?.repo),
  );

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Header block */}
      <header className={`border-b pb-8 ${palette.border}`}>
        <h1
          className={`text-3xl font-bold tracking-tight sm:text-4xl ${palette.text}`}
        >
          {project.title}
        </h1>

        <p
          className={`mt-4 max-w-[70ch] text-lg leading-relaxed ${palette.bodyText}`}
        >
          {hasText(cs.tldr) ? cs.tldr : project.summary}
        </p>

        {highlights.length > 0 && (
          <ul
            aria-label="Highlights"
            className="mt-5 flex flex-wrap gap-2"
          >
            {highlights.map((item) => (
              <li
                key={item}
                className={`rounded-md border px-3 py-1 text-sm font-medium ${palette.pill}`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <dl className="mt-6 flex flex-col gap-4 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
          <div>
            <dt className={`font-semibold ${palette.mutedText}`}>Role</dt>
            <dd className="mt-0.5">{project.role}</dd>
          </div>

          {hasText(project.timeline) && (
            <div>
              <dt className={`font-semibold ${palette.mutedText}`}>Timeline</dt>
              <dd className="mt-0.5">{project.timeline}</dd>
            </div>
          )}

          {project.stack?.length > 0 && (
            <div>
              <dt className={`font-semibold ${palette.mutedText}`}>Stack</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-md border px-2 py-0.5 text-xs ${palette.pill}`}
                  >
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>

        {hasLinks && (
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {hasText(project.links?.demo) && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold ring-1 transition-colors duration-150 ${palette.ring} ${palette.text} ${palette.hover} ${palette.focusRing}`}
              >
                Live Demo
              </a>
            )}
            {hasText(project.links?.repo) && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors duration-150 ${palette.border} ${palette.bodyText} ${palette.subtleHover} ${palette.focusRing}`}
              >
                View Repository
              </a>
            )}
          </div>
        )}

        {hasText(cs.availabilityNote) && (
          <section
            aria-labelledby="case-study-availability-heading"
            className={`mt-5 max-w-[70ch] rounded-lg border px-4 py-3 ${palette.border} ${palette.surface}`}
          >
            <h2
              id="case-study-availability-heading"
              className={`text-xs font-semibold uppercase tracking-wider ${palette.mutedText}`}
            >
              Availability
            </h2>
            <p className={`mt-1 text-sm leading-relaxed ${palette.bodyText}`}>
              {cs.availabilityNote}
            </p>
          </section>
        )}
      </header>

      {hasCaseStudyBody ? (
        <div className="mt-10 flex flex-col gap-12">
          {/* 1. Problem */}
          {hasText(cs.problem) && (
            <section className="max-w-[70ch]">
              <h2 className={`text-2xl font-bold ${palette.text}`}>Problem</h2>
              <p className="mt-3 leading-relaxed">{cs.problem}</p>
            </section>
          )}

          {/* 2. Role and contribution */}
          {contributions.length > 0 && (
            <section className="max-w-[70ch]">
              <h2 className={`text-2xl font-bold ${palette.text}`}>
                Role and contribution
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                {contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 3. Solution */}
          {(hasText(cs.solution) || heroImage) && (
            <section>
              <div className="max-w-[70ch]">
                <h2 className={`text-2xl font-bold ${palette.text}`}>
                  Solution
                </h2>
                {hasText(cs.solution) && (
                  <p className="mt-3 leading-relaxed">{cs.solution}</p>
                )}
              </div>
              {heroImage && (
                <figure className="mt-6 max-w-4xl">
                  <img
                    src={heroImage.src}
                    alt={heroImage.alt}
                    width={
                      hasPositiveDimension(heroImage.width)
                        ? heroImage.width
                        : undefined
                    }
                    height={
                      hasPositiveDimension(heroImage.height)
                        ? heroImage.height
                        : undefined
                    }
                    decoding="async"
                    className={`h-auto w-full rounded-xl border ${palette.border}`}
                  />
                  {hasText(heroImage.caption) && (
                    <figcaption className={`mt-2 text-sm ${palette.mutedText}`}>
                      {heroImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          )}

          {/* 4. Architecture */}
          {architectureParagraphs.length > 0 && (
            <section className="max-w-[70ch]">
              <h2 className={`text-2xl font-bold ${palette.text}`}>
                Architecture
              </h2>
              <div className="mt-3 space-y-3 leading-relaxed">
                {architectureParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {/* 5. Stack */}
          {stackNotes.length > 0 && (
            <section className="max-w-[70ch]">
              <h2 className={`text-2xl font-bold ${palette.text}`}>Stack</h2>
              <dl className="mt-4 space-y-3">
                {stackNotes.map((note) => (
                  <div
                    key={note.tech}
                    className={`rounded-lg border p-4 ${palette.border} ${palette.surface}`}
                  >
                    <dt className={`font-semibold ${palette.text}`}>
                      {note.tech}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed">{note.why}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* 6. Engineering decisions */}
          {decisions.length > 0 && (
            <section className="max-w-[70ch]">
              <h2 className={`text-2xl font-bold ${palette.text}`}>
                Engineering decisions
              </h2>
              <div className="mt-4 space-y-4">
                {decisions.map((decision, idx) => (
                  <div
                    key={decision.title || idx}
                    className={`rounded-xl border p-5 ${palette.border} ${palette.surface}`}
                  >
                    {hasText(decision.title) && (
                      <h3 className={`text-lg font-semibold ${palette.text}`}>
                        {decision.title}
                      </h3>
                    )}
                    <dl className="mt-3 space-y-2 text-sm leading-relaxed">
                      {hasText(decision.options) && (
                        <div>
                          <dt className={`font-semibold ${palette.mutedText}`}>
                            Options considered
                          </dt>
                          <dd>{decision.options}</dd>
                        </div>
                      )}
                      {hasText(decision.choice) && (
                        <div>
                          <dt className={`font-semibold ${palette.mutedText}`}>
                            Decision
                          </dt>
                          <dd>{decision.choice}</dd>
                        </div>
                      )}
                      {hasText(decision.tradeoff) && (
                        <div>
                          <dt className={`font-semibold ${palette.mutedText}`}>
                            Tradeoff
                          </dt>
                          <dd>{decision.tradeoff}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7. Evidence / screenshots & repository artifacts */}
          {(galleryImages.length > 0 || evidenceLinks.length > 0) && (
            <section>
              <h2 className={`text-2xl font-bold ${palette.text}`}>Evidence</h2>

              {galleryImages.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {galleryImages.map((img) => (
                    <figure key={img.src}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={
                          hasPositiveDimension(img.width)
                            ? img.width
                            : undefined
                        }
                        height={
                          hasPositiveDimension(img.height)
                            ? img.height
                            : undefined
                        }
                        loading="lazy"
                        decoding="async"
                        className={`h-auto w-full rounded-xl border ${palette.border}`}
                      />
                      {hasText(img.caption) && (
                        <figcaption
                          className={`mt-2 text-sm ${palette.mutedText}`}
                        >
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}

              {evidenceLinks.length > 0 && (
                <div
                  className={`${galleryImages.length > 0 ? "mt-8" : "mt-4"} max-w-[70ch]`}
                >
                  <h3 className={`text-lg font-semibold ${palette.text}`}>
                    Public repository evidence
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {evidenceLinks.map((item) => (
                      <li
                        key={item.url}
                        className={`rounded-lg border p-4 ${palette.border} ${palette.surface}`}
                      >
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 ${palette.text} ${palette.focusRing} rounded-sm`}
                        >
                          {item.label}
                        </a>
                        {hasText(item.note) && (
                          <p
                            className={`mt-1 text-sm leading-relaxed ${palette.mutedText}`}
                          >
                            {item.note}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* 8. Outcome and limitations */}
          {(hasText(cs.outcome) ||
            hasText(cs.limitations) ||
            limitationItems.length > 0) && (
            <section className="max-w-[70ch]">
              <h2 className={`text-2xl font-bold ${palette.text}`}>
                Outcome and limitations
              </h2>
              {hasText(cs.outcome) && (
                <p className="mt-3 leading-relaxed">{cs.outcome}</p>
              )}
              {hasText(cs.limitations) && (
                <p className={`mt-3 leading-relaxed ${palette.mutedText}`}>
                  {cs.limitations}
                </p>
              )}
              {limitationItems.length > 0 && (
                <div className="mt-4">
                  <h3 className={`text-base font-semibold ${palette.text}`}>
                    Current limitations
                  </h3>
                  <ul
                    className={`mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed ${palette.mutedText}`}
                  >
                    {limitationItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* 9. Deferred and future work */}
          {deferredItems.length > 0 && (
            <section className="max-w-[70ch]">
              <h2 className={`text-2xl font-bold ${palette.text}`}>
                Deferred and future work
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                {deferredItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 10. Repository / demo links */}
          {hasLinks && (
            <section className="max-w-[70ch]">
              <h2 className={`text-2xl font-bold ${palette.text}`}>
                Project links
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {hasText(project.links?.demo) && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 ${palette.text} ${palette.focusRing} rounded-sm px-1`}
                  >
                    Open Live Demo
                  </a>
                )}
                {hasText(project.links?.repo) && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 ${palette.text} ${palette.focusRing} rounded-sm px-1`}
                  >
                    Source Repository on GitHub
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      ) : (
        <section
          aria-labelledby="case-study-prep-heading"
          className={`mt-10 max-w-[70ch] rounded-xl border p-6 sm:p-8 ${palette.border} ${palette.surface}`}
        >
          <h2
            id="case-study-prep-heading"
            className={`text-xl font-semibold ${palette.text}`}
          >
            Case study in preparation
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            A detailed architectural writeup covering design tradeoffs,
            implementation details, and verification artifacts for{" "}
            {project.title} is currently in preparation. Explore the full source
            code, documentation, and technical history directly in the
            repository.
          </p>
        </section>
      )}

      <div className={`mt-12 border-t pt-8 ${palette.border}`}>
        <Link
          to="/projects"
          className={`inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4 ${palette.text} ${palette.focusRing} rounded-md px-1`}
        >
          &larr; Back to projects
        </Link>
      </div>
    </article>
  );
};

export default CaseStudy;
