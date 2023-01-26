import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { listCategory } from "../actions/categoryActions";
import { listpost } from "../actions/postActions";
import { listSubCategory } from "../actions/subCategoryAction";
import { axiosRequest } from "../http/request";
import { endpoint } from "../config/endpoinsts";

function AllSubCategoryScreen() {
  const navigate = useNavigate();

  // const [data, setData] = useState()
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  // const postList = useSelector((state) => state.postList);
  // const {  posts } = postList;

  const dispatch = useDispatch();
  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { loading, subCategories } = subCategoryList;
  useEffect(() => {

    dispatch(listSubCategory());

  }, [dispatch]);

  const deleteHandel = async (postId) => {
    if (postId) {
      window.alert("Are you sure?");
      try {
        const res = await axiosRequest.delete(endpoint.subcategory.delete.replace(':id' , postId));
        if (res) {
          navigate('/admin/all/sub_category');
        }
      } catch (error) {
      }
    }
  };
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
                    {/* <th>Posted By</th> */}
                    {/* <th>Post Id</th> */}
                    <th> Sub Category Name</th>
                    <th>Parent Category</th>
                    <th>Created At</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategories &&
                    subCategories.map((category) => (
                      <tr>
                        {/* <td>Someone</td> */}
                        {/* <td>{post._id}</td> */}
                        <td> {category.subCategoryName}</td>
                        <td>{category.category} </td>
                        <td>
                          {new Date(
                            category.createdAt
                          ).toDateString()}{' '}
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
                          
                            to={`/admin/update_subcategory/${category._id}`}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>


            )}
          </div>
        </div>
        </section>


             

    </>
  );
}

export default AllSubCategoryScreen;
