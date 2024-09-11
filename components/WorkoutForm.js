import React, { useState } from "react";
import styled from "styled-components";
import { exercises } from "@/lib/exercises";
import findExerciseById from "@/utils/findExerciseById";
import { uid } from "uid";

const Header = styled.header`
  text-align: center;
  margin-bottom: 1rem;
`;

const WrapperForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  margin: 0 auto;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
  max-width: 500px;
  width: 90%;
  max-height: 75vh;
  overflow-y: auto;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 0;
  padding-bottom: 0;
`;

const Fieldset = styled.fieldset`
  border: none;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px #0000001a;
`;

const Legend = styled.legend`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const AddButton = styled.button`
  background-color: #3498db;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const ButtonSecondary = styled(AddButton)`
  background-color: #27ae60;
  border: 1px solid #fff;

  &:hover {
    background-color: #1f8a4d;
  }
`;

const CancelButton = styled(ButtonSecondary)`
  background-color: #dc3545;
  border: 1px solid #fff;

  &:hover {
    background-color: #c82333;
  }
`;

const ExerciseListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ExerciseItem = styled.li`
  background-color: #f4f4f4;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

const InlineContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

const RepsSetsLabel = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const ExerciseListDisplay = styled.div`
  margin-top: 1rem;
`;

const ExerciseFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteExerciseButton = styled.button`
  color: #c0392b;
  border: 2px solid #c0392b;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #fff;
`;

export default function Form({
  onSaveWorkout,
  toggleMode,
  formTitle,
  workout,
  editMode,
}) {
  const [currentExercises, setCurrentExercises] = useState([]);

  function handleDeleteExercise(event, index) {
    event.preventDefault();
    if (!currentExercises.length) {
      const exercises = [...workout.exercises];
      exercises.splice(index, 1);
      setCurrentExercises(exercises);
    } else {
      const exercises = [...currentExercises];
      exercises.splice(index, 1);
      setCurrentExercises(exercises);
    }
  }

  function handleAddExercise(event) {
    const form = event.target.form;
    const exerciseId = form.elements.exerciseName.value;
    const sets = form.elements.sets.value;
    const reps = form.elements.reps.value;

    if (exerciseId === "default" || sets <= 0 || reps <= 0) {
      alert("Please fill in all the fields.");
      form.elements.exerciseName.focus();
    } else {
      !currentExercises.length && editMode
        ? setCurrentExercises([
            { exerciseId: exerciseId, sets: sets, reps: reps },
            ...workout.exercises,
          ])
        : setCurrentExercises([
            { exerciseId: exerciseId, sets: sets, reps: reps },
            ...currentExercises,
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
              {currentExercises.length ? <h3>Exercises</h3> : null}
              <ExerciseListContainer>
                {!currentExercises.length && editMode
                  ? workout.exercises.map((exercise, index) => (
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
                          <DeleteExerciseButton
                            onClick={(event) =>
                              handleDeleteExercise(event, index)
                            }
                          >
                            –
                          </DeleteExerciseButton>
                        </ExerciseFlex>
                      </ExerciseItem>
                    ))
                  : currentExercises.map((exercise, index) => (
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
                          <DeleteExerciseButton
                            onClick={(event) =>
                              handleDeleteExercise(event, index)
                            }
                          >
                            –
                          </DeleteExerciseButton>
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
