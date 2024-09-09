export default function findExerciseById(exercises, exerciseId) {
  return exercises.find((exercise) => exercise.id === exerciseId);
}
