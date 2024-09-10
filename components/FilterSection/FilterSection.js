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
      <StyledRuler />
      <StyledUl>
        {!filters.length ? <p>No filters yet, add some to start.</p> : null}
        {filters.map((filter, index) => {
          return (
            <StyledFilteredMuscle key={index}>
              {filter}&nbsp;&nbsp;
              <span onClick={() => handleDisableFilter(filter)}>×</span>{" "}
            </StyledFilteredMuscle>
          );
        })}
      </StyledUl>
      <StyledRuler />
      <StyledButton onClick={handleClear}>CLEAR</StyledButton>
    </StyledFilter>
  );
}

const StyledMuscle = styled.li`
  color: #3498db;
  background-color: #ffffff;
  border: 1px solid #3498db;
  border-radius: 5px;
  margin: 5px;
  padding: 4px;
  font-size: 0.85em;
  font-weight: bold;
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
  width: 100%;
  min-width: 290px;
  border: 2px solid #3498db;
  border-radius: 10px;
  padding: 0.5rem;
`;

const StyledFilteredMuscle = styled.span`
  background-color: #3498db;
  border-radius: 5px;
  color: #ffffff;
  padding: 5px;
  margin: 5px;
`;

const StyledButton = styled.button`
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 4px;
  margin: 5px;
  font-size: 0.85em;
  font-weight: bold;
`;

const StyledRuler = styled.hr`
  background: #3498db;

  align-self: flex-end;
  height: 2px;
  border: 1px;
  border-radius: 3px;
`;
