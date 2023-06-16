import { separateSectionsFromJson } from './separate-sections-from-json';

describe('separateSectionsFromJson', () => {
  test('should separate sections and parse JSON objects', () => {
    const json = `
--- {"name":"carlos"}

# Slide 1

Slide 1 Content

---

# Slide 2

Slide 2 Content
    `.trim();

    const sections = separateSectionsFromJson(json);

    expect(sections.length).toBe(2);

    expect(sections[0]).toEqual({
      content: `\n# Slide 1\n\nSlide 1 Content\n\n`,
      jsonObject: { name: 'carlos' }
    });

    expect(sections[1]).toEqual({
      content: `\n# Slide 2\n\nSlide 2 Content\n`,
      jsonObject: undefined
    });
  });

  test('should handle sections without JSON objects', () => {
    const json = `
---

# Slide 1

Slide 1 Content

---

# Slide 2

Slide 2 Content
    `.trim();

    const sections = separateSectionsFromJson(json);

    expect(sections.length).toBe(2);

    expect(sections[0]).toEqual({
      content: `\n# Slide 1\n\nSlide 1 Content\n\n`,
      jsonObject: undefined
    });

    expect(sections[1]).toEqual({
      content: `\n# Slide 2\n\nSlide 2 Content\n`,
      jsonObject: undefined
    });
  });

  test('should handle an empty JSON string', () => {
    const json = '';
    const sections = separateSectionsFromJson(json);

    expect(sections.length).toBe(0);
  });

  test('should slides without a starting delimiter', () => {
    const json = `
# Slide 1

---

# Slide 2`;
    const sections = separateSectionsFromJson(json);

    expect(sections.length).toBe(2);

    expect(sections[0]).toEqual({
      content: '# Slide 1\n\n',
      jsonObject: undefined
    });

    expect(sections[1]).toEqual({
      content: '# Slide 2',
      jsonObject: undefined
    });
  });
});
