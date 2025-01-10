import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Slider from "./Slider";
import { Fade } from "react-awesome-reveal";
// import { useEffect } from 'react';
// useEffect(() => {
//     fetchData
// }, [])
// const fetchData = async() => {
//     const response = await fetch('/review.json')
//     const data = await response.json()
//     console.log(data);

// }
const slideData = [
  {
    userName: "John Doe",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    reviewText: "Amazing service! Highly recommended.",
  },
  {
    userName: "Jane Smith",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    reviewText: "Good experience, but there's room well.",
  },
  {
    userName: "Alice Johnson",
    profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 3,
    reviewText: "Average service, nothing exceptional.",
  },
  {
    userName: "Mark Brown",
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    reviewText: "Excellent! I will definitely come back again.",
  },
  {
    userName: "Emily Davis",
    profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 4,
    reviewText: "Very satisfied with the overall experience.",
  },
];
export default function Carousel() {
  return (
    <div  className="container mx-auto px-5 py-20 bg-gradient-to-r from-indigo-500 to-purple-400 ">
      <h1 className="text-white font-bold text-3xl text-center pb-5">Customer Review</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={50}
        // effect="fade"
        // fadeEffect = { {crossFade: true} }
        breakpoints={{
              // When the window is >= 640px
            540:{
             slidesPerView : 1,
             spaceBetween : 20,
            },
            340:{
             slidesPerView : 1,
             spaceBetween : 20,
            },
            640:{
             slidesPerView : 1,
             spaceBetween : 20,
            },
            768:{
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1024:{
                slidesPerView: 3,
                spaceBetween: 50
            }

        }}
        loop={true}
        autoplay= {{
            delay:5000,
            disableOnInteraction:false
        }}
        scrollbar={false}
        pagination={{
          clickable: true,
        }}
        
        modules={[Pagination, Autoplay, EffectFade]}
        className="mySwiper"
      >
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        {slideData.map((slide, index) => (
          < SwiperSlide key={index}>
            <Fade cascade delay={100}>
            <Slider
              userName={slide.userName}
              rating={slide.rating}
              profileImage={slide.profileImage}
              reviewText={slide.reviewText}
            ></Slider>
            </Fade>
          </ SwiperSlide>
        ))}
        </div>
      </Swiper>
    </div>
  );
}
