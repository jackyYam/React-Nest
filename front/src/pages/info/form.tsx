import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

import axios from "axios";
import type { responseError } from "./types";

const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name is too long" }),
    age: z.coerce
      .number()
      .int()
      .min(1, { message: "Age is required" })
      .max(150, { message: "Age is too high" }),
    married: z.string().optional(),
    birthDate: z.date({
      required_error: "You need to provide your birthday.",
    }),
  })
  .refine((data) => !(data.age >= 18 && data.married === undefined), {
    message: "You must provide marital status if you are 18 or older",
    path: ["married"],
  })
  .refine(
    (data) => {
      console.log(data);
      const birthDate = new Date(data.birthDate);
      const now = new Date();
      var age = now.getFullYear() - birthDate.getFullYear();
      if (now.getMonth() < birthDate.getMonth()) {
        age--;
      } else if (
        now.getMonth() === birthDate.getMonth() &&
        now.getDate() < birthDate.getDate()
      ) {
        age--;
      }
      return age === data.age;
    },
    { message: "Age and birthdate do not match", path: ["birthDate"] }
  );

const InfoForm = ({
  enableFrontValidation,
}: {
  enableFrontValidation: boolean;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: enableFrontValidation ? zodResolver(FormSchema) : undefined,
    defaultValues: {
      name: "",
      age: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!enableFrontValidation) {
      axios
        .post("http://localhost:3001/info/complete-info-validate", data)
        .catch((e) => {
          const formErrors = e.response.data.errors as responseError[];
          formErrors.forEach((error) => {
            form.setError(error.path[0], {
              message: error.message,
            });
          });
        });
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Age</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Age here"
                  {...field}
                  type="number"
                  value={field.value === 0 ? "" : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="married"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Are you married?</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your marriage Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"yes"}>Yes</SelectItem>
                  <SelectItem value={"no"}>No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold">Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={2024}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default InfoForm;
