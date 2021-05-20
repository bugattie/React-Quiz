import React from "react";

export type QuizResult = {
  category: string;
  type: string;
  question: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuizType = {
  question: string;
  answer: string;
  option: string[];
  correct_answer: string;
};

export type questionPropsType = {
  question: string;
  options: string[];
  questionNo: number;
  score: number;
  callback: (e: React.FormEvent<EventTarget>, ans: string) => void;
};
