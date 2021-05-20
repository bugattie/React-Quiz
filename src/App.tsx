import React, { useState } from "react";
import "./App.css";

import { VStack, Heading, Button } from "@chakra-ui/react";
import { QuizType } from "./types/quiz_types";
import { Difficulty, fetchQuizData } from "./API";
import { QuestionCard } from "./components/QuestionCard";

function App() {
  const [isLoading, setisLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizType[]>([]);
  let [questionNumber, setquestionNumber] = useState(0);
  let [score, setScore] = useState(0);
  let [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setGameOver(false);
    setisLoading(true);
    const newQuestions = await fetchQuizData(10, Difficulty.EASY);
    setQuestions(newQuestions);
    setquestionNumber(0);
    setScore(0);
    setisLoading(false);
  };

  const handleSubmit = (
    e: React.FormEvent<EventTarget>,
    userAnswer: string
  ) => {
    console.log("Submit");
    e.preventDefault();

    if (questions[questionNumber].correct_answer === userAnswer)
      setScore((prev) => prev + 1);

    if (questionNumber !== questions.length - 1)
      setquestionNumber((prev) => prev + 1);
    else setGameOver(true);
  };

  if (gameOver) {
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url(/bg.jpg)",
      }}
    >
      <VStack>
        <Heading
          mt="16"
          mb="16"
          fontWeight="extrabold"
          size="2xl"
          as="h1"
          bgGradient="linear(to-r, red.400, orange.300, teal.300)"
          bgClip="text"
        >
          QUIZ APP
        </Heading>

        {!isLoading ? (
          <Button
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Loading..."
            variant="outline"
            onClick={startQuiz}
          >
            Start Quiz
          </Button>
        ) : null}

        {isLoading ? (
          <Button
            colorScheme="teal"
            isLoading
            loadingText="Loading..."
            variant="outline"
          ></Button>
        ) : null}

        {!isLoading && !gameOver ? (
          <QuestionCard
            question={questions[questionNumber].question}
            questionNo={questionNumber}
            score={score}
            options={questions[questionNumber].option}
            callback={handleSubmit}
          />
        ) : null}

        {gameOver ? (
          <div>
            <Heading as="h2" size="lg" mt="16" color="grey">
              You are done. Your score was {score}
            </Heading>
          </div>
        ) : null}
      </VStack>
    </div>
  );
}

export default App;
