import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 lg:py-10">
        <ProgressSteps step1 step2 />
        <div className="mt-8 sm:mt-12 lg:mt-16 flex justify-center">
          <div className="w-full max-w-xl">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Shipping Information
              </h1>
              <form onSubmit={submitHandler}>
                <div className="mb-4 sm:mb-5">
                  <label className="block text-white text-sm font-semibold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 sm:p-4 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    placeholder="Enter address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-4 sm:mb-5">
                  <label className="block text-white text-sm font-semibold mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 sm:p-4 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="mb-4 sm:mb-5">
                  <label className="block text-white text-sm font-semibold mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 sm:p-4 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    placeholder="Enter postal code"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="mb-4 sm:mb-5">
                  <label className="block text-white text-sm font-semibold mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 sm:p-4 border border-white/20 rounded-xl bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                    placeholder="Enter country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="mb-6 sm:mb-8">
                  <label className="block text-white text-sm font-semibold mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 sm:p-4 bg-white/5 rounded-lg border border-white/20 cursor-pointer hover:bg-white/10 transition-all">
                      <input
                        type="radio"
                        className="form-radio text-pink-500 w-4 h-4 sm:w-5 sm:h-5"
                        name="paymentMethod"
                        value="PayPal"
                        checked={paymentMethod === "PayPal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="ml-3 text-white text-sm sm:text-base">
                        PayPal or Credit Card
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-4 rounded-xl text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg"
                  type="submit"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
