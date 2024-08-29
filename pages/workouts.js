import { exercises } from "@/lib/exercises";
import { workouts } from "@/lib/workouts";
import styled from "styled-components";

const StickyHeader = styled.h1`
  position: sticky;
  top: 0px;
`;

export default function WorkoutsList() {
  return (
    <>
      <header>
        <StickyHeader>Choose Today's Workout</StickyHeader>
      </header>
      <main>
        {workouts.map((workout) => {
          return (
            <div key={workout.id}>
              <h2>{workout.name}</h2>
              <ul>
                {workout.exercises.map((exercise) => {
                  const exerciseDetails = exercises.find(
                    (searchingExercise) =>
                      searchingExercise.id === exercise.exerciseId
                  );

                  return (
                    <li key={exercise.exerciseId}>
                      <h3>{exerciseDetails.name}</h3>
                      <p>Sets: {exercise.sets}</p>
                      <p>Reps: {exercise.reps}</p>
                      <p>
                        Muscle Groups: {exerciseDetails.muscleGroups.join(", ")}
                      </p>
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
