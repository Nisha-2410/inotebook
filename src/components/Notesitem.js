import React,{ useContext } from 'react'
import noteContext from "../Context/notes/noteContext";

const Notesitem = (props) => {
  const { deleteanote } = useContext(noteContext);
   // const {deleteanote}=props;
    const {note,updateNote}=props;
  return (
    <div className='col-md-3'>
    <div className="card my-3" >
  
  <div className="card-body">
    <h5 className="card-title"> {note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteanote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2 "   data-bs-toggle="modal"
        data-bs-target="#exampleModal"  onClick={()=>{updateNote(note)}}></i>
    
  </div>
</div>
</div>
  )
}

export default Notesitem