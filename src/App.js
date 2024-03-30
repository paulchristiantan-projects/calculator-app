import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('0'); // Initialize with '0'
  const [result, setResult] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (isValidKey(key)) {
        if (key.toLowerCase() === 'backspace' || key.toLowerCase() === 'delete') {
          handleClick('C');
        } else {
          handleClick(key);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  const isValidKey = (key) => {
    return key.match(/[0-9+\-*\/.=]|Enter|Backspace|Delete|c/i);
  };

  const handleClick = (value) => {
    // Regular expression to match valid calculator input
    const validInputRegex = /^(\d+(\.\d+)?([+\-*\/]\d+(\.\d+)?)*|[+\-*\/])?$/;

    if (value === '=') {
      try {
        // Check if the input matches the valid input pattern
        if (!validInputRegex.test(input)) {
          setResult('Invalid Input');
          return;
        }
        setResult(eval(input).toString());
        setInput(eval(input).toString()); // Set the input field to the result
      } catch (error) {
        setResult('Error');
      }
    } else if (value.toLowerCase() === 'c') {
      setInput('0'); // Reset to '0' when Clear button is clicked
      setResult('');
    } else if (['+', '-', '*', '/'].includes(value)) {
      // Replace the existing operator with the new one
      setInput((prevInput) => {
        // Remove the last character if it's an operator
        if (['+', '-', '*', '/'].includes(prevInput.slice(-1))) {
          return prevInput.slice(0, -1) + value;
        } else {
          return prevInput + value;
        }
      });
    } else if (value === '.') {
      // Check if the last number already contains a decimal point
      const lastNumber = input.split(/[\+\-*\/]/).pop();
      if (!lastNumber.includes('.')) {
        setInput(input + value);
      }
    } else {
      // Check if the input value matches the valid input pattern
      if (!validInputRegex.test(input + value)) {
        setResult('Invalid Input');
        return;
      }
      // Append the value to the existing input
      setInput(input === '0' ? value : input + value);
    }
  };

  return (
    <div className="calculator">
      <div className="signature">
        PCT
      </div>
      <input type="text" value={input} className={input === '0' ? 'blinking-cursor' : ''} />

      <div className="buttons">
        <button onClick={() => handleClick('C')}>C</button>
        <button></button>
        <button></button>
        <button></button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('=')}>=</button>
      </div>
    </div>
  );
}

export default App;
