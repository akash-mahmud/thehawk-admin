import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import { listCategory } from "../actions/categoryActions";
import { listpost } from "../actions/postActions";
import { axiosRequest } from "../http/request";
import { endpoint } from "../config/endpoinsts";

function AllCategoryScreen() {
  // const [data, setData] = useState()
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categories } = categoryList;
  const postList = useSelector((state) => state.postList);
  const { posts } = postList;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(listCategory());



    dispatch(listpost());

  }, [dispatch]);

  const deleteHandel = async (postId) => {
    if (postId) {
      window.alert("Are you sure?");
      try {
        const res = await axiosRequest.delete(endpoint.category.delete.replace(':id', postId));
        if (res) {
          navigate('/admin/dashboard');
        }
      } catch (error) {
      }
    }
  };
  return (
    <>
      <section className="max-w-6xl  mx-auto px-4">
        <h1 className="my-8">All news categories</h1>

        <div className="card ">

          <div className="overflow-x-scroll lg:overflow-hidden">
            {loading === true ? (
              <ClipLoader color="000" loading="true" size={54} />
            ) : (

              <table className="table table-sm table-border rounded ">
                <thead>
                  <tr>
                    {/* <th>Posted By</th> */}
                    {/* <th>Post Id</th> */}
                    <th>Category Name</th>
                    <th>Add to Menu </th>
                    <th>Add to addTop </th>
                    <th>Category Text</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((category) => (
                      <tr>
                        {/* <td>Someone</td> */}
                        {/* <td>{post._id}</td> */}
                        <td> {category.category}</td>
                        <td>
                          {' '}
                          {category.addToMenu === true
                            ? 'Yes'
                            : 'No'}
                        </td>
                        <td>
                          {' '}
                          {category.addTop === true
                            ? 'Yes'
                            : 'No'}
                        </td>
                        <td>
                          {' '}
                          {category && category.categoryText
                            ? category.categoryText
                            : ''}{' '}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger mb-2"

                            onClick={() =>
                              deleteHandel(category._id)
                            }
                          >
                            Trash
                          </button>

                          <Link
                            className="btn btn-primary m-1"

                            to={`/admin/update_category/${category._id}`}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>


            )}
          </div></div></section>



    </>
  );
}

export default AllCategoryScreen;
