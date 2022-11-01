import React from "react"


export default function countCellsData(prop:JSX.Element){

  function handleKeyPress(e: React.KeyboardEvent<HTMLElement>){
    let countString = (e.target as Element).innerHTML
    if (e.key === "Enter" && countString[0] === "=" && (e.target as Element).classList.contains("data-input")){
      e.preventDefault();
      
      if (!countString.slice(1).match(/[^0-9.+-/*()]/g)){
        let result: number;
        try {
          result = eval(countString.slice(1));
        } catch (err){
          alert("Проверьте формулу, она некорректна");
        }
        if (!(isNaN(result) || result === undefined)){
          console.log("counted this", result);
        }
      } else {
        alert('Некорректные символы в формуле!\n Допустимы цифры 0-9, -, +, *, /, (, ), . \n Формула должна начинаться с "="')
      }
    }
  }

  return (
    <div onKeyPress={(e) => handleKeyPress(e)}>
      {prop}
    </div>
  )
}
