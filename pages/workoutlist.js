import { useState } from "react";
import styled from "styled-components";
import { exercises } from "@/lib/exercises";
import { workouts as initialWorkouts } from "@/lib/workouts";
import Workout from "@/components/Workout/Workout";

function findExerciseById(exerciseId) {
  return exercises.find((exercise) => exercise.id === exerciseId);
}

export default function WorkoutsList() {
  const [workouts, setWorkouts] = useState(initialWorkouts);

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

  return (
    <>
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
    </>
  );
}

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
