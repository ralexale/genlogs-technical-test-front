import { Libraries } from "@react-google-maps/api";

export const LIBRARIES_TO_LOAD: Libraries = ["places"];

export const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "400px",
};

export const MAP_CENTER = {
  lat: 39.8283, // Center of US
  lng: -98.5795,
};

export const DEFAULT_CARRIERS = [
  { name: "UPS Inc.", details: "11 trucks Day" },
  { name: "FedEx Corp", details: "9 trucks a day" },
];

export const NY_DC_CARRIERS = [
  { name: "Knight-Swift Transport Services", details: "10 Trucks/Day" },
  { name: "J.B. Hunt Transport Services Inc", details: "7 Trucks/Day" },
  { name: "YRC Worldwide", details: "5 Trucks A day" },
];

export const SF_LA_CARRIERS = [
  { name: "XPO Logistics", details: "9 Trucks/Day" },
  { name: "Schneider", details: "6 Trucks/Day" },
  { name: "Landstar Systems", details: "2 Trucks A day" },
];

export const ROUTE_STYLES = [
  {
    strokeColor: "#4A90E2", // Blue for primary route
    strokeOpacity: 0.8,
    strokeWeight: 6,
  },
  {
    strokeColor: "#FF6347", // Tomato red for 1st alternative
    strokeOpacity: 0.7,
    strokeWeight: 5,
  },
  {
    strokeColor: "#32CD32", // Lime green for 2nd alternative
    strokeOpacity: 0.7,
    strokeWeight: 5,
  },
];
