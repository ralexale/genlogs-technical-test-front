import React from "react";
import { Carrier } from "../types/carrier.types";

interface CarrierListProps {
  carriers: Carrier[];
}

const CarrierList: React.FC<CarrierListProps> = ({ carriers }) => {
  if (carriers.length === 0) {
    return null;
  }

  return (
    <div className="w-full p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg mt-6 sm:mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Available Carriers
      </h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {carriers.map((carrier, index) => (
          <li key={index} className="py-3 sm:py-4">
            <h3 className="text-md sm:text-lg font-medium text-indigo-600 dark:text-indigo-400">
              {carrier.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Trucks per day: {carrier.trucks_per_day}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarrierList;
