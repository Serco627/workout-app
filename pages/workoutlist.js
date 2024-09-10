import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import styled from "styled-components";
import { exercises } from "@/lib/exercises";
import { workouts as initialWorkouts } from "@/lib/workouts";
import Form from "@/components/WorkoutForm";
import Workout from "@/components/Workout/Workout";
import { uid } from "uid";

function findExerciseById(exerciseId) {
  return exercises.find((exercise) => exercise.id === exerciseId);
}

export default function WorkoutsList() {
  const [createMode, setCreateMode] = useState(false);
  const [workouts, setWorkouts] = useLocalStorageState("workouts", {
    defaultValue: [...initialWorkouts],
  });

  const preparedWorkouts = workouts.map((workout) => {
    const muscleGroups = [];
    const enrichedExercises = workout.exercises.map((exercise) => {
      const foundExercise = findExerciseById(exercise.exerciseId);
      if (foundExercise) {
        muscleGroups.push(...foundExercise.muscleGroups);
        return { ...exercise, name: foundExercise.name };
      }
      return exercise;
    });
    const uniqueMuscleGroups = [...new Set(muscleGroups)];
    return {
      ...workout,
      exercises: enrichedExercises,
      muscleGroups: uniqueMuscleGroups,
    };
  });

  function handleDelete(id) {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  }

  function handleAddWorkout(name, currentExercises) {
    setWorkouts([
      ...workouts,
      { id: uid(), name: name, exercises: currentExercises },
    ]);
  }

  function toggleCreateMode() {
    setCreateMode(!createMode);
  }
  return (
    <FlexWrapWorkouts>
      {createMode ? <Filter onClick={toggleCreateMode}></Filter> : null}
      {createMode ? (
        <CancelCreateButton onClick={toggleCreateMode}>
          &#x2B;
        </CancelCreateButton>
      ) : (
        <CreateWorkoutButton onClick={toggleCreateMode}>
          &#x2B;
        </CreateWorkoutButton>
      )}
      {createMode ? (
        <Form
          onAddWorkout={handleAddWorkout}
          createMode={createMode}
          toggleCreateMode={toggleCreateMode}
          onCreateMode={toggleCreateMode}
        />
      ) : null}
      <StyledHeadline>Choose Your Workout</StyledHeadline>
      <WorkoutList>
        {!preparedWorkouts.length ? (
          <NoWorkoutsMessage>
            No workouts yet! <br />
            <br />
            Create a workout and reach your goals!
          </NoWorkoutsMessage>
        ) : (
          preparedWorkouts.map((workout) => {
            return (
              <Workout
                key={workout.id}
                workout={workout}
                handleDelete={handleDelete}
              />
            );
          })
        )}
      </WorkoutList>
    </FlexWrapWorkouts>
  );
}

const Filter = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  bottom: 0;
  z-index: 1;
  background: #00000099;
  padding: 1rem 3rem;
`;

const WorkoutList = styled.section`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
`;

const StyledHeadline = styled.h2`
  background: #fff;
  padding: 0.5rem;
  margin: 0;
  text-align: center;
`;

const NoWorkoutsMessage = styled.div`
  font-size: 1.25rem;
  color: #3498db;
  text-align: center;
  margin: 2rem 0;
  padding: 1rem 1rem 1.5rem 1rem;
  background-color: #fefefe;
  border: 2px solid #3498db;
  border-radius: 5px;
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

const CreateWorkoutButton = styled(ToggleButton)`
  background-color: #27ae60;
  position: fixed;
  z-index: 5;
  font-size: 3rem;
  bottom: 20px;
  right: 14px;
  border-radius: 50%;
  border: 2px solid #fff;
  width: 80px;
  height: 80px;

  &:hover {
    background-color: #1f8a4d;
  }
`;

const CancelCreateButton = styled(CreateWorkoutButton)`
  background-color: #dc3545;
  transform: rotate(45deg);

  &:hover {
    background-color: #c82333;
  }
`;

const FlexWrapWorkouts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
