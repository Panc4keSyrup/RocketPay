import { near } from "near-sdk-js";

export function promiseResult(): { result: string; success: boolean } {
  let result, success;

  try {
    result = near.promiseResult(0);
    success = true;
  } catch {
    result = undefined;
    success = false;
  }

  return { result, success };
}
