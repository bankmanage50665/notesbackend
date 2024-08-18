import React from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../navigation/MainNavigation";

const ErrorHandler = () => {
  const errData = useRouteError();
  console.log(errData)

  return (
    <>


      <div className="min-h-screen bg-gray-100">
        <MainNavigation />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {errData.data && errData.data.message}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              We're working on fixing this issue.
            </p>
            <p className="text-md text-gray-500">
              Status code: <span className="font-mono">{errData.data && errData.status}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorHandler;
