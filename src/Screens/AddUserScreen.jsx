
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import { Button, Input } from "@mui/material";
import { axiosRequest } from "../http/request";
import { endpoint } from "../config/endpoinsts";
import { toast } from "react-toastify";
function AddUserScreen() {
  const Navigate = useNavigate();

  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();

  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [professionalName, setProfessionalName] = useState();
  const [password, setPassword] = useState();
  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  const [linkedIn, setLinkedIn] = useState();

  const [load, setLoad] = useState();
  const [adPostLoad, setadPostLoad] = useState(false);

  const postDataSubmit = async (e) => {
    e.preventDefault();
    setadPostLoad(true);
    const res = await axiosRequest.post(endpoint.user.register, {
      name,
      email,
      password,
      avatar,
      bio,
      facebook,
      twitter,
      linkedIn,
      professionalName,
    });

    if (res) {
      setadPostLoad(false);
      setLinkedIn("");
      setName("");
      setAvatar("");
      setEmail("");
      setProfessionalName("");
      setPassword("");
      setFacebook("");
      setTwitter("");
      setBio("");
      Navigate('/admin/add_user');
    }
  };


  const imageHandler = async (e) => {
    const file = e.target.files[0];
    setLoad(true);
    const formdata = new FormData();
    formdata.append('file', file);


    const { data } = await axiosRequest.post(
      endpoint.media.single,
      formdata
    );


    toast.success('Uploaded')

    setAvatar(data?.url);
    setLoad(false);
  };


  useEffect(() => {
    setLoad(false);
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
                        <h4 className="card-title">Add a new user</h4>
                      
                        <form className="forms-sample">
                          <div className="form-group">
                            <label for="exampleFormControlFile1">Name</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="name"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              Professional Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="enter a professional name of that user"
                              onChange={(e) =>
                                setProfessionalName(e.target.value)
                              }
                              value={professionalName}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">email</label>
                            <input
                              className="form-control"
                              type="email"
                              placeholder="email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              password
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              placeholder="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                          </div>
                          <div className="mb-2">Profile Image</div>
                          {/* <h1>Image uploading {progress}%</h1> */}
                          <label htmlFor="contained-button-file">
                            <Input
                              accept="image/*"
                              id="contained-button-file"
                              multiple
                              type="file"
                              onChange={imageHandler}
                              style={{ display: 'none' }}
                            />
                            <Button
                              variant="contained"
                              component="span"
                              className="mb-2"
                            >
                              Upload
                            </Button>
                          </label>
                          <div className="image_previw">
                            <ClipLoader
                              color="skyblue"
                              loading={load}
                              size={50}
                            />
                            <img
                              src={avatar}
                              style={{
                                'max-width': '80%',
                                'max-height': '60%',
                              }}
                            />
                          </div>

                          <p className="card-description">About details</p>

                          <div className="form-group">
                            <label for="exampleFormControlFile1">bio</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="enter a short bio text of the user."
                              onChange={(e) => setBio(e.target.value)}
                              value={bio}
                            />
                          </div>
                          <p className="card-description">
                            <b> Social links</b>#
                          </p>

                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              facebook
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="facebook profile link"
                              onChange={(e) => setFacebook(e.target.value)}
                              value={facebook}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleFormControlFile1">twitter</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="twitter profile link"
                              onChange={(e) => setTwitter(e.target.value)}
                              value={twitter}
                            />
                          </div>

                          <div className="form-group">
                            <label for="exampleFormControlFile1">
                              linkedIn
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="linkedIn profile link"
                              onChange={(e) => setLinkedIn(e.target.value)}
                              value={linkedIn}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary me-2"
                            onClick={postDataSubmit}
                            style={{ width: '13%' }}
                            disabled={adPostLoad}
                          >
                            Add
                          </button>
                        </form>
                        <ClipLoader
                          color="skyblue"
                          loading={adPostLoad}
                          size={50}
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
    </>
  );
}

export default AddUserScreen;
