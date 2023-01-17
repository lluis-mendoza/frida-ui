import tw, { css, styled } from 'twin.macro';

export const StyledStatusLight = styled.div(() => [
  tw`
        flex
        flex-row
    `,
  css`
    &::before {
      content: '';

      ${tw`inline-block rounded-full h-2 w-2 my-auto mr-2`}
    }
  `,
]);

const statusLightColorGreen = tw`before:bg-green-500`;
const statusLightColorYellow = tw`before:bg-yellow-500`;
const statusLightColorBlue = tw`before:bg-blue-500`;
const statusLightColorRed = tw`before:bg-red-500`;
const statusLightColorGray = tw`before:bg-gray-500`;

export const StatusLightColors = {
  green: statusLightColorGreen,
  yellow: statusLightColorYellow,
  blue: statusLightColorBlue,
  red: statusLightColorRed,
  gray: statusLightColorGray,
};
