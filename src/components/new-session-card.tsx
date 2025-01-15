"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { WandSparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
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
  return (
    <div className="space-y-3 p-[8px] border border-border rounded-[18px]">
      <div className="flex items-center gap-[8px]">
        <DatePicker />
        <Select>
          <SelectTrigger className="w-full rounded-[10px] h-8 px-3 text-xs">
            <SelectValue placeholder="Select a mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="tired">Tired/Ready</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="energized">Tired/Fatigued</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <Input
          className="border-none outline-none focus-visible:outline-none focus-visible:ring-0 shadow-none"
          placeholder="Describe your session..."
        />
        <Button className="rounded-[10px]">
          Generate
          <WandSparkles className="pl-1.5 size-[1rem]" />
        </Button>
      </div>
    </div>
  );
}

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className={cn(
            "w-[240px] justify-start text-left font-normal rounded-[10px]",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
