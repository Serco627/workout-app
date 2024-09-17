import { warmUpCoolDownPrograms } from "@/lib/warmupCooldownPrograms";
import { warmUpCoolDownExercises } from "@/lib/warmUpCoolDownExercises"; // Change require to import
import {
  ProgramCard,
  StyledTable,
  StyledTableRow,
  StyledTableHeader,
  StyledTableData,
  StyledTableDataExercises,
  InfoToggleButton,
} from "@/styledComponents";
import Image from "next/image";

function findWarmupCooldownExerciseById(exerciseId) {
  const stringId = String(exerciseId); // Convert exerciseId to string
  const foundExercise = warmUpCoolDownExercises.find(
    (exercise) => exercise.id === stringId
  );
  if (!foundExercise) {
    console.warn(`Exercise with id ${stringId} not found`); // Use backticks for template literals
  }
  return foundExercise; // Return the found exercise, not exercise.id === exerciseId
}

export default function PrepAndFollowUp() {
  return (
    <div>
      <h1>Heat It Up & Chill It Out</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {warmUpCoolDownPrograms.map((program) => (
          <ProgramCard key={program.id}>
            <h2>{program.name}</h2>
            <StyledTable>
              <thead>
                <StyledTableRow>
                  <StyledTableHeader>Exercise</StyledTableHeader>
                  <StyledTableHeader>Reps</StyledTableHeader>
                  <StyledTableHeader>Duration</StyledTableHeader>
                </StyledTableRow>
              </thead>
              <tbody>
                {program.exerciseIds.map((exerciseId) => {
                  const exercise = findWarmupCooldownExerciseById(exerciseId);

                  if (!exercise) {
                    return null;
                  }

                  return (
                    <StyledTableRow key={exercise.id}>
                      <StyledTableDataExercises>
                        {exercise.name}
                      </StyledTableDataExercises>
                      <StyledTableData>{exercise.reps}</StyledTableData>
                      <StyledTableData>{exercise.duration}</StyledTableData>
                      <StyledTableData>
                        <InfoToggleButton>
                          <Image
                            src="/info.svg"
                            alt="Instructions"
                            width={20}
                            height={20}
                          />
                        </InfoToggleButton>
                      </StyledTableData>
                    </StyledTableRow>
                  );
                })}
              </tbody>
            </StyledTable>
          </ProgramCard>
        ))}
      </div>
    </div>
  );
}
