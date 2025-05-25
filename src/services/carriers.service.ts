"use server";
import { customFetch } from "@/lib/custom-fetch";
import { CarriersResponse, GetCarriersRequest } from "@/types/carrier.types";

export default async function getCarriers({
  from_city,
  to_city,
}: GetCarriersRequest) {
  try {
    const response = await customFetch<CarriersResponse>(`/carriers/search`, {
      body: JSON.stringify({ from_city, to_city }),
      method: "POST",
    });

    return response;
  } catch (error) {
    console.error("Error fetching carriers:", error);
    throw error;
  }
}
