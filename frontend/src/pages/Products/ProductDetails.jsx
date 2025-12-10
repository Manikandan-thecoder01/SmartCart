import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-300 hover:text-white font-semibold transition-colors duration-200 mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Image Section */}
              <div className="relative">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700/50 p-3 sm:p-4 md:p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover rounded-lg sm:rounded-xl"
                  />
                  <HeartIcon product={product} />
                </div>
              </div>

              {/* Product Info Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-700/50">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                    {product.name}
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                    {product.description}
                  </p>

                  <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                      ₹{product.price}
                    </p>
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center text-gray-300 mb-2">
                        <FaStore className="mr-2 text-pink-400" />
                        <span className="text-sm">Brand</span>
                      </div>
                      <p className="text-white font-semibold">
                        {product.brand}
                      </p>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center text-gray-300 mb-2">
                        <FaClock className="mr-2 text-pink-400" />
                        <span className="text-sm">Added</span>
                      </div>
                      <p className="text-white font-semibold">
                        {moment(product.createAt).fromNow()}
                      </p>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center text-gray-300 mb-2">
                        <FaStar className="mr-2 text-pink-400" />
                        <span className="text-sm">Reviews</span>
                      </div>
                      <p className="text-white font-semibold">
                        {product.numReviews}
                      </p>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center text-gray-300 mb-2">
                        <FaStar className="mr-2 text-pink-400" />
                        <span className="text-sm">Rating</span>
                      </div>
                      <p className="text-white font-semibold">
                        {product.rating}
                      </p>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center text-gray-300 mb-2">
                        <FaShoppingCart className="mr-2 text-pink-400" />
                        <span className="text-sm">Quantity</span>
                      </div>
                      <p className="text-white font-semibold">
                        {product.quantity}
                      </p>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center text-gray-300 mb-2">
                        <FaBox className="mr-2 text-pink-400" />
                        <span className="text-sm">In Stock</span>
                      </div>
                      <p className="text-white font-semibold">
                        {product.countInStock}
                      </p>
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="mb-6">
                    <Ratings
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>

                  {/* Quantity Selector and Add to Cart */}
                  <div className="flex gap-4">
                    {product.countInStock > 0 && (
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            Qty: {x + 1}
                          </option>
                        ))}
                      </select>
                    )}

                    <button
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                      {product.countInStock === 0
                        ? "Out of Stock"
                        : "Add To Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
