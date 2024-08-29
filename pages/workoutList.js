import { useState } from "react";
import { exercises } from "@/lib/exercises";
import { workouts } from "@/lib/workouts";

function findExerciseById(exerciseId) {
  return exercises.find((exercise) => exercise.id === exerciseId);
}

export default function WorkoutsList() {
  const [showDetails, setShowDetails] = useState({});

  // Toggle function to show or hide details for a specific workout
  const toggleDetails = (workoutId) => {
    setShowDetails((prev) => ({
      ...prev,
      [workoutId]: !prev[workoutId],
    }));
  };

  return (
    <>
      <header>
        <h1>Choose Today's Workout</h1>
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
          const isDetailsVisible = showDetails[workout.id];

          return (
            <div key={workout.id}>
              <h2>{workout.name}</h2>
              <h3>Muscles In The Spotlight:</h3>
              <p>{reducedMuscleGroups.join(", ")}</p>
              <button onClick={() => toggleDetails(workout.id)}>
                {isDetailsVisible ? "Hide Details" : "Show Details"}
              </button>
              {isDetailsVisible && (
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
              )}
            </div>
          );
        })}
      </main>
    </>
  );
}
