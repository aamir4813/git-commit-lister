import { combineReducers } from "redux";

import profiles from "./profiles";
import commitReduer from "./commitReduer";

export default combineReducers({
  profiles: profiles,
  commitReducer: commitReduer,
});
