import { SearchFormValues, searchSchema } from "@/schemas/search-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface UseHandleSearchFormProps {
  handleSearch: (data: SearchFormValues) => void;
}

export const useHandleSearchForm = ({
  handleSearch,
}: UseHandleSearchFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    mode: "onChange",
    defaultValues: {
      fromCity: "",
      toCity: "",
    },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = (data) => {
    handleSearch(data);
  };
  return {
    control,
    handleSubmit,
    setValue,
    errors,
    isValid,
    onSubmit,
  };
};
