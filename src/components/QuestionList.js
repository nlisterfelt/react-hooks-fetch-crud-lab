import React, {} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({questions, onDelete, onCorrectAnswerChange}) {
  const questionItemJSX = questions.map(question=><QuestionItem key={question.id} question={question} onDelete={onDelete} onCorrectAnswerChange={onCorrectAnswerChange}/>)
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItemJSX}</ul>
    </section>
  );
}

export default QuestionList;
