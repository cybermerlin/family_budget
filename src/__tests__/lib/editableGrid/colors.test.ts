import { gray } from 'src/lib/editableGrid/colors';


describe('lib.editableGrid.colors', () => {
  it('gray() should give a heximal color value', () => {
    expect(gray(100)).toBe('#f5f5f5');
  });
});
