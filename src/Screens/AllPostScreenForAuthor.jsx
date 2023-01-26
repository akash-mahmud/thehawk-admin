import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listpost } from "../actions/postActions";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import dayjs from "dayjs";
import { listCategory } from "../actions/categoryActions";
import { listSubCategory } from "../actions/subCategoryAction";
import { axiosRequest } from "../http/request";
import { endpoint } from "../config/endpoinsts";
function AllPostScreenForAuthor() {
  const [userData, setUserData] = useState();
  let [hasMore, sethasMore] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(user);
  }, []);

  const [sort, setSort] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;

  useEffect(() => {

    dispatch(listpost());


    dispatch(listCategory());

    dispatch(listSubCategory());

  }, [dispatch]);
  const deleteHandel = async (postId) => {
    if (postId) {
      try {
        window.alert("Are you sure?");
        const res = await axiosRequest.delete(endpoint.post.delete.replace(':id', postId));
        if (res) {
          dispatch(listpost());
          // navigate("/");
        }
      } catch (error) {
      }
    }
  };
  useEffect(() => {

    const sortedData =
      posts &&
      posts

        .filter(
          (curData) =>
            userData && userData._id && curData.author.id === userData._id
        )
        .sort((a, b) => {
          const dateAInMillis = new Date(a.createdAt).getTime();
          const dateBInMillis = new Date(b.createdAt).getTime();

          return dateBInMillis - dateAInMillis;
        });
    setSort(sortedData);
  }, [posts, userData]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sort && sort.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const dateFilter = (date) => {
    const filteredData =
      posts &&
      posts
        .filter(
          (curData) =>
            userData._id === curData.author.id
        )
        .filter((curElem) => {
          return (
            dayjs(date).isSame(
              dayjs(new Date(curElem.createdAt).toDateString())
            ) === true
          );
        });


    setSort(filteredData);
    if (!date) {
      const sortedData =
        posts &&
        posts
          .filter(
            (curData) =>
              userData._id === curData.author.id
          )
          .sort((a, b) => {
            const dateAInMillis = new Date(a.createdAt).getTime();
            const dateBInMillis = new Date(b.createdAt).getTime();

            return dateBInMillis - dateAInMillis;
          });
      setSort(sortedData);
    }
  };
  const categoryHandler = (category) => {
    if (category === "All") {

      const sortedData =
        posts &&
        posts
          .filter(
            (curData) =>
              userData._id === curData.author.id
          )
          .sort((a, b) => {
            const dateAInMillis = new Date(a.createdAt).getTime();
            const dateBInMillis = new Date(b.createdAt).getTime();

            return dateBInMillis - dateAInMillis;
          });
      setSort(sortedData);
    } else {
      const filteredData =
        posts &&
        posts.filter((elem) => {
          return elem.category.name === category;
        });
      setSort(filteredData);
    }
  };

  const subCategoryHandel = (subCategory) => {
    if (subCategory === "All") {

      const sortedData =
        posts &&
        posts
          .filter(
            (curData) =>
              userData._id === curData.author.id
          )
          .sort((a, b) => {
            const dateAInMillis = new Date(a.createdAt).getTime();
            const dateBInMillis = new Date(b.createdAt).getTime();

            return dateBInMillis - dateAInMillis;
          });
      setSort(sortedData);
    } else {
      const filteredData =
        posts &&
        posts.filter((elem) => {
          return elem.subCategory.name === subCategory;
        });
      setSort(filteredData);
    }
  };
  return (
    <>
      <section class="max-w-6xl  mx-auto px-4">
        <h1 class="my-8">Posts</h1>

        <div class="card ">
          <div class="card-body">
            <div class="pb-4">

              <div class="relative text-gray-darker hidden lg:flex flex-grow">
                <input type="search" name="search" placeholder="Search by name or company " class="pl-12" />
                <button type="submit" class="absolute left-0 top-0 mt-3 ml-4 hover:text-primary">
                  <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style={{ enableBackground: "new 0 0 56.966 56.966" }} xml:space="preserve"
                    width="512px" height="512px">
                    <path
                      d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </div>
          <div class="overflow-x-scroll lg:overflow-hidden">
          
               
                  {loading === true ? (
                    <ClipLoader color="000" loading="true" size={54} />
                  ) : (
                
                      <>
                      
                      <div className="allFilters">
                        <div
                          style={{
                            display: 'inline-block',
                            marginRight: '100px',
                            float: 'left',
                          }}
                          className="filters mb-3"
                        >
                          <span style={{ display: 'block' }}>
                            {' '}
                            Filter by Date
                          </span>
                          <input
                            type="date"
                            onChange={(e) => dateFilter(e.target.value)}
                          />
                        </div>

                        <div
                          style={{
                            display: 'inline-block',
                            marginLeft: '10px',
                          }}
                          className="filters mb-3"
                        >
                          <span style={{ display: 'block' }}>
                            {' '}
                            Filter by Category
                          </span>
                          <select
                            onChange={(e) =>
                              categoryHandler(e.target.value)
                            }
                            className="form-control"
                            name=""
                            id=""
                            style={{ width: '100%' }}
                          >
                            <option value="All">All</option>
                            {categories &&
                              categories.map((category) => (
                                <option value={category.category}>
                                  {category.category}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div
                          style={{
                            display: 'inline-block',
                            marginLeft: '10px',
                            float: 'right',
                          }}
                          className="filters mb-3"
                        >
                          <span style={{ display: 'block' }}>
                            {' '}
                            Filter by SubCategory
                          </span>
                          <select
                            onChange={(e) =>
                              subCategoryHandel(e.target.value)
                            }
                            className="form-control"
                            name=""
                            id=""
                            style={{ width: '100%' }}
                          >
                            <option value="All">All</option>
                            {subCategories &&
                              subCategories.map((subCategory) => (
                                <option value={subCategory.subCategoryName}>
                                  {subCategory.subCategoryName}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    
                    <table class="table table-list w-full table-striped-primary">
                          <thead>
                            <tr>
                              <th>Post Title</th>
                              <th>Post Image</th>
                              <th>Posted By</th>
                              <th>Category</th>
                              <th>Sub Category</th>

                              <th>Featured</th>
                              <th>Featured Top</th>
                              <th>Posted At</th>

                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPosts &&
                              currentPosts
                                .filter(
                                  (curData) =>
                                    userData._id === curData.author.id
                                )
                                .map((post) => (
                                  <tr>
                                    <td> {post.postitle}</td>
                                    <td>
                                      <img
                                        src={post.img}
                                        height="100px"
                                        width="100px"
                                      />
                                    </td>
                                    <td>
                                      {post &&
                                        post.author &&
                                        post.author.name &&
                                        post.author.name}
                                    </td>
                                    <td>
                                      {post &&
                                        post.category &&
                                        post.category.name &&
                                        post.category.name}
                                    </td>
                                    <td>
                                      {post &&
                                        post.subCategory &&
                                        post.subCategory.name &&
                                        post.subCategory.name}
                                    </td>

                                    <td>
                                      {' '}
                                      {post.isFetaured === true
                                        ? 'Yes'
                                        : 'No'}
                                    </td>
                                    <td>
                                      {' '}
                                      {post.isFetauredTop === true
                                        ? 'Yes'
                                        : 'No'}
                                    </td>
                                    <td>
                                      {' '}
                                      {new Date(
                                        post.createdAt
                                      ).toDateString()}
                                    </td>

                                    <td>
                                      <button
                                        className="btn btn-danger mb-2"
                                        style={{
                                          padding: ' 0.875rem 1rem',
                                        }}
                                        onClick={() =>
                                          deleteHandel(post._id)
                                        }
                                      >
                                        Trash
                                      </button>

                                      <Link
                                        className="btn btn-primary m-1"
                                        style={{
                                          textDecoration: 'none',
                                          color: '#fff',
                                          width: '100%',
                                        }}
                                        to={`/admin/updateposts/${post._id}`}
                                      >
                                        Edit
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                   
                      <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={sort && sort.length}
                        paginate={paginate}
                      />
                      </>

                       
                  )}
               
          </div>
          </div>
        </div>
      </section>


    </>
  );
}

export default AllPostScreenForAuthor;
