import React from "react";
import logo from "./logo.svg";
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
        <GridView />
      </div>
    );
  }
}
export default App;
