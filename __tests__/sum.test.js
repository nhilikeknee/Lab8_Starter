//HAVE TO be in {brackets} so it knows that it's just sum, not everything
const { sum } = require('../assets/scripts/sum');

// sum.test.js


test('adds 1 + 2 to equal 3', () => {
  // TODO
  expect(1 + 2).toBe(3);

});

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});