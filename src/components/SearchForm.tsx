import React from "react";
import FormField from "../ui/FormField";
import { Button } from "@/ui/Button";
import { SearchFormValues } from "@/schemas/search-form.schema";
import { useHandleSearchForm } from "@/hooks/useHandleSearchForm";

interface SearchFormProps {
  fromInputRef: React.RefObject<HTMLInputElement | null>;
  toInputRef: React.RefObject<HTMLInputElement | null>;
  onLoadFrom: (autocomplete: google.maps.places.Autocomplete) => void;
  onLoadTo: (autocomplete: google.maps.places.Autocomplete) => void;
  onPlaceChangedFrom: () => string | null;
  onPlaceChangedTo: () => string | null;
  handleSearch: (data: SearchFormValues) => void;
  setDirectionsResponse: (
    response: google.maps.DirectionsResult | null
  ) => void;
  setShowMap: (show: boolean) => void;
  searchError: string | null;
}

const SearchForm: React.FC<SearchFormProps> = ({
  fromInputRef,
  toInputRef,
  onLoadFrom,
  onLoadTo,
  onPlaceChangedFrom,
  onPlaceChangedTo,
  handleSearch,
  setDirectionsResponse,
  setShowMap,
  searchError,
}) => {
  const { control, handleSubmit, onSubmit, setValue, errors, isValid } =
    useHandleSearchForm({ handleSearch });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <FormField
          name="fromCity"
          control={control}
          label="From (City)"
          placeholder="e.g., New York"
          inputRef={fromInputRef}
          onLoadAutocomplete={onLoadFrom}
          onPlaceSelected={onPlaceChangedFrom}
          setValue={setValue}
          error={errors.fromCity}
          setDirectionsResponse={setDirectionsResponse}
          setShowMap={setShowMap}
        />
        <FormField
          name="toCity"
          control={control}
          label="To (City)"
          placeholder="e.g., Washington DC"
          inputRef={toInputRef}
          onLoadAutocomplete={onLoadTo}
          onPlaceSelected={onPlaceChangedTo}
          setValue={setValue}
          error={errors.toCity}
          setDirectionsResponse={setDirectionsResponse}
          setShowMap={setShowMap}
        />
      </div>
      {searchError && (
        <p className="text-red-500 dark:text-red-400 text-sm mb-4 text-center">
          {searchError}
        </p>
      )}
      <Button type="submit" disabled={!isValid}>
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
