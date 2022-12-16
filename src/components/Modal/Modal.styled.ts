import tw, { css, styled } from 'twin.macro';

interface ModalProps {
  width?: number;
  height?: number;
}
export const Underlay = tw.div`
    fixed
    inset-0
    flex
    items-center
    justify-center
    z-50
`;
export const ModalBg = styled.div(() => [
  tw`
    absolute
    inset-0
    bg-gray-500
    opacity-75
    z-0
  `,
  css`
    @keyframes modalBgAnimation {
      from {
        ${tw`opacity-0`}
      }
      to {
        ${tw`opacity-75`}
      }
    }
    animation-name: modalBgAnimation;
    animation-duration: 0.3s;
  `,
]);

export const ModalContainer = styled.div(({ width, height }: ModalProps) => [
  tw`
      z-50
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
    height,
  }),
  css`
    @keyframes modalContainerAnimation {
      from {
        opacity: 0.6;
        transform: translateY(50px) scale(0.9);
      }
    }
    animation-delay: 0.1;
    animation-name: modalContainerAnimation;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
  `,
]);
