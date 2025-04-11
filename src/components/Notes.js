import React, { useContext, useEffect,useRef,useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Notesitem from "./Notesitem";
import Addanote from "./Addanote";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const Context = useContext(noteContext);
  const { notes, getallnote ,editanote} = Context;
  let navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in Notes.js:", token); // Debug check
    if (!token) {
      navigate("/login");
    } else {
      getallnote();
    }
  }, [navigate]);// keep navigate in dependency just in case
  
  
   const ref= useRef(null);
   const refclose= useRef(null);

  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id : currentnote._id ,etitle:currentnote.title , edescription: currentnote.description , etag : currentnote.tag})
   
  };

  const handleClick = () => {
   
    editanote(note.id,note.etitle,note.edescription,note.etag)
    console.log("updatingh the value")
    props.showAlert("Updated successfully","success")
    
    refclose.current.click();
    
};

  
  const onchange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <>
      <Addanote showAlert={props.showAlert} />

      <button
        type="button"
        className="d-none btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3 my-3">
          <label htmlFor="etitle" className="form-label" >
           title
          </label>
          <input
            type="text"
            value={note.etitle}
            className="form-control"
             id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
            onChange={onchange}
            minLength={5}
            required
          />
          <div id="emailHelp" className="form-text">
            
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
           description
          </label>
          <input
            type="text"
            value={note.edescription}
            className="form-control"
           id='edescription'
           name='edescription'
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
           tag
          </label>
          <input
            type="text"
            value={note.etag}
            className="form-control"
           id='etag'
           name='etag'
            onChange={onchange}
          />
        </div>
 
      </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" onClick={handleClick}>
               Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
       <div className="container mx-2">
          {notes.length===0 && "No note to display"}
       </div>
        {notes.map((note) => {
          return (
            <Notesitem key={note._id} updateNote={updateNote} note={note}  showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
