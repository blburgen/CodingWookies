"use client";
// I don't know another way to do it like this..

import { useEffect } from "react";
import { clearFlash } from "@/app/lib/flash";

export default function FlashCleaner() {
  useEffect(() => {
    clearFlash();
  }, []);
  return null;
}
