import React, { useEffect, useState } from "react";
import Todo from './Todo'
import {AiOutlinePlus} from 'react-icons/ai'
import { db } from "./Firebase";
import { collection, query, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";

const style ={
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-x`,
  heading:`text-3xl font-bold text-center text-grey-800 p-2`,
  form:`flex justify-between`,
  input:`border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
}


function App() {
const [todos, setTodos] = useState([])
const [input, setInput] = useState()
console.log(input)


// Create A Todo

const createTodo = async(e) =>{
  e.preventDefault(e);
  if(input === ''){
    alert('please enter a valid text')
    return
}
  await addDoc(collection(db, 'todos'),{
  text: input,
  completed: false
})
setInput('')
}
// Delete Todo
const deleteTodo = async(id) =>{
  await deleteDoc(doc(db, "todos", id))
  console.log(deleteTodo)
}

// Read Todo From Firebase
useEffect(()=>{
  const q = query(collection(db, 'todos'));
  const unsubscribe = onSnapshot(q, (querySnapshot)=>{
    let todosArr = [];
    querySnapshot.forEach((doc)=>{
      todosArr.push({...doc.data(), id:doc.id})
    });
    setTodos(todosArr)
  })

}, [])

// Update Todo in Firebase
const toggleComplete = async(todo)=>{
  await updateDoc(doc(db, 'todos', todo.id),{
      completed: !todo.completed
  })
}
  return (
  <div className={style.bg}>
    <div className={style.container}>
      <h3 className={style.heading}>Todo App</h3>
      <form className={style.form} onSubmit={createTodo}>
        <input value={input} onChange={(e)=>setInput(e.target.value)} className={style.input} type="text" placeholder="Add TODO" />
        <button className={style.button}><AiOutlinePlus size={30}/></button>
      </form>
      <ul>
        {todos.map((todo, index)=>{
        return  <Todo key={index} todo={todo }  toggleComplete={toggleComplete} todoDelete={deleteTodo}/>

        })}
        </ul>
        
       
        {todos.length < 1? null : <p className={style.count}>{`You have ${todos.length} todos`}</p>}

        
    </div>
  </div>
  );
}

export default App;
