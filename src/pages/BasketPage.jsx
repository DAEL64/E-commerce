import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";

export default function BasketPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleDecreaseQuantity = (item) => {
    handleQuantityChange(item.id, item.quantity - 1);
  };

  const handleIncreaseQuantity = (item) => {
    handleQuantityChange(item.id, item.quantity + 1);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4  lg:px-8 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-end gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              კალათა
            </h1>
          </div>
          {cartItems.length > 0 && (
            <p className="text-gray-600">
              სულ {totalItems} ნივთი • {totalPrice.toFixed(2)} ₾
            </p>
          )}
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                კალათა ცარიელია
              </h3>
              <p className="text-gray-600 mb-8">
                დაამატეთ თქვენი საყვარელი ნივთები მთავარი გვერდიდან
              </p>
              <Link
                to="/"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                ნივთების მოძიება
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex gap-5 justify-between">
              <div className="space-y-4 ">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 rounded-2xl h-27 shadow-sm border border-gray-100 p-3 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex w-full gap-4 justify-center">
                      {/* Product Image */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <div className="w-24 h-24  rounded-xl overflow-hidden ">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-[60%] object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow text-center sm:text-left">
                        <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <p className="text-xl font-bold text-indigo-600">
                            {item.price}{" "}
                            <span className="text-sm text-gray-500">₾</span>
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-center sm:justify-start gap-3">
                            <button
                              onClick={() => handleDecreaseQuantity(item)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500 mt-2">
                            სულ: {(item.price * item.quantity).toFixed(2)} ₾
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 items-center">
                        <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          შეძენა
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 flex items-center justify-center transition-all duration-200 group"
                          title="კალათიდან ამოშლა"
                        >
                          <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Card */}
              <div className="flex flex-col  justify-between w-120 max-h-74">
                <div className="h-full bg-gray-100 text-gray-700 roundedt--2xl shadow-xl">
                  <div className="">
                    <div className="text-center px-6 border-b-1 py-4 border-gray-300 my-4 pt-5 sm:text-left flex gap-3 items-center justify-between">
                      <p className="font-medium">სულ ღირებულება</p>
                      <p className="text-lg text-gray-700 font-bold">
                        {totalPrice.toFixed(2)} ₾
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center px-6 mb-4 justify-between">
                    <p className="font-medium">ნივთების რაოდენობა</p>
                    <p className="text-lg text-gray-700 font-bold">{totalItems} ნივთი</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="p-3 flex justify-center w-full bg-gray-100 shadow-xl rounded-b-2xl">
                    <button className="w-full sm:w-auto bg-gradient-to-br hover:from-indigo-600 hover:to-indigo-700 from-indigo-600 to-purple-700 text-gray-100 hover:text-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      ყველას შეძენა
                    </button>
                  </div>
                </div>

                {/* Clear Cart Button */}
                <div className="flex justify-center w-full">
                  <div className="mt-4 py-2 border-t rounded-lg items-center hover:text-gray-300 hover:scale-105 transition-transform duration-300 border-indigo-300/30 w-[80%] flex justify-center bg-gradient-to-br hover:from-indigo-700 hover:to-indigo-800 from-indigo-600 to-purple-700 text-white">
                    <button
                      onClick={clearCart}
                      className="sm:w-auto text-gray-200 text-sm font-medium transition-all duration-200"
                    >
                      კალათის გასუფთავება
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
