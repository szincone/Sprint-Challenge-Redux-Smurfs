import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSmurfData, addNewSmurf } from "../actions/index";
import "./App.css";
/*
  to wire this component up you're going to need a few things.
  I'll let you do this part on your own. 
  Just remember, `how do I `connect` my components to redux?`
  `How do I ensure that my component links the state to props?`
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSmurf: ""
    };
  }
  componentDidMount() {
    this.props.fetchSmurfData();
  }

  inputChangeHandler = event => {
    this.setState({ newSmurf: event.target.value });
  };
  submitNewSmurfHandler = event => {
    event.preventDefault();
    this.props.addNewSmurf(this.state.newSmurf);
  };
  render() {
    console.log("newsmurf", this.state.newSmurf);
    return (
      <div className="App">
        <h1>SMURFS! 2.0 W/ Redux</h1>
        <div>Welcome to your Redux version of Smurfs!</div>
        <div>Start inside of your `src/index.js` file!</div>
        <div>Have fun!</div>
        <ul style={{ listStyle: "none" }}>
          {this.props.smurfs.map(smurf => {
            return <li key={smurf.name}>{smurf.name}</li>;
          })}
        </ul>
        <form onSubmit={this.submitNewSmurfHandler}>
          <input
            placeholder="name..."
            value={this.state.newSmurf}
            onChange={this.inputChangeHandler}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs,
    isFetching: state.isFetching
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSmurfData,
    addNewSmurf
  }
)(App);
