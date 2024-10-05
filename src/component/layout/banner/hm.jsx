import React from "react";
import BannerSlide from "./BannerSlide";

const banners = [
  { imageUrl: "/path/to/image1.jpg", alt: "Banner 1", title: "Welcome to Our Blog", description: "Explore the latest updates" },
  { imageUrl: "/path/to/image2.jpg", alt: "Banner 2", title: "Stay Updated", description: "Get the latest tech insights" },
  { imageUrl: "/path/to/image3.jpg", alt: "Banner 3", title: "Join the Community", description: "Connect and learn with others" },
];

const HomePage = () => {
  return (
    <div>
      <BannerSlide banners={banners} />
      {/* Other sections of the blog */}
    </div>
  );
};

export default HomePage;