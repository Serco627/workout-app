// pages/exercises/[id].js
import { useRouter } from "next/router";
import { exercises } from "@/lib/exercises";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { MuscleBadge } from "..";
import { MuscleGroupList } from "..";

const Container = styled.div`
  text-align: center;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExerciseImage = styled(Image)`
  border-radius: 10px;
`;

const BackLinkSvg = styled.svg`
  padding: 10px;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const InstructionsList = styled.ol`
  counter-reset: custom-counter;
  list-style: none;
  padding-left: 0;
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
            stroke="#3498db"
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
      <h2>Muscles In The Spotlight</h2>

      <MuscleGroupList>
        {currentExercise.muscleGroups.map((muscle, index) => (
          <MuscleBadge key={index}>{muscle}</MuscleBadge>
        ))}
      </MuscleGroupList>

      {/* <p>{currentExercise.muscleGroups.join(", ")}</p> */}

      <h2>How To Crush It</h2>
      <InstructionsList>
        {currentExercise.instructions.map((instruction) => {
          return <InstructionItem>{instruction}</InstructionItem>;
        })}
      </InstructionsList>
    </Container>
  );
}
