import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  Controller,
  Control,
  FieldError,
  UseFormSetValue,
} from "react-hook-form";
import { SearchFormValues } from "@/schemas/search-form.schema";

interface FormFieldProps {
  name: keyof SearchFormValues;
  control: Control<SearchFormValues>;
  label: string;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onLoadAutocomplete: (autocomplete: google.maps.places.Autocomplete) => void;
  onPlaceSelected: () => string | null;
  setValue: UseFormSetValue<SearchFormValues>;
  error?: FieldError;
  setDirectionsResponse: (
    response: google.maps.DirectionsResult | null
  ) => void;
  setShowMap: (show: boolean) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  placeholder,
  inputRef,
  onLoadAutocomplete,
  onPlaceSelected,
  setValue,
  error,
  setDirectionsResponse,
  setShowMap,
}) => {
  const handlePlaceChanged = () => {
    const placeValue = onPlaceSelected();
    if (placeValue !== null) {
      setValue(name, placeValue, { shouldValidate: true, shouldDirty: true });
      setDirectionsResponse(null);
      setShowMap(false);
    }
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <Autocomplete
        onLoad={onLoadAutocomplete}
        onPlaceChanged={handlePlaceChanged}
        options={{ types: ["(cities)"] }}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              ref={inputRef}
              type="text"
              id={name}
              placeholder={placeholder}
              className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
                error
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100`}
              onChange={(e) => {
                field.onChange(e.target.value);
                setDirectionsResponse(null);
                setShowMap(false);
              }}
            />
          )}
        />
      </Autocomplete>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;
