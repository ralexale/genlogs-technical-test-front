import { useState, useRef, useCallback } from "react";
import { Carrier } from "../types/carrier.types";
import getCarriers from "@/services/carriers.service";

interface FormValues {
  fromCity: string;
  toCity: string;
}

export const useMapLogic = () => {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [currentFromCity, setCurrentFromCity] = useState<string>("");
  const [currentToCity, setCurrentToCity] = useState<string>("");

  const autocompleteFromRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const autocompleteToRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const fromInputRef = useRef<HTMLInputElement | null>(null);
  const toInputRef = useRef<HTMLInputElement | null>(null);

  const onLoadFrom = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteFromRef.current = autocomplete;
  };

  const onLoadTo = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteToRef.current = autocomplete;
  };

  const onPlaceChangedFrom = useCallback((): string | null => {
    if (autocompleteFromRef.current !== null) {
      const place = autocompleteFromRef.current.getPlace();
      const newFromCity =
        place.formatted_address || fromInputRef.current?.value || "";
      setDirectionsResponse(null);
      setShowMap(false);
      setSearchError(null);
      return newFromCity;
    } else {
      console.log("Autocomplete (From) is not loaded yet!");
      return null;
    }
  }, []);

  const onPlaceChangedTo = useCallback((): string | null => {
    if (autocompleteToRef.current !== null) {
      const place = autocompleteToRef.current.getPlace();
      const newToCity =
        place.formatted_address || toInputRef.current?.value || "";

      setDirectionsResponse(null);
      setShowMap(false);
      setSearchError(null);
      return newToCity;
    } else {
      console.log("Autocomplete (To) is not loaded yet!");
      return null;
    }
  }, []);

  const handleSearch = useCallback(async (data: FormValues) => {
    const { fromCity, toCity } = data;
    setSearchError(null);
    setCarriers([]);
    setCurrentFromCity(fromCity);
    setCurrentToCity(toCity);
    setShowMap(true);
    setDirectionsResponse(null);

    try {
      const processedFromCity = fromCity.split(",")[0].trim();
      const processedToCity = toCity.split(",")[0].trim();
      const apiResponse = await getCarriers({
        from_city: processedFromCity,
        to_city: processedToCity,
      });
      if (apiResponse) {
        setCarriers(apiResponse);
      } else {
        setCarriers([]);
      }
    } catch (error) {
      console.error("Error fetching carriers from API:", error);
      setSearchError("Failed to fetch carriers. Please try again.");
      setCarriers([]);
      setShowMap(false);
    }
  }, []);

  const directionsCallback = useCallback(
    (
      response: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (status === "OK" && response) {
        console.log("Directions response:", response);
        setDirectionsResponse(response);
        setSearchError(null);

        if (response.routes.length > 1) {
          console.log(
            `Found ${response.routes.length} routes. Displaying the primary one.`
          );
          response.routes.forEach((route, index) => {
            console.log(
              `Route ${index + 1}: ${route.summary}, Duration: ${
                route.legs[0]?.duration?.text
              }, Distance: ${route.legs[0]?.distance?.text}`
            );
          });
        }
      } else {
        console.error(`Error fetching directions ${status}`, response);
        setSearchError(
          `Failed to get directions: ${status}. Please check city names needs to be from united states`
        );
        setCarriers([]);
        setDirectionsResponse(null);
        setShowMap(false);
        setCurrentFromCity("");
        setCurrentToCity("");
      }
    },
    []
  );

  return {
    carriers,
    directionsResponse,
    setDirectionsResponse,
    showMap,
    setShowMap,
    searchError,
    fromInputRef,
    toInputRef,
    onLoadFrom,
    onLoadTo,
    onPlaceChangedFrom,
    onPlaceChangedTo,
    handleSearch,
    directionsCallback,
    currentFromCity,
    currentToCity,
  };
};
