import { MOVE_PLANT } from "../constants";

const initialState = {
  1: {
    id: 1,
    name: "apple",
    position: {
      x: 2,
      y: 2,
    },
    friends: ["spinach"],
    enemies: ["potato"],
  },
  2: {
    id: 2,
    name: "potato",
    position: {
      x: 6,
      y: 6,
    },
    friends: [],
    enemies: ["apple"],
  },
  3: {
    id: 3,
    name: "spinach",
    position: {
      x: 8,
      y: 6,
    },
    friends: ["apple"],
    enemies: [],
  },
  4: {
    id: 4,
    name: "spinach",
    position: {
      x: 8,
      y: 8,
    },
    friends: ["apple"],
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
