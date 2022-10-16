import React from 'react'
import { AiFillPushpin ,AiFillStar ,AiFillEye} from "react-icons/ai";
import { FiLink ,FiMoreHorizontal } from "react-icons/fi";
import "./Update.scss"
import like from "../../assets/heart.png"
import {Link} from "react-router-dom"

const Update = () => {
  return (
    <div className='update'>
        <div className='update-container'>
        <div className='update-title'>
          <AiFillPushpin style={{fontSize:"25px" , margin:"0 8px 4px 8px"}}></AiFillPushpin><h2 className='update-span'>업데이트(2)</h2>
        </div>
        <hr className='update-line'></hr>

        <div className='update-box'>
          <div className='update-box-contain'>
            <div className="update-left">
              <FiLink style={{margin:"0 5px 0 0",fontSize:"25px",color:"gray"}}></FiLink>
              <Link to="/main"><h3>바지사장님이 업데이트 되었습니다..</h3></Link>
            </div>
            <div className="update-right">
              <span className="update-date">2022. 10. 15</span>
              <img src={like} className="update-like"></img>
              <span className="update-like-count">8</span>
              <AiFillEye style={{margin:"0 4px 0 4px",fontSize:"24px",color:"gray",float:"right"}}></AiFillEye>
              <span className="update-view">253</span>
            </div>
          </div>
          <hr className='update-line'></hr>
        </div>

        </div>
        <FiMoreHorizontal style={{fontSize:"24px" , margin:"20px 0 0 470px"}}></FiMoreHorizontal>
    </div>
  )
}

export default Update