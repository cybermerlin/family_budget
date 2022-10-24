import React from "react";
import logo from "./logo.svg";
import { Counter } from './features/counter/Counter';
import "./App.css";
import GridView from "./plugins/grid/View";


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
