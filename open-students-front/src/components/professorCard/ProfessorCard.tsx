import * as React from "react";
import professorAvatar from "../../assets/professorAvatar.png";
import ProfessorCardRatingGradeDifficulty from "./ProfessorCardRatingGradeDifficulty";
import ProfessorCardCreateReviewButton from "./ProfessorCardCreateReviewButton";
import ProfessorCardNameUniversityDependency from "./ProfessorCardNameUniversityDependency";
import { Card, CardContent, CardHeader } from "../ui/card";

interface Professor {
  name: string;
  university: string;
  dependency: string;
  averageRating: number;
  averageCourseGrade: number;
  averageDifficultyLevel: number;
}

interface ProfessorCardProps {
  professor: Professor | undefined;
  makeReview: React.MouseEventHandler<HTMLElement>;
}

const ProfessorCard = ({ professor, makeReview }: ProfessorCardProps) => (
  <Card className="text-center min-w-[320px] lg:max-w-[320px]">
    <CardHeader>
      <img
        src={professorAvatar}
        alt="professorAvatar"
        className="aspect-square"
      />
    </CardHeader>

    <CardContent>
      <ProfessorCardNameUniversityDependency
        name={professor!.name}
        university={professor!.university}
        dependency={professor!.dependency}
      />
      <ProfessorCardRatingGradeDifficulty
        rating={professor!.averageRating}
        grade={professor!.averageCourseGrade}
        difficulty={professor!.averageDifficultyLevel}
      />
      <ProfessorCardCreateReviewButton makeReview={makeReview} />
    </CardContent>
  </Card>
);

export default ProfessorCard;
