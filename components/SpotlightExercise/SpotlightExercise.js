import { useState, useEffect } from "react";
import {
  StyledHeadline,
  StyledImage,
  ExerciseCard,
  BackgroundImageWrapper,
  StyledLink,
} from "@/styledComponents";
import { exercises } from "/lib/exercises";

export default function SpotlightExercise() {
  function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  const [spotlightExercise, setSpotlightExercise] = useState(null);
  const [showBenefits, setShowBenefits] = useState(false);

  useEffect(() => {
    const index = getRandomIndex(exercises.length);
    setSpotlightExercise(exercises[index]);
  }, []);

  if (!spotlightExercise) return <p>Loading...</p>; // Ladeanzeige, falls das Spotlight-Exercise noch nicht geladen ist

  return (
    <>
      <StyledHeadline>Spotlight Exercise</StyledHeadline>
      <div>
        <h2>{spotlightExercise.name}</h2>
        <StyledLink href={`/exercises/${spotlightExercise.id}`}>
          <ExerciseCard>
            <BackgroundImageWrapper>
              <StyledImage
                src={spotlightExercise.imageUrl}
                alt={spotlightExercise.name}
                layout="fill"
                objectFit="cover"
                quality={75}
              />
            </BackgroundImageWrapper>
          </ExerciseCard>
        </StyledLink>
        <h3>{spotlightExercise.intro}</h3>
        <button onClick={() => setShowBenefits(!showBenefits)}>
          {showBenefits ? "Hide Benefits" : "Show Benefits"}
        </button>
        {showBenefits && (
          <>
            <h4>Benefits</h4>
            {spotlightExercise.benefits.map((benefit, index) => (
              <p key={index}>{benefit}</p>
            ))}
          </>
        )}
      </div>
    </>
  );
}
