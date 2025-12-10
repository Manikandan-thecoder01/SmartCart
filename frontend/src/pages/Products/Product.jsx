import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        <HeartIcon product={product} />
      </div>

      <div className="p-5">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h2>
          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-bold text-pink-500">
              ₹{product.price}
            </span>
            <span className="bg-pink-500/20 text-pink-300 text-xs font-medium px-3 py-1 rounded-full border border-pink-500/30">
              {product.brand}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
