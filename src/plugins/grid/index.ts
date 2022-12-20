import ExcelLikeView from './ExcelLikeView';
import View from './View';


let _grid = {
  View,
  ExcelLikeView
};

export namespace plugins {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export const grid = _grid
}
