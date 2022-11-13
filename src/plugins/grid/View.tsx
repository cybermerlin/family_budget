import { Component } from 'react';
import EditableGrid from "../../lib/editableGrid/EditableGrid";
import CalculateCellsFormulas from "../math/pureMath/CalculateCellsFormulas";


/**
 * @class plugins.grid.View
 * to show the Editable Grid with special parameters
 */
export default class View extends Component {
  public static defaultProps = {};

  render() {
    return (
      <CalculateCellsFormulas>
        <EditableGrid />
      </CalculateCellsFormulas>
    );
  }
}
