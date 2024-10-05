import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./banner.css"
import { Navigation, Pagination, Autoplay } from "swiper/modules";  // Cập nhật import cho modules mới

const HomePage = () => {
  const banners = [
    { imageUrl: "/images/1.jpg", alt: "Banner 1", title: "Welcome to Our Blog", description: "Explore the latest updates" },
    { imageUrl: "/images/2.png", alt: "Banner 2", title: "Stay Updated", description: "Get the latest tech insights" },
    { imageUrl: "/images/3.jpg", alt: "Banner 3", title: "Join the Community", description: "Connect and learn with others" },
  ];

  return (
    <div>
      <div className="banner-slide">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
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

      {/* Other sections of the blog */}
    </div>
  );
};

export default HomePage;
