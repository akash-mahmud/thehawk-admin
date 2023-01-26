import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listpost } from "../actions/postActions";

import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function AllMedia() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const { loading, posts } = postList;
  useEffect(() => {

    dispatch(listpost());

  }, [dispatch]);


  return (
    <>

      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">

          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  {loading === true ? (
                    <ClipLoader color="skyblue" loading="true" size={54} />
                  ) : (
                    <div className="card">
                      <div className="card-body">
                        {posts &&
                          posts.map((curElem) => (
                            <>
                              <img
                                className="m-3"
                                src={curElem.img}
                                alt=""
                                height="100px"
                                width="100px"
                              />
                            </>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllMedia;
