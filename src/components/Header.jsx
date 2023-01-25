import React from "react";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../config/endpoinsts";

import { axiosRequest } from "../http/request";
import Navbar from "./Navbar";
function Header() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfoExpiry");
    const responsce = await axiosRequest.get(endpoint.user.logout);

    if (responsce.data.logout) {
      navigate("/admin/login");
    }
  };

  return (
    <>




      <div id="header" class="mdk-header js-mdk-header m-0" style={{
        position: 'fixed',
        top: 0
      }}>
        <div class="mdk-header__content">
          {/* <!-- NAVBAR --> */}

          <header class="py-3 lg:py-0 bg-white shadow-md" data-aos="fade-down" id="navbar">
           <Navbar/>
          </header>

          {/* <!-- // END HEADER --> */}
        </div>
      </div>
    </>
  );
}

export default Header;
