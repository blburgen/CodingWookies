"use client";

import { useEffect } from "react";
import { clearFlash } from "@/app/lib/flash";

export default function FlashCleaner() {
  useEffect(() => {
    clearFlash();
  }, []);
  return null;
}
