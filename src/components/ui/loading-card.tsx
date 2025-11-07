import { Loader2 } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./card";

export const Loading = () => {
  return (
    <Card className="max-w-full mx-auto mt-10 text-center border-dashed border-2 border-gray-200">
      <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
        <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
        <h2 className="text-lg font-semibold text-gray-700">Loading ...</h2>
        <p className="text-sm text-gray-500">
          Please wait while data is being loaded.
        </p>
      </CardContent>
    </Card>
  );
};

