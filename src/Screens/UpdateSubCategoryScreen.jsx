import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../actions/categoryActions";

import { listSubCategory } from "../actions/subCategoryAction";
import { endpoint } from "../config/endpoinsts";
import { axiosRequest } from "../http/request";
function UpdateSubCategoryScreen() {
  const navigate = useNavigate();



  const [category, setCategory] = useState("");


  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageKeywords, setPageKeywords] = useState("");
  const dispatch = useDispatch();
  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  useEffect(() => {

    dispatch(listCategory());


    dispatch(listSubCategory());

  }, [dispatch]);

  const [categoryId, setCategoryId] = useState("");



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
  useEffect(() => {
    const upDateAblePost =
      subCategories &&
      subCategories.filter((curElem) => {
        return curElem._id === id.id;
      });
    const data = upDateAblePost && upDateAblePost[0];
    setTitle(data && data.subCategoryName);
    setCategoryId(data && data.categoryId);
    setCategory(data && data.category);
    setPageTitle(data && data.subCategoryPageTitle);
    setText(data && data.subCategoryText);
    setPageKeywords(data && data.subCategoryPageKeyWords);
  }, [subCategories, id.id, category]);


  const categoryDataSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosRequest.patch(endpoint.subcategory.update.replace(':id', id.id), {
      title,
      category,
      categoryId,
      pageTitle,
      pageKeywords,
      text
    });
    if (res.status === 200) {
      navigate('/admin/all/sub_category');
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
                        <h4 className="card-title">Add Sub category</h4>

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
                            <label for="exampleFormControlFile1">
                              Page title
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="enter page title"
                              onChange={(e) => setPageTitle(e.target.value)}
                              value={pageTitle}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              Page keywords
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="use comma to type multiple keywords"
                              onChange={(e) => setPageKeywords(e.target.value)}
                              value={pageKeywords}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlTextarea1">
                              Page description
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              onChange={(e) => setText(e.target.value)}
                              value={text}
                            ></textarea>
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
                                {!category ? "Select the  category" : ""}
                                {category && !categoryId
                                  ? "Select the  category"
                                  : ""}
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
                            onClick={categoryDataSubmit}
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

export default UpdateSubCategoryScreen;
