import React from "react";
import { useState } from "react";
import picOne from "../assets/zoomerSliderPic1.webp";
import picTwo from "../assets/zoomerSliderPic2.webp";
import picThree from "../assets/zoomerSliderPic3.webp";
import picFour from "../assets/zoomerSliderPic4.webp";
import picFive from "../assets/zoomerSliderPic5.webp";
import picSix from "../assets/zoomerSliderPic6.webp";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Slider() {
  const pics = [picOne, picTwo, picThree, picFour, picFive, picSix];

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextPic = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setIndex((prevIndex) => {
        return prevIndex === pics.length - 1 ? 0 : prevIndex + 1;
      });
      setIsTransitioning(false);
    }, 150);
  };

  const prevPic = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setIndex((prevIndex) => {
        return prevIndex === 0 ? pics.length - 1 : prevIndex - 1;
      });
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <>
    {pics.map((pic) => {
      
    })}
      <div className="flex-1 md:hidden lg:flex relative overflow-hidden">
        <div className="relative w-full">
          <img 
            src={pics[index]} 
            alt="" 
            className={`rounded-2xl w-full transition-all duration-300 ease-in-out transform ${
              isTransitioning ? 'scale-95' : 'scale-100'
            }`}
          />
        </div>
        
        <button 
          onClick={nextPic} 
          className="cursor-pointer absolute right-6 top-[45%] hover:bg-indigo-600 transition-all duration-200 hover:scale-110 hover:opacity-80 active:scale-95 bg-main-color p-2 rounded-full z-10"
          disabled={isTransitioning}
        >
          {/* <img src={sliderRight} alt="" /> */} <ArrowRight className=" text-white" />
        </button>
        
        <button 
          onClick={prevPic} 
          className="cursor-pointer absolute top-[45%] left-6 transition-all hover:bg-indigo-600 duration-200 hover:scale-110 hover:opacity-80 active:scale-95 bg-main-color p-2 rounded-full"
          disabled={isTransitioning}
        >
          {/* <img src={sliderLeft} alt="" /> */} <ArrowLeft className=" text-white" />
        </button>
        
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5 xl:bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full sm:bg-transparent">
          {pics.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setTimeout(() => {
                  setIndex(i);
                  setIsTransitioning(false);
                }, 150);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 xl:block sm:hidden ${
                i === index 
                  ? 'bg-white scale-110 shadow-lg w-5' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}