import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';
import '../../css/HomePage.css'
import './banner.css';
import { getBanners } from '@/pages/Posts/api';

export default function Banner() {
  const [banners, setBanners] = useState([]); 

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        setBanners(data); 
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    
    fetchBanners();
  }, []);

  return (
    <>
      <Swiper 
        className='banner swiper-container'
        spaceBetween={0}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {Array.isArray(banners) && banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img src={banner.new} alt={`Banner ${banner.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
