import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InfoForm from "./form";

const InfoFormPage = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Info Collection</CardTitle>
          <CardDescription>
            Please enter the required information below
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InfoForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoFormPage;
