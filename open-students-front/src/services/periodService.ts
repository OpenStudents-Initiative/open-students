import axios from "axios";
import { apiUrl } from "../config";
import type { Period } from "../utils/types";

export async function fetchAllPeriods() {
  try {
    const { data } = await axios.get<Period[]>(`${apiUrl}/periods`);
    return data;
  } catch (e) {
    console.error(`Error while fetching periods: ${e}`);
    throw e;
  }
}
