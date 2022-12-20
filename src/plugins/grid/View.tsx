import EditableGrid from '../../lib/editableGrid/EditableGrid';
import CalculateCellsFormulas from '../math/pureMath/CalculateCellsFormulas';


export default function View() {
  return (
      <CalculateCellsFormulas>
        <EditableGrid/>
      </CalculateCellsFormulas>
  );
}
