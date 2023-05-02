import tw from 'twin.macro';

export const Container = tw.div`
    inline-flex
    flex-row
    bg-inherit
    justify-center
`;

export const InputNumberButton = tw`
    bg-gray-700/5
    hover:bg-gray-700/10
    p-1
    h-auto
    w-auto
    min-w-fit
`;

export const Input = tw.input`
    w-[2.5rem]
    px-2
    appearance-none
    border-none
    outline-none
    bg-transparent
    text-right
    text-lg
`;
