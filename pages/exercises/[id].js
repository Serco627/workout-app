// pages/exercises/[id].js
import { useRouter } from "next/router";
import { exercises } from "@/lib/exercises";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

// Define a styled component for the container
const Container = styled.div`
  text-align: center;
  margin: 20px;
`;

// Define a styled component for the exercise image
const ExerciseImage = styled(Image)`
  border-radius: 10px;
`;

const BackLinkSvg = styled.svg`
  padding: 10px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export default function ExerciseDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const currentExercise = exercises.find((exercise) => exercise.id === id);

  if (!currentExercise) {
    return <p>Exercise not found</p>;
  }

  return (
    <Container>
      <HeaderWrapper>
        <Link href="/" alt="Back to homepage">
          <BackLinkSvg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0000ff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </BackLinkSvg>
        </Link>
      </HeaderWrapper>
      <h1>{currentExercise.name}</h1>
      <ExerciseImage
        src={currentExercise.imageUrl}
        alt={currentExercise.name}
        width={250}
        height={250}
      />
      <h2>Targeted Muscle Groups</h2>
      <p>{currentExercise.muscleGroups.join(", ")}</p>
      <h2>Instructions</h2>
      <p>{currentExercise.instructions.join(" ")}</p>
    </Container>
  );
}
