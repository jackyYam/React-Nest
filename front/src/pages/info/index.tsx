import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InfoForm from "./form";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
const InfoFormPage = () => {
  const [enableFrontValidation, setEnableFrontValidation] = useState(false);

  return (
    <div className="flex justify-center items-center h-[90vh] flex-col">
      <div className="flex items-center space-x-2 mb-2">
        <Switch
          id="frontend-val"
          checked={enableFrontValidation}
          onCheckedChange={(checked) => setEnableFrontValidation(checked)}
        />
        <Label htmlFor="frontend-val">Enable frontend validation</Label>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Info Collection</CardTitle>
          <CardDescription>
            Please enter the required information below
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InfoForm enableFrontValidation={enableFrontValidation} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoFormPage;
