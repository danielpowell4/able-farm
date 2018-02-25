import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../actions";
import * as types from "../constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("plants actions", () => {
  describe("movePlant", () => {
    it("has proper type, id and position", () => {
      const id = 1;
      const position = { x: 1 };

      expect(actions.movePlant(id, position)).toEqual({
        type: types.MOVE_PLANT,
        data: { id, position },
      });
    });
  });
});
