import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Top Products Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Top Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Carousel */}
          <div className="lg:col-span-1">
            <ProductCarousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
