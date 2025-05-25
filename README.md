# Genlogs Carrier Route Finder

This project is a Next.js application designed to help users find trucking carriers between two specified cities. It utilizes the Google Maps API for autocompleting city inputs and displaying routes on a map.

## Project Structure

The project follows a feature-first structure, with components, hooks, types, and utility functions organized for clarity and maintainability.

```
/public
  /next.svg
  /vercel.svg
/src
  /app
    page.tsx         # Main page component (entry point)
    layout.tsx       # Main layout component
    globals.css      # Global styles
  /components
    ApiKeyDisplay.tsx # Component to display API key missing message
    CarrierList.tsx   # Component to display the list of available carriers
    MapDisplay.tsx    # Component to render the Google Map and directions
    SearchForm.tsx    # Component for city input fields and search button
  /hooks
    useMapLogic.ts   # Custom hook to manage map state and logic
  /types
    index.ts         # TypeScript type definitions (e.g., Carrier)
  /utils
    constants.ts     # Application constants (e.g., API libraries, map styles)
.env.local.example   # Example environment file for API keys
.eslintrc.json       # ESLint configuration
.gitignore           # Git ignore file
next.config.js       # Next.js configuration
package.json         # Project dependencies and scripts
postcss.config.js    # PostCSS configuration
tailwind.config.js   # Tailwind CSS configuration
tsconfig.json        # TypeScript configuration
```

## Core Functionality

### 1. City Input and Autocomplete

- Users can input "From" and "To" cities.
- The `@react-google-maps/api` library's `Autocomplete` component is used to provide city suggestions as the user types, restricted to `(cities)` type.
- Selected city names are stored in the component's state.

### 2. Carrier Search

- On clicking "Search", the `handleSearch` function is triggered.
- It first validates if both city inputs are provided.
- **Mock Carrier Data**: Currently, the carrier data is mocked. Based on predefined city pairs (New York - Washington D.C., San Francisco - Los Angeles), a static list of carriers is displayed. For other city pairs, a default list of carriers is shown.
- The `showMap` state is set to `true` to render the map section.

### 3. Map Display and Directions

- The `LoadScript` component from `@react-google-maps/api` loads the Google Maps JavaScript API with the necessary `places` library.
- **API Key Management**:
  - The Google Maps API key is expected to be in an environment variable `NEXT_PUBLIC_GOOGLE_MAPS_KEY`.
  - If the API key is missing or is the placeholder fallback, the `ApiKeyDisplay` component is rendered, instructing the user to set it up in a `.env.local` file.
- **Map Rendering (`MapDisplay.tsx`)**:
  - A `GoogleMap` component is rendered with a default center and zoom level.
  - `MAP_CONTAINER_STYLE` and `MAP_CENTER` are defined in `src/utils/constants.ts`.
- **Directions Service**:
  - When `showMap` is true, and valid `fromCity` and `toCity` are present, the `DirectionsService` component is rendered.
  - It makes a request to the Google Maps Directions API with the origin, destination, and `DRIVING` travel mode.
  - `provideRouteAlternatives: true` is set to request alternative routes, though the current implementation primarily focuses on the first route.
  - The `directionsCallback` function handles the API response.
- **Directions Renderer (`DirectionsRenderer.tsx`)**:
  - If the `DirectionsService` successfully fetches routes (`status === "OK"`), the `directionsResponse` state is updated.
  - The `DirectionsRenderer` component then draws the received route(s) on the map.
  - Polyline options are customized for better visual appearance.
  - If the API returns an error, an alert is shown, and the map/directions are cleared.

### 4. State Management (`useMapLogic.ts`)

- A custom hook `useMapLogic` centralizes the state and logic related to:
  - `fromCity`, `setToCity`
  - `toCity`, `setToCity`
  - `carriers`, `setCarriers`
  - `directionsResponse`, `setDirectionsResponse`
  - `showMap`, `setShowMap`
- It also includes:
  - Refs for Autocomplete instances (`autocompleteFromRef`, `autocompleteToRef`) and input elements (`fromInputRef`, `toInputRef`).
  - Handler functions:
    - `onLoadFrom`, `onLoadTo`: To get references to the Autocomplete instances.
    - `onPlaceChangedFrom`, `onPlaceChangedTo`: To update city state when a place is selected from Autocomplete and clear previous route/map.
    - `handleSearch`: To initiate the search and mock carrier fetching.
    - `directionsCallback`: To process the response from Google Maps Directions API.

### 5. UI Components

- **`SearchForm.tsx`**: Contains the input fields with `Autocomplete` and the "Search" button. Handles basic input changes and triggers the search.
- **`MapDisplay.tsx`**: Responsible for rendering the `GoogleMap`, `DirectionsService`, and `DirectionsRenderer`.
- **`CarrierList.tsx`**: Displays the list of (currently mocked) carriers.
- **`ApiKeyDisplay.tsx`**: Shown when the Google Maps API key is not configured correctly.

## Technical Details

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Mapping Library**: `@react-google-maps/api`
- **Styling**: Tailwind CSS
- **Linting/Formatting**: ESLint, Prettier (implicitly via ESLint config)

## Setup and Running the Project

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd technical-test-front
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    bun install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of the project and add your Google Maps API key:

    ```
    NEXT_PUBLIC_GOOGLE_MAPS_KEY=YOUR_ACTUAL_GOOGLE_MAPS_API_KEY
    ```

    - **Important**: You need to enable the **Maps JavaScript API** and **Places API** for this key in your Google Cloud Console.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How the Code Works Flow

1.  **`src/app/page.tsx`**:

    - Initializes `useMapLogic` to get state variables and handlers.
    - Checks for the `googleMapsApiKey`. If not found, renders `ApiKeyDisplay`.
    - Otherwise, wraps the main content in `LoadScript` to load Google Maps.
    - Renders the header, `SearchForm`, `MapDisplay` (conditionally), and `CarrierList`.

2.  **User Interaction in `SearchForm.tsx`**:

    - User types in "From" and "To" city fields. `Autocomplete` provides suggestions.
    - `onLoadFrom`/`onLoadTo` capture the Autocomplete instances.
    - `onPlaceChangedFrom`/`onPlaceChangedTo` update `fromCity`/`toCity` state when a selection is made. This also resets `directionsResponse` and hides the map (`setShowMap(false)`).
    - User clicks "Search". `handleSearch` (from `useMapLogic`) is called.

3.  **`handleSearch` in `useMapLogic.ts`**:

    - Sets `showMap(true)`.
    - Clears previous `directionsResponse`.
    - **Mock Carrier Logic**: Determines which set of carriers to display based on `fromCity` and `toCity`. Updates the `carriers` state.

4.  **`MapDisplay.tsx` Reacts**:

    - Since `showMap` is true, `MapDisplay` is rendered.
    - The `GoogleMap` component is shown.
    - If `directionsResponse` is null (cleared by `handleSearch` or input change) and cities are valid, `DirectionsService` is rendered.
    - `DirectionsService` calls the Google Maps API.

5.  **`directionsCallback` in `useMapLogic.ts`**:

    - This callback is passed to `DirectionsService`.
    - When Google Maps API responds:
      - If `status === "OK"`, it updates `directionsResponse` with the route data.
      - Logs information about multiple routes if available.
      - If there's an error, it shows an alert, clears `directionsResponse`, and hides the map.

6.  **`MapDisplay.tsx` Re-renders**:

    - Now that `directionsResponse` has data, `DirectionsRenderer` is rendered, which draws the route on the map.

7.  **`CarrierList.tsx`**:
    - Displays the carriers from the `carriers` state, updated by `handleSearch`.

This flow allows for a reactive interface where the map and carrier list update based on user input and API responses, with state and complex logic managed by the `useMapLogic` hook.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
