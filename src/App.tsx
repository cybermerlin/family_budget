import React from "react";
import logo from "./logo.svg";
import "./App.css";
import EditableGrid from "./lib/editableGrid/EditableGrid";



// declare global {
//   interface Console {
//     log: ILog;
//   }

//   interface ILog {
//     colors: boolean;
//     (...data: any []): any;
//   }
// }
// console.log = <ILog>function(...args){};
// console.log.colors = true;


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
        <EditableGrid />
      </div>
    );
  }
}
export default App;
