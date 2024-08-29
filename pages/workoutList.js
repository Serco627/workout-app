import { exercises } from "@/lib/exercises";
import { workouts } from "@/lib/workouts";
import styled from "styled-components";

const StickyHeader = styled.h1`
  position: sticky;
  top: 10px;
`;

function findExerciseById(exerciseId) {
  return exercises.find((exercise) => exercise.id === exerciseId);
}

export default function WorkoutsList() {
  return (
    <>
      <header>
        <StickyHeader>Choose Today's Workout</StickyHeader>
      </header>
      <main>
        {workouts.map((workout) => {
          const muscleGroupsSet = new Set();

          workout.exercises.forEach((exercise) => {
            const foundExercise = findExerciseById(exercise.exerciseId);

            if (foundExercise) {
              foundExercise.muscleGroups.forEach((muscleGroup) => {
                muscleGroupsSet.add(muscleGroup);
              });
            }
          });

          const reducedMuscleGroups = Array.from(muscleGroupsSet);

          return (
            <div key={workout.id}>
              <h2>{workout.name}</h2>
              <h3>Muscles In The Spotlight:</h3>
              <p>{reducedMuscleGroups.join(", ")}</p>
              <ul>
                {workout.exercises.map((exercise) => {
                  const foundExercise = findExerciseById(exercise.exerciseId);

                  return (
                    <li key={exercise.exerciseId}>
                      <h3>{foundExercise.name}</h3>
                      <p>Sets: {exercise.sets}</p>
                      <p>Reps: {exercise.reps}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </main>
    </>
  );
}
