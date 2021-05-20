import { QuizResult, QuizType } from "./types/quiz_types";
import { shuffleArray } from "./utils";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "MEDIUM",
  HARD = "hard",
}

export const fetchQuizData = async (
  total: number,
  difficulty: Difficulty
): Promise<QuizType[]> => {
  const url = `https://opentdb.com/api.php?amount=${total}&category=21&difficulty=${difficulty}&type=multiple`;

  const response = await (await fetch(url)).json();

  const quiz: QuizType[] = response.results.map((data: QuizResult) => {
    return {
      question: data.question,
      answer: data.correct_answer,
      option: shuffleArray([...data.incorrect_answers, data.correct_answer]),
      correct_answer: data.correct_answer,
    };
  });
  return quiz;
};
