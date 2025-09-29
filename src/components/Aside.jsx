import React from "react";
import { useEffect } from "react";
import gadgets from "../assets/gadgets.svg";
import laptop from "../assets/laptop.svg";
import camera from "../assets/camera.svg";
import mobile from "../assets/mobile.svg";
import audio from "../assets/audio.svg";
import gamepad from "../assets/gaming.svg";
import tv from "../assets/TV.svg";
import tablet from "../assets/tablet.svg";
import { useMenuHook } from "../hooks/useMenuHook.js";
import { useProductStore } from "../stores/useProductStore.js";
import { Link, useParams } from "react-router-dom";

export default function aside() {
  const { onOpen, onClose, isOpen } = useMenuHook();

  const { fetchPosts, data, loading, error } = useProductStore();

  const { id } = useParams();

  useEffect(() => {
    fetchPosts();
    console.log(data);
  }, []);

  return (
    <div className="w-[22%] py-3.5">
      <ul className="shadow-xl px-1 py-3 flex flex-col gap-3 rounded-[20px] h-[100%] relative w-full">
        <Link
          to="/categories/:id"
          className="border-b p-[4.5px] pb-2 w-full border-gray-200 flex gap-2 text-[12px] font-[600] text-gray-400  cursor-pointer hover:bg-gray-100"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <img src={mobile} alt="" className="w-[20px]" />
          მობილურები
        </Link>
        <Link
          to="/categories/:id"
          className="border-b p-[4.5px] pb-2 w-full border-gray-200 flex gap-2 text-[12px] font-[600] text-gray-400  cursor-pointer hover:bg-gray-100"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <img src={tablet} alt="" className="w-[20px]" />
          ტაბები
        </Link>
        <Link
          to="categories/:id"
          className="border-b p-[4.5px] pb-2 w-full border-gray-200 flex gap-2 text-[12px] font-[600] text-gray-400  cursor-pointer hover:bg-gray-100"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <img src={laptop} alt="" className="w-[20px]" />
          ლეპტოპები | IT
        </Link>
        <Link
          to="categories/:id"
          className="border-b p-[4.5px] pb-2 w-full border-gray-200 flex gap-2 text-[12px] font-[600] text-gray-400  cursor-pointer hover:bg-gray-100"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <img src={gadgets} alt="" className="w-[20px]" />
          სმარტ გაჯეტები
        </Link>
        <Link
          to="categories/:id"
          className="border-b p-[4.5px] pb-2 w-full border-gray-200 flex gap-2 text-[12px] font-[600] text-gray-400  cursor-pointer hover:bg-gray-100"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <img src={audio} alt="" className="w-[20px]" />
          აუდიო სისტემა
        </Link>
        <Link
          to="categories/:id"
          className="border-b p-[4.5px] pb-2 w-full border-gray-200 flex gap-2 text-[12px] font-[600] text-gray-400  cursor-pointer hover:bg-gray-100"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <img src={gamepad} alt="" className="w-[20px]" />
          Gaming
        </Link>
        <Link
          to="categories/:id"
          className="border-b p-[4.5px] pb-2 w-full border-gray-200 flex gap-2 text-[12px] font-[600] text-gray-400  cursor-pointer hover:bg-gray-100"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <img src={tv} alt="" className="w-[20px]" />
          TV | მონიტორები
        </Link>
        <Link
          to="categories/:id"
          className="border-gray-300 px-[4.5px] py-[3px] flex gap-2 text-[12px] font-medium text-gray-400 cursor-pointer hover:bg-gray-100"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <img src={camera} alt="" className="w-[20px]" />
          ფოტო | ვიდეო
        </Link>
        {isOpen && (
          <div
            className="transition-all duration-300 ease-out top-3 left-55 absolute shadow-3xl z-50 bg-white rounded-r-[15px] rounded-b-[15px] min-w-[900px] flex flex-col transform-gpu animate-gentleFadeIn"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            style={{
              animation: "gentleFadeIn 0.3s ease-out forwards",
            }}
          >
            {data.map((product, index) => {
              return (
                <div
                  key={product.id}
                  className="flex w-full z-0 animate-subtleAppear"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: "both",
                  }}
                >
                  {product.category}
                </div>
              );
            })}

            <style jsx>{`
              @keyframes gentleFadeIn {
                0% {
                  opacity: 0;
                  transform: scale(0.98);
                }
                100% {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              @keyframes subtleAppear {
                0% {
                  opacity: 0;
                  transform: translateY(8px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              .animate-gentleFadeIn {
                animation: gentleFadeIn 0.3s ease-out forwards;
              }

              .animate-subtleAppear {
                animation: subtleAppear 0.4s ease-out forwards;
              }
            `}</style>
          </div>
        )}
      </ul>
    </div>
  );
}
