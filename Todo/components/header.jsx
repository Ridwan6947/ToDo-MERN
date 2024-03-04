import React from 'react'
// import {useHistory} from 'react-router-dom';


function header() {

    // const history = useHistory();
    // const handleAboutClick = () =>{
    //     history.push('./about')
    // };
  return (
    <div className="heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{textAlign:'center' , margin:'0'}}>ToDo-List</h2>
        <button className='btn'>Login</button>
    </div>
  )
}

export default header