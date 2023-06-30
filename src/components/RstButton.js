//Renders a restart button that converts the value in every cell to an empty string
//Modified to display "NEW GAME" if the game is not over yet
//Modified to create a space between the restart button and the exit button
//Created by Victor, modified by Alvin

import React from "react";


function RstButton(props) {
  const marginRight = {
    margin: "8px"
  }
  return (
    <button id="restart" onClick={props.restart} style={marginRight}>
      {props.gameOver? "NEW GAME" : "RESTART"}
    </button>
  );
}

export default RstButton;
