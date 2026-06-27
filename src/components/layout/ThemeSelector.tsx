"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const themes = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

function subscribe() {
  return () => undefined;
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ThemeSelector() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const { setTheme, theme } = useTheme();

  return (
    <Select
      value={mounted ? theme : "system"}
      onValueChange={setTheme}
      disabled={!mounted}
    >
      <SelectTrigger
        aria-label="Theme"
        className="w-[8.25rem]"
        size="sm"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent align="end">
        {themes.map(({ value, label, Icon }) => (
          <SelectItem key={value} value={value}>
            <Icon className="size-4" />
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
