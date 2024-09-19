import {
  BackgroundImageWrapper,
  StyledImage,
  ContentOverlay,
  ExerciseName,
  MuscleGroupList,
  MuscleBadge,
  StyledLink,
  ExerciseCard,
} from "/styledComponents.js";

export default function Exercise({ exercise, spotlightMode }) {
  return (
    <ExerciseCard id={exercise.id}>
      <StyledLink href={`/exercises/${exercise.id}`}>
        <BackgroundImageWrapper>
          <StyledImage
            src={exercise.imageUrl}
            alt={exercise.name}
            layout="fill"
            objectFit="cover"
            quality={75}
            priority={exercise.id === 0}
          />
        </BackgroundImageWrapper>
        <ContentOverlay>
          {spotlightMode ? null : <ExerciseName>{exercise.name}</ExerciseName>}

          {spotlightMode ? (
            <p>{exercise.intro}</p>
          ) : (
            <MuscleGroupList>
              {exercise.muscleGroups.map((muscle, index) => (
                <MuscleBadge key={index}>{muscle}</MuscleBadge>
              ))}
            </MuscleGroupList>
          )}
        </ContentOverlay>
      </StyledLink>
    </ExerciseCard>
  );
}
