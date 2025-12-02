import { AlertCircle } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./card";

const NoDataFound = ({
  shortText = "No Data Found",
  longText = "We did't find any data",
}: {
  shortText?: string;
  longText?: string;
}) => {
  return (
    <Card className="max-w-full mx-auto mt-10 text-center">
      <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
        <AlertCircle className="w-12 h-12 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-700">{shortText}</h2>
        <p className="text-sm text-gray-500">{longText}</p>
      </CardContent>
    </Card>
  );
};

export default NoDataFound;
