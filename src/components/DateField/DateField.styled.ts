import tw, { styled } from 'twin.macro';

interface DateSegmentWrapperProps {
  isEditable: boolean;
}
export const DateSegmentWrapper = styled.div(
  ({ isEditable }: DateSegmentWrapperProps) => [
    tw`
    px-[0.1]
    box-content
    tabular-nums
    text-right
    outline-none
    rounded-sm
    focus:bg-blue-500
    focus:text-white
    `,
    isEditable ? tw`text-inherit` : tw`text-gray-500`,
  ]
);

interface DateSegmentPlaceholderProps {
  isPlaceholder: boolean;
}
export const DateSegmentPlaceholder = styled.span(
  ({ isPlaceholder }: DateSegmentPlaceholderProps) => [
    tw`
    block
    w-full
    text-center
    italic
    text-gray-500
    group-focus:text-white`,
    !isPlaceholder &&
      tw`
        hidden
        h-0
        pointer-events-none
    `,
  ]
);
