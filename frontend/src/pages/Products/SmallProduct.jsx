import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700/50">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors line-clamp-1">
            {product.name}
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-pink-500">
              ₹{product.price}
            </span>
            <span className="bg-pink-500/20 text-pink-300 text-xs font-medium px-2.5 py-1 rounded-full border border-pink-500/30">
              {product.brand}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
