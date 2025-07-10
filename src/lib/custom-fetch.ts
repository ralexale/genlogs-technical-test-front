import { notFound } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface CustomFetchOptions extends RequestInit {
  skipAuth?: boolean;
}

// Custom error class for 404 Not Found responses
export class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export async function customFetch<T>(
  endpoint: string,
  options: CustomFetchOptions = {},
  defaultContentType: boolean = true
): Promise<T> {
  const { ...fetchOptions } = options;

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  // Default headers
  const defaultHeaders: HeadersInit = {};

  if (defaultContentType) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  // Merge default headers with provided headers
  const mergedHeaders = {
    ...defaultHeaders,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: { ...mergedHeaders },
      credentials: "include",
    });

    // Specifically handle 404 errors with our custom error class
    if (response.status === 404) {
      notFound();
    }

    // Handle other HTTP status codes
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    // Return empty response for 204 status
    if (response.status === 204) {
      return {} as T;
    }

    // Try to parse response as JSON
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return await response.json();
    }

    // For non-JSON responses
    return {} as T;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}
