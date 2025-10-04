import { useEffect, useState } from "react";
import "../styles/aside.css";
import { asideRoutes } from "./asideLinks.js";
import { useProductStore } from "../stores/useProductStore.js";
import { Link, useParams } from "react-router-dom";

export default function aside() {
  const [isOpen, setIsOpen] = useState(false);

  const { fetchPosts, data, loading, error } = useProductStore();

  const categories = [...new Set(data.map((product) => product.category))];

  const titles = [...new Set(data.map((product) => product.title))];

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-1/5 md:hidden lg:block rounded-xl border-1 hover:rounded-none transition-all duration-300 ease-in-out border-gray-500/10">
      <ul className="shadow-xl rounded-xl hover:rounded-none transition-all duration-300 ease-in-out flex flex-col h-full relative w-full">
        {asideRoutes.map((route) => (
          <div className="w-full flex justify-center items-center flex-col h-full">
            <Link
              to={route.to}
              className="px-2.5 h-full items-center w-full border-gray-200 flex gap-2 text-[12px] font-[600] text-gray-400  cursor-pointer hover:bg-gray-100"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <img src={route.img} alt={route.title} className="w-5" />
              <span>{route.title}</span>
            </Link>
            <div className="w-14/15 border-b-1 border-gray-500/20"></div>
          </div>
        ))}
        {isOpen && (
          <div
            className="transition-all min-h-full justify-around max-h-6/5 overflow-scroll border-gray-500/10 shadow-md duration-300 ease-out top-0 left-full absolute shadow-3xl z-30 bg-white rounded-r-xl min-w-svh flex animate-gentleFadeIn"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{
              animation: "gentleFadeIn 0.1s ease-out forwards",
            }}
          >
            {categories.map((category) => {
              return (
                <div
                  key={category.id}
                  className="w-full z-0 animate-gentleFadeIn animate-subtleAppear p-2"
                >
                  <span className="text-lg font-medium">{category}</span>
                  <span>
                    {data
                      .filter((product) => product.category === category)
                      .map((product) => {
                        return (
                          <div className="text-sm flex gap-3 w-full h-full" key={product.id}>
                            {product.title}
                          </div>
                        );
                      })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </ul>
    </div>
  );
}
