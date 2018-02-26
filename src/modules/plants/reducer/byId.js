import { MOVE_PLANT } from "../constants";

const initialState = {
  1: {
    id: 1,
    name: "p1",
    position: {
      x: 2,
      y: 2,
    },
    friends: ["p3"],
    enemies: ["p2"],
  },
  2: {
    id: 2,
    name: "p2",
    position: {
      x: 6,
      y: 6,
    },
    friends: [],
    enemies: ["p1"],
  },
  3: {
    id: 3,
    name: "p3",
    position: {
      x: 8,
      y: 6,
    },
    friends: ["p1"],
    enemies: [],
  },
  4: {
    id: 4,
    name: "p3",
    position: {
      x: 8,
      y: 8,
    },
    friends: ["p1"],
    enemies: [],
  },
};

const byId = (state = initialState, { type, data }) => {
  switch (type) {
    case MOVE_PLANT:
      let { id, position } = data;
      return {
        ...state,
        [id]: {
          ...state[id],
          position,
        },
      };
    default:
      return state;
  }
};

export default byId;
