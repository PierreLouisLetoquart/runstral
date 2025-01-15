"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  prompt: z
    .string()
    .min(12, {
      message: "Prompt must be at least 12 characters.",
    })
    .max(69, {
      message: "Prompt must not exceed 69 characters.",
    }),
});

export function NewSessionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 p-1 pr-1.5 rounded-full border border-input">
                <FormControl>
                  <Input
                    className="border-none focus-visible:ring-0 p-0 pl-4 shadow-none"
                    placeholder="A recovery run..."
                    {...field}
                  />
                </FormControl>
                <Button className="rounded-full" size={"sm"} type="submit">
                  Generate
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
