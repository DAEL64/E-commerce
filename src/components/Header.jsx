import { Link, useNavigate } from "react-router-dom";
import flag from "../assets/flag.png";
import mainLogo from "../assets/customLogo.png";
import { useCartHook } from "../hooks/useCartHook";
import { useCartStore } from "../stores/useCartStore";
import { X, Search, ShoppingBag, User, Phone, Menu } from "lucide-react";

export default function Header() {
  const { onOpen, onClose, isOpen } = useCartHook();
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const navigate = useNavigate();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const topLinks = [
    { text: "სავაჭრო პოლიტიკა", href: "/" },
    { text: "განვადება", href: "/" },
    { text: "კარიერა", href: "/" },
    { text: "Trade In", href: "/" },
    { text: "ფილიალები", href: "/" },
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-sm">*7777</p>
              <p className="text-xs text-white/80">+995 (32) 7 77 77 77</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {topLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                {link.text}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <div className="bg-white/20 w-[50px] h-[40px] items-center backdrop-blur-sm rounded-lg p-2 hover:bg-white/30 transition-all duration-300 cursor-pointer flex justify-center">
              <img
                src={flag}
                alt="flag"
                className="w-7 h-5 rounded object-cover hover:w-8 hover:h-6 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            <Link to="/" className="flex-shrink-0 group">
              <img
                src={mainLogo}
                alt="main logo"
                className="h-10 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="flex items-center gap-6 flex-grow">
              <Link to="/navigation">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2">
                  <Menu className="w-4 h-4" />
                  ნავიგაცია
                </button>
              </Link>

              <div className="flex-grow max-w-2xl relative group">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="რას ეძებთ?"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/10 to-purple-600/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-300 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2 relative group"
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                  onClick={() => navigate("/basket")}
                >
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  კალათა
                </button>

                {isOpen && (
                  <div
                    className="absolute top-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 min-w-[400px] max-w-[500px] z-50 overflow-hidden animate-dropDown"
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                  >
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                      <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        კალათა ({totalItems} ნივთი)
                      </h3>
                      {totalPrice > 0 && (
                        <p className="text-white/80 text-sm mt-1">
                          ჯამური ღირებულება: {totalPrice.toFixed(2)} ₾
                        </p>
                      )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {cartItems.length === 0 ? (
                        <div className="p-8 text-center">
                          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 text-lg font-medium">
                            კალათა ცარიელია
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            დაამატეთ პროდუქტები საყიდლად
                          </p>
                        </div>
                      ) : (
                        <>
                          {cartItems.map((item, index) => (
                            <div
                              key={item.id}
                              className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300 group"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>

                                <div className="flex-grow">
                                  <h4 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                                    {item.title}
                                  </h4>
                                  <div className="flex items-center justify-between">
                                    <span className="text-indigo-600 font-bold">
                                      {item.price} ₾
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                      რაოდენობა: {item.quantity}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}

                          <div className="p-4 bg-gray-50">
                            <button
                              onClick={() => navigate("/basket")}
                              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                            >
                              ყიდვის დასრულება
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-300 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2 group">
                <User className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" />
                შესვლა
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dropDown {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-dropDown {
          animation: dropDown 0.3s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
