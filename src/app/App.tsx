import { Component } from 'react';

import "./App.css";
import Counter from '../plugins/counter/Counter';
import GridView from '../plugins/grid/View';


type tAppProps = typeof App.defaultProps & Record<string, any>;


class App extends Component<tAppProps, Record<string, any>> {
  static defaultProps = {};
  state = {};

  render() {
    return (
        <div>
          <Counter/>
          <GridView/>
        </div>
    );
  }
}


export default App;
