import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';

import { StyledSwiper, StyledSwiperSlide } from './Carousel.styled';
import CarouselImage from './CarouselImage';

export interface SlideData {
  data?: string;
}
export interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  return (
    <StyledSwiper
      loop
      autoplay={false}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {slides.map((slide, index) => (
        <StyledSwiperSlide key={`slide_${index}`}>
          <CarouselImage data={slide.data} />
        </StyledSwiperSlide>
      ))}
    </StyledSwiper>
  );
}
