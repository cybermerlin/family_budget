import React from 'react';
import checkCellsFormula from './checkCellsFormula';

export default function handleKeyPress(e: React.KeyboardEvent<HTMLElement>) {
  if (e.target instanceof Element) {
    let target = e.target as Element;
    let countString = target.innerHTML;

    if (e.key === 'Enter' && countString.startsWith('=') && target.classList.contains('data-input')) {
      e.preventDefault();

      if (checkCellsFormula(countString)) {
        let result = NaN;
        try {
          result = eval(countString.slice(1));
        } catch (err) {
          alert('Проверьте формулу, она некорректна');
        }
        if (Number.isFinite(result)) {
          target.innerHTML = result.toString();
        }
      } else {
        alert(
          "Некорректные символы в формуле!\n Допустимы цифры 0-9, -, +, *, /, (, ), . \n Формула должна начинаться с '='"
        );
      }
    }
  }
}
