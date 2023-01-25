import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../actions/categoryActions";

import { listRss } from "../actions/rssActions";
import { axiosRequest } from "../http/request";
import { endpoint } from "../config/endpoinsts";

function UpdateRssScreen() {
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const rssDataList = useSelector((state) => state.rssList);
  const { rss } = rssDataList;
  useEffect(() => {

    dispatch(listCategory());

  }, [dispatch]);


  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState();
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();
  useEffect(() => {

    dispatch(listRss());

  }, [dispatch]);


  const id = useParams();

  const categoryIdHandel = (e) => {
    setCategory(e.target.value);

    const filterCategory =
      categories &&
      categories.filter((curElem) => {
        return curElem.category === e.target.value;
      });
    setCategoryId(filterCategory[0]._id);
  };

  const postDataSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosRequest.patch(endpoint.rss.update.replace(':id', id.id), {
      title,

      url,
      category,
      categoryId,
    });
    if (res.status === 200) {
      setTitle("");

      setCategory("");

      setCategoryId("");
      dispatch(listRss());
      Navigate('/admin/all_rss');
    }
  };
  useEffect(() => {
    const upDateAblePost =
      rss &&
      rss.filter((curElem) => {
        return curElem._id === id.id;
      });
    const data = upDateAblePost && upDateAblePost[0];
    setTitle(data && data.name);

    setCategory(data && data.category.name);

    setCategoryId(data && data.category.id);
    setUrl(data && data.rssUrl);
  }, [rss, id.id]);
  return (
    <>
    
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
        
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Add RSS</h4>
                        <p className="card-description">All rss details</p>
                        <form className="forms-sample">
                          <div className="form-group">
                            <label for="exampleFormControlFile1">Title</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Title"
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">Rss Url</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Url"
                              onChange={(e) => setUrl(e.target.value)}
                              value={url}
                            />
                          </div>

                          <div className="form-group">
                            <label for="exampleSelectGender">Category</label>
                            <select
                              className="form-control"
                              id="exampleSelectGender"
                              onChange={categoryIdHandel}
                              value={category}
                            >
                              <option>
                                {!category ? "Select the post category" : ""}
                              </option>
                              {categories &&
                                categories.map((elem) => (
                                  <option>{elem.category}</option>
                                ))}
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary me-2"
                            onClick={postDataSubmit}
                            style={{ width: "13%" }}
                          >
                            Update
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateRssScreen;
