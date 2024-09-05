import { exercises } from "@/lib/exercises";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

export default function HomePage() {
  return (
    <StyledFlexWrapper>
      <ExerciseList>
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id}>
            <StyledLink href={`/exercises/${exercise.id}`}>
              <BackgroundImageWrapper>
                <StyledImage
                  src={exercise.imageUrl}
                  alt={exercise.name}
                  layout="fill"
                  objectFit="cover"
                  quality={75}
                  priority={exercise.id === 0}
                />
              </BackgroundImageWrapper>
              <ContentOverlay>
                <ExerciseName>{exercise.name}</ExerciseName>
                <MuscleGroupList>
                  {exercise.muscleGroups.map((muscle, index) => (
                    <MuscleBadge key={index}>{muscle}</MuscleBadge>
                  ))}
                </MuscleGroupList>
              </ContentOverlay>
            </StyledLink>
          </ExerciseCard>
        ))}
      </ExerciseList>
    </StyledFlexWrapper>
  );
}

const StyledFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1.5rem;

  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ExerciseCard = styled.li`
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

  &:hover {
    background-color: #f0f8ff;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }
`;

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const StyledImage = styled(Image)`
  z-index: 1;
  border-radius: 10px;
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 2;
  padding: 15px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  width: 100%;
`;

const ExerciseName = styled.h3`
  color: #fff;
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
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.85em;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export {
  MuscleBadge,
  MuscleGroupList,
  BackgroundImageWrapper,
  StyledImage,
  ExerciseCard,
};
