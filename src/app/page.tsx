import ApiKeyDisplay from "@/components/ApiKeyDisplay";
import { HomeContainer } from "@/containers/HomeContainer";

export default function Home() {
  const googleMapsApiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ||
    "YOUR_GOOGLE_MAPS_API_KEY_FALLBACK";

  if (
    !googleMapsApiKey ||
    googleMapsApiKey === "YOUR_GOOGLE_MAPS_API_KEY_FALLBACK"
  ) {
    return <ApiKeyDisplay />;
  }

  return <HomeContainer googleMapsApiKey={googleMapsApiKey} />;
}
