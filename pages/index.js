import { exercises } from "@/lib/exercises";
import { StyledFlexWrapper, ExerciseList } from "/styledComponents.js";
import Exercise from "../components/Exercise/Exercise";

export default function HomePage() {
  return (
    <StyledFlexWrapper>
      <ExerciseList>
        {exercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </ExerciseList>
    </StyledFlexWrapper>
  );
}
