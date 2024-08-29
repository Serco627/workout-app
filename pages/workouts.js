// import { exercises } from "@/lib/exercises";
// import { workouts } from "@/lib/workouts";
// import styled from "styled-components";

// const StickyHeader = styled.h1`
//   position: sticky;
//   top: 0px;
// `;

// export default function WorkoutsList() {
//   return (
//     <>
//       <header>
//         <StickyHeader>Choose Today's Workout</StickyHeader>
//       </header>
//       <main>
//         {workouts.map((workout) => {
//           return (
//             <div key={workout.id}>
//               <h2>{workout.name}</h2>
//               <ul>
//                 {workout.exercises.map((exercise) => {
//                   const foundExercise = exercises.find(
//                     (searchingExercise) =>
//                       searchingExercise.id === exercise.exerciseId
//                   );

//                   return (
//                     <li key={exercise.exerciseId}>
//                       <h3>{foundExercise.name}</h3>
//                       <p>Sets: {exercise.sets}</p>
//                       <p>Reps: {exercise.reps}</p>
//                       <p>
//                         Muscle Groups: {foundExercise.muscleGroups.join(", ")}
//                       </p>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           );
//         })}
//       </main>
//     </>
//   );
// }

import { exercises } from "@/lib/exercises";
import { workouts } from "@/lib/workouts";
import styled from "styled-components";

const StickyHeader = styled.h1`
  position: sticky;
  top: 0px;
`;

export default function WorkoutsList() {
  return (
    <>
      <header>
        <StickyHeader>Choose Today's Workout</StickyHeader>
      </header>
      <main>
        {workouts.map((workout) => {
          // Erzeuge ein Array von einzigartigen Muskelgruppen
          const muscleGroupsArray = workout.exercises.reduce(
            (uniqueMuscleGroups, exercise) => {
              const foundExercise = exercises.find(
                (searchingExercise) =>
                  searchingExercise.id === exercise.exerciseId
              );

              if (foundExercise) {
                foundExercise.muscleGroups.forEach((muscleGroup) => {
                  // Füge die Muskelgruppe hinzu, wenn sie noch nicht vorhanden ist
                  if (!uniqueMuscleGroups.includes(muscleGroup)) {
                    uniqueMuscleGroups.push(muscleGroup);
                  }
                });
              }

              return uniqueMuscleGroups;
            },
            []
          ); // Initialisiere reduce mit einem leeren Array

          return (
            <div key={workout.id}>
              <h2>{workout.name}</h2>
              <h3>Muscles In The Spotlight:</h3>
              <p>{muscleGroupsArray.join(", ")}</p>
              <ul>
                {workout.exercises.map((exercise) => {
                  const foundExercise = exercises.find(
                    (searchingExercise) =>
                      searchingExercise.id === exercise.exerciseId
                  );

                  return (
                    <li key={exercise.exerciseId}>
                      <h3>{foundExercise?.name || "Unknown Exercise"}</h3>
                      <p>Sets: {exercise.sets}</p>
                      <p>Reps: {exercise.reps}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </main>
    </>
  );
}
