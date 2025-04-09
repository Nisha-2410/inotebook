import  { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host= "http://localhost:5000"
  const notesinitial = [
    {
      user: "67d29aca5dfac7b3b02e145d",
      title: "mytitle",
      description: "this is desc",
      tag: "thisistag",
      _id: "67dff5b0b1a54929a1176e15",
      date: "2025-03-23T11:51:12.633Z",
      __v: 0,
    },
    {
      user: "67d29aca5dfac7b3b02e145d",
      title: "mytitle",
      description: "this is desc",
      tag: "thisistag",
      _id: "67dff5b0b1a54929a1176e16",
      date: "2025-03-23T11:51:12.633Z",
      __v: 0,
    },
    {
      user: "67d29aca5dfac7b3b02e145d",
      title: "mytitle",
      description: "this is desc",
      tag: "thisistag",
      _id: "67dff5b0b1a54929a1176e17",
      date: "2025-03-23T11:51:12.633Z",
      __v: 0,
    },
    {
      user: "67d29aca5dfac7b3b02e145d",
      title: "mytitle",
      description: "this is desc",
      tag: "thisistag",
      _id: "67dff5b0b1a54929a1176e18",
      date: "2025-03-23T11:51:12.633Z",
      __v: 0,
    },
    {
      user: "67d29aca5dfac7b3b02e145",
      title: "mytitle",
      description: "this is desc",
      tag: "thisistag",
      _id: "67dff5b0b1a54929a1176e19",
      date: "2025-03-23T11:51:12.633Z",
      __v: 0,
    },
    {
      user: "67d29aca5dfac7b3b02e145d",
      title: "mytitle",
      description: "this is desc",
      tag: "thisistag",
      _id: "67dff5b0b1a54929a1176e11",
      date: "2025-03-23T11:51:12.633Z",
      __v: 0,
    },
    {
      user: "67d29aca5dfac7b3b02e145d",
      title: "mytitle",
      description: "this is desc",
      tag: "thisistag",
      _id: "67dff5b0b1a54929a1176e12",
      date: "2025-03-23T11:51:12.633Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesinitial);


  //get all notes
  const getallnote = async() => {

    //API call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMjlhY2E1ZGZhYzdiM2IwMmUxNDVkIn0sImlhdCI6MTc0MjAyMTAyNn0.W2v0YANLVZgsoR9O0Cbpa0YmiXg6fiH8tbRO6VYR7Lc"
      }
      
    });
    const json= await response.json();
    console.log(json);
    
    setNotes(json);
  };



  const addanote = async (title, description, tag) => {
    try {
      // API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMjlhY2E1ZGZhYzdiM2IwMmUxNDVkIn0sImlhdCI6MTc0MjAyMTAyNn0.W2v0YANLVZgsoR9O0Cbpa0YmiXg6fiH8tbRO6VYR7Lc"
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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMjlhY2E1ZGZhYzdiM2IwMmUxNDVkIn0sImlhdCI6MTc0MjAyMTAyNn0.W2v0YANLVZgsoR9O0Cbpa0YmiXg6fiH8tbRO6VYR7Lc"
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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMjlhY2E1ZGZhYzdiM2IwMmUxNDVkIn0sImlhdCI6MTc0MjAyMTAyNn0.W2v0YANLVZgsoR9O0Cbpa0YmiXg6fiH8tbRO6VYR7Lc"
      },
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
