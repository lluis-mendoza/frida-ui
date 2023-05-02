import Split from 'react-split';
import tw, { css, styled } from 'twin.macro';

export const StyledSplit = styled(Split)(() => [
  tw`
        relative
        flex
        flex-row
        h-full
        `,
  css`
    .gutter {
      ${tw`
            relative
            px-3
            cursor-col-resize
        `}
      &:after {
        ${tw`
            content-['']
            absolute
            h-full
            w-[0.125rem]
            bg-slate-300
            rounded-lg
            left-1/2
            translate-x-1/2
          `}
      }
    }
  `,
]);
