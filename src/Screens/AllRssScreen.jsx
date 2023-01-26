
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { listRss } from "../actions/rssActions";
import ClipLoader from "react-spinners/ClipLoader";

import { axiosRequest } from "../http/request";
import { endpoint } from "../config/endpoinsts";


function AllRssScreen() {
  const dispatch = useDispatch();
  const rssList = useSelector((state) => state.rssList);
  const { rss, loading } = rssList;
  useEffect(() => {

    dispatch(listRss());

  }, [dispatch]);

  const navigate = useNavigate();


  const deleteHandel = async (postId) => {
    if (postId) {
      window.alert("Are you sure?");
      try {
        const res = await axiosRequest.delete(endpoint.rss.delete.replace(':id', postId));
        if (res) {
          dispatch(listRss());
          navigate('/admin/all_rss');
        }
      } catch (error) {
      }
    }
  };
  // DE89370400440532013000;
  return (
    <>
      <section class="max-w-6xl  mx-auto px-4">
        <h1 class="my-8">Users</h1>

        <div class="card ">

          <div class="overflow-x-scroll lg:overflow-hidden">
            {loading === true ? (
              <ClipLoader color="000" loading="true" size={54} />
            ) : (

              <table class="table table-sm table-border rounded ">
                <thead>
                  <tr>
                    <th>Rss Title</th>
                    <th>Category</th>
                    <th>Created At</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rss &&
                    rss.map((rssData) => (
                      <tr>
                        <td> {rssData.name}</td>
                        <td>{rssData.category.name}</td>
                        <td>
                          {new Date(
                            rssData.createdAt
                          ).toDateString()}
                        </td>

                        <td>
                          <button
                            className="btn btn-danger mb-2"

                            onClick={() =>
                              deleteHandel(rssData._id)
                            }
                          >
                            Trash
                          </button>

                          <Link
                            className="btn btn-primary m-1"

                            to={`/admin/updaterss/${rssData._id}`}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>


            )}
          </div> </div> </section>



      {/* </AuthLayout> */}

    </>
  );
}

export default AllRssScreen;
