import React from 'react'
import "../../assets/Global.scss"
import "./ViewHeader.scss"
import {AiFillEye} from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import heart from "../../assets/heart.png"

const ViewHeader = () => {
  const data = "변경되었습니당~"
  return (
    <div className='viewBoard'>
      <h3 className='board-category'>공지사항</h3>
      <hr style={{opacity:"0.5"}}></hr>
      <div className='board-detail-content'>
        <h4 className='board-detail-title'>{data}</h4>
        <div className="board-detail-bottom">
          <div className='board-detail-title1'>
            <span>2022. 10. 15. &nbsp; 15:30 &nbsp;&nbsp; | &nbsp; &nbsp;</span>
            <img src={heart} className="board-detail-heart"></img> &nbsp; 
            <span>8 &nbsp; &nbsp; |</span> &nbsp; &nbsp;
            <AiFillEye style={{ marginTop:"3px", fontSize:"23px",color:"gray"}}></AiFillEye> &nbsp;
            <span>235 &nbsp; &nbsp; </span>
          </div>
          <div className='board-detail-title2'>
            <BsLink45Deg style={{color:"gray",fontSize:"24px"}}></BsLink45Deg>
          </div>
        </div>
        <hr style={{opacity:"0.3" , color:"gray" ,margin:"15px 0 15px 0"}}></hr>
      </div>
    </div>
  )
}

export default ViewHeader