import { MOVE_PLANT } from "../constants";

const initialState = {
  1: {
    id: 1,
    name: "apple",
    position: {
      x: 2,
      y: 2,
    },
  },
  2: {
    id: 2,
    name: "potato",
    position: {
      x: 6,
      y: 6,
    },
  },
  3: {
    id: 3,
    name: "potato",
    position: {
      x: 6,
      y: 7,
    },
  },
  4: {
    id: 4,
    name: "squash",
    position: {
      x: 5,
      y: 8,
    },
  },
  5: {
    id: 5,
    name: "squash",
    position: {
      x: 8,
      y: 7,
    },
  },
  6: {
    id: 6,
    name: "spinach",
    position: {
      x: 3,
      y: 3,
    },
  },
  7: {
    id: 7,
    name: "onions",
    position: {
      x: 1,
      y: 6,
    },
  },
  8: {
    id: 8,
    name: "radish",
    position: {
      x: 6,
      y: 1,
    },
  },
  9: {
    id: 9,
    name: "eggplant",
    position: {
      x: 1,
      y: 4,
    },
  },
  10: {
    id: 10,
    name: "spinach",
    position: {
      x: 2,
      y: 3,
    },
  },
  11: {
    id: 11,
    name: "tomato",
    position: {
      x: 3,
      y: 7,
    },
  },
  12: {
    id: 12,
    name: "cucumber",
    position: {
      x: 4,
      y: 5,
    },
  },
  13: {
    id: 13,
    name: "carrots",
    position: {
      x: 7,
      y: 2,
    },
  },
  14: {
    id: 14,
    name: "carrots",
    position: {
      x: 7,
      y: 3,
    },
  },
  15: {
    id: 15,
    name: "carrots",
    position: {
      x: 7,
      y: 4,
    },
  },
  16: {
    id: 16,
    name: "sunflower",
    position: {
      x: 5,
      y: 3,
    },
  },
  17: {
    id: 17,
    name: "peas",
    position: {
      x: 1,
      y: 1,
    },
  },
  18: {
    id: 18,
    name: "peas",
    position: {
      x: 3,
      y: 1,
    },
  },
  19: {
    id: 19,
    name: "peas",
    position: {
      x: 4,
      y: 1,
    },
  },
  20: {
    id: 20,
    name: "pumpkin",
    position: {
      x: 8,
      y: 6,
    },
  },
  21: {
    id: 20,
    name: "basil",
    position: {
      x: 3,
      y: 8,
    },
  },
  22: {
    id: 22,
    name: "climbing beans",
    position: {
      x: 5,
      y: 4,
    },
  },
  23: {
    id: 23,
    name: "climbing beans",
    position: {
      x: 5,
      y: 2,
    },
  },
  24: {
    id: 24,
    name: "fennel",
    position: {
      x: 1,
      y: 8,
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
