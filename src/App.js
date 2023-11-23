import './App.css';
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faCheck } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      <Todo/>
    </div>
  );
}



function Todo(){
  //to capture user's todo task
  const [input,setInput]=useState("")
  //to add and remove tasks
  const [arr,setArr]=useState([])
  //to switch between done and undone
  const [state,setstate]=useState([])
  //changing state to what user has typed
  const handleTask = (e)=>{
    setInput(e.target.value)
  }
  //on clicking button the input is added into an array and this array overwtites previous one
  const handleSubmit=(e)=>{
    e.preventDefault()
    if (input!==""){
    setArr([...arr,input])
    }
    setInput("");
  }
  
  return (
    <>
      <div className="container">
        <div className="addtask">
        <input type="text" placeholder="Write your to do here" onChange={handleTask} id="input" value={input} autoComplete='off'></input>
        <button type="submit" id="submit" onClick={handleSubmit}>Add task</button>
        </div>
        <div className='line'></div>
        <List todos={arr}
        //changing parent state to remove element on clicking trash icon (since trash icon is in child component the feedback from clicking the button must be passed to parent component in order to re-render the html) 
        //here update is the updated list on removing an element
        onRemove={(update)=>{
          setArr(update)
        }}
        //when clicked the cheecks if id of element is present in list,if its there then removes it else adds it
        onCheck={(id)=>state.includes(id)===false?setstate([...state,id]):setstate(state.slice(0,[...state].indexOf(id)).concat(state.slice([...state].indexOf(id)+1,[...state].length)))
        }        
        //the changed state is passed to child component for it to know the button has pressed or not so it could render html based on condition 
        flip={state}
        />
      </div>
    </>
  )
}

function List(props){
  //to trigger a re-render you need to change the parent state
  //this function calls the function in parent state(Onremove) the parameter is the index of clicked element in list and newlist is the list with removed elemtn of that index
  //it uses filter to obtain index of every element and creates a newlist where index in argument is not present(read again)
  const removeElement = (index)=>{
    const newlist = props.todos.filter((no,i)=>i!==index)
    props.onRemove(newlist)
    props.onCheck(index)
  }
  //changes color if check and calls parent function (oncheck) which switches states between true and false
  const taskDone = (e)=>{
    if (e.target.style.color===""){
    e.target.style.color = '#ef3f71'
    }
    else{
      e.target.style.color = ""
    }
    props.onCheck(Number(e.target.id))
  }
    //map is used to modify elements and return html
    //conditional rendering is used to check state of parent(flip) and if its false (or the check is clicked) the task is crossed
    console.log(props.todos)
    const listItems = props.todos.map((task,index)=>(
      <li id={index} className='task'>     
      <p id="label">
      {props.flip.includes(index)?<span style={{textDecoration: 'line-through',color:'grey'}}>{index+1}.  {task}</span>: <span>{index+1}.  {task}</span>}
      </p>
      <FontAwesomeIcon icon={faCheck} className="check" id={index} onClick={taskDone}/>
      <FontAwesomeIcon icon={faTrash} className="trash" id={index} onClick={() => removeElement(index)}/>
      </li>
    ))
  //returns modified list
  return(
    <div className="todos">
      <ul>
        {listItems}
      </ul>
    </div>
  )
}



export default App;

