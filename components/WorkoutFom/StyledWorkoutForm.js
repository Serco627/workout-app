import styled from "styled-components";

export const Header = styled.header`
  text-align: center;
  margin-bottom: 1rem;
`;

export const WrapperForm = styled.div`
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
  z-index: 6;
  max-width: 500px;
  width: 90%;
  max-height: 75vh;
  overflow-y: auto;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 0;
  padding-bottom: 0;
`;

export const Fieldset = styled.fieldset`
  border: none;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px #0000001a;
`;

export const Legend = styled.legend`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const AddButton = styled.button`
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

export const ButtonSecondary = styled(AddButton)`
  background-color: #27ae60;
  border: 1px solid #fff;

  &:hover {
    background-color: #1f8a4d;
  }
`;

export const CancelButton = styled(ButtonSecondary)`
  background-color: #dc3545;
  border: 1px solid #fff;

  &:hover {
    background-color: #c82333;
  }
`;

export const ExerciseListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ExerciseItem = styled.li`
  background-color: #f4f4f4;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

export const InlineContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

export const RepsSetsLabel = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

export const ExerciseListDisplay = styled.div`
  margin-top: 1rem;
`;

export const ExerciseFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DeleteExerciseButton = styled.button`
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
