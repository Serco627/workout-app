import { useState, useEffect } from "react";
import styled from "styled-components";
import getRandomIndex from "@/utils/getRandomIndex";
import { Button } from "@/pages";
import { exercises } from "/lib/exercises";
import Exercise from "../Exercise/Exercise";

export default function SpotlightExercise() {
  const [spotlightExercise, setSpotlightExercise] = useState(null);
  const [showBenefits, setShowBenefits] = useState(false);

  useEffect(() => {
    const index = getRandomIndex(exercises.length);
    setSpotlightExercise(exercises[index]);
  }, []);

  if (!spotlightExercise) return <p>Loading the Spotlight Exercise...</p>;

  return (
    <SpotlightContainer>
      <h1>Spotlight Exercise</h1>
      <h2>{spotlightExercise.name}</h2>
      <Exercise exercise={spotlightExercise} spotlightMode={true} />

      <Button onClick={() => setShowBenefits(!showBenefits)}>
        {showBenefits ? "Hide Benefits" : "Show Benefits"}
      </Button>

      {showBenefits ? (
        <BenefitsSection>
          <BenefitsHeading>Benefits of this Exercise:</BenefitsHeading>
          {spotlightExercise.benefits.map((benefit, index) => (
            <BenefitItem key={index}>{benefit}</BenefitItem>
          ))}
        </BenefitsSection>
      ) : null}
    </SpotlightContainer>
  );
}

const SpotlightContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  box-shadow: 0 4px 8px #0000001a;
`;

const BenefitsSection = styled.div`
  width: 80%;
  max-width: 600px;
`;

const BenefitsHeading = styled.h3`
  font-size: 1.5rem;
  color: #3498db;
  margin-bottom: 1rem;
`;

const BenefitItem = styled.p`
  font-size: 1rem;
  color: #333;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 5px;
  margin: 0.5rem 0;
`;
