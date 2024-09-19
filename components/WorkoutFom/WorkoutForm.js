import React, { useState } from "react";
import {
  Header,
  WrapperForm,
  FormContainer,
  Fieldset,
  Legend,
  Label,
  Input,
  Select,
  AddButton,
  ButtonSecondary,
  CancelButton,
  ExerciseListContainer,
  ExerciseItem,
  StyledDiv,
  InlineContainer,
  RepsSetsLabel,
  ExerciseListDisplay,
  ExerciseFlex,
  DeleteExerciseButton,
} from "./StyledWorkoutForm";
import { exercises } from "@/lib/exercises";
import findExerciseById from "@/utils/findExerciseById";
import { uid } from "uid";
import { CreateWorkoutButton } from "@/styledComponents";
import styled from "styled-components";
import Image from "next/image";

export default function Form({
  onSaveWorkout,
  toggleMode,
  formTitle,
  workout,
  editMode,
}) {
  const [currentExercises, setCurrentExercises] = useState(
    editMode ? workout.exercises : []
  );

  function handleDeleteExercise(event, index) {
    event.preventDefault();
    const exercises = [...currentExercises];
    exercises.splice(index, 1);
    setCurrentExercises(exercises);
  }

  function handleAddExercise(event) {
    const form = event.target.form;
    const exerciseId = form.elements.exerciseName.value;
    const sets = Number(form.elements.sets.value);
    const reps = Number(form.elements.reps.value);

    if (exerciseId === "default" || sets <= 0 || reps <= 0) {
      alert("Please fill in all the fields.");
      form.elements.exerciseName.focus();
    } else {
      setCurrentExercises([
        ...currentExercises,
        { exerciseId: exerciseId, sets: sets, reps: reps },
      ]);
      form.elements.exerciseName.value = "";
      form.elements.sets.value = "";
      form.elements.reps.value = "";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const name = data.workoutName;
    if (!currentExercises.length) {
      alert("Please add exercises to your workout!");
    } else {
      onSaveWorkout(name, currentExercises);
      setCurrentExercises([]);
      event.target.reset();
      toggleMode();
    }
  }

  return (
    <>
      <WrapperForm>
        <FormContainer>
          <Header>
            <h2>{formTitle}</h2>
          </Header>
          <form onSubmit={handleSubmit}>
            <Label>
              Workout Name
              <Input
                type="text"
                name="workoutName"
                placeholder="your workout name"
                required
                maxLength={30}
                defaultValue={editMode ? workout.name : null}
              />
            </Label>

            <Fieldset>
              <Label>
                Add your exercises
                <Select name="exerciseName" defaultValue="default">
                  <option value="default" disabled>
                    Please select an exercise
                  </option>
                  {exercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                </Select>
              </Label>
              <InlineContainer>
                <RepsSetsLabel>
                  Sets
                  <Input
                    type="number"
                    name="sets"
                    min="1"
                    max="50"
                    placeholder="min. 1"
                  />
                </RepsSetsLabel>
                <RepsSetsLabel>
                  Reps
                  <Input
                    type="number"
                    name="reps"
                    min="1"
                    max="100"
                    placeholder="min. 1"
                  />
                </RepsSetsLabel>
              </InlineContainer>
              <AddButton type="button" onClick={handleAddExercise}>
                + Add Exercise
              </AddButton>
            </Fieldset>

            <ExerciseListDisplay>
              {currentExercises.length ? (
                <h3>Exercises</h3>
              ) : (
                <p>No exercises here, please add some to crush it!</p>
              )}
              <ExerciseListContainer>
                {currentExercises.map((exercise, index) => (
                  <ExerciseItem key={uid()}>
                    <ExerciseFlex>
                      <div>
                        <strong>
                          {
                            findExerciseById(exercises, exercise.exerciseId)
                              .name
                          }
                        </strong>
                        - {exercise.sets} sets, {exercise.reps} reps
                      </div>
                      <StyledButtonDelete
                        onClick={(event) => handleDeleteExercise(event, index)}
                      >
                        <StyledSvg
                          src="/trash.svg"
                          width={15}
                          height={15}
                          alt="delete exercise"
                        />
                      </StyledButtonDelete>
                    </ExerciseFlex>
                  </ExerciseItem>
                ))}
              </ExerciseListContainer>
            </ExerciseListDisplay>

            <StyledDiv>
              <CancelButton type="button" onClick={toggleMode}>
                Cancel
              </CancelButton>
              <ButtonSecondary type="submit">Save Workout</ButtonSecondary>
            </StyledDiv>
          </form>
        </FormContainer>
      </WrapperForm>
    </>
  );
}

const StyledSvg = styled(Image)`
  padding: 0;
  margin: 0;
`;
const StyledButtonDelete = styled(CreateWorkoutButton)`
  margin: 0;
  color: #c0392b;
  border: 2px solid #c0392b;
  background-color: #c0392b;
  box-shadow:
    0 4px 8px #0000001a,
    0 -0.5px 5px #0000000d;

  &:hover {
    background-color: #c0392b;
  }
`;
