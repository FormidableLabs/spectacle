type Section = {
  content: string;
  jsonObject?: Record<string, string>;
};

export const separateSectionsFromJson = (json?: string): Section[] => {
  if (!json || json.trim().length === 0) return [];

  const sections: Section[] = [];
  const lines: string[] = json.split('\n');
  let currentSection: Section = {
    content: ''
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('---')) {
      if (currentSection.content !== '') {
        sections.push(currentSection);
      }

      const jsonContent = trimmedLine.substring(3).trim();
      const jsonObject = jsonContent ? JSON.parse(jsonContent) : undefined;

      currentSection = {
        content: '',
        jsonObject: jsonObject
      };
    } else {
      currentSection.content += line + '\n';
    }
  }

  sections.push(currentSection);
  return sections;
};
