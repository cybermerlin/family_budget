import React from "react";

// import logo from "./logo.svg";
import "./App.css";
import Counter from '../plugins/counter/Counter';
import GridView from "../plugins/grid/View";


type tAppProps = typeof App.defaultProps & {
};

type tAppState = {
};


class App extends React.Component<tAppProps, tAppState> {
  static defaultProps = {};
  state = {};

  render() {
    return (
      <div>
        <Counter />
        <GridView />
      </div>
    );
  }
}
export default App;
