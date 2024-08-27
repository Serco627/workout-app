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
                <MuscleGroupList>
                  {exercise.muscleGroups.map((muscle, index) => {
                    return <MuscleBadge key={index}>{muscle}</MuscleBadge>;
                  })}
                </MuscleGroupList>
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
  gap: 1.5rem;

  /* Für große Bildschirme (z.B. Desktop) - max. 3 Spalten */
  grid-template-columns: repeat(3, 1fr);

  /* Für mittlere Bildschirme (z.B. Tablet) - max. 2 Spalten */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Für kleine Bildschirme (z.B. Smartphones) - max. 1 Spalte */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// const ExerciseList = styled.ul`
//   list-style: none;
//   padding: 0;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 1.5rem;
// `;

const ExerciseCard = styled.li`
  background-color: #f0f4f8;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25rem;
  width: 100%;
  /* width: 18.75rem; */
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

const MuscleGroupList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const MuscleBadge = styled.li`
  background-color: #3498db;
  color: #ffffff;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.85em;
`;
