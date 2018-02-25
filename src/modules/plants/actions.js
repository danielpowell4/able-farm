import { MOVE_PLANT } from "./constants";

export const movePlant = (id, position) => ({
  type: MOVE_PLANT,
  data: { id, position },
});
