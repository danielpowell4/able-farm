import { MOVE_PLANT } from "../constants";

const initialState = {
  1: {
    id: 1,
    name: "p1",
    position: {
      x: 3,
      y: 4,
    },
  },
  2: {
    id: 2,
    name: "p2",
    position: {
      x: 5,
      y: 7,
    },
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
