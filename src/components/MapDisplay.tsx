import React from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  MAP_CENTER,
  MAP_CONTAINER_STYLE,
  ROUTE_STYLES,
} from "@/utils/constants";

interface MapDisplayProps {
  fromCity: string;
  toCity: string;
  directionsResponse: google.maps.DirectionsResult | null;
  directionsCallback: (
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => void;
}

const MapDisplay: React.FC<MapDisplayProps> = React.memo(
  ({ fromCity, toCity, directionsResponse, directionsCallback }) => {
    return (
      <div
        id="mapDisplay"
        className="w-full h-96 md:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md"
      >
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={MAP_CENTER}
          zoom={4}
        >
          {!directionsResponse && fromCity && toCity && fromCity !== toCity && (
            <DirectionsService
              options={{
                destination: toCity,
                origin: fromCity,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
              }}
              callback={directionsCallback}
            />
          )}
          {directionsResponse &&
            directionsResponse.routes &&
            directionsResponse.routes.length > 0 &&
            directionsResponse.routes.slice(0, 3).map((route, index) => {
              const routeStyle = ROUTE_STYLES[index] || ROUTE_STYLES[0];

              return (
                <DirectionsRenderer
                  key={`route-${index}`}
                  directions={directionsResponse}
                  routeIndex={index}
                  options={{
                    suppressMarkers: index > 0,
                    polylineOptions: {
                      strokeColor: routeStyle.strokeColor,
                      strokeWeight: routeStyle.strokeWeight,
                      strokeOpacity: routeStyle.strokeOpacity,

                      zIndex: directionsResponse.routes.length - index,
                    },
                  }}
                />
              );
            })}
        </GoogleMap>
      </div>
    );
  }
);

MapDisplay.displayName = "MapDisplay";

export default MapDisplay;
