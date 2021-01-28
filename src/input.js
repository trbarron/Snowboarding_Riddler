
import React from 'react';

class NumInput extends React.Component {
    state = {message: this.props.startVal};
  
    updateNumber = (e) => {
      const val = e.target.value;
      // If the current value passes the validity test then apply that to state
      if (e.target.validity.valid && val.length > 0) {
          this.setState({message: val});
        this.props.method(parseInt(val));
      }
      // If the current val is just the negation sign, or it's been provided an empty string,
      // then apply that value to state - we still have to validate this input before processing
      // it to some other component or data structure, but it frees up our input the way a user
      // would expect to interact with this component
      else if (val === '' || val === '-') this.setState({message: val});
    }
  
    render() {
      return (
        <input
          className = "numberEntry"
          type='number'
          value={this.state.message}
          onChange={this.updateNumber}
          pattern="^-?[0-9]\d*\.?\d*$"
         />
      );
    }
  }
  export default NumInput