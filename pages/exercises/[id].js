import { useRouter } from "next/router";
import { exercises } from "@/lib/exercises";
import Link from "next/link";
import styled from "styled-components";
import {
  MuscleBadge,
  MuscleGroupList,
  BackgroundImageWrapper,
  StyledImage,
} from "..";

const ExerciseDetailsImage = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 25rem;
  width: 100%;
`;

const Container = styled.div`
  text-align: center;
  margin: 20px;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const InstructionsList = styled.ol`
  counter-reset: custom-counter;
  list-style: none;
  list-style-position: inside;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  margin-top: 2rem;
`;

const InstructionItem = styled.li`
  position: relative;
  padding-left: 50px;
  margin-bottom: 15px;
  text-align: left;

  &::before {
    content: counter(custom-counter);
    counter-increment: custom-counter;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #3498db;
    color: #ffffff;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

const StyledExerciseName = styled.h2`
  font-size: 2rem;
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
      {/* <HeaderWrapper>
        <Link href="/">
          <BackLinkSvg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
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
      </HeaderWrapper> */}
      <StyledExerciseName>{currentExercise.name}</StyledExerciseName>
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
      <h3>Muscles In The Spotlight</h3>

      <MuscleGroupList>
        {currentExercise.muscleGroups.map((muscle, index) => (
          <MuscleBadge key={`${currentExercise.id}-muscle-${index}`}>
            {muscle}
          </MuscleBadge>
        ))}
      </MuscleGroupList>

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
