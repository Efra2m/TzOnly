import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Timeline.scss";
import { event } from "./eventsData";
import Slider from "../Slider/Slider";
import { IEvent } from "./eventsData";
import TimelineControls from "../TimelineControls/TimelineControls";

interface CategoryData {
  name: string;
  years: number[];
}

interface TimelineProps {
  categories: CategoryData[];
}

const Timeline: React.FC<TimelineProps> = ({ categories }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const totalCategories = categories.length;
  const [events, setEvents] = useState<IEvent>(event);
  const currentCategory = categories[activeCategoryIndex];
  const pointRefs = useRef<HTMLDivElement[]>([]);
  const anglesRef = useRef<{ [key: number]: number }>({});
  const tweenRefs = useRef<{ [index: number]: gsap.core.Tween }>({});
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setActiveCategoryIndex((prevIndex) => (prevIndex + 1) % totalCategories);
  };

  const handlePrev = () => {
    setActiveCategoryIndex((prevIndex) =>
      prevIndex === 0 ? totalCategories - 1 : prevIndex - 1
    );
  };

  console.log("Active Category", currentCategory.name);
  console.log("Events", events[currentCategory.name]);

  const animatePointsPosition = () => {
    const containerSize = 530;
    const center = containerSize / 2;
    const radius = center;
    const angleStep = (2 * Math.PI) / totalCategories;
    const fixedAngle = -Math.PI / 3;

    pointRefs.current.forEach((point, index) => {
      const newAngle = fixedAngle + (index - activeCategoryIndex) * angleStep;
      let oldAngle = anglesRef.current[index] ?? newAngle;

      let delta = newAngle - oldAngle;
      if (Math.abs(delta) > Math.PI) {
        oldAngle += delta < 0 ? -2 * Math.PI : 2 * Math.PI;
      }

      tweenRefs.current?.[index]?.kill();
      const tween = gsap.to(
        { angle: oldAngle },
        {
          duration: 1,
          angle: newAngle,
          ease: "power3.out",
          onUpdate: function () {
            const currentAngle = this.targets()[0].angle;
            const x = center + radius * Math.cos(currentAngle);
            const y = center + radius * Math.sin(currentAngle);
            gsap.set(point, {
              x: x - point.clientWidth / 2,
              y: y - point.clientHeight / 2,
            });
          },
          onComplete: () => {
            anglesRef.current[index] = newAngle;
          },
        }
      );

      tweenRefs.current = {
        ...tweenRefs.current,
        [index]: tween,
      };
    });
  };
  const handlePointClick = (index: number) => {
    setActiveCategoryIndex(index);
  };

  useEffect(() => {
    animatePointsPosition();
  }, [activeCategoryIndex, totalCategories]);

  const firstYear = categories[activeCategoryIndex].years[0];
  const secondYear =
    categories[activeCategoryIndex].years[
      categories[activeCategoryIndex].years.length - 1
    ];

  console.log(currentCategory.name.toLowerCase());

  return (
    <div className="timeline">
      <div className="timeline-container">
        <div className="timeline-circle">
          <h1 className="title">
            <span>Исторические</span>
            <span>даты</span>
          </h1>
          <div className="year_container">
            <span className="year">{firstYear}</span>
            <span className="year">{secondYear}</span>
          </div>

          {pageWidth > 820 ? (
            categories.map((category, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) pointRefs.current[index] = el;
                }}
                className={`timeline-point ${
                  index === activeCategoryIndex ? "active" : ""
                }`}
                onClick={() => handlePointClick(index)}
              >
                <span className="active-index">{index + 1}</span>
              </div>
            ))
          ) : (
            <div className="pag_container">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className={`pag ${
                    index === activeCategoryIndex ? "active" : ""
                  }`}
                  onClick={() => handlePointClick(index)}
                ></span>
              ))}
            </div>
          )}
        </div>
        <div
          className="active-point"
          style={{
            position: "absolute",
            top: "288px",
            left: "906px",
          }}
        >
          {categories[activeCategoryIndex].name}
        </div>
      </div>
      {pageWidth > 820 ? (
        <>
          <span className="counter">
            0{activeCategoryIndex + 1}/0{totalCategories}
          </span>
          <TimelineControls
            handlePrev={handlePrev}
            handleNext={handleNext}
            activeCategoryIndex={activeCategoryIndex}
            totalCategories={totalCategories}
          />
          <div className="timeline-slider-container">
            <Slider
              years={currentCategory.years}
              events={events}
              selectedTheme={currentCategory.name}
              pagination={false}
            />
          </div>
        </>
      ) : (
        <>
          <div className="timeline-slider-container">
            <Slider
              years={currentCategory.years}
              events={events}
              selectedTheme={currentCategory.name}
            />
          </div>
          <div className="indent">
            <span className="counter">
              0{activeCategoryIndex + 1}/0{totalCategories}
            </span>
            <TimelineControls
              handlePrev={handlePrev}
              handleNext={handleNext}
              activeCategoryIndex={activeCategoryIndex}
              totalCategories={totalCategories}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default Timeline;
