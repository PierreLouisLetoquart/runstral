"use client";

import { z } from "zod";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { WandSparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { generateSchema } from "@/lib/schemas";
import { useUserContext } from "@/contexts/user-context";
import { generateSession } from "@/app/actions";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function NewSessionCard() {
  const { sentence } = useUserContext();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof generateSchema>>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      user_context: "",
      session_mood: "",
      session_prompt: "",
      date: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof generateSchema>) {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append(
        "user_context",
        sentence ||
          "I am a beginner, motivated to grow stronger and faster with every step.",
      );
      formData.append("session_mood", values.session_mood);
      formData.append("session_prompt", values.session_prompt);

      const formattedDate = format(values.date, "yyyy/MM/dd");
      formData.append("date", formattedDate);

      await generateSession(formData);
    } catch (error) {
      console.error("Failed to generate session:", error);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 p-[8px] border border-border rounded-[18px]"
      >
        <div className="flex items-center gap-[8px]">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal  rounded-[10px]",
                          !field.value && "text-muted-foreground",
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
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="session_mood"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full rounded-[10px] h-8 px-3 text-xs">
                      <SelectValue placeholder="Select a mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="tired">Tired/Ready</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="energized">
                          Tired/Fatigued
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-3">
          <FormField
            control={form.control}
            name="session_prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="border-none outline-none focus-visible:outline-none focus-visible:ring-0 shadow-none"
                    placeholder="Describe your session..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="rounded-[10px]">
            Generate
            <WandSparkles className="pl-1.5 size-[1rem]" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
