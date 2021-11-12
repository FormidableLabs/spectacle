import * as React from 'react';

export const CodePane: React.FC<{
  children: React.ReactNode;
  language: string;
  theme?: Record<string, unknown>;
  stepIndex?: number;
  highlightRanges?: number | (number | number[])[];
  showLineNumbers?: boolean;
}>;
