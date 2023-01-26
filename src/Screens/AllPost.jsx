
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { listpost } from "../actions/postActions";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InfiniteScroll from 'react-infinite-scroll-component';

import dayjs from "dayjs";

import { listCategory } from "../actions/categoryActions";
import { listSubCategory } from "../actions/subCategoryAction";
import { axiosRequest } from "../http/request";
import { endpoint } from "../config/endpoinsts";

function AllPost() {
  let [hasMore, sethasMore] = useState(true);
  const [pageNumber, setpageNumber] = useState(2);
  const [sort, setSort] = useState([]);
  const [postLoading, setpostLoading] = useState(false)
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const [allLoadedPost, setallLoadedPost] = useState([])

  const adminPostData = async () => {
    setpostLoading(true)
    try {
      const { data } = await axiosRequest.get(`${endpoint.post.adminPost}/?page=1`);

      setSort(data);
      setallLoadedPost(data);
      setpostLoading(false)
    } catch (error) {

    }

  }
  useEffect(() => {
    adminPostData();

  }, [])

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;
  useEffect(() => {



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

        }
      } catch (error) {
      }
    }
  };


  const [catPage, setcatPage] = useState(2)
  const [SubcatPage, setSubcatPage] = useState(2);
  const [catId, setcatId] = useState()
  const [subcatId, setsubcatId] = useState()
  const dateFilter = (date) => {


    const filteredData =
      sort &&
      sort.filter((curElem) => {
        return (

          new Date(curElem.createdAt).toISOString() === new Date(date).toISOString()

        );
      });


    setSort(filteredData);
    if (!date) {
      const sortedData =
        sort &&
        sort.sort((a, b) => {
          const dateAInMillis = new Date(a.createdAt).getTime();
          const dateBInMillis = new Date(b.createdAt).getTime();

          return dateBInMillis - dateAInMillis;
        });
      setSort(sortedData);
    }
  };
  const categoryHandler = async (category) => {

    if (subcatId) {
      setsubcatId();
    }
    setcatPage(2);
    sethasMore(() => true);
    setcatId(category);
    if (category === "All") {


      setSort(allLoadedPost);
    } else {
      const { data } = await axiosRequest.get(`/category/${category}/?page=1`);
      if (data.length < 20) {
        sethasMore(() => false);
      }

      setSort(data);
    }
  };

  const subCategoryHandel = async (subCategory) => {
    console.log(subCategory);
    setSubcatPage(2);
    sethasMore(() => true);
    setsubcatId(subCategory)
    if (subCategory === "All") {


      setSort(allLoadedPost);
    } else {
      const { data } = await axiosRequest.get(
        `/subCategory/${subCategory}/?page=1`
      );

      if (data.length < 5) {
        sethasMore(() => false);
      }
      setSort(data);


    }
  };

  const loadNextPost = async () => {



    const data = await axiosRequest.get(`/post/${'admin'}/?page=${pageNumber}`);
    if (data.status === 200) {
      if (data.data.length < 20) {
        sethasMore(() => false);
      }

      setpageNumber(pageNumber + 1);

      setSort([...sort, ...data.data]);
    }


  };

  const loadNextCAtFilterPost = async () => {

    const { data, status } = await axiosRequest.get(
      `/category/${catId}/?page=${catPage}`
    );
    if (status === 200) {
      console.log(data.length);
      if (data.length < 20) {
        sethasMore(() => false);
      }

      setcatPage(catPage + 1);
      console.log(catPage);
      setSort([...sort, ...data]);
    }
  }
  const loadNextsubCAtFilterPost = async () => {

    const { data, status } = await axiosRequest.get(
      `/subCategory/${subcatId}/?page=${SubcatPage}`
    );
    if (status === 200) {
      console.log(data.length);
      if (data.length < 5) {
        sethasMore(() => false);
      }

      setSubcatPage(SubcatPage + 1);

      setSort([...sort, ...data]);
    }
  }

  return (
    <>

      <section class="max-w-6xl  mx-auto px-4">
  
        <div className="card">
          <div className="card-body">
            <h1 class="my-5">Posts</h1>
            <div class="pb-4">

              <div class="relative text-gray-darker hidden lg:flex flex-grow">
                <input type="search" name="search" placeholder="Search by name or company " class="pl-12" />
                <button type="submit" class="absolute left-0 top-0 mt-3 ml-4 hover:text-primary">
                  <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" style={{enableBackground: "new 0 0 56.966 56.966"}} xml:space="preserve"
                    width="512px" height="512px">
                    <path
                      d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </div>
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
                  onChange={(e) => {
                    categoryHandler(e.target.value)

                  }}
                  className="form-control"
                  name=""
                  id=""
                  style={{ width: '100%' }}
                >
                  <option value={'All'}>All</option>
                  {categories &&
                    categories.map((category) => (
                      <option value={category._id}>
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
                      <option value={subCategory._id}>
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
                  {sort &&
                    sort.map((post) => (
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
                          {post.isFetaured === true ? 'Yes' : 'No'}
                        </td>
                        <td>
                          {' '}
                          {post.isFetauredTop === true
                            ? 'Yes'
                            : 'No'}
                        </td>
                        <td>
                         
                          {new Date(post.createdAt).toDateString()}
                        </td>

                        <td>
                          <button
                            className="btn btn-danger mb-2"
                  
                            onClick={() => deleteHandel(post._id)}
                          >
                            Trash
                          </button>

                          <Link
                            className="btn btn-primary m-1"
                          
                            to={`/admin/updateposts/${post._id}`}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}

                  {postLoading ? <>

                  </> : null}
                </tbody>
              </table>
          
            {sort && sort.length ? (
              <>
                <InfiniteScroll
                  dataLength={sort.length} //This is important field to render the next data
                  next={() => {

                 
                    if (catId === 'All') {
                      loadNextPost();
                    } else if (subcatId === 'All') {
                      loadNextPost();
                    }
                    else
                      if (catId && catId !== 'All' && !subcatId) {
                        loadNextCAtFilterPost();
                      }

                    if (subcatId && subcatId !== 'All') {
                      loadNextsubCAtFilterPost();
                    }


                    if (!subcatId && !catId) {
                      loadNextPost();
                    }



                  }
                  }
                  hasMore={hasMore}
                  loader={<ClipLoader />}
                ></InfiniteScroll>
              </>
            ) : (
              ''
            )}


          </div>
        </div>
        
      </section>
                    
             


    </>
  );
}

export default AllPost;
