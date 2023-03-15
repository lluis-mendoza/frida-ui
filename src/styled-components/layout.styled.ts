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

export const Fill = tw.div`
  flex-1
  overflow-auto
`;

export const Wrapper = tw.div`
  flex
  flex-wrap
`;
