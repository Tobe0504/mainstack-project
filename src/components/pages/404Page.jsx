import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/routes";
import AppLayout from "../layouts/AppLayout";
import { Button } from "../shared/Button";

const NotFoundPage = () => {
  // Router
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="bg-gray-200 rounded-full p-3 mb-6">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-mainstack-primary-black mb-2">
          Oops... Page Not Found
        </h1>
        <p className="text-mainstack-primary-gray font-medium text-center max-w-md mb-6">
          Oops! The page you are looking for does not exist. Please check the
          URL or go back to the homepage.
        </p>
        <Button
          onClick={() => {
            navigate(ROUTES.BASE_URL);
          }}
        >
          Go Back
        </Button>
      </div>
    </AppLayout>
  );
};

export default NotFoundPage;
