import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";

export default function BasketPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">კალათა</h1>
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
              to='/'
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                ნივთების მოძიება
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <p className="text-2xl font-bold text-indigo-600">
                          {item.price} <span className="text-lg text-gray-500">₾</span>
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <button
                            onClick={() => handleDecreaseQuantity(item)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
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
                    <div className="flex flex-col gap-3 items-center">
                      <button
                        className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
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
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-indigo-100 mb-1">სულ ღირებულება</p>
                  <p className="text-3xl font-bold">{totalPrice.toFixed(2)} ₾</p>
                  <p className="text-indigo-200 text-sm">{totalItems} ნივთი</p>
                </div>
                <button className="w-full sm:w-auto bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  ყველას შეძენა
                </button>
              </div>
              
              {/* Clear Cart Button */}
              <div className="mt-4 pt-4 border-t border-indigo-300/30">
                <button 
                  onClick={clearCart}
                  className="w-full sm:w-auto text-indigo-200 hover:text-white text-sm font-medium underline hover:no-underline transition-all duration-200"
                >
                  კალათის გასუფთავება
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}