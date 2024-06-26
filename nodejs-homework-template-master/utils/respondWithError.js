/**
 //! Handles Error Cases:
 */

import { STATUS_CODES } from "./constants.js";

export function respondWithError(res, error) {
  console.error(error);
  res.status(STATUS_CODES.error).json({ message: `${error}` });
}
