import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { exercises } from "@/lib/exercises";
import {
  ExerciseDetailsImage,
  Container,
  InstructionsList,
  InstructionItem,
  StyledExerciseName,
  MuscleGroupList,
  MuscleBadge,
  BackgroundImageWrapper,
  StyledImage,
} from "/styledComponents";

const StyledIdImage = styled(StyledImage)`
  margin-top: 20px;
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
      <StyledExerciseName>{currentExercise.name}</StyledExerciseName>
      <h3>Muscles In The Spotlight</h3>
      <MuscleGroupList>
        {currentExercise.muscleGroups.map((muscle, index) => (
          <MuscleBadge key={`${currentExercise.id}-muscle-${index}`}>
            {muscle}
          </MuscleBadge>
        ))}
      </MuscleGroupList>
      <ExerciseDetailsImage>
        <BackgroundImageWrapper>
          <StyledIdImage
            src={currentExercise.imageUrl}
            alt={currentExercise.name}
            layout="fill"
            objectFit="cover"
            quality={75}
          />
        </BackgroundImageWrapper>
      </ExerciseDetailsImage>

      <InstructionsList>
        <h3>How To Crush It</h3>
        {currentExercise.instructions.map((instruction, index) => {
          return (
            <InstructionItem key={`${currentExercise.id}-instruction-${index}`}>
              {instruction}
            </InstructionItem>
          );
        })}
      </InstructionsList>
      <Link
        href={`/exercises/#${currentExercise.id}`}
        aria-label="back to homepage"
      >
        <BackLinkSvg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3498db"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </BackLinkSvg>
      </Link>
    </Container>
  );
}

const BackLinkSvg = styled.svg`
  position: sticky;
  left: 5px;
  bottom: 75px;
  padding: 8px;
  z-index: 3;
  border: 2px solid #3498db;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px #00000033;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: #f0f8ff;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }
`;
