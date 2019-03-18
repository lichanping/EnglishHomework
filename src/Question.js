import React, { useState } from "react";

const Question = ({ question, answers: expectedAnswers, showAnswer }) => {
  const [inputAnswer, setInputAnswer] = useState("");

  const onInput = event => {
    setInputAnswer(event.target.value);
  };

  // let isCorrect = false;
  // for (var answer of expectedAnswers) {
  //   isCorrect = inputAnswer === answer || isCorrect;
  // }
  const isCorrect = expectedAnswers.some(
    expectedAnswer => expectedAnswer.trim() === inputAnswer.trim()
  );

  return (
    <tr>
      <td className={isCorrect ? "green" : "purple"}>{question}</td>
      <td>
        <textarea className="my_answer" value={inputAnswer} onInput={onInput} />
      </td>
      <td className={showAnswer ? "normal" : "hidden"}>{expectedAnswers}</td>
    </tr>
  );
};

export default Question;
