import axios from "axios";
import { CreatedReview } from "../utils/types";
import { apiUrl } from "../config";

async function postReview(review: CreatedReview, authHeader: string) {
  try {
    axios.post(`${apiUrl}/reviews`, review, {
      headers: {
        Authorization: authHeader,
      },
    });
  } catch (error) {
    console.error(`Error inserting review: ${error}`);
  }
}

const reviewService = {
  postReview,
};

type ReviewService = typeof reviewService;

export default reviewService;
export type { ReviewService };
