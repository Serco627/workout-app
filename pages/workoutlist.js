import { useState } from "react";
import styled from "styled-components";
import { exercises } from "@/lib/exercises";
import Form from "@/components/WorkoutForm";
import { workouts as initialWorkouts } from "@/lib/workouts";
import { uid } from "uid";

function findExerciseById(exerciseId) {
  return exercises.find((exercise) => exercise.id === exerciseId);
}

export default function WorkoutList() {
  const [showDetails, setShowDetails] = useState({});
  const [workouts, setWorkouts] = useState(initialWorkouts); // Initialisiere den Workout-State
  const [createMode, setCreateMode] = useState(false);

  const toggleDetails = (workoutId) => {
    setShowDetails((prev) => ({
      ...prev,
      [workoutId]: !prev[workoutId],
    }));
  };

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

  function handleAddWorkout(name, currentExercises) {
    setWorkouts([
      ...workouts,
      { id: uid(), name: name, exercises: currentExercises },
    ]);
  }

  function handleCancel() {
    setCreateMode(false);
  }

  function handleCreateMode() {
    setCreateMode(true);
  }

  return (
    <FlexWrapWorkouts>
      {createMode ? <Filter></Filter> : null}
      <CreateWorkoutButton onClick={handleCreateMode}>+</CreateWorkoutButton>
      {createMode ? (
        <Form
          onAddWorkout={handleAddWorkout}
          createMode={createMode}
          handleCancel={handleCancel}
          onCreateMode={handleCancel}
        />
      ) : null}
      <StyledHeadline>Choose Your Workout</StyledHeadline>

      <WorkoutList>
        {preparedWorkouts.map((workout) => {
          const isDetailsVisible = showDetails[workout.id] || false;
          return (
            <WorkoutCard key={workout.id}>
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
        })}
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

const WorkoutList = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
`;

const WorkoutCard = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px #0000001a;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #fff;
  text-align: center;
`;

const StyledHeadline = styled.h2`
  background: #fff;
  padding: 0.5rem;
  margin: 0;
  text-align: center;
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

const CreateWorkoutButton = styled(ToggleButton)`
  background-color: #27ae60;
  position: fixed;
  z-index: 5;
  padding: 0.2rem 1.15rem;
  font-size: 3.5rem;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  border: 2px solid #fff;

  &:hover {
    background-color: #1f8a4d;
  }
`;

const FlexWrapWorkouts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
