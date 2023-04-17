import tw, { styled } from 'twin.macro';

interface StyledDividerProps {
  horizontal: boolean;
}
export const StyledDivider = styled.div(
  ({ horizontal }: StyledDividerProps) => [
    tw`
        flex
        flex-row
        items-center
        my-4
        self-stretch
        whitespace-nowrap
        [&:not(:empty)]:gap-4
    `,
    horizontal &&
      tw`my-0 mx-4 flex-col w-4 before:(flex-grow w-[0.125rem] h-full bg-gray-300) after:(flex-grow w-[0.125rem] h-full bg-gray-300)`,
    !horizontal &&
      tw`h-4 before:(flex-grow h-[0.125rem] w-full bg-gray-300) after:(flex-grow h-[0.125rem] w-full bg-gray-300)`,
  ]
);
