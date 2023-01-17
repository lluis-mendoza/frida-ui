import tw, { styled } from 'twin.macro';

export const Row = styled.div(() => [
  tw`
        flex
        flex-row
    `,
]);

export const Col = styled.div(() => [
  tw`
        flex
        flex-col
    `,
]);
