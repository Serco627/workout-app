import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

// WorkoutsList.js Components
export const Filter = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  bottom: 0;
  z-index: 1;
  background: #00000099;
  padding: 1rem 3rem;
`;

export const WorkoutList = styled.section`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
`;

export const StyledHeadline = styled.h2`
  background: #fff;
  padding: 0.5rem;
  margin: 0;
  text-align: center;
`;

export const NoWorkoutsMessage = styled.div`
  font-size: 1.25rem;
  color: #3498db;
  text-align: center;
  margin: 2rem 0;
  padding: 1rem 1rem 1.5rem 1rem;
  background-color: #fefefe;
  border: 2px solid #3498db;
  border-radius: 5px;
`;

export const ToggleButton = styled.button`
  background: #e67e22;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem 0;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background: #d35400;
  }
`;

export const CreateWorkoutButton = styled.button`
  display: flex;
  align-items: flex-end;
  border-radius: 5px;
  border: 2px solid #3498db;
  background-color: #ffffff;
  color: #3498db;
  padding-top: 2px;
  margin-bottom: 1rem;
  align-self: start;

  &:hover {
    background-color: #3498db;
    color: #ffffff;
  }
`;

export const CancelCreateButton = styled(CreateWorkoutButton)`
  background-color: #dc3545;
  transform: rotate(45deg);

  &:hover {
    background-color: #c82333;
  }
`;

export const FlexWrapWorkouts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// HomePage Components
export const StyledFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  max-width: 1050px;
  margin: 0 auto;
`;

export const ExerciseList = styled.ul`
  list-style: none;
  gap: 1.5rem;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const ExerciseCard = styled.li`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 25rem;
  width: 300px;

  &:hover {
    background-color: #f0f8ff;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }
`;

export const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const StyledImage = styled(Image)`
  z-index: 1;
  border-radius: 10px;
`;

export const ContentOverlay = styled.div`
  position: relative;
  z-index: 2;
  padding: 15px;
  background: #00000066;
  color: #fff;
  width: 100%;
`;

export const ExerciseName = styled.h3`
  color: #fff;
  margin: 10px 0;
`;

export const MuscleGroupList = styled.ul`
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

export const MuscleBadge = styled.li`
  background-color: #3498db;
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.85em;
  font-weight: bold;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

// ExerciseDetailsPage Components
export const ExerciseDetailsImage = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px #0000001a;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 25rem;
  width: 100%;
`;

export const Container = styled.div`
  text-align: center;
  margin: 20px;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const InstructionsList = styled.ol`
  counter-reset: custom-counter;
  list-style: none;
  list-style-position: inside;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  margin-top: 2rem;
`;

export const InstructionItem = styled.li`
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
    color: #fff;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

export const StyledExerciseName = styled.h2`
  font-size: 2.1rem;
  color: #3498db;
  border-radius: 10px;
  padding: 5px 50px 5px 50px;
  margin-bottom: 15px;
  margin-top: 10px;
  border: 2px solid #3498db;
  text-transform: uppercase;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledFilterButton = styled.button`
  display: flex;
  align-items: flex-end;
  border-radius: 5px;
  border: 2px solid #3498db;
  background-color: #ffffff;
  color: #3498db;
  padding-top: 2px;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #3498db;
    color: #ffffff;
  }
`;

export const StyledFilterWrapper = styled.aside`
  min-width: 300px;
  width: 100%;
  margin: 0;
  max-width: 932px;
`;
