import  { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host= "http://localhost:5000"
  
  const [notes, setNotes] = useState([]);


  //get all notes
  const getallnote = async() => {

    //API call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      }
      
    });
    const json= await response.json();
    console.log(json);
    
    setNotes(json || []);

  };



  const addanote = async (title, description, tag) => {
    try {
      // API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add note: ${response.statusText}`);
      }
  
      // Convert response to JSON
      const json = await response.json();
      console.log("Added Note:", json);
  
      // Add new note to state
      setNotes([...notes, json]);  // Use the API response instead of hardcoded note
  
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }
  };
  

  //deleting the note
  const deleteanote = async(id) => {
    //API call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      }
      
      // ...
    });
    const json = response.json();
    console.log(json);

    console.log("deleting the note with id " + id);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  //editing note
  const editanote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
      ,
      body: JSON.stringify({ title,description,tag  }),
      // ...
    });
    const json = response.json();
    console.log(json);
    
let newnotes =JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
     
    }
    setNotes(newnotes)
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addanote, deleteanote, editanote,getallnote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
