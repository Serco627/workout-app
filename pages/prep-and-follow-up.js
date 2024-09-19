import { warmUpCoolDownPrograms } from "@/lib/warmupCooldownPrograms";
import { warmUpCoolDownExercises } from "@/lib/warmUpCoolDownExercises";
import {
  ProgramCard,
  StyledTable,
  StyledTableRow,
  StyledTableHeader,
  StyledTableData,
  StyledTableDataExercises,
  StyledInfoButton,
  InstructionItem,
  InstructionsList,
  StyledHeadline,
  StyledCardHeadlineCoolDown,
} from "@/styledComponents";
import { useState } from "react";
import React from "react";

function findWarmupCooldownExerciseById(exerciseId) {
  const stringId = String(exerciseId);
  const foundExercise = warmUpCoolDownExercises.find(
    (exercise) => exercise.id === stringId
  );
  if (!foundExercise) {
    console.warn(`Exercise with id ${stringId} not found`);
  }
  return foundExercise;
}

export default function PrepAndFollowUp() {
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (exerciseId) => {
    setShowDetails((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  return (
    <div>
      <StyledHeadline>Heat It Up & Chill It Out</StyledHeadline>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {warmUpCoolDownPrograms.map((program) => (
          <ProgramCard key={program.id}>
            <StyledCardHeadlineCoolDown>
              {program.name}
            </StyledCardHeadlineCoolDown>
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
                  const isDetailsVisible = showDetails[exercise.id] || false;
                  return (
                    <React.Fragment key={exercise.id}>
                      <StyledTableRow key={exercise.id}>
                        <StyledTableDataExercises>
                          {exercise.name}
                        </StyledTableDataExercises>
                        <StyledTableData>{exercise.reps}</StyledTableData>
                        <StyledTableData>{exercise.duration}</StyledTableData>
                        <StyledTableData>
                          <StyledInfoButton
                            onClick={() => toggleDetails(exerciseId)}
                          >
                            {isDetailsVisible ? "Info ▲" : "Info ▼"}
                          </StyledInfoButton>
                        </StyledTableData>
                      </StyledTableRow>

                      {isDetailsVisible ? (
                        <StyledTableRow>
                          <StyledTableData colSpan={4}>
                            <h4>Instructions:</h4>
                            <InstructionsList>
                              {exercise.instruction.map(
                                (instruction, index) => (
                                  <InstructionItem
                                    key={`${exercise.id}-${index}`}
                                  >
                                    {instruction}
                                  </InstructionItem>
                                )
                              )}
                            </InstructionsList>
                          </StyledTableData>
                        </StyledTableRow>
                      ) : null}
                    </React.Fragment>
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
