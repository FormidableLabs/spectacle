import indentNormalizer from './indent-normalizer';

describe('indentNormalizer', () => {
  it('handles empty cases', () => {
    expect(indentNormalizer()).toEqual('');
    expect(indentNormalizer(null)).toEqual('');
    expect(indentNormalizer('')).toEqual('');
    expect(indentNormalizer(' ')).toEqual('');
    expect(indentNormalizer(' \n ')).toEqual('');
  });

  it('handles base cases', () => {
    expect(indentNormalizer('no indents')).toEqual('no indents');
    expect(indentNormalizer('no indents\nstill none')).toEqual(
      'no indents\nstill none'
    );
  });

  it('indents to smallest non-whitespace line level', () => {
    expect(
      indentNormalizer(
        `
    first lowest
      second in
    third
        fourth way in
    `
      )
    ).toEqual(
      `
first lowest
  second in
third
    fourth way in
    `.trim()
    );
  });

  it('indents to smallest indent even in later lines', () => {
    expect(
      indentNormalizer(`
    first
      second in
  third lowest
        fourth way in
    `)
    ).toEqual(`  first
    second in
third lowest
      fourth way in`);
  });
});
