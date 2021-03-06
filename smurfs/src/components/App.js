import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchSmurfData,
  addNewSmurf,
  delSmurf,
  modifySmurf
} from "../actions/index";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      height: ""
    };
  }
  componentDidMount() {
    this.props.fetchSmurfData();
  }

  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitNewSmurfHandler = event => {
    event.preventDefault();
    let addedSmurf = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    };
    this.props.addNewSmurf(addedSmurf);
    this.setState({ name: "", age: "", height: "" });
  };

  deleteSmurfHandler = id => {
    this.props.delSmurf(id);
  };

  modifySmurfHandler = id => {
    console.log("modifySmurfHandler WORKING", id);
    let addedSmurf = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    };
    this.props.modifySmurf(id, addedSmurf);
    this.setState({ name: "", age: "", height: "" });
  };

  render() {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "lightblue"
        }}
      >
        <h1>SMURFS! 2.0 W/ Redux</h1>
        <p>Smurfs living in Smurfville</p>
        <ul
          style={{
            listStyle: "none",
            textAlign: "center",
            margin: "0",
            padding: "0"
          }}
        >
          {this.props.smurfs.map(smurf => {
            return (
              <li key={smurf.name} style={{ padding: "1rem" }}>
                <p> {smurf.name} </p>
                <p>{smurf.age} </p>
                <p>{smurf.height} </p>
                <button
                  onClick={() => this.deleteSmurfHandler(smurf.id)}
                  style={{ margin: "1rem" }}
                >
                  Delete
                </button>
                <button
                  onClick={() => this.modifySmurfHandler(smurf.id)}
                  style={{ margin: "1rem" }}
                >
                  Modify
                </button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.submitNewSmurfHandler}>
          <input
            placeholder="name..."
            value={this.state.name}
            onChange={this.inputChangeHandler}
            name="name"
          />
          <input
            placeholder="age..."
            value={this.state.age}
            onChange={this.inputChangeHandler}
            name="age"
            style={{ margin: "1rem" }}
          />
          <input
            placeholder="height..."
            value={this.state.height}
            onChange={this.inputChangeHandler}
            name="height"
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
    addNewSmurf,
    delSmurf,
    modifySmurf
  }
)(App);
