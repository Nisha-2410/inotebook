
import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import Notesitem from "./Notesitem";

const Notes = () => {
    const Context = useContext(noteContext);
    const {notes,setNotes}=Context;
    
  return (
    <div className="row my-3">
    <h2>Your Notes</h2>
    {notes.map((note)=>{
     return <Notesitem note={note}/>;
    })}
 </div>
  )
}

export default Notes