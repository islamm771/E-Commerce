import { FaTruckFast } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";

const ProductFeatures = () => {
  return (
    <div className="mt-8 border border-gray-300 rounded-xl overflow-hidden">
      <div className="flex gap-4 p-5">
        <FaTruckFast
          size={24}
          className="shrink-0 mt-1"
        />

        <div>
          <h4 className="font-semibold">
            Free Delivery
          </h4>

          <p className="text-sm text-gray-500 mt-1">
            Enter your postal code for delivery
            availability.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-300 flex gap-4 p-5">
        <TfiReload
          size={20}
          className="shrink-0 mt-1"
        />

        <div>
          <h4 className="font-semibold">
            Return Delivery
          </h4>

          <p className="text-sm text-gray-500 mt-1">
            Free returns within 30 days of
            purchase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;