import { random, shortId } from './utils';


describe('lib.editableGrid.utils', () => {
  it('random() given a random number', () => {
    const R1 = random(),
      R2 = random();

    expect(typeof R1).toBe('number');
    expect(R1 !== R2).toBe(true);
  });

  it('shortId() given a random string w length equals 8 symbols', () => {
    const R1 = shortId(),
      R2 = shortId();

    expect(R1 !== R2).toBe(true);
    expect(R1.length).toEqual(8);
  })
});
