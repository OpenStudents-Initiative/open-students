import axios from "axios";
import { apiUrl } from "../config";
import type { UserSessionData } from "../utils/types";

interface AuthResponse {
  token: string;
  userInfo: UserSessionData;
}

async function fetchLogin(email: string, password: string) {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      username: email, // No, this is not a bad logic error, standard says to use username key
      password: password,
    });
    return response.data as AuthResponse;
  } catch (e) {
    console.error(`Error while fetching login endpoint: ${e}`);
    return null;
  }
}

const authService = {
  fetchLogin,
};

type AuthService = typeof authService;

export default authService;
export type { AuthService };
