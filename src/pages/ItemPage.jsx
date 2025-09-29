import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Share2, Shield, Truck, RotateCcw } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

export default function ItemPage() {
  const { fetchPosts, data, loading, error } = useProductStore();
  const { id } = useParams();

  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);

  const product = data.find((p) => p.id === Number(id));

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            პროდუქტი იტვირთება
          </h2>
          <p className="text-gray-600">გთხოვთ დაელოდოთ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">შეცდომა</h2>
          <p className="text-gray-600 mb-4">
            მონაცემების ჩატვირთვისას მოხდა შეცდომა
          </p>
          <button
            onClick={() => fetchPosts()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            თავიდან ცდა
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">პროდუქტი ვერ მოიძებნა</h2>
          <button
            onClick={() => navigate('/category')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            კატალოგში დაბრუნება
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button onClick={() => navigate("/categories")} className="hover:text-indigo-600 transition-colors">
                კატალოგი
              </button>
              <span>/</span>
              <button
                onClick={() => navigate(`/categories/${product.category}`)}
                className="text-indigo-600 hover:text-indigo-700 font-medium capitalize transition-colors"
              >
                {product.category}
              </button>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate max-w-xs">
                {product.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            
            {/* Product Image */}
            <div className="p-8">
              <div className="aspect-square bg-gray-50 border border-gray-100 rounded-lg overflow-hidden relative group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-sm">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="space-y-6">
                
                {/* Category Badge */}
                <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium uppercase tracking-wide">
                  {product.category}
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
                    {product.title}
                  </h1>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating?.rate || 4)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating?.rate || 4.0} ({product.rating?.count || 128} მიმოხილვა)
                  </span>
                </div>

                {/* Price */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-gray-900">${product.price}</span>
                    <span className="text-sm text-gray-500">+ მიწოდება</span>
                  </div>
                </div>

                {/* Description */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-medium text-gray-900 mb-3">აღწერა</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                </div>

                {/* Features */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                      <Truck className="w-5 h-5 text-indigo-600 mb-2" />
                      <span className="text-xs text-gray-600 font-medium">უფასო მიწოდება</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                      <Shield className="w-5 h-5 text-indigo-600 mb-2" />
                      <span className="text-xs text-gray-600 font-medium">გარანტია</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                      <RotateCcw className="w-5 h-5 text-indigo-600 mb-2" />
                      <span className="text-xs text-gray-600 font-medium">დაბრუნება</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    კალათაში დამატება
                  </button>
                  <button className="w-full border border-gray-300 hover:border-indigo-600 text-gray-700 hover:text-indigo-600 py-3 rounded-lg font-medium transition-colors">
                    ახლავე ყიდვა
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Truck className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">უფასო მიწოდება</h3>
            <p className="text-sm text-gray-600">50 ლარზე მეტი შეკვეთისთვის</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">გარანტია</h3>
            <p className="text-sm text-gray-600">1 წლიანი მწარმოებლის გარანტია</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">30 დღიანი დაბრუნება</h3>
            <p className="text-sm text-gray-600">არ მოგწონთ? დააბრუნეთ</p>
          </div>
        </div>
      </div>
    </div>
  );
}