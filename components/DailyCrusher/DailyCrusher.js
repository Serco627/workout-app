import { workouts } from "@/lib/workouts";
import Workout from "../Workout/Workout";
import findExerciseById from "@/utils/findExerciseById";
import { exercises } from "@/lib/exercises";
import styled from "styled-components";
import { StyledHeadline, StyledLink, ToggleButton } from "@/styledComponents";
import { uid } from "uid";
import { useState } from "react";

export default function DailyCrusher() {
  const [isCrusherDetailsVisible, setIsCrusherDetailsVisible] = useState(false);

  function toggleVisibility() {
    setIsCrusherDetailsVisible(!isCrusherDetailsVisible);
  }

  function getCurrentDayWorkout() {
    const today = new Date().getDay();
    const workoutSchedule = {
      1: workouts[5],
      2: workouts[1],
      3: workouts[2],
      4: workouts[3],
      5: workouts[4],
      6: workouts[5],
      0: workouts[0],
    };

    return workoutSchedule[today] || null;
  }

  const currentWorkout = getCurrentDayWorkout();

  if (!currentWorkout) {
    return <p>No workout scheduled for today. Rest day!</p>;
  }

  const muscleGroups = [];

  const enrichedExercises = currentWorkout.exercises.map((exercise) => {
    const foundExercise = findExerciseById(exercises, exercise.exerciseId);
    if (foundExercise) {
      muscleGroups.push(...foundExercise.muscleGroups);
      return { ...exercise, name: foundExercise.name };
    }
    return exercise;
  });

  const uniqueMuscleGroups = [...new Set(muscleGroups)];

  const dailyCrusher = {
    ...currentWorkout,
    exercises: enrichedExercises,
    muscleGroups: uniqueMuscleGroups,
  };

  return (
    <StyledCrusherWrapper>
      <StyledHeadline>Crusher of the Day 💪</StyledHeadline>
      <StyledArticleWrap>
        <StyledDescriptionText>
          Get in shape with our crusher workouts! Every day we suggest a
          different workout for you to try out.
        </StyledDescriptionText>

        <StyledLink href="/workoutlist">
          <Workout workout={dailyCrusher} spotlightMode={true} />
        </StyledLink>
        <StyledPositionRelativeRelative>
          {isCrusherDetailsVisible ? null : (
            <StyledAbsoluteToggleButton onClick={toggleVisibility}>
              Show More
            </StyledAbsoluteToggleButton>
          )}
          <StyledPreviewFilter
            $showMore={
              isCrusherDetailsVisible ? "filter: none; color: #000;" : null
            }
          >
            <h3>{dailyCrusher.title}</h3>
            <StyledDescriptionText>
              {dailyCrusher.description1}
            </StyledDescriptionText>
          </StyledPreviewFilter>
        </StyledPositionRelativeRelative>
        {isCrusherDetailsVisible ? (
          <>
            {dailyCrusher.exercises.map((exercise) => {
              return (
                <StyledExerciseSetsReps key={uid()}>
                  <StyledBoldText>{exercise.name}: </StyledBoldText> Sets:{" "}
                  {exercise.sets} / Reps: {exercise.reps}
                </StyledExerciseSetsReps>
              );
            })}
            <StyledDescriptionText>
              {dailyCrusher.description2}
            </StyledDescriptionText>
            <StyledDescriptionText>
              {dailyCrusher.description3}
            </StyledDescriptionText>
          </>
        ) : null}
      </StyledArticleWrap>
      {isCrusherDetailsVisible ? (
        <StyledToggleButton onClick={toggleVisibility}>
          Show Less
        </StyledToggleButton>
      ) : null}
    </StyledCrusherWrapper>
  );
}

const StyledCrusherWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
  box-shadow:
    0 4px 8px #0000001a,
    0 -0.5px 5px #0000000d;
`;

const StyledArticleWrap = styled.div`
  padding: 0 2rem;
`;

const StyledDescriptionText = styled.p`
  text-align: left;
  padding-bottom: 0.5rem;
`;

const StyledExerciseSetsReps = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f4f4f4;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  align-items: center;
`;

const StyledBoldText = styled.span`
  font-weight: bold;
  padding-right: 0.5rem;
`;

const StyledPreviewFilter = styled.div`
  filter: blur(1px) brightness(1.2);
  color: grey;
  ${(props) => props.$showMore}
`;

const StyledPositionRelativeRelative = styled.div`
  position: relative;
`;

const StyledAbsoluteToggleButton = styled(ToggleButton)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
`;
const StyledToggleButton = styled(ToggleButton)`
  margin-top: 0;
`;
