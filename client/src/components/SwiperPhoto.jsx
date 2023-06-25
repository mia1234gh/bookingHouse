import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";

const SwiperPhoto = ({ place }) => {
  // 需要轮播展示图片函数
  return (
    <div className="mt-4 ">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img
            src={`http://localhost:5000/uploads/${place.photos[0]}`}
            alt="place_photo"
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`http://localhost:5000/uploads/${place.photos?.[1]}`}
            alt="place_photo"
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`http://localhost:5000/uploads/${place.photos?.[2]}`}
            alt="place_photo"
            className="w-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperPhoto;
