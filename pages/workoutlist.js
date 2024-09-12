import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import { exercises } from "@/lib/exercises";
import { workouts as initialWorkouts } from "@/lib/workouts";
import Form from "@/components/WorkoutForm";
import Workout from "@/components/Workout/Workout";
import { uid } from "uid";
import {
  Filter,
  WorkoutList,
  StyledHeadline,
  NoWorkoutsMessage,
  CreateWorkoutButton,
  CancelCreateButton,
  FlexWrapWorkouts,
} from "@/styledComponents";

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
