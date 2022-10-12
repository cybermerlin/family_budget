import React from "react";
// import logo from "./logo.svg";
// import "./App.css";

type GreetProps = typeof App.defaultProps & {
  age: number;
};

type GreetState = {
  name: string;
};

class App extends React.Component<GreetProps, GreetState> {
  static defaultProps = {
    age: 21,
  };
  state = { name: "Mike" };

  render() {
    return (
      <div>
        {this.props.age} {this.state.name}
      </div>
    );
  }
}
export default App;
