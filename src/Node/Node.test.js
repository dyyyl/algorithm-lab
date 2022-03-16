import { Node } from ".";

describe("Node", () => {
  it("has a value", () => {
    const node = new Node(1);

    expect(node.value).toBe(1);
  });
});
