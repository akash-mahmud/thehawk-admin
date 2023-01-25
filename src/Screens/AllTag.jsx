import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { endpoint } from '../config/endpoinsts'
import { axiosRequest } from '../http/request'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { url } from '../config/url'
import Skeleton from 'react-loading-skeleton'

export default function AllTag() {
  const [searchParams] = useSearchParams();
  const [page, setpage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1)
  const [tags, settags] = useState([])
  const [totalPages, settotalPages] = useState(1)
  const [loading, setloading] = useState(false)



  const loadTags = async (page = 1) => {
    setloading(true)
    const { data } = await axiosRequest.get(`${endpoint.tag.get}?page=${page}`)
    settags(data?.result)
    settotalPages(data?.totalPages)
    setloading(false)
  }

  const navigate = useNavigate()
  useEffect(() => {
    loadTags(page)
  }, [])
  const handlePageClick = async (event) => {

    setpage(() => event.selected + 1)
    navigate({
      pathname: url.tag.all, search: `?page=${event.selected + 1}`,
    })
    await loadTags(event.selected + 1)
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
                        <h4 className="card-title">All tags</h4>

                        <table className='w-100'>
                          <thead>
                            <tr>
                              <th>Name</th>


                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              tags

                                .map((tag) => (
                                  <tr>
                                    <td>{
                                      loading ? <Skeleton /> : <>{tag.name}</>
                                    } {tag.name}</td>







                                    <td className='d-flex' style={{
                                      borderRadius:'unset'
                                    }}>
                                      {
                                        loading ? <Skeleton /> : <>   <button
                                          className="btn btn-danger "
                                          style={{
                                            marginRight: ' 3px',
                                          }}
                                          onClick={() =>
                                            deleteHandel(tag._id)
                                          }
                                        >
                                          Trash
                                        </button>

                                          <Link
                                            className="btn btn-primary "
                                            style={{
                                              textDecoration: 'none',
                                              color: '#fff',
                                              width: '100%',
                                            }}
                                            to={`/admin/updateposts/${tag._id}`}
                                          >
                                            Edit
                                          </Link>
                                        </>
                                      }

                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                        <div className="mt-5">

                          <ReactPaginate className='tablePagination'
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            initialPage={page - 1}
                            renderOnZeroPageCount={null}

                          />
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
  )
}
