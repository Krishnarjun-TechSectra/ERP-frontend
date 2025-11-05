import { XCircle } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./card";

const Error = () => {
  return (
    <Card className="max-w-full mx-auto mt-10 text-center border-dashed border-2 border-red-300">
      <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
        <XCircle className="w-12 h-12 text-red-400" />
        <h2 className="text-lg font-semibold text-red-700">
          Error Loading Data
        </h2>
        <p className="text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      </CardContent>
    </Card>
  );
};

export default Error;
