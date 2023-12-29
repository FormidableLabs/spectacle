type TemplateOptions = {
  name: string;
};

export const markdownTemplate = (options: TemplateOptions) =>
  `
--- { "layout" : "center" }
# ${options.name}

---
- Made with Spectacle
`.trim();

export const markdownCustomTypesTemplate = () =>
  `
declare module '*.md' {
  const content: string;
  export default content;
}
`.trim();
