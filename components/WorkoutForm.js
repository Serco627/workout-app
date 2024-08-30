import React, { useState } from "react";
import styled from "styled-components";
import { exercises as ExerciseList } from "@/lib/exercises";

// Styled Components
const Header = styled.header`
  text-align: center;
  margin-bottom: 1rem;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  margin: 0 auto;
`;

const Fieldset = styled.fieldset`
  border: none;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const Button = styled.button`
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

const ButtonSecondary = styled(Button)`
  background-color: #27ae60;

  &:hover {
    background-color: #1f8a4d;
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
`;

const InlineContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

const SetRepLabel = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const ExerciseListDisplay = styled.div`
  margin-top: 1rem;
`;

export default function Form() {
  const [workoutName, setWorkoutName] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [submittedExercises, setSubmittedExercises] = useState([]);
  const [isWorkoutNameEditable, setIsWorkoutNameEditable] = useState(true);

  const handleWorkoutNameChange = (event) => setWorkoutName(event.target.value);

  const handleExerciseNameChange = (event) =>
    setExerciseName(event.target.value);
  const handleSetsChange = (event) => setSets(event.target.value);
  const handleRepsChange = (event) => setReps(event.target.value);

  const handleAddExercise = () => {
    if (exerciseName && sets && reps) {
      const newExercise = { exerciseName, sets, reps };
      setSubmittedExercises([...submittedExercises, newExercise]);

      // Reset input fields
      setExerciseName("");
      setSets("");
      setReps("");

      // Lock workout name if at least one exercise has been added
      if (submittedExercises.length === 0) {
        setIsWorkoutNameEditable(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // No additional submission logic since we're not using `submittedWorkout`
  };

  return (
    <Main>
      <FormContainer>
        <Header>
          <h2>Create New Workout</h2>
        </Header>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>
              Workout Name
              <Input
                type="text"
                value={workoutName}
                onChange={handleWorkoutNameChange}
                disabled={!isWorkoutNameEditable}
              />
            </Label>
          </div>
          <div>
            <Fieldset>
              <Legend>New Exercise</Legend>
              <Label>
                Exercise Name
                <Select
                  value={exerciseName}
                  onChange={handleExerciseNameChange}
                >
                  <option value="">Please select an exercise</option>
                  {ExerciseList.map((exercise) => (
                    <option key={exercise.id} value={exercise.name}>
                      {exercise.name}
                    </option>
                  ))}
                </Select>
              </Label>
              <InlineContainer>
                <SetRepLabel>
                  Sets
                  <Input
                    type="number"
                    value={sets}
                    onChange={handleSetsChange}
                  />
                </SetRepLabel>
                <SetRepLabel>
                  Reps
                  <Input
                    type="number"
                    value={reps}
                    onChange={handleRepsChange}
                  />
                </SetRepLabel>
              </InlineContainer>
              <Button type="button" onClick={handleAddExercise}>
                + Add Exercise
              </Button>
            </Fieldset>
          </div>

          <StyledDiv>
            <ButtonSecondary type="submit">Save Workout</ButtonSecondary>
          </StyledDiv>
        </form>

        {/* Display the list of added exercises */}
        <ExerciseListDisplay>
          <h3>{workoutName}</h3>
          <ExerciseListContainer>
            {submittedExercises.map((exercise, index) => (
              <ExerciseItem key={index}>
                <strong>{exercise.exerciseName}</strong> - {exercise.sets} sets,{" "}
                {exercise.reps} reps
              </ExerciseItem>
            ))}
          </ExerciseListContainer>
        </ExerciseListDisplay>
      </FormContainer>
    </Main>
  );
}
