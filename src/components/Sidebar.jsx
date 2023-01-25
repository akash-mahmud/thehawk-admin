import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SvgIcon from "@mui/material/SvgIcon";
import { Scrollbar } from 'react-scrollbars-custom';
import Collapsible from 'react-collapsible';
import BackupIcon from '@mui/icons-material/Backup';
import CategoryIcon from '@mui/icons-material/Category';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ClassIcon from '@mui/icons-material/Class';
import GroupAdd from '@mui/icons-material/GroupAdd';
import Group from '@mui/icons-material/Group';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import LoupeIcon from '@mui/icons-material/Loupe';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import RestoreIcon from '@mui/icons-material/Restore';
import { useAuth } from "../hooks/user-auth";
import { url } from "../config/url";


function Sidebar() {
  const [admin, setAdmin] = useState();
  const auth = useAuth()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    setAdmin(user && user.isAdmin && user.isAdmin);
  }, []);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(user);
  }, []);

  return (
    <>


      <div class="mdk-drawer  js-mdk-drawer" id="default-drawer" data-align="start" data-persistent data-domfactory-upgraded="mdk-drawer" data-position="left">
        <div className="mdk-drawer__scrim"></div>


        <div class="mdk-drawer__content" style={{
          transform: 'translate3d(0,0,0)',
          visibility: 'visible'
        }}>
          <Scrollbar >

            <div class="sidebar sidebar-dark sidebar-left bg-gray-darker ps ps--active-y" data-perfect-scrollbar style={{
              minHeight: '100vh'
            }}>
              <div class="flex items-center sidebar-p-a border-b-2 bg-darker sidebar-account">
                <a href="#" class="flex items-center text-underline-0 text-body">
                  <div class="avatar w-12 h-12 mr-2">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="Avatar" class="rounded-full p-1 bg-darker border-1" />
                  </div>
                  <div class="leading-none">

                    <div class="mb-1"><strong>Adrian Demian</strong></div>

                    <small class="text-muted text-xs">ACCOUNT MANAGER</small>
                  </div>

                </a>

              </div>

              {/* <div class="sidebar-heading sidebar-m-t">DEMOS</div> */}
              <ul class="sidebar-menu" id="demos_menu">
                <li class="sidebar-menu-item">
                  <Collapsible triggerClassName="sidebar-menu-button" triggerOpenedClassName="sidebar-menu-button sidebar-menu-opened" trigger="Dashboard">

                    <a class="sidebar-menu-button" href="admin-second.html">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <svg class="w-6 h-6 -mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                      </span>
                      <span class="sidebar-menu-text">System</span>

                    </a>
                    <a class="sidebar-menu-button" href="admin-second.html">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <svg class="w-6 h-6 -mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                      </span>
                      <span class="sidebar-menu-text">Analytics</span>

                    </a>
                  </Collapsible>
                  {/* <a class="sidebar-menu-button" href="admin.html">
                  <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">dvr</i>
                  <span class="sidebar-menu-text">Admin</span>
                </a> */}
                </li>
                <li class="sidebar-menu-item">
                  <Collapsible triggerClassName="sidebar-menu-button" triggerOpenedClassName="sidebar-menu-button sidebar-menu-opened" trigger="Post">
                    <Link className="sidebar-menu-button" to="/admin/addpost">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <ControlPointIcon />
                      </span>
                      <span class="sidebar-menu-text">Add Post</span>

                    </Link>
                    <Link className="sidebar-menu-button" to="/admin/posts">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <DynamicFeedIcon />
                      </span>

                      <span class="sidebar-menu-text"> All Posts</span>
                    </Link>

                  </Collapsible>


                </li>

                <li class="sidebar-menu-item">
                  <Collapsible triggerClassName="sidebar-menu-button" triggerOpenedClassName="sidebar-menu-button sidebar-menu-opened" trigger="User">
                    <Link className="sidebar-menu-button" to="/admin/add_user">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <GroupAdd />
                      </span>
                      <span class="sidebar-menu-text">Add user</span>
                    </Link>

                    <Link className="sidebar-menu-button" to="/admin/all_users">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <Group />
                      </span>
                      <span class="sidebar-menu-text">All users</span>
                    </Link>

                  </Collapsible>

                </li>
                <li class="sidebar-menu-item">
                  <Collapsible triggerClassName="sidebar-menu-button" triggerOpenedClassName="sidebar-menu-button sidebar-menu-opened" trigger="Category">
                    <Link className="sidebar-menu-button" to="/admin/addcategory">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <AddToPhotosIcon />
                      </span>
                      <span class="sidebar-menu-text">Add Category</span>
                    </Link>

                    <Link className="sidebar-menu-button" to="/admin/all_category">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <PermMediaIcon />
                      </span>
                      <span class="sidebar-menu-text">All Category</span>
                    </Link>

                  </Collapsible>

                </li>
                <li class="sidebar-menu-item">
                  <Collapsible triggerClassName="sidebar-menu-button" triggerOpenedClassName="sidebar-menu-button sidebar-menu-opened" trigger="Sub category">

                    <Link className="sidebar-menu-button" to="/admin/sub_category">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <PlaylistAddIcon />
                      </span>
                      <span class="sidebar-menu-text">Add Sub category</span>
                    </Link>

                    <Link className="sidebar-menu-button" to="/admin/all/sub_category">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <ClassIcon />
                      </span>
                      <span class="sidebar-menu-text">All Sub Category</span>
                    </Link>



                  </Collapsible>

                </li>
                <li class="sidebar-menu-item">
                  <Collapsible triggerClassName="sidebar-menu-button" triggerOpenedClassName="sidebar-menu-button sidebar-menu-opened" trigger="Site">




                    <Link className="sidebar-menu-button" to="/admin/site_info">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <GroupAdd />
                      </span>
                      <span class="sidebar-menu-text">Site info</span>
                    </Link>

                    <Link className="sidebar-menu-button" to="/admin/sub_category">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <PlaylistAddIcon />
                      </span>
                      <span class="sidebar-menu-text">Schema</span>
                    </Link>
                  </Collapsible>








                </li>
                <li class="sidebar-menu-item">
                  <Collapsible triggerClassName="sidebar-menu-button" triggerOpenedClassName="sidebar-menu-button sidebar-menu-opened" trigger="Media">

                    <Link className="sidebar-menu-button" to="/admin/sub_category">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <PlaylistAddIcon />
                      </span>
                      <span class="sidebar-menu-text">Add media</span>
                    </Link>

                    <Link className="sidebar-menu-button" to="/admin/all_media">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <PermMediaIcon />
                      </span>
                      <span class="sidebar-menu-text">All media</span>
                    </Link>

                  </Collapsible>

                </li>

                <li class="sidebar-menu-item">
                  <Collapsible triggerClassName="sidebar-menu-button" triggerOpenedClassName="sidebar-menu-button sidebar-menu-opened" trigger="Rss">


                    <Link className="sidebar-menu-button" to="/admin/addrss">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <LoupeIcon />
                      </span>
                      <span class="sidebar-menu-text">Add Rss</span>
                    </Link>

                    <Link className="sidebar-menu-button" to="/admin/all_rss">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <RssFeedIcon />
                      </span>
                      <span class="sidebar-menu-text">All rss</span>
                    </Link>

                  </Collapsible>

                </li>
                <li class="sidebar-menu-item">
                  <Collapsible triggerClassName="sidebar-menu-button" triggerOpenedClassName="sidebar-menu-button sidebar-menu-opened" trigger="Database">

                    <Link className="sidebar-menu-button" to="/admin/database/backup">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <BackupIcon />
                      </span>
                      <span class="sidebar-menu-text">Backup</span>
                    </Link>

                    <Link className="sidebar-menu-button" to="/admin/all_rss">
                      <span class="sidebar-menu-icon sidebar-menu-icon--left">
                        <RestoreIcon />
                      </span>
                      <span class="sidebar-menu-text">Restore</span>
                    </Link>

                  </Collapsible>

                </li>
              </ul>






            </div>
          </Scrollbar>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
