import React from "react";
import clsx from "clsx";

interface RouteDetail {
  description: string;
  colorName: string;
}

interface RoutesDescriptionsProps {
  routeInfo: RouteDetail[];
  showMap: boolean;
  searchError: string | null;
}

export const RoutesDescriptions = ({
  routeInfo,
  showMap,
  searchError,
}: RoutesDescriptionsProps) => {
  if (!showMap || routeInfo.length === 0 || searchError) {
    return null;
  }

  return (
    <div className="mt-4 p-4 flex flex-col rounded-md bg-gray-100 dark:bg-gray-800 w-full">
      <h3 className="text-lg font-semibold mb-2">Route Details:</h3>
      <ul className="flex flex-col gap-2 ">
        {routeInfo.map((info, index) => (
          <li key={index} className="text-sm flex gap-2">
            <span
              className={clsx("text-sm font-bold", {
                "text-[#4A90E2]": info.colorName === "Blue",
                "text-[#FF6347]": info.colorName === "Red",
                "text-[#32CD32]": info.colorName === "Green",
                "text-gray-700 dark:text-gray-300":
                  info.colorName === "Default Color",
              })}
            >
              {info.colorName}:
            </span>
            {info.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
