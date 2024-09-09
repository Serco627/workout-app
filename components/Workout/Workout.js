import styled from "styled-components";
import { useState } from "react";

export default function Workout({ workout, handleDelete }) {
  const [showDetails, setShowDetails] = useState({});
  const [deleteMode, setDeleteMode] = useState(false);
  const isDetailsVisible = showDetails[workout.id] || false;

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

  return (
    <WorkoutCard key={workout.id}>
      {deleteMode ? (
        <ModalOverlay onClick={toggleDeleteMode}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <p>
              Are you sure you want to delete <br />
              <br /> &quot;{workout.name}&quot;?
            </p>
            <YesButton onClick={onDelete}>YES</YesButton>
            <ModalButton onClick={toggleDeleteMode}>CANCEL</ModalButton>
          </ModalContent>
        </ModalOverlay>
      ) : null}
      <DeleteWorkoutButton onClick={toggleDeleteMode}>–</DeleteWorkoutButton>
      <h2>{workout.name}</h2>
      <SpotlightHeading>Muscles In The Spotlight:</SpotlightHeading>
      <MuscleGroupList>
        {workout.muscleGroups.map((muscle) => (
          <MuscleBadge key={muscle}>{muscle}</MuscleBadge>
        ))}
      </MuscleGroupList>
      <ToggleButton onClick={() => toggleDetails(workout.id)}>
        {isDetailsVisible ? "Show Less" : "Show More"}
      </ToggleButton>
      {isDetailsVisible && (
        <ExerciseList>
          {workout.exercises.map((exercise) => {
            return (
              <ExerciseItem key={exercise.exerciseId}>
                <ExerciseName>{exercise.name}</ExerciseName>
                <ExerciseDetails>Sets: {exercise.sets}</ExerciseDetails>
                <ExerciseDetails>Reps: {exercise.reps}</ExerciseDetails>
              </ExerciseItem>
            );
          })}
        </ExerciseList>
      )}
    </WorkoutCard>
  );
}

const WorkoutCard = styled.article`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px #0000001a;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: #fff;
  text-align: center;
  padding-top: 2rem;
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
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ExerciseItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0;
`;

const ExerciseName = styled.h3`
  margin: 0;
  color: #333;
`;

const ExerciseDetails = styled.p`
  margin: 0;
  color: #666;
`;

const SpotlightHeading = styled.h3`
  text-align: center;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const DeleteWorkoutButton = styled.button`
  background-color: #e74c3c; /* Rote Farbe für den Button */
  color: #fff; /* Weißes Minuszeichen */
  border: none;
  border-radius: 50%; /* Macht den Button rund */
  width: 30px; /* Größe des Buttons */
  height: 30px; /* Größe des Buttons */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem; /* Größe des Minuszeichens */
  position: absolute;
  left: 16px;
  top: 16px;
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
