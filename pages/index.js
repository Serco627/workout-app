import {
  motivationalQuotesBad,
  motivationalQuotesGood,
  motivationalQuotesOkay,
} from "@/lib/quotes";
import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import SpotlightExercise from "@/components/SpotlightExercise/SpotlightExercise";

export default function HomePage() {
  const [currentQuote, setCurrentQuote] = useState({
    quote: "Loading...",
    author: "",
  });
  const [moodMode, setMoodMode] = useState(null);

  function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  function handleMood(event, moodLevel) {
    event.preventDefault();
    if (moodLevel <= 3) {
      setCurrentQuote(
        motivationalQuotesBad[getRandomIndex(motivationalQuotesBad.length)]
      );
      setMoodMode("Feeling off today? Don’t sweat it, you’ll bounce back!");
    } else if (moodLevel <= 7 && moodLevel >= 4) {
      setCurrentQuote(
        motivationalQuotesOkay[getRandomIndex(motivationalQuotesOkay.length)]
      );
      setMoodMode("A bit off today? Every step forward is still a win!");
    } else if (moodLevel >= 8) {
      setCurrentQuote(
        motivationalQuotesGood[getRandomIndex(motivationalQuotesGood.length)]
      );
      setMoodMode("On top of the world today? Keep crushing it!");
    }
  }

  return (
    <>
      <QuoteContainer>
        <StyledHeadline>
          {moodMode ? moodMode : "Hello, how are you feeling today?"}
        </StyledHeadline>
        {moodMode ? (
          <>
            <StyledPostionRelative>
              <StyledQuotationMarks
                src={"/quote.svg"}
                width={100}
                height={100}
                alt="quote decoration"
              />
            </StyledPostionRelative>
            <QuoteText>{currentQuote.quote}</QuoteText>
            <AuthorText>{currentQuote.author}</AuthorText>
          </>
        ) : (
          <>
            <form
              onSubmit={(event) => handleMood(event, event.target.mood.value)}
            >
              <label htmlFor="mood">My mood today is...</label>
              <br />
              <br />
              <span>😔</span>
              <input
                type="range"
                min={1}
                max={10}
                id="mood"
                name="mood"
              ></input>
              <span>🤩</span>
              <br />
              <Button type="submit">Send</Button>
            </form>
          </>
        )}
      </QuoteContainer>
      <SpotlightExercise />
    </>
  );
}

const StyledHeadline = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 1rem;
`;

const StyledQuotationMarks = styled(Image)`
  position: absolute;
  left: -30px;
  top: -30px;
`;

const StyledPostionRelative = styled.div`
  position: relative;
  width: 100%;
`;

const QuoteContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
  box-shadow: 0 4px 8px #0000001a;
`;
const QuoteText = styled.blockquote`
  font-size: 24px;
  font-style: italic;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.6;
  position: relative;
  &::before,
  &::after {
    font-size: 30px;
    color: #999;
    position: absolute;
  }
  &::before {
    top: -20px;
    left: -20px;
  }
  &::after {
    bottom: -20px;
    right: -20px;
  }
`;
const AuthorText = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0;
`;
const Button = styled.button`
  background: #e67e22;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem 0;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background: #d35400;
  }
`;
