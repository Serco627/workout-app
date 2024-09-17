import { exercises as initialExercises } from "@/lib/exercises";
import { useState } from "react";
import {
  StyledFlexWrapper,
  ExerciseList,
  StyledFilterButton,
  StyledFilterWrapper,
  StyledHeadline,
} from "@/styledComponents";
import Exercise from "@/components/Exercise/Exercise";
import FilterSection from "@/components/FilterSection/FilterSection";

export default function Exercises() {
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
      <StyledHeadline>YOUR EXERCISES</StyledHeadline>
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
        {!filterExercises(exercises, filters).length ? (
          <p>No exercises found. Please search for different muscle groups.</p>
        ) : null}
        {filterExercises(exercises, filters).map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </ExerciseList>
    </StyledFlexWrapper>
  );
}
