import React, { useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./Slider.scss";

SwiperCore.use([Navigation, Pagination]);

export interface IEvent {
  [theme: string]: {
    [year: number]: string;
  };
}

interface TimelineSliderProps {
  years: number[];
  events: IEvent;
  selectedTheme: string;
  pagination?: boolean;
  navigation?: boolean;
}

const Slider: React.FC<TimelineSliderProps> = ({
  years,
  events,
  selectedTheme,
  navigation = true,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleNext = () => {
    if (swiperInstance && !isEnd) {
      swiperInstance.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperInstance && !isBeginning) {
      swiperInstance.slidePrev();
    }
  };

  const onSlideChangeHandler = (swiper: SwiperCore) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="timeline-slider">
      <div className="button-container">
        {navigation && (
          <>
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
              <img
                src={process.env.PUBLIC_URL + "/img/Vector2.svg"}
                alt="Next"
              />
            </button>
          </>
        )}
      </div>
      <Swiper
        key={selectedTheme}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={onSlideChangeHandler}
        direction="horizontal"
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          1200: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 70,
          },
          820: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 110,
          },
          650: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
          },
          512: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 50,
          },
        }}
        loop={false}
      >
        {years.map((year) => {
          const eventForYear =
            events[selectedTheme] && events[selectedTheme][year]
              ? events[selectedTheme][year]
              : "Нет событий";
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
