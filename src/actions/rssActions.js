
import { RSS_LIST_FAIL, RSS_LIST_REQUEST, RSS_LIST_SUCCESS, SINGLE_RSS_LIST_FAIL, SINGLE_RSS_LIST_REQUEST, SINGLE_RSS_LIST_SUCCESS } from "../constants/rssConstants";
import { endpoint } from "../config/endpoinsts";
import { axiosRequest } from "../http/request";
export const listRss = () => async (dispatch) => {
  dispatch({
    type: RSS_LIST_REQUEST,
  });
  try {
    const { data } = await axiosRequest.get(endpoint.rss.getAll);
    dispatch({ type: RSS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RSS_LIST_FAIL, payload: error.message });
  }
};

export const singleRss = (id) => async (dispatch) => {
  dispatch({
    type: SINGLE_RSS_LIST_REQUEST,
    payload: id
  });
  try {
    const { data } = await axiosRequest.get(
      `${endpoint.rss.single.replace(":id", id)}`
    );
    dispatch({ type: SINGLE_RSS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGLE_RSS_LIST_FAIL, payload: error.message });
  }
};

