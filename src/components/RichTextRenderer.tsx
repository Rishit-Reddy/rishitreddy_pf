import React, { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, type Document } from "@contentful/rich-text-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  document: Document;
}

export default function RichTextRenderer({ document }: Props) {
  const [isDark, setIsDark] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initial theme check
      const updateTheme = () => {
        const theme = localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDarkMode = theme === "dark" || (theme === "system" && systemPrefersDark) || (!theme && systemPrefersDark);
        setIsDark(isDarkMode);
      };

      // Set initial theme
      updateTheme();

      // Listen for storage changes (when theme is changed in another tab)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "theme") {
          updateTheme();
        }
      };

      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleMediaChange = () => {
        const theme = localStorage.getItem("theme");
        if (theme === "system" || !theme) {
          updateTheme();
        }
      };

      // Listen for theme changes via custom event (if your theme toggle dispatches this)
      const handleThemeChange = () => {
        updateTheme();
      };

      // Listen for class changes on document element (common theme implementation)
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "attributes" && mutation.attributeName === "class") {
            if (typeof window !== "undefined" && window.document?.documentElement) {
              const isDarkClass = window.document.documentElement.classList.contains("dark");
              setIsDark(isDarkClass);
            }
          }
        });
      });

      window.addEventListener("storage", handleStorageChange);
      mediaQuery.addEventListener("change", handleMediaChange);
      window.addEventListener("themeChange", handleThemeChange);
      
      if (typeof window !== "undefined" && window.document?.documentElement) {
        observer.observe(window.document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
      }

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        mediaQuery.removeEventListener("change", handleMediaChange);
        window.removeEventListener("themeChange", handleThemeChange);
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none space-y-0">
      {documentToReactComponents(document, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="mb-3 leading-relaxed">{children}</p>
          ),
          [BLOCKS.HEADING_1]: (node, children) => (
            <h1 className="text-3xl font-bold mt-5 mb-3">{children}</h1>
          ),
          [BLOCKS.HEADING_2]: (node, children) => (
            <h2 className="text-2xl font-bold mt-4 mb-2">{children}</h2>
          ),
          [BLOCKS.HEADING_3]: (node, children) => (
            <h3 className="text-xl font-bold mt-3 mb-2">{children}</h3>
          ),
          [BLOCKS.HEADING_4]: (node, children) => (
            <h4 className="text-lg font-semibold mt-2 mb-2">{children}</h4>
          ),
          [BLOCKS.HEADING_5]: (node, children) => (
            <h5 className="text-base font-semibold mt-1 mb-1">{children}</h5>
          ),
          [BLOCKS.HEADING_6]: (node, children) => (
            <h6 className="text-sm font-medium mt-2 mb-1">{children}</h6>
          ),
          [BLOCKS.UL_LIST]: (node, children) => (
            <ul className="list-disc ml-5 mb-3 space-y-1">{children}</ul>
          ),
          [BLOCKS.OL_LIST]: (node, children) => (
            <ol className="list-decimal ml-5 mb-3 space-y-1">{children}</ol>
          ),
          [BLOCKS.LIST_ITEM]: (node, children) => (
            <li className="leading-relaxed">{children}</li>
          ),
          [BLOCKS.QUOTE]: (node, children) => (
            <blockquote className="border-l-4 border-primary pl-4 my-3 italic bg-muted/30 py-2 rounded-r">
              {children}
            </blockquote>
          ),
          [BLOCKS.HR]: () => <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />,
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const asset = node.data.target.fields;
            if (!asset || !asset.file) return null;

            const url = asset.file.url.startsWith("http")
              ? asset.file.url
              : `https:${asset.file.url}`;
            const alt = asset.title || asset.description || "Embedded image";
            const caption = asset.description || asset.title;

            return (
              <figure className="my-6">
                <img
                  src={url}
                  alt={alt}
                  loading="lazy"
                  className="max-w-full max-h-96 object-contain rounded-lg mx-auto"
                />
                {caption && (
                  <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          },
          [BLOCKS.EMBEDDED_ENTRY]: (node) => {
            const entry = node.data.target;
            const contentType = entry?.sys?.contentType?.sys?.id;

            if (!entry?.fields) return null;

            if (contentType === "codeBlock") {
              const code = entry.fields.code;
              const language = entry.fields.language || "text";
              const title = entry.fields.description || entry.fields.title;

              return (
                <div className="my-6">
                  {title && (
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      {title}
                    </div>
                  )}
                  <div className="rounded-lg overflow-hidden border dark:border-zinc-700 border-zinc-200 relative group">
                    {/* Copy button */}
                    <button
                      onClick={() => copyToClipboard(code)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 text-xs font-medium"
                      title="Copy code"
                    >
                      {copiedCode === code ? (
                        <>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                    <div className="bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white p-4 text-sm font-mono overflow-x-auto">
                      <SyntaxHighlighter
                        language={language}
                        style={isDark ? vscDarkPlus : oneLight}
                        customStyle={{
                          background: "transparent",
                          margin: 0,
                          padding: 0,
                        }}
                        PreTag="div"
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          },
          [INLINES.EMBEDDED_ENTRY]: (node) => {
            const entry = node.data.target;
            if (!entry?.fields) return <span>[Unknown entry]</span>;

            const title = entry.fields.title || entry.fields.name || entry.fields.heading;
            const description = entry.fields.description || entry.fields.content || entry.fields.body;
            const url = entry.fields.url || entry.fields.link;

            if (url) {
              return (
                <a
                  href={url}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title || description || "Link"}
                </a>
              );
            }

            return (
              <span className="font-medium">
                {title || `[Embedded content]`}
              </span>
            );
          },
          [INLINES.HYPERLINK]: (node, children) => (
            <a
              href={node.data.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {children}
            </a>
          ),
        },
        renderMark: {
          [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
          [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
          [MARKS.UNDERLINE]: (text) => <u className="underline">{text}</u>,
        },
      })}
    </div>
  );
}
