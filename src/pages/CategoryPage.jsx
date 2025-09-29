import React, { useState, useEffect } from "react";
import { useProductStore } from "../stores/useProductStore.js";
import { useCartStore } from "../stores/useCartStore.js";
import {
  Star,
  TrendingUp,
  Filter,
  Search,
  Eye,
  Heart,
  ShoppingCart,
  List,
  LayoutGrid,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryPage() {
  const { fetchPosts, data, loading, error } = useProductStore();
  const { addToCart } = useCartStore();

  const { id } = useParams();

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    if (`/categories/:${id}`) {
      setSelectedCategory(id);
    } else {
      setSelectedCategory(all);
    }
  }, [id]);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Group products by category
  const groupedProducts = data.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Filter and sort products
  const filteredProducts = data.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      case "rating":
        aValue = a.rating?.rate || 0;
        bValue = b.rating?.rate || 0;
        break;
      case "name":
      default:
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const categoryColors = {
    electronics: "bg-blue-500",
    jewelery: "bg-purple-500",
    "men's clothing": "bg-green-500",
    "women's clothing": "bg-pink-500",
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "electronics":
        return "⚡";
      case "jewelery":
        return "💎";
      case "men's clothing":
        return "👔";
      case "women's clothing":
        return "👗";
      default:
        return "📦";
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show success feedback
    const button = document.getElementById`(cart-btn-${product.id})`;
    if (button) {
      button.innerHTML =
        '<span class="flex items-center gap-2"><Check class="w-4 h-4" /> დამატებულია</span>';
      setTimeout(() => {
        button.innerHTML = '<ShoppingCart class="w-4 h-4" />';
      }, 2000);
    }
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("name");
    setSortOrder("asc");
    setPriceRange({ min: 0, max: 1000 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            პროდუქტები იტვირთება
          </h2>
          <p className="text-gray-600">გთხოვთ მოითმინოთ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-3xl shadow-lg">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">შეცდომა</h2>
          <p className="text-gray-600 mb-6">
            მონაცემების ჩატვირთვისას მოხდა შეცდომა
          </p>
          <button
            onClick={() => fetchPosts()}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            თავიდან ცდა
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                პროდუქტების კატალოგი
              </h1>
              <p className="text-gray-600 text-lg">
                აღმოაჩინეთ ჩვენი სრული კოლექცია - {data.length} უნიკალური
                პროდუქტი
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">{data.length} პროდუქტი</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            {/* Search */}
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ძიება პროდუქტებში..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-all duration-300 bg-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => navigate(`/categories/${e.target.value}`)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-all duration-300 bg-white min-w-[200px]"
            >
              <option value="all">ყველა კატეგორია</option>
              {Object.keys(groupedProducts).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-all duration-300 bg-white min-w-[150px]"
            >
              <option value="name-asc">სახელით A-Z</option>
              <option value="name-desc">სახელით Z-A</option>
              <option value="price-asc">ფასით ↑</option>
              <option value="price-desc">ფასით ↓</option>
              <option value="rating-desc">რეიტინგით ↓</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Filter className="w-5 h-5" />
              ფილტრები
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  დამატებითი ფილტრები
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  ყველაფრის გასუფთავება
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ფასის დიაპაზონი
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="მინ"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="მაქს"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              ნაჩვენებია{" "}
              <span className="font-semibold text-gray-900">
                {sortedProducts.length}
              </span>{" "}
              პროდუქტი
              {selectedCategory !== "all" && (
                <span>
                  {" "}
                  კატეგორიიდან{" "}
                  <span className="font-semibold text-indigo-600">
                    {selectedCategory}
                  </span>
                </span>
              )}
            </p>

            {(searchQuery ||
              selectedCategory !== "all" ||
              priceRange.min > 0 ||
              priceRange.max < 1000) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <X className="w-4 h-4" />
                ფილტრების გასუფთავება
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {Object.entries(groupedProducts)
          .filter(
            ([category]) =>
              selectedCategory === "all" || category === selectedCategory
          )
          .map(([category, products]) => {
            const categoryProducts = products.filter((product) =>
              sortedProducts.find((sp) => sp.id === product.id)
            );

            if (categoryProducts.length === 0) return null;

            return (
              <div key={category} className="mb-12 animate-fadeInUp">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-16 h-16 ${
                      categoryColors[category] || "bg-gray-500"
                    } bg-opacity-15 rounded-2xl flex items-center justify-center text-3xl`}
                  >
                    {getCategoryIcon(category)}
                  </div>
                  <div className="flex-grow">
                    <h2 className="font-bold text-3xl text-gray-800 capitalize mb-1">
                      {category}
                    </h2>
                    <p className="text-gray-500 text-lg">
                      {categoryProducts.length} ხელმისაწვდომი პროდუქტი
                    </p>
                  </div>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product, index) => (
                      <button onClick={() => navigate(`/item/${product.id}`)}>
                        <div
                          key={product.id}
                          className="group bg-white rounded-3xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                          style={{
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          {/* Favorite Button */}
                          <button
                            onClick={() => toggleFavorite(product.id)}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                favorites.has(product.id)
                                  ? "text-red-500 fill-current"
                                  : "text-gray-400"
                              }`}
                            />
                          </button>

                          <div className="aspect-square bg-gray-50 rounded-2xl mb-4 overflow-hidden relative">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* Quick View Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <button className="bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-white transition-all duration-300 flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                სწრაფი ნახვა
                              </button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                              {product.title}
                            </h3>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating?.rate || 4)
                                        ? "text-yellow-500 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                ({product.rating?.count || 128} მიმოხილვა)
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <span className="font-bold text-2xl text-indigo-600">
                                ${product.price}
                              </span>
                              <button
                                id={`cart-btn-${product.id}`}
                                onClick={() => handleAddToCart(product)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-all duration-300 group-hover:scale-110 hover:shadow-lg"
                              >
                                <ShoppingCart className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {categoryProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 flex items-center gap-6"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            {product.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating?.rate || 4)
                                      ? "text-yellow-500 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              ({product.rating?.count || 128})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-bold text-xl text-indigo-600">
                            ${product.price}
                          </span>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            კალათაში
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              პროდუქტები არ მოიძებნა
            </h3>
            <p className="text-gray-500 mb-6">სცადეთ სხვა ძიების პარამეტრები</p>
            <button
              onClick={resetFilters}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              ყველა ფილტრის გასუფთავება
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
