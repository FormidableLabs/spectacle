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
