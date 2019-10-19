import React, { useState } from 'react';
import '../../Calculator.css';

// This one is using hooks instead of class components

const Calculator = () => {
  const initState = {
    currentValue: '0',
    previousValue: '0',
    operation: null,
    pending: false
  }

  const [state, setState] = useState(initState);

  const handleOnClick = (digit) => {
    const { currentValue, operation, pending } = state;

    if (currentValue.length >= 10) return;
    
    if (operation && !pending) {
      let current = currentValue;
      setState(prev => ({ ...prev, ...{ previousValue: String(current), currentValue: String(digit), pending: true } }));
      return;
    }

    let temp = currentValue;
    let nextValue = temp.indexOf('0') === 0 ? String(digit) : temp + digit;

    setState(prev => ({ ...prev, ...{ currentValue: nextValue } }));
  }

  const handleAddition = () => {
    if (state.pending) {
      let result = executeOperation();
      setState(prev => ({ ...prev, ...{ currentValue: String(result), operation: 'addition', pending: false } }))
      return;
    }
    setState(prev => ({ ...prev, ...{ operation: 'addition', pending: false } }))
  }

  const handleSubtraction = () => {
    if (state.pending) {
      let result = executeOperation();
      setState(prev => ({ ...prev, ...{ currentValue: String(result), operation: 'subtraction', pending: false } }))
      return;
    }
    setState(prev => ({ ...prev, ...{ operation: 'subtraction', pending: false } }))
  }

  const handleMultiplication = () => {
    if (state.pending) {
      let result = executeOperation();
      setState({ currentValue: String(result), operation: 'multiplication', pending: false })
      return;
    }
    setState(prev => ({ ...prev, ...{ operation: 'multiplication', pending: false } }))

  }

  const handleDivision = () => {
    if (state.pending) {
      let result = executeOperation();
      setState(prev => ({ ...prev, ...{ currentValue: String(result), operation: 'division', pending: false } }))
      return;
    }
    setState(prev => ({ ...prev, ...{ operation: 'division', pending: false } }))
  }

  const handleReset = () => {
    setState(prev => ({
      ...prev, ...{
        currentValue: '0',
        previousValue: '0',
        operation: null,
        pending: false
      }
    }));
  }

  const handleResult = () => {

    let result = executeOperation();
    setState(prev => ({
      ...prev,
      ...{ previousValue: '0', currentValue: String(result), operation: 'result', pending: false }
    }))

  }

  const executeOperation = () => {
    switch (state.operation) {
      case 'addition': {
        return Number(state.previousValue) + Number(state.currentValue);
      }
      case 'subtraction': {
        return Number(state.previousValue) - Number(state.currentValue);
      }
      case 'multiplication': {
        return Number(state.previousValue) * Number(state.currentValue);
      }
      case 'division': {
        let result = Number(state.previousValue) / Number(state.currentValue);
        let strResult = result.toFixed(2);
        result = Number(strResult);
        return result;
      }
      case 'result': {
        return Number(state.currentValue);
      }
      default:
        return Number(state.currentValue);
    }
  }

  return (
    <div className='calc'>
      <div className='prikaz'>{state.currentValue}</div>
      <div className='row'>
        <button onClick={() => handleOnClick(7)}>7</button>
        <button onClick={() => handleOnClick(8)}>8</button>
        <button onClick={() => handleOnClick(9)}>9</button>
        <button onClick={() => handleDivision()}>%</button>
      </div>
      <div className='row'>
        <button onClick={() => handleOnClick(4)}>4</button>
        <button onClick={() => handleOnClick(5)}>5</button>
        <button onClick={() => handleOnClick(6)}>6</button>
        <button onClick={() => handleMultiplication()}>X</button>
      </div>
      <div className='row'>
        <button onClick={() => handleOnClick(1)}>1</button>
        <button onClick={() => handleOnClick(2)}>2</button>
        <button onClick={() => handleOnClick(3)}>3</button>
        <button onClick={() => handleSubtraction()}>-</button>
      </div>
      <div className='row'>
        <button onClick={() => handleOnClick(0)}>0</button>
        <button onClick={() => handleReset()}>C</button>
        <button onClick={() => handleAddition()}>+</button>
        <button onClick={() => handleResult()}>=</button>
      </div>
    </div>
  );
}

export default Calculator;