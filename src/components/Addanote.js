import React,{useContext,useState} from 'react'
import noteContext from "../Context/notes/noteContext";
const Addanote = () => {
    const Context = useContext(noteContext);
    const {addanote}=Context;
   
    const [note, setNote] = useState({title:"",description:"",tag:""})
    
    const handleClick = (e) => {
      e.preventDefault();
      if (!note.title || !note.description) {
          alert("Title and description cannot be empty!");
          return;
      }
      addanote(note.title, note.description, note.tag);
      setNote({title:"",description:"",tag:""})
  };
  
    
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
            <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">
           title
          </label>
          <input
            type="email"
            className="form-control"
             id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onchange}
            value={note.title}
          />
          <div id="emailHelp" className="form-text">
            
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
           description
          </label>
          <input
            type="text"
            className="form-control"
           id='description'
           name='description'
            onChange={onchange}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
           tag
          </label>
          <input
            type="text"
            className="form-control"
           id='tag'
           name='tag'
            onChange={onchange}
            value={note.tag}
          />
        </div>
 
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
      </div>
    </div>
  )
}

export default Addanote