import { site } from "../data/site";
import { themeColors } from "../data/themes";
import { useTheme } from "../components/useTheme";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Contact = () => {
  const { theme } = useTheme();
  const palette = themeColors[theme];

  useDocumentTitle(`Contact | ${site.name}`);

  const contactItems = [
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      label: "GitHub",
      value: "github.com/Trevor5008",
      href: site.github,
      external: true,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/trevor-werner",
      href: site.linkedin,
      external: true,
    },
  ];

  if (site.resumeUrl) {
    contactItems.push({
      label: "Resume",
      value: "Download / View PDF",
      href: site.resumeUrl,
      external: true,
    });
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <header className="max-w-[70ch]">
        <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl ${palette.text}`}>
          Contact
        </h1>
        <p className="mt-4 text-base leading-relaxed">
          Reach out directly via email or connect on GitHub and LinkedIn for
          software engineering roles, applied AI projects, or technical
          collaboration.
        </p>
      </header>

      <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {contactItems.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border p-5 ${palette.border} ${palette.surface}`}
          >
            <dt className={`text-xs font-semibold uppercase tracking-wider ${palette.mutedText}`}>
              {item.label}
            </dt>
            <dd className="mt-2">
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`inline-flex min-h-11 items-center text-base font-medium underline underline-offset-4 ${palette.text} ${palette.focusRing} rounded-sm`}
              >
                {item.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Contact;
