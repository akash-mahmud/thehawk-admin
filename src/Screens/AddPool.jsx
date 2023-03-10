import React, { useState } from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from 'react-router-dom';
import { axiosRequest } from '../http/request';
import { endpoint } from '../config/endpoinsts';
const AddPool = () => {
  const [loading, setloading] = useState(false)
  const [pool, setpool] = useState({
    title: "",
    option1: {
      id: "",
      text: "",
    },
    option2: {
      id: "",
      text: "",
    },
    option3: {
      id: "",
      text: "",
    },
    option4: {
      id: "",
      text: "",
    },
  });
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    setloading(true);

    try {
      const formatData = {
        title: pool.title,
        question: [
          {
            id: pool.option1.id,
            text: pool.option1.text,
          },
          {
            id: pool.option2.id,
            text: pool.option2.text,
          },
          {
            id: pool.option3.id,
            text: pool.option3.text,
          },
          {
            id: pool.option4.id,
            text: pool.option4.text,
          },
        ],
      };

      await axiosRequest.post(endpoint.pool.create, formatData)
      setloading(false);
      navigate('/admin/dashboard');
    } catch (error) {

    }
  }
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
                        <h4 className="card-title">Add Pool</h4>
                        <form className="forms-sample">
                          <div className="form-group">
                            <label for="exampleFormControlFile1">Title</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) =>
                                setpool({
                                  ...pool,
                                  title: e.target.value,
                                })
                              }
                              value={pool.title}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              Option 1
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) =>
                                setpool({
                                  ...pool,
                                  option1: {
                                    id: uuidv4(),
                                    text: e.target.value,
                                  },
                                })
                              }
                              value={pool.option1.text}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              Option 2
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) =>
                                setpool({
                                  ...pool,
                                  option2: {
                                    id: uuidv4(),
                                    text: e.target.value,
                                  },
                                })
                              }
                              value={pool.option2.text}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              Option 3
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) =>
                                setpool({
                                  ...pool,
                                  option3: {
                                    id: uuidv4(),
                                    text: e.target.value,
                                  },
                                })
                              }
                              value={pool.option3.text}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              Option 4
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) =>
                                setpool({
                                  ...pool,
                                  option4: {
                                    id: uuidv4(),
                                    text: e.target.value,
                                  },
                                })
                              }
                              value={pool.option4.text}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary me-2"
                            onClick={submit}
                            style={{ width: "13%" }}
                            disabled={loading}
                          >
                            Post
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

export default AddPool