import styled from "styled-components";
import { useState } from "react";
import Form from "../WorkoutFom/WorkoutForm";
import { uid } from "uid";
import { CreateWorkoutButton } from "@/styledComponents";
import Image from "next/image";

export default function Workout({
  workout,
  handleDelete,
  handleEditWorkout,
  spotlightMode,
}) {
  const [showDetails, setShowDetails] = useState({});
  const [deleteMode, setDeleteMode] = useState(false);
  const isDetailsVisible = showDetails[workout.id] || false;
  const [editMode, setEditMode] = useState(false);

  const toggleDetails = (workoutId) => {
    setShowDetails((prev) => ({
      ...prev,
      [workoutId]: !prev[workoutId],
    }));
  };

  function onDelete() {
    toggleDeleteMode();
    handleDelete(workout.id);
  }

  function toggleDeleteMode() {
    setDeleteMode(!deleteMode);
  }

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function onSaveWorkout(name, currentExercises) {
    handleEditWorkout(name, currentExercises, workout.id);
  }

  return (
    <>
      {editMode ? (
        <div>
          <Filter onClick={toggleEditMode}></Filter>
          <Form
            formTitle="Edit your Workout"
            toggleMode={toggleEditMode}
            onSaveWorkout={onSaveWorkout}
            workout={workout}
            editMode={editMode}
          />
        </div>
      ) : null}
      <WorkoutCard
        $spotlightPadding={
          spotlightMode
            ? "padding-top: 0; border-top: 1px solid #0000001a;"
            : null
        }
      >
        {deleteMode ? (
          <ModalOverlay onClick={toggleDeleteMode}>
            <ModalContent onClick={(event) => event.stopPropagation()}>
              <p>
                Are you sure you want to delete <br />
                <br /> &quot;{workout.name}&quot;?
              </p>
              <YesButton onClick={onDelete}>YES</YesButton>
              <ModalButton onClick={toggleDeleteMode}>CANCEL</ModalButton>
            </ModalContent>
          </ModalOverlay>
        ) : null}
        {spotlightMode ? null : (
          <StyledEditDeleteWrapper>
            <StyledButtonDelete onClick={toggleDeleteMode}>
              <StyledSvg
                src="/trash.svg"
                width={25}
                height={25}
                alt="delete button"
              />
            </StyledButtonDelete>
            <StyledButtonEdit onClick={toggleEditMode}>
              {" "}
              <StyledSvg
                src="/pencil.svg"
                width={25}
                height={25}
                alt="edit button"
              />
            </StyledButtonEdit>
          </StyledEditDeleteWrapper>
        )}
        <h2>{workout.name}</h2>

        <SpotlightHeading>Muscles In The Spotlight:</SpotlightHeading>
        <MuscleGroupList>
          {workout.muscleGroups.map((muscle) => (
            <MuscleBadge key={muscle}>{muscle}</MuscleBadge>
          ))}
        </MuscleGroupList>

        {spotlightMode ? null : (
          <ToggleButton onClick={() => toggleDetails(workout.id)}>
            {isDetailsVisible ? "Show Less" : "Show More"}
          </ToggleButton>
        )}

        {isDetailsVisible && (
          <ExerciseList>
            <ExerciseItemHeadline>
              <ExerciseName>EXERCISE</ExerciseName>
              <ExerciseDetails>SETS</ExerciseDetails>
              <ExerciseDetails>REPS</ExerciseDetails>
            </ExerciseItemHeadline>

            {workout.exercises.map((exercise) => {
              return (
                <ExerciseItem key={uid()}>
                  <ExerciseName>{exercise.name}</ExerciseName>
                  <ExerciseDetails>{exercise.sets}</ExerciseDetails>
                  <ExerciseDetails>{exercise.reps}</ExerciseDetails>
                </ExerciseItem>
              );
            })}
          </ExerciseList>
        )}
      </WorkoutCard>
    </>
  );
}

const StyledSvg = styled(Image)`
  padding: 0;
  margin: 0;
`;

const StyledEditDeleteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButtonDelete = styled(CreateWorkoutButton)`
  margin: 0;
  padding: 0;
  color: #c0392b;
  border: 2px solid #c0392b;
  background-color: #c0392b;
  box-shadow:
    0 4px 8px #0000001a,
    0 -0.5px 5px #0000000d;

  &:hover {
    background-color: #c0392b;
  }
`;

const StyledButtonEdit = styled(CreateWorkoutButton)`
  margin: 0;
  padding: 0;
  color: #e67e22;
  border: 2px solid #e67e22;
  background-color: #e67e22;
  box-shadow:
    0 4px 8px #0000001a,
    0 -0.5px 5px #0000000d;

  &:hover {
    background-color: #e67e22;
  }
`;

const WorkoutCard = styled.article`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 4px 8px #0000001a,
    0 -0.5px 5px #0000000d;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: #fff;
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 1.5rem;
  ${(props) => props.$spotlightPadding}
`;

const ToggleButton = styled.button`
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
  box-shadow:
    0 2px 5px rgba(0, 0, 0, 0.12),
    0 1px 3px #0000001a;
  transition: box-shadow 0.3s ease-in-out;
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ExerciseItemHeadline = styled.li`
  border-bottom: 3px solid #888;
  padding: 0.5rem 0;
  text-align: left;
  font-size: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ExerciseItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0;
  text-align: left;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ExerciseName = styled.span`
  _flex-grow: 1;
  flex-basis: 60px;
  margin: 0;
  font-weight: 500;
  color: #222;
  margin-right: 0.5rem;
`;

const ExerciseDetails = styled.span`
  _flex-grow: 0;
  flex-basis: 30px;
  margin: 0;
  color: #666;
  margin-right: 0.5rem;
  text-align: center;
`;

const SpotlightHeading = styled.h3`
  text-align: center;
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 450;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000030;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 1;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const ModalButton = styled.button`
  background-color: #dc3545;
  border-radius: 5px;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
`;

const YesButton = styled(ModalButton)`
  background: #27ae60;
`;

const Filter = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 6;
  background: #00000039;
  padding: 1rem 3rem;
`;

const StyledCardHeadline = styled.h2`
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  text-shadow:
    2px 2px 0 #3498db,
    -2px -2px 0 #3498db,
    0px -2px 0 #3498db,
    -2px 0px 0 #3498db,
    2px 0px 0 #3498db,
    0px 2px 0 #3498db,
    2px -2px 0 #3498db,
    2px 0px 0 #3498db,
    -2px 2px 0 #3498db;
`;
