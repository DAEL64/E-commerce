import gadgets from "../assets/gadgets.svg";
import laptop from "../assets/laptop.svg";
import camera from "../assets/camera.svg";
import mobile from "../assets/mobile.svg";
import audio from "../assets/audio.svg";
import gamepad from "../assets/gaming.svg";
import "../styles/aside.css"
import tv from "../assets/TV.svg";
import tablet from "../assets/tablet.svg";

export const asideRoutes = [
    {
        to: "/categories/mobile",
        img: mobile,
        title: "მობილურები"
    },
    {
        to: "/categories/tablets",
        img: tablet,
        title: "ტაბები"
    },
    {
        to: "/categories/laptops",
        img: laptop,
        title: "ლეპტოპები | IT"
    },
    {
        to:"/categories/gadgets",
        img: gadgets,
        title: "სმარტ გაჯეტები"
    },
    {
        to:"/categories/audio",
        img: audio,
        title: "აუდიო სისტემა"
    },
    {
        to:"/categories/gaming",
        img: gamepad,
        title: "Gaming"
    },
    {
        to:"/categories/monitors" ,
        img: tv ,
        title: "TV | მონიტორები" ,
    },
    {
        to: "/categories/photo",
        img: camera,
        title: "ფოტო | ვიდეო"
    }
]