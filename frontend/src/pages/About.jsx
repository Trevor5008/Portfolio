import { Link } from "react-router";
import { site } from "../data/site";
import { themeColors } from "../data/themes";
import { useTheme } from "../components/useTheme";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const About = () => {
  const { theme } = useTheme();
  const palette = themeColors[theme];

  useDocumentTitle(`About | ${site.name}`);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 py-12 sm:px-6">
      <section className="max-w-[70ch]">
        <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${palette.text}`}>
          About
        </h1>
        <p className={`mt-2 text-lg font-medium ${palette.mutedText}`}>
          {site.role}
        </p>
        <p className="mt-5 text-base leading-relaxed">{site.aboutSnapshot}</p>
        <p className="mt-4 text-base leading-relaxed">
          My work emphasizes strong relational schemas, explicit validation
          boundaries, and reproducible evaluation so software and analytical
          workflows remain trustworthy as requirements evolve across Python,
          TypeScript, JavaScript, Java, SQL, and C.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to="/projects"
            className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold ring-1 transition-colors duration-150 ${palette.ring} ${palette.text} ${palette.hover} ${palette.focusRing}`}
          >
            Explore projects
          </Link>
          {site.resumeUrl ? (
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors duration-150 ${palette.border} ${palette.bodyText} ${palette.subtleHover} ${palette.focusRing}`}
            >
              View Resume
            </a>
          ) : null}
        </div>
      </section>

      {site.experience?.length > 0 && (
        <section aria-labelledby="experience-heading" className="max-w-[70ch]">
          <h2 id="experience-heading" className={`text-2xl font-bold ${palette.text}`}>
            Experience
          </h2>
          <div className="mt-6 space-y-6">
            {site.experience.map((entry) => (
              <div
                key={`${entry.role}-${entry.org}`}
                className={`rounded-xl border p-5 ${palette.border} ${palette.surface}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={`text-lg font-semibold ${palette.text}`}>
                    {entry.role} &middot; {entry.org}
                  </h3>
                  {entry.dates && (
                    <span className={`text-xs ${palette.mutedText}`}>
                      {entry.dates}
                    </span>
                  )}
                </div>
                {entry.bullets?.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {site.education?.length > 0 && (
        <section aria-labelledby="education-heading" className="max-w-[70ch]">
          <h2 id="education-heading" className={`text-2xl font-bold ${palette.text}`}>
            Education &amp; Certifications
          </h2>
          <div className="mt-6 space-y-4">
            {site.education.map((item) => (
              <div
                key={`${item.degree}-${item.institution}`}
                className={`rounded-xl border p-5 ${palette.border} ${palette.surface}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={`text-base font-semibold ${palette.text}`}>
                    {item.degree}
                  </h3>
                  {item.dates && (
                    <span className={`text-xs ${palette.mutedText}`}>
                      {item.dates}
                    </span>
                  )}
                </div>
                <p className={`mt-1 text-sm ${palette.mutedText}`}>
                  {item.institution}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={`text-2xl font-bold ${palette.text}`}>
          Technical Stack
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.skillGroups.map((group) => (
            <div
              key={group.area}
              className={`rounded-xl border p-5 ${palette.border} ${palette.surface}`}
            >
              <h3 className={`text-base font-semibold ${palette.text}`}>
                {group.area}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium ${palette.pill}`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
