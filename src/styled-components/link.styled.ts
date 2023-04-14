import tw, { styled } from 'twin.macro';

export const Link = styled.a(() => [
  tw`
        text-blue-600
        text-base
        no-underline
        cursor-pointer
        hover:underline
    `,
]);
