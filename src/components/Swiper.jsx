import { Swiper, SwiperSlide } from "swiper/react";
import { useCartStore } from "../stores/useCartStore";

// import required modules
import { Navigation } from "swiper/modules";
import SwiperArrows from "./SwiperArrows";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import myStyles from "../styles/swiper.module.css";

export default function MySwiper({ data }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const navigate = useNavigate();

  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={10}
      centeredSlides={false}
      modules={[Navigation]}
      className="swiper"
    >
      {data.map((product) => {
        return (
          <SwiperSlide key={product.id}>
            <div className="">
              <button
                className="cursor-pointer hover:scale-101"
                onClick={() => navigate(`/item/${product.id}`)}
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-52 w-52 object-cover"
                  />
                </div>
                <div className="h-1/2 flex flex-col">
                  <div className="text-sm w-1/2 py-4">
                    <p className="bg-gradient-to-br md:line-clamp-1 md:py-1 lg:line-clamp-0 lg:py-2 from-indigo-600 to-indigo-700 text-white px-1 rounded-[18px]">
                      {product.category}
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="text-black font-[500] text-[1rem]">
                      <p>{product.price} ₾</p>
                    </div>
                    <div className="text-black font-[500] text-[9px] flex">
                      <span className="flex items-center">
                        <p className="pr-1">რეიტინგი:</p>
                        <p className="text-main-color flex items-center pr-0.5">
                          {product.rating.rate}
                        </p>
                        <p className="text-main-color flex items-center">
                          <Star className="w-[9px] h-[9px] text-indigo-400" fill="indigo" />
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="text-[0.8rem] flex justify-start line-clamp-2 items-start h-10">
                    <span className="w-full text-left line-clamp-2">
                      {product.title}
                    </span>
                  </div>
                </div>
              </button>
              <div className="flex py-3 gap-1 w-full">
                <button
                  className="w-full bg-indigo-600 rounded-xl p-2 text-white font-medium cursor-pointer hover:bg-indigo-700 transition-transform duration-200"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      <SwiperArrows />
    </Swiper>
  );
}
