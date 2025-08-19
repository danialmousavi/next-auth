import React, { useEffect, useState } from "react";
import Link from "next/link";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faSignOut,
  faSolarPanel,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Index() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isAdmin,setIsAdmin]=useState(false);
  const route=useRouter();
  //احراز کاربر
  const handleAuthUser=async()=>{
      const res=await fetch("/api/auth/me");
      if(res.status==200){
        setIsLoggedIn(true);
        const userData=await res.json();
        setIsAdmin(userData.role=="ADMIN"?true:false);
      }
    }
    
  useEffect(()=>{
    handleAuthUser();
  },[])
  //logout
  const logOut=async()=>{
   const res=await fetch("/api/auth/signout");
    console.log(res);
    
    if(res.status==200){
      setIsAdmin(false);
      setIsLoggedIn(false);
      Swal.fire({
        title:"see you later",
        text:"you have logged out",
        icon:"success"
      }).then(()=>{
        route.replace("/signin")
      })
    }
  }
  const handleLogOut=async(e)=>{
    e.preventDefault();
    Swal.fire({
      title:"LogOut!!",
      text:"Are You sure?",
      showCancelButton:true,
      showConfirmButton:true,
      icon:"question"
    }).then(res=>{
      if(res.isConfirmed){
        logOut()
      }
    })
  }
  return (
    <div className="container">
      <aside className="sidebar">
        <h3 className="sidebar-title">Sidebar</h3>

        <ul className="sidebar-links">
          <>
          {isLoggedIn?(
            <>
            <li>
              <Link href="/dashboard">
                <span>
                  <FontAwesomeIcon icon={faBars} />
                </span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" onClick={handleLogOut}>
                <span>
                  <FontAwesomeIcon icon={faSignOut} />
                </span>
                Logout
              </Link>
            </li>
            </>
          ):(
            <>
            <li>
              <Link href="/signin">
                <span>
                  <FontAwesomeIcon icon={faSignIn} />
                </span>
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <span>
                  <FontAwesomeIcon icon={faSignIn} />
                </span>
                Sign up
              </Link>
            </li>
            </>
          )}

          </>
          {/* User is login & admin */}
          {isAdmin?(<>
                    <li>
            <Link href="/p-admin">
              <span>
                <FontAwesomeIcon icon={faSolarPanel} />
              </span>
              Admin panel
            </Link>
          </li>
          </>):null}
        </ul>
        <img className="wave" src="/Images/wave.svg" alt="wave" />
      </aside>
      <main className="main">
      </main>
    </div>
  );
}

export default Index;
