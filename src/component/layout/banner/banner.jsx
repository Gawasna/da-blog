import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./banner.css";

const banner = [
  { imageUrl: "http://https://i.ytimg.com/vi/KBgRUHG6pHU/maxresdefault.jpg", alt:"Banner 1", title:"Tes1", description: "none"},
  { imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXyxjZh3tZqJhDhNgYJzNRdDegf09kwZ9SIA&s", alt:"Banner 2", title:"Tes2", description: "none"},
  { imageUrl: "https://i.gzn.jp/img/2024/05/01/sawaratsuki-kawaii-logo/sawaratsuki_kawaii_uwu_logo_04_m.png", alt:"Banner 3", title:"Tes3", description: "none"},
]

const Banner = ({ banners }) => {
  return (
    <div className="banner-slide">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img src={banner.imageUrl} alt={banner.alt} className="slide-image" />
              <div className="slide-text">
                <h2>{banner.title}</h2>
                <p>{banner.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;