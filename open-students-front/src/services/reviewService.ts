import axios from "axios";
import { Review, ApiResponse, CreatedReview } from "../utils/types";
import { apiUrl } from "../config";

export const postReview = (review: CreatedReview, authHeader: string) => {
  return axios.post<ApiResponse<Review>>(`${apiUrl}/reviews`, review, {
    headers: {
      Authorization: authHeader,
    },
  });
};
