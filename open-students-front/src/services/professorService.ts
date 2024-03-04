import axios from "axios";
import { Course, Professor, Review } from "../utils/types";
import { apiUrl } from "../config";

export async function fetchProfessorsWithKeys(keys: string[]) {
  try {
    const { data } = await axios.get<Partial<Professor[]>>(
      `${apiUrl}/professors`,
      {
        params: {
          keys: keys.reduce((acc, current) => acc + "," + current),
        },
      }
    );

    return data;
  } catch (e) {
    console.error(`Error fetching professors with keys ${keys}: ${e}`);
    throw e;
  }
}

export async function fetchProfessorById(id: string | undefined) {
  if (!id) {
    throw new Error("No id provided");
  }
  try {
    const { data } = await axios.get<Professor>(`${apiUrl}/professors/${id}`);
    return data;
  } catch (e) {
    console.error(`Error fetching professor: ${e}`);
    throw e;
  }
}

export async function fetchProfessorReviews(id: string | undefined) {
  if (!id) {
    throw new Error("No id provided");
  }
  try {
    const { data } = await axios.get<Review[]>(
      `${apiUrl}/professors/${id}/reviews`
    );

    return data;
  } catch (e) {
    console.error(`Error fetching reviews: ${e}`);
    throw e;
  }
}

export async function fetchProfessorCourses(id: string) {
  try {
    const courses = (
      await axios.get<Course[]>(`${apiUrl}/professors/${id}/courses`)
    ).data;
    return courses;
  } catch (e) {
    console.error(`Error fetching courses: ${e}`);
    throw e;
  }
}
