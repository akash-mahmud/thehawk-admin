import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../actions/categoryActions";

import ClipLoader from 'react-spinners/ClipLoader';
import { axiosRequest } from "../http/request";
import { endpoint } from "../config/endpoinsts";

function AddRss() {
  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState();
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();
  useEffect(() => {

    dispatch(listCategory());

  }, [dispatch]);
  const categoryIdHandel = (e) => {
    setCategory(e.target.value);

    const filterCategory =
      categories &&
      categories.filter((curElem) => {
        return curElem.category === e.target.value;
      });
    setCategoryId(filterCategory[0]._id);
  };
  const [adPostLoad, setadPostLoad] = useState(false);

  const postDataSubmit = async (e) => {
    setadPostLoad(true)
    e.preventDefault();
    const res = await axiosRequest.post(endpoint.rss.create, {
      title,

      url,
      category,
      categoryId,
    });
    if (res) {
      setadPostLoad(false);
      setTitle("");

      setCategory("");

      setCategoryId("");
      setUrl("")
      Navigate('/admin/addrss');
    }
  };
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
                            >
                              <option>
                                {!category ? 'Select the post category' : ''}
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
                            style={{ width: '13%' }}
                            disabled={adPostLoad}
                          >
                            Add
                          </button>
                        </form>
                        <ClipLoader
                          color="skyblue"
                          loading={adPostLoad}
                          size={50}
                        />
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

export default AddRss;
