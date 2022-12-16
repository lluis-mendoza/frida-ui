import 'twin.macro';

import { css as cssImport } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import styledImport from '@emotion/styled';

// Allow interpolation: css`${MyStyledComponent}:hover & { //... }`
type Interpolation = ObjectInterpolation<undefined>;

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport | Interpolation;
  const css: typeof cssImport | Interpolation;
}
declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module 'react' {
  // The tw and css prop
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}
