import React, { useState } from "react";
import {nanoid} from 'nanoid'
import Confetti from "react-confetti";
import clickSound from "./components/audio/click.mp3"
import winAudio from "./components/audio/tadaa.mp3"
import TurnIndicator from "./components/TurnIndicator";
import RstButton from "./components/RstButton";
import ExitBtn from "./components/ExitButton";
import Cells from "./components/Cells";
import drawAudio from "./components/audio/wah-wah-sad-trombone-6347.mp3"

function App() {
  const [cells,setCells] = useState(createCells)
  const [options,setOptions] = useState(createOptions)
  const [gameOver,setGameOver] = useState(false)
  const [Xturn,setXturn] = useState(true)
  const [win,setWin] = useState(false)
  const [draw,setDraw] = useState(false)
  const [winner, setWinner] = useState("");
  const [winningCells, setWinningCells] = useState('')
  const [gameStatus, setGameSatus] = useState(false)
  const winningCombo = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
 ]
 if(win){
  new Audio(winAudio).play()
 }else if(draw){
  new Audio(drawAudio).play()
 }
  
  function createCells(){
    const cellsArray = []
    
    for (let i = 0;i < 9;i++){
      cellsArray.push({
        value:"",
        id:i,
        clicked:false
      })
    }
    return cellsArray
  }

  function createOptions(){
    const options = []
    for (let i = 0;i < 9;i++){
      options.push(null)
    }
    return options
  }
  function cellClick(id) {
    new Audio(clickSound).play()   
    setGameSatus(true)
    setCells((prevCells) => {
      return prevCells.map((cell) => {
        if (cell.id === id && !cell.clicked && win===false) {
          setXturn(prev=>!prev)
          return {
            ...cell,
            value:Xturn?"X":"O",
            clicked: true
          };
        }
        return cell;
      });
    });
    if(win===false&&draw===false){
      if (!options[id]){
        options[id] = Xturn?"X":"O"
     }
    }
    
   
    if(!options.includes(null) && !win){
      setDraw(true)
      setGameOver(true)
      console.log("draw")
    }
      checkWinner()
      console.log(options)
  }

  function checkWinner(){
    for (let i of winningCombo){
      let [a,b,c] = i
      if ( options[a] && (options[a] === options[b] && options[a] === options[c])){
        setWin(true)
        setGameOver(true)
        setWinner(options[a]);
        setWinningCells([a,b,c])

      }
   } 
  
  }

  function restart(){
    new Audio(clickSound).play()
    setGameSatus(false)
    setOptions(prev =>prev.fill(null))
    setGameOver(false)
    setDraw(false)
    setWin(false)
    setWinningCells("")
    setCells(prev => prev.map(cell =>({
      ...cell,
      value:"",
      clicked:false
    })))
    setXturn(true)
  }

  function exit() {
    window.close()
  }

    const boxes = cells.map(cellInfo => <Cells
      key={nanoid()} 
      value={cellInfo.value} 
      id = {cellInfo.id} 
      clicked = {cellInfo.clicked} 
      cellClick ={cellClick}
      winner={winner}
      winningCells = {winningCells}
      />
    )

  return (
    <div className="boardBody">
      <TurnIndicator turn={Xturn} win={win} draw={draw} winner={winner} gameOver={gameOver}/>
      <div className="board">
        {boxes}
      </div>
      <div>
        {gameStatus && <RstButton restart={restart} gameOver={gameOver}/>}
        <ExitBtn exit={exit}/>
      </div>
      {win && <Confetti/>}
      
    </div>
  );
}

export default App;
