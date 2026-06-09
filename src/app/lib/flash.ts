"use server";

import { cookies } from "next/headers";

const FLASH_COOKIE = "__handcrafted_haven__";

export type FlashType = "success" | "error" | "warning" | "info";

export interface FlashMap {
  success: string[];
  error: string[];
  warning: string[];
  info: string[];
}

const defaultMap: FlashMap = {
  success: [],
  error: [],
  warning: [],
  info: [],
};

export async function getFlashAll(): Promise<FlashMap> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(FLASH_COOKIE)?.value;

  const map: FlashMap = { success: [], error: [], warning: [], info: [] };
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      for (const key of Object.keys(defaultMap)) {
        map[key as FlashType] = Array.isArray(parsed[key])
          ? (parsed[key] as string[])
          : [];
      }
    } catch {
      // ignore
    }
  }

  return map;
}

export async function getFlash(type: FlashType): Promise<string[]> {
  const map = await getFlashAll();
  return map[type] || [];
}

export async function getFlatFlash(): Promise<{ type: string; text: string }[]> {
  const flash = await getFlashAll();
  const flat: { type: string; text: string }[] = [];
  for (const [type, arr] of Object.entries(flash) as [string, unknown][]) {
    if (Array.isArray(arr)) {
      for (const text of arr) {
        flat.push({ type, text });
      }
    }
  }
  return flat;
}

export async function setFlash(type: FlashType, message: string): Promise<void> {
  const cookieStore = await cookies();

  const existingRaw = cookieStore.get(FLASH_COOKIE)?.value;
  let map: FlashMap = defaultMap;
  try {
    if (existingRaw) map = JSON.parse(existingRaw) as FlashMap;
  } catch {
    // ignore
  }

  if (!map[type]) {
    map[type] = [];
  }
  map[type].push(message);

  cookieStore.set(FLASH_COOKIE, JSON.stringify(map), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30,
  });
}

export async function clearFlash(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(FLASH_COOKIE, JSON.stringify(defaultMap), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
