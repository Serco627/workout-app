import { muscleGroups } from "@/lib/muscleGroups";
import styled from "styled-components";

export default function FilterSection({
  onAddFilter,
  filters,
  handleDisableFilter,
  handleClear,
}) {
  return (
    <StyledFilter>
      <StyledUl>
        {muscleGroups.map((muscle, index) => {
          return (
            <StyledMuscle
              key={index}
              onClick={() => onAddFilter(muscle)}
              $display={filters.includes(muscle) ? "display: none;" : null}
            >
              {muscle}
            </StyledMuscle>
          );
        })}
      </StyledUl>
      <hr />
      <StyledUl>
        {!filters.length ? <p>No filters yet, add some to start.</p> : null}
        {filters.map((filter, index) => {
          return (
            <StyledMuscle key={index}>
              <span onClick={() => handleDisableFilter(filter)}>❌</span>{" "}
              {filter}
            </StyledMuscle>
          );
        })}
      </StyledUl>
      <hr />
      <button onClick={handleClear}>Clear Filters</button>
    </StyledFilter>
  );
}

const StyledMuscle = styled.li`
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  ${(props) => props.$display}
`;

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const StyledFilter = styled.aside`
  border: 1px solid black;
  padding: 1rem;
`;
