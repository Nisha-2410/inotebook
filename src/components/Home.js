import React from "react";
import Notes from "./Notes";
import Addanote from "./Addanote";


export const Home = (props) => {
  const {showAlert} = props;
  return (
    <>
    
      <Notes showAlert={showAlert}/>

    </>
  );
};
