import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import { useSwiper } from 'swiper/react'

export default function SwiperArrows() {
    const swiper = useSwiper()

    return (
        <div className="flex items-center gap-4 mt-4">
            <button
                onClick={() => swiper.slidePrev()}
                className="p-2 rounded-full hover:bg-indigo-400 hover:text-white transition-colors duration-200 disabled:opacity-50 absolute top-[44%] z-60 bg-main-color text-black"
                disabled={!swiper}
            >
                <ArrowLeft size={20} />
            </button>
            
            <button
                onClick={() => swiper.slideNext()}
                className="p-2 rounded-full hover:bg-indigo-400 transition-colors hover:text-white duration-200 disabled:opacity-50 absolute right-[1px] z-60 top-[44%] bg-main-color text-black"
                disabled={!swiper}
            >
                <ArrowRight size={20} />
            </button>
        </div>
    )
}