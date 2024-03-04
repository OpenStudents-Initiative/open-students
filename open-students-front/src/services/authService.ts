import axios from "axios";
import { apiUrl } from "../config";
import type { UserSessionData } from "../utils/types";

interface AuthResponse {
  token: string;
  userInfo: UserSessionData;
}

interface ErrorResponse {
  detail: string;
}

export async function fetchLogin(
  email: string,
  password: string
): Promise<AuthResponse | ErrorResponse> {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      username: email, // No, this is not a bad logic error, standard says to use username key
      password: password,
    });

    if (response.status !== 200) {
      // This is somewhat redundant with the catch block for handling HTTP errors,
      // but it's kept here for explicit handling of non-200 successful responses
      const errorResponse: ErrorResponse = {
        detail: "Unexpected response status code.",
      };
      return errorResponse;
    }

    return response.data as AuthResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponse: ErrorResponse = {
        detail:
          error.response.data.detail ||
          "An error occurred during the login process.",
      };
      return errorResponse;
    } else {
      const errorResponse: ErrorResponse = {
        detail: "Network error or server is not responding.",
      };
      return errorResponse;
    }
  }
}
