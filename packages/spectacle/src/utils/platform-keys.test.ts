import {
  isPlatformMacOS,
  getKeyForOS,
  prettifyShortcut
} from './platform-keys';

const { navigator: navigatorBefore } = window;

describe('platform-keys', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'navigator', {
      writable: true
    });
  });

  afterAll(() => {
    window.navigator = navigatorBefore;
  });
  describe('isPlatformMacOS', () => {
    it('should return true for MacIntel', () => {
      Object.defineProperty(window, 'navigator', {
        value: {
          userAgent: 'MacIntel'
        }
      });

      expect(isPlatformMacOS()).toBe(true);
    });

    it('Return false for anything that doesnt contain Mac|darwin|iPad', () => {
      Object.defineProperty(window, 'navigator', {
        value: {
          userAgent: 'Windows'
        }
      });
      expect(isPlatformMacOS()).toBe(false);

      Object.defineProperty(window, 'navigator', {
        value: {
          userAgent: 'Linux'
        }
      });
      expect(isPlatformMacOS()).toBe(false);
    });
  });

  describe('getKeyForOS', () => {
    it.each`
      userAgent     | key        | result
      ${'MacIntel'} | ${'mod'}   | ${'⌘'}
      ${'Windows'}  | ${'mod'}   | ${'Ctrl'}
      ${'MacIntel'} | ${'shift'} | ${'⇧'}
      ${'Windows'}  | ${'shift'} | ${'Shift'}
      ${'MacIntel'} | ${'ctrl'}  | ${'^'}
      ${'Windows'}  | ${'ctrl'}  | ${'Ctrl'}
      ${'MacIntel'} | ${'alt'}   | ${'⌥'}
      ${'Windows'}  | ${'alt'}   | ${'Alt'}
    `(
      'should return $result for $key on $userAgent',
      ({ userAgent, key, result }) => {
        Object.defineProperty(navigator, 'userAgent', {
          value: userAgent,
          configurable: true
        });

        expect(getKeyForOS(key)).toStrictEqual(result);
      }
    );
  });

  describe('prettifyShortcut', () => {
    it.each`
      userAgent     | shortcut                 | result
      ${'MacIntel'} | ${'mod+shift+p'}         | ${['⌘', '⇧', 'P']}
      ${'Windows'}  | ${'mod+shift+p'}         | ${['Ctrl', 'Shift', 'P']}
      ${'MacIntel'} | ${'mod+shift+o'}         | ${['⌘', '⇧', 'O']}
      ${'Windows'}  | ${'mod+shift+o'}         | ${['Ctrl', 'Shift', 'O']}
      ${'MacIntel'} | ${['mod', 'shift', 'r']} | ${['⌘', '⇧', 'R']}
      ${'Windows'}  | ${['mod', 'shift', 'r']} | ${['Ctrl', 'Shift', 'R']}
      ${'MacIntel'} | ${['mod', 'shift', 'e']} | ${['⌘', '⇧', 'E']}
      ${'Windows'}  | ${['mod', 'shift', 'e']} | ${['Ctrl', 'Shift', 'E']}
      ${'MacIntel'} | ${'left'}                | ${['←']}
      ${'Windows'}  | ${'left'}                | ${['←']}
      ${'MacIntel'} | ${'right'}               | ${['→']}
      ${'Windows'}  | ${'right'}               | ${['→']}
    `(
      'should return $result for $shortcut on $userAgent',
      ({ userAgent, shortcut, result }) => {
        Object.defineProperty(navigator, 'userAgent', {
          value: userAgent,
          configurable: true
        });

        expect(prettifyShortcut(shortcut)).toStrictEqual(result);
      }
    );
  });
});
