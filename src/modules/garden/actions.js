import { MOVE_PLANT } from "./constants";

export const movePlant = position => ({
  type: MOVE_PLANT,
  data: { position },
});
