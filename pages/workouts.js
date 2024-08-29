import { exercises } from "@/lib/exercises";
import { workouts } from "@/lib/workouts";
import styled from "styled-components";

const StickyHeader = styled.header`
  position: sticky;
  top: 0px;
`;

export default function WorkoutsList() {
  return (
    <>
      <StickyHeader>Choose Today's Workout</StickyHeader>

      <ul>
        {workouts.map((workout) => {
          return <li key={workout.id}>{workout.name}</li>;
        })}
      </ul>
    </>
  );
}
