const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");

// Route 1: Get all notes using GET "api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }); // Corrected "Notes" to "Note"
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a new note using POST "api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create and save note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: updating a note using POST "api/notes/updatenote"
router.put( "/updatenote/:id", fetchuser,async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    
  
  const newnote={};
  if(title){
    newnote.title=title;
  }
  if(description){
    newnote.description=description;
  }
  if(tag){
    newnote.tag=tag;
  }

  //find the note to be updated
  let note=await Note.findById(req.params.id);
  if(!note){
   return res.status(404).send("not found");
  }
  if(note.user.toString()!== req.user.id){
    return res.status(401).send("not allowed");
   }
   note = await Note.findByIdAndUpdate(req.params.id ,{$set: newnote},{new:true})
   res.json({note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    
  }
}
);

// Route 4: deleting a note using DELETE "api/notes/deletenote"
router.delete( "/deletenote/:id", fetchuser,async (req, res) => {

  const { title, description, tag } = req.body;
  try {
    

  //find the note to be deleted
  
  let note=await Note.findById(req.params.id);
  if(!note){
   return res.status(404).send("not found");
  }
  if(note.user.toString()!== req.user.id){
    return res.status(401).send("not allowed");
   }
   note = await Note.findByIdAndDelete(req.params.id )
   res.json({"success":"note has been deleted",note:note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}
);

module.exports = router;
