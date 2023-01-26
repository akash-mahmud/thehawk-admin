import React, {  useState } from "react";

import { useAuth } from '../hooks/user-auth'

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import BlankLayout from "../layout/BlankLayout";

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const auth = useAuth()

  const submit = async (e) => {
    try {
      e.preventDefault();
      // dispatch(signin(email, password));
      auth.signin(email, password, () => navigate('/admin/dashboard'));
    } catch (error) {
      toast.error(error.message)
    }

  };




  return (
    <>



      <BlankLayout>
        <section className="max-w-6xl  mx-auto px-8 my-0">

          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="card p-4 max-w-md w-full">
              <div className="flex place-content-center items-center pt-4">
                <a href="index.html" className="flex items-center text-xl mr-4 hover:no-underline ">

                  <span className="mr-1 -mt-1 text-primary"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg></span>
                  <span><strong>Thehawk</strong></span>
                </a>
              </div>





              <form action="admin.html" novalidate="">
                <div className="form-group">
                  <label className="text-label" for="email_2">Email Address:</label>
                  <div className="input-group input-group-merge">
                    <input id="email_2" type="email" required onChange={(e) => setEmail(e.target.value)} className="form-control form-control-prepended" placeholder="john@doe.com" />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <span className="far fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-label" for="password_2">Password:</label>
                  <div className="input-group input-group-merge">
                    <input id="password_2" type="password" onChange={(e) => setPassword(e.target.value)} required="" className="form-control form-control-prepended" placeholder="Enter your password" />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <span className="fa fa-key"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button onClick={submit} className="btn block btn-primary" type="submit">Login</button>
                </div>


              </form>

            </div>
          </div>
        </section>
      </BlankLayout>

    </>
  );
}

export default LoginScreen;
