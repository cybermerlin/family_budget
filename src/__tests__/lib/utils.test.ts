import 'src/lib/utils';


describe('lib.utils.*', () => {
  it('DEBUG', () => {
    expect(window.DEBUG).toBe(false);
  });

  it('console.colored', () => {
    expect(console.colored).toBe(true);
    expect(console.info.toString())
        .toContain("color: cyan;background-color: deepskyblue;font-weight:bold;padding:3px 20p");
  });
});
