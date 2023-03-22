import { Swiper, SwiperSlide } from 'swiper/react';
import tw, { css, styled, theme } from 'twin.macro';

export const StyledSwiper = styled(Swiper)(() => [
  css`
    --swiper-theme-color: ${theme('colors.blue.600')};
  `,
  tw`
        h-full
        w-full
    `,
]);

export const StyledSwiperSlide = styled(SwiperSlide)(() => [
  tw`
        relative
        w-full
        h-full
        flex
        items-center
        justify-center
        pointer-events-none
        select-none
    `,
]);
