import axios from "axios";
import { Course, Professor, Review } from "../utils/types";
import { apiUrl } from "../config";

async function fetchProfessorsWithKeys(keys: string[]) {
  try {
    const professors: any[] = (
      await axios.get(`${apiUrl}/professors`, {
        params: {
          keys: keys.reduce((acc, current) => acc + "," + current),
        },
      })
    ).data;
    return professors;
  } catch (e) {
    console.error(`Error fetching professors with keys ${keys}: ${e}`);
    return [];
  }
}

async function fetchProfessorById(id: string) {
  try {
    const professor: Professor = (await axios.get(`${apiUrl}/professors/${id}`))
      .data;
    return professor;
  } catch (e) {
    console.error(`Error fetching professor: ${e}`);
    return null;
  }
}

async function fetchProfessorReviews(id: string) {
  try {
    const reviews: Review[] = (
      await axios.get(`${apiUrl}/professors/${id}/reviews`)
    ).data;
    return reviews;
  } catch (e) {
    console.error(`Error fetching reviews: ${e}`);
    return [];
  }
}

async function fetchProfessorCourses(id: string) {
  try {
    const courses: Course[] = (
      await axios.get(`${apiUrl}/professors/${id}/courses`)
    ).data;
    return courses;
  } catch (e) {
    console.error(`Error fetching courses: ${e}`);
    return [];
  }
}

const professorService = {
  fetchProfessorsWithKeys,
  fetchProfessorById,
  fetchProfessorCourses,
  fetchProfessorReviews,
};

type ProfessorService = typeof professorService;

export default professorService;
export type { ProfessorService };
