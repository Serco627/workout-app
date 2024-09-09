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
