import { isolateNotes, removeNotes } from './notes';

describe('isolate notes', () => {
  it('returns emty string when there are no notes', () => {
    expect(
      isolateNotes(`
# Test Title
    `)
    ).toEqual('');
  });

  it('returns the given notes', () => {
    expect(
      isolateNotes(`
# test title
      
Notes: these are some test notes
    `).trim()
    ).toEqual('these are some test notes');
  });
});

describe('remove notes', () => {
  it('returns the full content when there are no notes', () => {
    expect(
      removeNotes(`
# Test Title
    `).trim()
    ).toEqual('# Test Title');
  });

  it('removes the given notes', () => {
    expect(
      removeNotes(`
# test title
      
Notes: these are some test notes
    `).trim()
    ).toEqual('# test title');
  });
});
