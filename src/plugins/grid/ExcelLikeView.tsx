import { Workbook } from '@fortune-sheet/react';
import '@fortune-sheet/react/dist/index.css';


const DATA = { name: 'Empty', status: 1, cellData: [{ r: 0, c: 0, v: null }] };

export default function ExcelLikeView() {
  return (
      <Workbook data={[DATA]} showToolbar={false} showFormulaBar={false} showSheetTabs={false}/>
  )
}
