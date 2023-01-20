
import { axiosRequest } from "../http/request";
import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from "../constants/postConstants";
import { endpoint } from "../config/endpoinsts";

export const listpost = () => async (dispatch) => {
  dispatch({
    type: POST_LIST_REQUEST,
  });
  try {
    const { data } = await axiosRequest.get(endpoint.post.getAll);
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_LIST_FAIL, payload: error.message });
  }
};
