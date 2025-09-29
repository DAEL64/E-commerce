import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Slider from "./components/Slider.jsx";
import MySwiper from "./components/Swiper.jsx";
import { useProductStore } from "./stores/useProductStore.js";

function App() {
  const [count, setCount] = useState(0);

  const { data, loading, error, fetchPosts } = useProductStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="w-[100%] mx-auto flex flex-col items-center">
        <div className="w-[70%] flex justify-center gap-5">
          <Aside /> <Slider />
        </div>
        <div className="flex font-extrabold w-[70%] py-10">
          <h3>სულსწრაფი შეთავაზებები</h3>
        </div>
        <div className="w-[70%]">
          <MySwiper data={data} />
        </div>
        <div className="w-[70%] flex justify-center  py-10 overflow-hidden">
          <img src="https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2Ff53b46f7-48e5-4545-9688-315dbc5c1d3f.jpeg&w=1200&q=100" className="w-full rounded-xl"></img>
        </div>
        <div className="w-[70%] py-10">
          <MySwiper data={data} />
        </div>
      </div>
    </>
  );
}

export default App;