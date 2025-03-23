import react, { useState } from "react";
import noteContext from "./noteContext";

const NoteState=(props)=>{
 const notesinitial=[{
    "user": "67d29aca5dfac7b3b02e145d",
    "title": "mytitle",
    "description": "this is desc",
    "tag": "thisistag",
    "_id": "67dff5b0b1a54929a1176e15",
    "date": "2025-03-23T11:51:12.633Z",
    "__v": 0
  },
  {
    "user": "67d29aca5dfac7b3b02e145d",
    "title": "mytitle",
    "description": "this is desc",
    "tag": "thisistag",
    "_id": "67dff5b0b1a54929a1176e15",
    "date": "2025-03-23T11:51:12.633Z",
    "__v": 0
  },
  {
    "user": "67d29aca5dfac7b3b02e145d",
    "title": "mytitle",
    "description": "this is desc",
    "tag": "thisistag",
    "_id": "67dff5b0b1a54929a1176e15",
    "date": "2025-03-23T11:51:12.633Z",
    "__v": 0
  },
  {
    "user": "67d29aca5dfac7b3b02e145d",
    "title": "mytitle",
    "description": "this is desc",
    "tag": "thisistag",
    "_id": "67dff5b0b1a54929a1176e15",
    "date": "2025-03-23T11:51:12.633Z",
    "__v": 0
  },
  {
    "user": "67d29aca5dfac7b3b02e145d",
    "title": "mytitle",
    "description": "this is desc",
    "tag": "thisistag",
    "_id": "67dff5b0b1a54929a1176e15",
    "date": "2025-03-23T11:51:12.633Z",
    "__v": 0
  },
  {
    "user": "67d29aca5dfac7b3b02e145d",
    "title": "mytitle",
    "description": "this is desc",
    "tag": "thisistag",
    "_id": "67dff5b0b1a54929a1176e15",
    "date": "2025-03-23T11:51:12.633Z",
    "__v": 0
  },
  {
    "user": "67d29aca5dfac7b3b02e145d",
    "title": "mytitle",
    "description": "this is desc",
    "tag": "thisistag",
    "_id": "67dff5b0b1a54929a1176e15",
    "date": "2025-03-23T11:51:12.633Z",
    "__v": 0
  }]
  const[notes,setNotes] = useState(notesinitial)
    return(

        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;