const PRODUCTION_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const BASE_API_URL =
  import.meta.env.MODE === "development"
    ? PRODUCTION_BACKEND_URL
    : PRODUCTION_BACKEND_URL;
