import React from "react";

const ApiKeyDisplay: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Google Maps API Key Missing
      </h1>
      <p className="text-center">
        Please create a <code className=" p-1 rounded">.env.local</code> file in
        the root of your project.
      </p>
      <p className="text-center mt-2">
        Add your Google Maps API Key to it like this: <br />
        <code className=" p-1 rounded">
          NEXT_PUBLIC_GOOGLE_MAPS_KEY=YOUR_ACTUAL_API_KEY
        </code>
        .
      </p>
      <p className="text-center mt-4 text-sm text-gray-600">
        Ensure you have enabled <strong>Maps JavaScript API</strong> and{" "}
        <strong>Places API</strong> in your Google Cloud Console for this key.
      </p>
    </div>
  );
};

export default ApiKeyDisplay;
