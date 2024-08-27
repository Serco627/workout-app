import { exercises } from "@/lib/exercises";
import Image from "next/image";
import styled from "styled-components";

export default function HomePage() {
  return (
    <>
      <Header>
        <h1>GymLog</h1>
        <h2>Your Ultimate Fitness Platform</h2>
      </Header>
      <Main>
        <ExerciseList>
          {exercises.map((exercise) => {
            return (
              <ExerciseCard key={exercise.id}>
                <ImageContainer>
                  <StyledImage
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    layout="fill"
                  />
                </ImageContainer>
                <ExerciseName>{exercise.name}</ExerciseName>
                <MuscleGroups>
                  {exercise.muscleGroups.map((muscle, index) => {
                    return <Muscle key={index}>{muscle}</Muscle>;
                  })}
                </MuscleGroups>
              </ExerciseCard>
            );
          })}
        </ExerciseList>
      </Main>
    </>
  );
}

const Header = styled.header`
  text-align: center;
  margin-bottom: 1rem;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 1.5rem;
`;

const ExerciseCard = styled.li`
  background-color: #f0f4f8;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50vh;
  width: 80vw;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ExerciseName = styled.h3`
  color: #2c3e50;
  margin: 10px 0;
`;

const MuscleGroups = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
`;

const Muscle = styled.span`
  background-color: #3498db;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.85em;
`;
