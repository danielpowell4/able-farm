import reducer from "../byId";
import * as types from "../../constants";

describe("plants byId reducer", () => {
  let startingState;
  describe("MOVE_PLANT", () => {
    it("updates the matching plant's position", () => {
      startingState = {
        1: {
          trait: "extra neat",
          position: { x: 1, y: 1 },
        },
        2: { trait: "not matching" },
      };
      expect(
        reducer(startingState, {
          type: types.MOVE_PLANT,
          data: { id: 1, position: "totally new" },
        })
      ).toEqual({
        ...startingState,
        1: {
          ...startingState[1],
          position: "totally new",
        },
      });
    });
  });
});
