import totalPrice from "./totalPrice";

describe("Logistic's Test", () => {
  test("Calculate Price - Correct", () => {
    expect(totalPrice(10, 20)).toBe(30);
  });
});
