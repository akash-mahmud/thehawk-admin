
import React, { useEffect, useState } from "react";

import { endpoint } from "../config/endpoinsts";
import { axiosRequest } from "../http/request";

const CurrentPool = () => {
  const [pool, setpool] = useState({});
  const loadData = async () => {
    try {
      const { data } = await axiosRequest.get(endpoint.pool.currentPool);
      setpool(data);
    } catch (error) { }
  };
  useEffect(() => {
    loadData();
  }, []);

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
                        <h4 className="card-title">{pool?.title}</h4>
                        Options:
                        <div>
                          {pool?.question?.map((option) => (
                            <>
                              <p>{option.text}</p>
                            </>
                          ))}
                        </div>
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

export default CurrentPool;
