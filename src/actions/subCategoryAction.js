
import { endpoint } from "../config/endpoinsts";
import { SUB_CATEGORY_LIST_FAIL, SUB_CATEGORY_LIST_REQUEST, SUB_CATEGORY_LIST_SUCCESS } from "../constants/subCategorConstants";
import { axiosRequest } from "../http/request";

export const listSubCategory = () => async (dispatch) => {
  dispatch({
    type: SUB_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await axiosRequest.get(endpoint.subcategory.getAll);
    dispatch({ type: SUB_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SUB_CATEGORY_LIST_FAIL, payload: error.message });
  }
};
