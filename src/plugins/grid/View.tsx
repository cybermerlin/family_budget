import React from "react";
import EditableGrid from "../../lib/editableGrid/EditableGrid";
import countCellsData from "../calculationTry1/countCellsData";

/**
 * @class plugins.grid.View
 * to show the Editable Grid with special parameters
 */
export default class View extends React.Component {
  public static defaultProps = {};

  render() {
    return countCellsData(<EditableGrid />);
  }
}
