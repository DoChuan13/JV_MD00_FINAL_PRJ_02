import * as stateConst from "../../../constants/stateConstants";
// import * as axios from "../../../../middleware/api/methods/methodAxios";
// import { products } from "../../../../config/resourcesAxiosConfig";

const initState = [];

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case stateConst.GET_PROD_SUCC_TYPE:
      state = [...action.payload];
      return state;

    default:
      return state;
  }
};

export default productReducer;
