import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 숫자를 지정된 자릿수로 포맷 (예: 1 -> "01", 23 -> "23")
 * @param num - 포맷할 숫자
 * @param digits - 자릿수 (기본 2)
 */
export function formatNumber(num: number, digits = 2): string {
  return num.toString().padStart(digits, "0");
}
