import tw, { css, styled } from 'twin.macro';

export const Underlay = tw.div`
    fixed
    inset-0
`;
interface PopoverProps {
  width?: number;
}
export const StyledPopover = styled.div(({ width }: PopoverProps) => [
  tw`
    z-10
    shadow-lg
    border
    border-gray-300
    bg-white
    rounded-md
    border-solid
    flex
    flex-col
    items-center 
    `,
  css({
    width,
  }),
]);
