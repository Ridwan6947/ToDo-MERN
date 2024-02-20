import React, { useState , useEffect } from 'react';
import axios from 'axios';
import {BsFillTrashFill , BsCircleFill , BsFillCheckCircleFill } from 'react-icons/bs'


function Ui() {
    const[task , setTask] = useState();
    const handleAdd = () => {
        console.log(task)
        axios.post('http://localhost:3001/add', { task: task })
            .then(response => {
                location.reload()
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const [todos , setTodos] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    } ,[])

    const handleEdit = (id) =>{
        axios.put('http://localhost:3001/update/' +id)
        
        .then(result =>{
            location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3001/delete/' +id)
        .then(result =>{
            location.reload()
        })
        .catch(err => console.log(err))

    }



    
    return (
        <div className="formui">
            <div className="form">
                <input type="text" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)} />
                <button type="button" onClick={handleAdd} className='btn'>Add record</button>
                <div className="rec" style={{ display: 'grid', justifyContent: 'center', alignItems:'center'}}>
                {
                    todos.length === 0
                    ?
                    <h2>No record yet</h2>
                    :
                    todos.map(todo =>(
                    <div className='tasksss'>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                            <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                            : <BsCircleFill className='icon'/>
                            }
                            <p className={todo.done ? "line_strike" : ""}>{todo.task}</p>
                        </div>
                        <div className='trashcan' style={{color:'red' , display:'flex' , justifyContent:'right' }} onClick={ () => handleDelete(todo._id)}>
                            <span><BsFillTrashFill className = 'icon'/></span>
                        </div>    
                    </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
}

export default Ui;
