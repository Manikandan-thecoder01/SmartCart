import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50">
      <section className="relative overflow-hidden">
        <Link to={`/product/${p._id}`}>
          <img
            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            src={p.image}
            alt={p.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="absolute top-3 right-3 bg-pink-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            {p?.brand}
          </span>
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <Link to={`/product/${p._id}`}>
          <h5 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors duration-300 line-clamp-2">
            {p?.name}
          </h5>
        </Link>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {p?.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-pink-500">
            ₹{p?.price?.toLocaleString("en-IN")}
          </p>
        </div>

        <section className="flex gap-2">
          <Link
            to={`/product/${p._id}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:from-pink-700 hover:to-purple-700 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300"
          >
            View Details
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2.5 bg-gray-700/50 hover:bg-pink-600 rounded-lg transition-colors duration-300"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={22} className="text-white" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
