import clamp, { toFiniteNumber } from './clamp';

describe('toFiniteNumber', () => {
  it('should return 0 for NaN', () => {
    expect(toFiniteNumber(NaN)).toBe(0);
    expect(toFiniteNumber(Number.NaN)).toBe(0);
  });

  it('should convert finite values to finite numbers', () => {
    expect(toFiniteNumber(123)).toBe(123);
    expect(toFiniteNumber(-456.789)).toBe(-456.789);
  });

  it('should return Number.MAX_SAFE_INTEGER for Infinity', () => {
    expect(toFiniteNumber(Infinity)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toFiniteNumber(-Infinity)).toBe(-Number.MAX_SAFE_INTEGER);
  });
});

describe('clamp', () => {
  it('should return NaN for NaN input', () => {
    expect(clamp(NaN)).toBeNaN();
  });

  it('should clamp value to specified range', () => {
    expect(clamp(10, 0, 5)).toBe(5);
    expect(clamp(-3, -10, 0)).toBe(-3);
    expect(clamp(7, 5, 10)).toBe(7);
    expect(clamp(-15, -10, 10)).toBe(-10);
  });

  it('should not clamp when range is not specified', () => {
    expect(clamp(10)).toBe(10);
    expect(clamp(-3)).toBe(-3);
    expect(clamp(7)).toBe(7);
    expect(clamp(-15)).toBe(-15);
  });
});
