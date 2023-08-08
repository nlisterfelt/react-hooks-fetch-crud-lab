import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions]=useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(r=>r.json())
    .then(data=> setQuestions(data))
  })

  function handleNewQuestion(obj){
    const newQuestion=[...questions, obj]
    setQuestions(newQuestion)
  }
  function handleDelete(id){
    const newQuestions = questions.filter(question=>question.id !== id)
    setQuestions(newQuestions)
  }
  function handleCorrectAnswerChange(id, correctAnswer){
    const updatedQuestions = questions.map(question=>{
      if(question.id===id){
        return {...question, correctIndex: correctAnswer}
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={handleNewQuestion}/> : <QuestionList questions={questions} onDelete={handleDelete} onCorrectAnswerChange={handleCorrectAnswerChange}/>}
    </main>
  );
}

export default App;
