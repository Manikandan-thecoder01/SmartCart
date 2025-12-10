import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <AdminMenu />

          <div className="flex-1 w-full lg:max-w-5xl">
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Create Product
              </h1>

              {/* Image Upload Section */}
              <div className="mb-6 sm:mb-8">
                <label className="block text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                  Upload Image
                </label>

                {imageUrl ? (
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="product"
                      className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl border-2 border-pink-500/30"
                    />
                    <label className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-pink-600 hover:bg-pink-700 text-white text-xs sm:text-sm px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg cursor-pointer transition-all shadow-lg">
                      Change Image
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={uploadFileHandler}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-pink-500/50 bg-white/5 text-white/70 hover:text-white hover:border-pink-500 hover:bg-white/10 block w-full text-center rounded-xl cursor-pointer py-8 sm:py-12 md:py-16 transition-all">
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-sm sm:text-base md:text-lg font-semibold px-4">
                        {image ? image.name : "Click to Upload Image"}
                      </span>
                    </div>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={uploadFileHandler}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4 sm:space-y-6">
                {/* Name and Price Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full p-3 sm:p-4 text-sm sm:text-base border border-white/20 rounded-lg sm:rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                    >
                      Price
                    </label>
                    <input
                      id="price"
                      type="number"
                      className="w-full p-3 sm:p-4 text-sm sm:text-base border border-white/20 rounded-lg sm:rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                {/* Quantity and Brand Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                    >
                      Quantity
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      className="w-full p-3 sm:p-4 text-sm sm:text-base border border-white/20 rounded-lg sm:rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="brand"
                      className="block text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                    >
                      Brand
                    </label>
                    <input
                      id="brand"
                      type="text"
                      className="w-full p-3 sm:p-4 text-sm sm:text-base border border-white/20 rounded-lg sm:rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      placeholder="Enter brand name"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="w-full p-3 sm:p-4 text-sm sm:text-base border border-white/20 rounded-lg sm:rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none"
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* Count In Stock and Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                    >
                      Count In Stock
                    </label>
                    <input
                      id="stock"
                      type="number"
                      className="w-full p-3 sm:p-4 text-sm sm:text-base border border-white/20 rounded-lg sm:rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      placeholder="0"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-white text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full p-3 sm:p-4 text-sm sm:text-base border border-white/20 rounded-lg sm:rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    >
                      <option value="" className="bg-gray-800">
                        Choose Category
                      </option>
                      {categories?.map((c) => (
                        <option
                          key={c._id}
                          value={c._id}
                          className="bg-gray-800"
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center sm:justify-end pt-2 sm:pt-4">
                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Create Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
