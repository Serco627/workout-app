import { useState } from "react";
import styled from "styled-components";
import { exercises } from "@/lib/exercises";
import { workouts as initialWorkouts } from "@/lib/workouts";
import Form from "@/components/WorkoutForm";
import findExerciseById from "@/utils/findExerciseById";

export default function WorkoutsList() {
  const [showDetails, setShowDetails] = useState({});
  const [workouts, setWorkouts] = useState(initialWorkouts); // Initialisiere den Workout-State

  const toggleDetails = (workoutId) => {
    setShowDetails((prev) => ({
      ...prev,
      [workoutId]: !prev[workoutId],
    }));
  };

  // Funktion zum Hinzufügen eines neuen Workouts
  const handleAddWorkout = (newWorkout) => {
    setWorkouts((prevWorkouts) => [newWorkout, ...prevWorkouts]);
  };

  return (
    <>
      <Main>
        <Form onAddWorkout={handleAddWorkout} />
        <WorkoutList>
          {workouts.map((workout) => {
            const muscleGroupsSet = new Set();

            workout.exercises.forEach((exercise) => {
              const foundExercise = findExerciseById(
                exercises,
                exercise.exerciseId
              );

              if (foundExercise) {
                foundExercise.muscleGroups.forEach((muscleGroup) => {
                  muscleGroupsSet.add(muscleGroup);
                });
              }
            });

            const reducedMuscleGroups = Array.from(muscleGroupsSet);
            const isDetailsVisible = showDetails[workout.id];
            return (
              <WorkoutCard key={workout.id}>
                <h2>{workout.name}</h2>
                <SpotlightHeading>Muscles In The Spotlight:</SpotlightHeading>
                <MuscleGroupList>
                  {reducedMuscleGroups.map((muscle) => (
                    <MuscleBadge key={muscle}>{muscle}</MuscleBadge>
                  ))}
                </MuscleGroupList>
                <ToggleButton onClick={() => toggleDetails(workout.id)}>
                  {isDetailsVisible ? "Show Less" : "Show More"}
                </ToggleButton>
                {isDetailsVisible && (
                  <ExerciseList>
                    {workout.exercises.map((exercise) => {
                      const foundExercise = findExerciseById(
                        exercises,
                        exercise.exerciseId
                      );

                      return (
                        <ExerciseItem key={exercise.exerciseId}>
                          <ExerciseName>{foundExercise.name}</ExerciseName>
                          <ExerciseDetails>
                            Sets: {exercise.sets}
                          </ExerciseDetails>
                          <ExerciseDetails>
                            Reps: {exercise.reps}
                          </ExerciseDetails>
                        </ExerciseItem>
                      );
                    })}
                  </ExerciseList>
                )}
              </WorkoutCard>
            );
          })}
        </WorkoutList>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const WorkoutList = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const WorkoutCard = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1rem;
  background: #ffffff;
  text-align: center;
`;

const StickyHeader = styled.h1`
  background: #fff;
  padding: 0.5rem;
  margin: 0;
  text-align: center;
`;

const ToggleButton = styled.button`
  background: #e67e22;
  color: #ffffff;
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
  color: #ffffff;
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
