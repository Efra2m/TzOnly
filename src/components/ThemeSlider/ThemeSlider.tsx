import React from "react";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Pagination]);

interface ThemeSliderProps {
  categories: { name: string; years: number[] }[];
  onSelectTheme: (theme: { name: string; years: number[] }) => void;
}

const ThemeSlider: React.FC<ThemeSliderProps> = ({
  categories,
  onSelectTheme,
}) => {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => {
        const index = swiper.realIndex;
        onSelectTheme(categories[index]);
      }}
      style={{ padding: "20px 0", bottom: "-40px " }}
    >
      {categories.map((category) => (
        <SwiperSlide key={category.name}>
          <div
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ThemeSlider;
