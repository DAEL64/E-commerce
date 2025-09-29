import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useCartStore } from "../stores/useCartStore";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/swiper.css";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import SwiperArrows from "./SwiperArrows";
import { Shuffle, Star } from "lucide-react";

export default function MySwiper({ data }) {

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <Swiper
        slidesPerView={6}
        spaceBetween={0}
        centeredSlides={false}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data.map((product) => {
          return (
            <SwiperSlide key={product.id} className="flex flex-col relative">
              <div className="w-xs h-48 overflow-hidden rounded-lg py-2">
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="text-[12px] py-4">
                <p className="bg-main-color text-white px-1 py-3 rounded-[18px]">
                  {product.category}
                </p>
              </div>
              <div className="text-black font-[500] text-[16px]">
                <p>{product.price} ₾</p>
              </div>
              <div className="text-black font-[500] text-[9px] flex">
                <span className="flex items-center">
                  {" "}
                  <p className="pr-1">რეიტინგი:</p>
                  <p className="text-main-color flex items-center pr-0.5">
                    {product.rating.rate}
                  </p>
                  <p className="text-main-color flex items-center">
                    <Star className="w-[9px] h-[9px]" />
                  </p>
                </span>
              </div>
              <div className="font-medium text-[14px] overflow-hidden w-[160px] h-10">
                <p>{product.title}</p>
              </div>
              <div className="flex py-3 gap-1 w-[160px]">
                <button
                  className="w-full bg-indigo-500 rounded-[8px] p-1 text-white font-medium cursor-pointer hover:scale-105 hover:bg-indigo-600 transition-transform duration-200"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </SwiperSlide>
          );
        })}
        <SwiperArrows />
      </Swiper>
    </>
  );
}