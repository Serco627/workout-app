import { useRouter } from "next/router";
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
import styled from "styled-components";

const ImageWrapper = styled.div`
  padding: 20px;
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
      <MuscleGroupList>
        <>
          <h3>Muscles In The Spotlight</h3>
        </>
        {currentExercise.muscleGroups.map((muscle, index) => (
          <MuscleBadge key={`${currentExercise.id}-muscle-${index}`}>
            {muscle}
          </MuscleBadge>
        ))}
      </MuscleGroupList>
      <ImageWrapper>
        <ExerciseDetailsImage>
          <BackgroundImageWrapper>
            <StyledImage
              src={currentExercise.imageUrl}
              alt={currentExercise.name}
              layout="fill"
              objectFit="cover"
              quality={75}
            />
          </BackgroundImageWrapper>
        </ExerciseDetailsImage>
      </ImageWrapper>

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
    </Container>
  );
}
