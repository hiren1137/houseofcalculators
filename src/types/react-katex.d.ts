// src/types/react-katex.d.ts

declare module 'react-katex' {
    import { FunctionComponent, ReactNode } from 'react';
  
    export interface InlineMathProps {
      math: string;
      renderError?: (error: Error) => ReactNode;
      macros?: { [key: string]: string };
    }
  
    export const InlineMath: FunctionComponent<InlineMathProps>;
  
    export interface BlockMathProps {
      math: string;
      renderError?: (error: Error) => ReactNode;
      macros?: { [key: string]: string };
    }
  
    export const BlockMath: FunctionComponent<BlockMathProps>;
  }
  