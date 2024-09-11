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
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [createMode, setCreateMode] = useState(false);

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
      { id: uid(), name: name, exercises: currentExercises },
      ...workouts,
    ]);
  }

  function handleEditWorkout(name, currentExercises, id) {
    const newEditedWorkouts = workouts.map((workout) =>
      workout.id === id
        ? { id: workout.id, name: name, exercises: currentExercises }
        : workout
    );
    setWorkouts(newEditedWorkouts);
  }

  function toggleCreateMode() {
    setCreateMode(!createMode);
  }

  return (
    <FlexWrapWorkouts>
      {createMode ? <Filter onClick={toggleCreateMode}></Filter> : null}

      {createMode ? (
        <Form
          onSaveWorkout={handleAddWorkout}
          createMode={createMode}
          toggleMode={toggleCreateMode}
          formTitle="Create New Workout"
        />
      ) : null}
      <StyledHeadline>Choose Your Workout</StyledHeadline>

      <WorkoutList>
        <div>
          <CreateWorkoutButton onClick={toggleCreateMode}>
            Create Workout
          </CreateWorkoutButton>
        </div>
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
                handleEditWorkout={handleEditWorkout}
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

const CreateWorkoutButton = styled.button`
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

const FlexWrapWorkouts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
