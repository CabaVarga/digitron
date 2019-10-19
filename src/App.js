import React, { Component } from 'react';
// import logo from './logo.svg';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      currentValue: '0',
      previousValue: '0',
      operation: null,
      pending: false
    }
  }
  handleOnClick(digit) {
    if (this.state.currentValue.length >= 10) return;
    if (this.state.operation && !this.state.pending) {
        let current = this.state.currentValue;
        this.setState({previousValue: String(current), currentValue: String(digit), pending: true});
        return;
    }
    let temp = this.state.currentValue;
    let nextValue = temp.indexOf('0') === 0 ? String(digit) : temp + digit;

    this.setState({currentValue: nextValue});
  }

  handleAddition() {
    if (this.state.pending) {
      let result = this.executeOperation();
      this.setState({currentValue: String(result), operation: 'addition', pending: false})
      return;
    }
    this.setState({operation: 'addition', pending: false})
  }

  handleSubtraction() {
    if (this.state.pending) {
      let result = this.executeOperation();
      this.setState({currentValue: String(result), operation: 'subtraction', pending: false})
      return;      
    }
    this.setState({operation: 'subtraction', pending: false})
  }

  handleMultiplication() {
    if (this.state.pending) {
      let result = this.executeOperation();
      this.setState({currentValue: String(result), operation: 'multiplication', pending: false})
      return;      
    }
    this.setState({operation: 'multiplication', pending: false})
  }

  handleDivision() {
    if (this.state.pending) {
      let result = this.executeOperation();
      this.setState({currentValue: String(result), operation: 'division', pending: false})
      return;
    }
    this.setState({operation: 'division', pending: false})
  }

  handleResult() {
    if (this.state.pending) {
      let result = this.executeOperation();
      this.setState({previousValue: '0', currentValue: String(result), operation: 'result', pending: false})
    }
  }

  handleReset() {
    // 1st change
    // this.setState({currentValue: '0'})
    this.setState({
      currentValue: '0',
      previousValue: '0',
      operation: null,
      pending: false
    });
  }

  executeOperation() {
    switch(this.state.operation) {
      case 'addition': {
        return Number(this.state.previousValue) + Number(this.state.currentValue);
      }
      case 'subtraction': {
        return Number(this.state.previousValue) - Number(this.state.currentValue);        
      }
      case 'multiplication': {
        return Number(this.state.previousValue) * Number(this.state.currentValue);
      }
      case 'division': {
        let result = Number(this.state.previousValue) / Number(this.state.currentValue);
        let strResult = result.toFixed(2);
        result = Number(strResult);
        return result;
      }
      case 'result': {
        return;
      }
      default:
        return;
    }
  }

  render() {
    return (
      <div className='calc'>
        <div className='prikaz'>{this.state.currentValue}</div>
        <div className='row'>
          <button onClick={() => this.handleOnClick(7)}>7</button>
          <button onClick={() => this.handleOnClick(8)}>8</button>
          <button onClick={() => this.handleOnClick(9)}>9</button>
          <button onClick={() => this.handleDivision()}>%</button>
        </div>
        <div className='row'>
          <button onClick={() => this.handleOnClick(4)}>4</button>
          <button onClick={() => this.handleOnClick(5)}>5</button>
          <button onClick={() => this.handleOnClick(6)}>6</button>
          <button onClick={() => this.handleMultiplication()}>X</button>
        </div>
        <div className='row'>
          <button onClick={() => this.handleOnClick(1)}>1</button>
          <button onClick={() => this.handleOnClick(2)}>2</button>
          <button onClick={() => this.handleOnClick(3)}>3</button>
          <button onClick={() => this.handleSubtraction()}>-</button>
        </div>
        <div className='row'>
          <button onClick={() => this.handleOnClick(0)}>0</button>
          <button onClick={() => this.handleReset()}>C</button>
          <button onClick={() => this.handleAddition()}>+</button>
          <button onClick={() => this.handleResult()}>=</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
