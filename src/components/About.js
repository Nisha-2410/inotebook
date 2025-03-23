import React from 'react';
import { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

export const About = () => {
  const a = useContext(noteContext);
  return (
    <div>About {a.name}</div>
  )
}
