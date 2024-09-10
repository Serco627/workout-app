import { exercises, exercises as initialExercises } from "@/lib/exercises";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import FilterSection from "@/components/FilterSection/FilterSection";
import { useState } from "react";

export default function HomePage() {
  const [exercises, setExercises] = useState(initialExercises);
  const [filters, setFilters] = useState([]);
  const [filterMode, setFilterMode] = useState(false);

  function filterExercises(exercises, filters) {
    const filteredArray = exercises.filter((exercise) => {
      return filters.every((filter) => exercise.muscleGroups.includes(filter));
    });
    return filteredArray;
  }

  function onAddFilter(newFilter) {
    setFilters([...filters, newFilter]);
  }

  function handleDisableFilter(deleteFilter) {
    const newFiltersArray = filters.filter((filter) => filter !== deleteFilter);
    setFilters(newFiltersArray);
  }

  function handleClear() {
    setFilters([]);
    setExercises(initialExercises);
  }

  return (
    <StyledFlexWrapper>
      <ExerciseList>
        <StyledFilterWrapper>
          <StyledFilterButton onClick={() => setFilterMode(!filterMode)}>
            {filterMode ? "Filter ▲" : "Filter ▼"}
          </StyledFilterButton>
          {filterMode ? (
            <FilterSection
              filters={filters}
              onAddFilter={onAddFilter}
              handleDisableFilter={handleDisableFilter}
              handleClear={handleClear}
            />
          ) : null}
        </StyledFilterWrapper>
        {filterExercises(exercises, filters).map((exercise) => (
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 1rem;
  display: grid;
  gap: 1.5rem;
  place-items: center;

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
  min-width: 290px;

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
  background: #00000066;
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

const StyledFilterButton = styled.button`
  display: flex;
  align-items: flex-end;
  border-radius: 5px;
  border: 2px solid #3498db;
  background-color: #ffffff;
  color: #3498db;
  padding-top: 2px;
  margin-bottom: 1rem;

  &:hover {
    background-color: #3498db;
    color: #ffffff;
  }
`;

const StyledFilterWrapper = styled.aside`
  min-width: 290px;
  width: 100%;
  margin: 0;
`;

export {
  MuscleBadge,
  MuscleGroupList,
  BackgroundImageWrapper,
  StyledImage,
  ExerciseCard,
};
