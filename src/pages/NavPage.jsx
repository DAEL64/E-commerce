import { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useProductStore } from "../stores/useProductStore";
import { useNavigate } from "react-router-dom";
import { Earth } from "lucide-react";

export default function NavPage() {
  const { data, loading, error, fetchPosts } = useProductStore();

  const categories = [...new Set(data.map((product) => product.category))];
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) {
    return (
      <div className="mx-auto w-full flex items-center">
        <div className="text-2xl text-gray-800">
          <p>დაფიქსირდა შეცდომა</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full mt-10">
        <div className="w-[80%] mx-auto">
          <div className="w-full flex items-center gap-2 sm:text-3xl text-2xl font-bold text-gray-800">
            <Earth className="text-indigo-600"/>
            <p>ნავიგაცია</p>
          </div>
          <div className="w-full flex items-center justify-center mt-6">
            {categories.map((category) => {
              return (
                <div className="w-full mt-4" key={category}>
                  <button 
                  onClick={() => navigate(`/categories/${category}`)}
                  className="flex w-[90%] font-medium text-[16px] justify-center border-1 border-gray-200 p-2.5 hover:bg-indigo-500 hover:text-white transition-all text-gray-800 rounded-md">
                    {category}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
