import { quickSort } from "./quickSort";

describe("quickSort", () => {
  it.only("sorts integers correctly", () => {
    const input = [5, 3, 4, 8, 6, 0, 2, 7, 9, 1];

    quickSort(input);

    expect(input).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it.only("sorts strings correctly", () => {
    const input = ["e", "a", "g", "h", "b", "d", "f", "c"];

    quickSort(input);

    expect(input).toEqual(["a", "b", "c", "d", "e", "f", "g", "h"]);
  });

});
