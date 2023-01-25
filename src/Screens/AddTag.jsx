import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { endpoint } from '../config/endpoinsts'
import { axiosRequest } from '../http/request'


export default function AddTag() {
    const [showData, setshowData] = useState('')
    const [tag, setTag] = useState([])
    const addTags = async (e) => {
        e.preventDefault()
        try {
            const tagData = tag.map((data) => {
                return {
                    name: data
                }
            })
            await axiosRequest.post(endpoint.tag.add, { tag: tagData })
            toast.success('Tags added')
            setTag([])
            setshowData('')
        } catch (error) {
            toast.error(error)
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
                                              <h4 className="card-title">Add tags</h4>

                                              <form onSubmit={addTags} className="forms-sample">
                                                  <div className="form-group">
                                                      <label for="exampleFormControlFile1">Tags</label>
                                                      <input
                                                          className="form-control"
                                                          type="text"
                                                          placeholder="Tag name"
                                                          onChange={(e) =>
                                                          {
                                                              setshowData(e.target.value)
                                                              const tags = e.target.value.split(',')
                                                            
                                                              setTag(tags)
                                                          }
                                                          }
                                                          value={showData}
                                                      />
                                                  </div>

                                                 
                                                 

                                                  <button
                                                      type="submit"
                                                      className="btn btn-primary me-2"
                                                      
                                                      style={{ width: '13%' }}
                                         
                                                  >
                                                      Add
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
  )
}
