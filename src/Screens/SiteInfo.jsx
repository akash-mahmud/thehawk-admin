import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../http/request";
import { endpoint } from "../config/endpoinsts";
const SiteInfo = () => {
  const [loading, setloading] = useState(false);
  const [hasAddedAlready, sethasAddedAlready] = useState(true);
  const [siteinfo, setsiteinfo] = useState({});
  const navigate = useNavigate();
  const loadData = async () => {
    try {
      const { data } = await axiosRequest.get(endpoint.siteInfo.get);
      if (!data) {
        sethasAddedAlready(false);
      } else {
        setsiteinfo(data);
      }
    } catch (error) { }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      if (hasAddedAlready) {
        await axiosRequest.patch(endpoint.siteInfo.add, siteinfo);
      } else {
        await axiosRequest.post(endpoint.siteInfo.update, siteinfo);
      }

      setloading(false);

      navigate("/admin/dashboard");
    } catch (error) { }
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
                        <h4 className="card-title">Site info</h4>
                        <form className="forms-sample">
                          <div className="form-group">
                            <label for="exampleFormControlFile1">Title</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) =>
                                setsiteinfo({
                                  ...siteinfo,
                                  title: e.target.value,
                                })
                              }
                              value={siteinfo?.title}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              Description
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) =>
                                setsiteinfo({
                                  ...siteinfo,
                                  description: e.target.value,
                                })
                              }
                              value={siteinfo?.description}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">Tags</label>
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) =>
                                setsiteinfo({
                                  ...siteinfo,
                                  tags: e.target.value,
                                })
                              }
                              value={siteinfo?.tags}
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
};

export default SiteInfo;
