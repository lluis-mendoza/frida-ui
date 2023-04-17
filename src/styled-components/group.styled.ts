import tw, { styled } from 'twin.macro';

export const Group = styled.div(() => [
  tw`
        inline-flex
        flex-row
        w-full
        h-full
        [&>*]:(border-y-2 border-x-[1px] border-gray-500 border-solid rounded-none first:(rounded-l border-l-2) last:(rounded-r border-r-2) transform-none)!
    `,
]);
