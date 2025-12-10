import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
          </div>

          <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mt-[3rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">
              Favorites
            </span>{" "}
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none w-full"
        >
          {userInfo ? (
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {userInfo.username.charAt(0).toUpperCase()}
              </div>
              <div
                className="nav-item-name flex-col items-start flex-1 min-w-0 overflow-hidden"
                style={{ display: "none" }}
              >
                <span className="text-white font-semibold text-sm truncate w-full block">
                  {userInfo.username}
                </span>
                <span className="text-gray-400 text-xs mt-0.5 block">
                  {userInfo.isAdmin ? "Admin" : "User"}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 flex-shrink-0 hidden nav-item-name transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </div>
          ) : (
            <></>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className="absolute left-full ml-4 bottom-0 bg-gray-900 text-white rounded-xl shadow-2xl border-2 border-gray-700 min-w-[240px] py-2"
            style={{
              zIndex: 99999,
              marginBottom: "0px",
            }}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all text-sm font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📊 Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all text-sm font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📦 Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all text-sm font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    🏷️ Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all text-sm font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📋 Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all text-sm font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    👥 Users
                  </Link>
                </li>
                <li className="border-t border-gray-700 my-1"></li>
              </>
            )}

            <li>
              <Link
                to="/profile"
                className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all text-sm font-medium"
                onClick={() => setDropdownOpen(false)}
              >
                👤 Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  logoutHandler();
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2.5 text-left hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all text-sm font-medium"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
