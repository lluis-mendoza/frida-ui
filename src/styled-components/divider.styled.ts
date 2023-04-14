import { css, styled, theme } from 'twin.macro';

export type DividerType = 'dashed' | 'dotted' | 'solid' | 'rounded';

interface DividerProps {
  vertical?: boolean;
  type?: DividerType;
  width?: number;
}
export const Divider = styled.hr(
  ({ vertical = false, type = 'solid', width = 1 }: DividerProps) => [
    vertical &&
      css`
        border-right: ${width}px ${type} ${theme('colors.gray.300')};
      `,
    !vertical &&
      css`
        border-bottom: ${width}px ${type} ${theme('colors.gray.300')};
      `,
  ]
);
