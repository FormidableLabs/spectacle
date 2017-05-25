import React from 'react';
import { countSlides } from './slides';

describe('slides', () => {
  describe('countSlides', () => {
    test('should count standard slides', () => {
      const children = [
        <div key={0} />,
        <div key={1} />
      ];
      expect(countSlides(children)).toBe(2);
    });

    test('should count slide sets', () => {
      const children = [
        <div key={0} />,
        <div key={1} hasSlideChildren>
          <div key={0} />
          <div key={1} />
        </div>
      ];
      expect(countSlides(children)).toBe(3);
    });
  });
});
