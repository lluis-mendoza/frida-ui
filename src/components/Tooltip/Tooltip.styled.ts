import tw, { styled } from 'twin.macro';

export const TooltipContainer = styled.div(() => [
  tw`
        relative
        inline-block
    `,
  tw`
        before:(
            content-[attr(data-tip)]
        )
    `,
]);
