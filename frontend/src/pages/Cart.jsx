import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mt-6 sm:mt-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-12 text-white">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Link
              to="/shop"
              className="text-pink-500 hover:text-pink-400 font-semibold"
            >
              Go To Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-white">
                  Shopping Cart
                </h1>

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 border-b border-gray-700"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-pink-500 hover:text-pink-400 font-medium text-sm sm:text-base"
                      >
                        {item.name}
                      </Link>

                      <div className="mt-1 sm:mt-2 text-gray-300 text-sm">
                        {item.brand}
                      </div>
                      <div className="mt-1 sm:mt-2 text-white font-bold text-base sm:text-lg">
                        ₹ {item.price}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="w-20 sm:w-24">
                        <select
                          className="w-full p-2 border rounded-lg text-black text-sm"
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        className="text-red-500 hover:text-red-400 p-2"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:w-80 xl:w-96">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 sticky top-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                    Order Summary
                  </h2>

                  <div className="mb-4 pb-4 border-b border-gray-700">
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>Items</span>
                      <span>
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-white text-xl sm:text-2xl font-bold">
                      <span>Total</span>
                      <span>
                        ₹{" "}
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 mt-2 py-3 px-4 rounded-xl text-base sm:text-lg font-semibold w-full transition-all transform hover:scale-105 shadow-lg text-white"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
