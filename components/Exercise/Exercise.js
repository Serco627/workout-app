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

export default function Exercise({ exercise }) {
  return (
    <ExerciseCard>
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
          <ExerciseName>{exercise.name}</ExerciseName>
          <MuscleGroupList>
            {exercise.muscleGroups.map((muscle, index) => (
              <MuscleBadge key={index}>{muscle}</MuscleBadge>
            ))}
          </MuscleGroupList>
        </ContentOverlay>
      </StyledLink>
    </ExerciseCard>
  );
}
