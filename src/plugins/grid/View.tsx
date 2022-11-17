import { Component } from 'react';
import EditableGrid from "../../lib/editableGrid/EditableGrid";
import CountCellsData from "../calculationTry1/countCellsData";


/**
 * @class plugins.grid.View
 * to show the Editable Grid with special parameters
 */
export default class View extends Component {
  public static defaultProps = {};

  render() {
    return CountCellsData(<EditableGrid />);
  }
}
