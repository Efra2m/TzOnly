import React, { useRef, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./Slider.scss";

SwiperCore.use([Navigation, Pagination]);

interface TimelineSliderProps {
  years: number[];
  events: Record<string, Record<number, string>>;
  selectedTheme: string;
  pagination?: boolean;
  navigation?: boolean;
}

const Slider: React.FC<TimelineSliderProps> = ({
  years,
  events,
  selectedTheme,
  pagination = true,
  navigation = true,
}) => {
  const currentEvents = events[selectedTheme] || {};
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="timeline-slider">
      {navigation && (
        <div className="button-container">
          <button
            className="customPrev"
            onClick={handlePrev}
            style={{ visibility: isBeginning ? "hidden" : "visible" }}
            disabled={isBeginning}
          >
            <img
              className="flippedArrow"
              src={process.env.PUBLIC_URL + "/img/Vector2.svg"}
              alt="Back"
            />
          </button>
          <button
            className="customNext"
            onClick={handleNext}
            style={{ visibility: isEnd ? "hidden" : "visible" }}
            disabled={isEnd}
          >
            <img src={process.env.PUBLIC_URL + "/img/Vector2.svg"} alt="Next" />
          </button>
        </div>
      )}
      <Swiper
        ref={swiperRef}
        direction="horizontal"
        slidesPerView={window.innerWidth < 820 ? 1 : 3}
        slidesPerGroup={window.innerWidth < 820 ? 1 : 3}
        breakpoints={{
          1200: {
            slidesPerView: 3,
            spaceBetween: 70,
          },
          820: {
            slidesPerView: 2,
            spaceBetween: 110,
          },
          650: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          512: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        loop={false}
        pagination={
          pagination
            ? {
                clickable: true,
                renderBullet: (index, className) => {
                  if (index >= 3) return "";
                  return `<span class="${className}"></span>`;
                },
              }
            : false
        }
        allowSlideNext={!isEnd}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {years.map((year) => {
          const eventForYear = currentEvents[year] || "Нет событий";
          return (
            <SwiperSlide key={year}>
              <h3>{year}</h3>
              <p>{eventForYear}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
