"use client";
import CarrierList from "@/components/CarrierList";
import { Header } from "@/components/Header";
import MapDisplay from "@/components/MapDisplay";
import SearchForm from "@/components/SearchForm";
import { useMapLogic } from "@/hooks/useMapLogic";
import { LIBRARIES_TO_LOAD } from "@/utils/constants";
import { LoadScript } from "@react-google-maps/api";
import React from "react";

interface HomeContainerProps {
  googleMapsApiKey: string;
}

export const HomeContainer = ({ googleMapsApiKey }: HomeContainerProps) => {
  const {
    carriers,
    directionsResponse,
    setDirectionsResponse,
    showMap,
    setShowMap,
    fromInputRef,
    toInputRef,
    searchError,
    onLoadFrom,
    onLoadTo,
    onPlaceChangedFrom,
    onPlaceChangedTo,
    handleSearch,
    directionsCallback,
    currentFromCity,
    currentToCity,
  } = useMapLogic();

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={LIBRARIES_TO_LOAD}
    >
      <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-20 gap-8 sm:gap-12 md:gap-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <main className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center w-full max-w-3xl">
          <Header />

          <SearchForm
            fromInputRef={fromInputRef}
            toInputRef={toInputRef}
            onLoadFrom={onLoadFrom}
            onLoadTo={onLoadTo}
            onPlaceChangedFrom={onPlaceChangedFrom}
            onPlaceChangedTo={onPlaceChangedTo}
            handleSearch={handleSearch}
            setDirectionsResponse={setDirectionsResponse}
            setShowMap={setShowMap}
            searchError={searchError}
          />

          {showMap && currentFromCity && currentToCity && !searchError && (
            <MapDisplay
              fromCity={currentFromCity}
              toCity={currentToCity}
              directionsResponse={directionsResponse}
              directionsCallback={directionsCallback}
            />
          )}

          <CarrierList carriers={carriers} />
        </main>
      </div>
    </LoadScript>
  );
};
