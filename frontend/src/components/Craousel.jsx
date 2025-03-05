import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  console.log(img1);

  const slides = [
    {
      type: "image",
      src: img1,
      alt: "BusBuddy Event",
    },
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center bg-gray-100"
          >
            {slide.type === "image" ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-[500px] object-cover"
              />
            ) : (
              <video
                className="w-full h-[500px] object-cover"
                autoPlay
                muted
                loop
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for Swiper navigation and pagination */}
      <style jsx>{`
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: white;
          background-color: rgba(0, 0, 0, 0.4);
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        :global(.swiper-button-next:hover),
        :global(.swiper-button-prev:hover) {
          background-color: rgba(0, 0, 0, 0.6);
          transform: scale(1.1);
        }

        :global(.swiper-button-next:after),
        :global(.swiper-button-prev:after) {
          font-size: 18px;
          font-weight: bold;
        }

        :global(.swiper-pagination-bullet) {
          background-color: white;
          opacity: 0.7;
          width: 10px;
          height: 10px;
          margin: 0 5px;
        }

        :global(.swiper-pagination-bullet-active) {
          background-color: white;
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        @media (max-width: 768px) {
          :global(.swiper-button-next),
          :global(.swiper-button-prev) {
            width: 36px;
            height: 36px;
          }

          :global(.swiper-button-next:after),
          :global(.swiper-button-prev:after) {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          :global(.swiper-button-next),
          :global(.swiper-button-prev) {
            width: 30px;
            height: 30px;
          }

          :global(.swiper-button-next:after),
          :global(.swiper-button-prev:after) {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;
