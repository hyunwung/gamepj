import React from 'react'
import "./Notice.scss"
import { AiFillHome ,AiFillStar ,AiFillEye} from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import like from "../../assets/heart.png"
import {Link} from "react-router-dom"
import { BsFillPencilFill } from "react-icons/bs";

const Notice = () => {
  const datas = [
    {
      title : "변경되었습니당~",
      date : "2022. 10. 15",
      like : 8,
      view : 254
    },
    {
      title : "변경되었습니당~",
      date : "2022. 10. 15",
      like : 8,
      view : 254
    },
    {
      title : "변경되었습니당~",
      date : "2022. 10. 15",
      like : 8,
      view : 254
    }
]
  return (
    <div className='notice'>
      <div className='notice-container'>
        <div className='notice-title'>
          <div className='notice-title-name'>
            <AiFillHome style={{fontSize:"25px" , margin:"0 8px 4px 8px"}}></AiFillHome><h2 className='notice-span'>공지사항(2)</h2>
          </div>
          
          <a href='/create' className='create-board'>
            <BsFillPencilFill style={{fontSize:"16px"}}></BsFillPencilFill>
            <span>글쓰기</span>
          </a>
        </div>
        <hr className='notice-line'></hr>
        {datas.map((data, index)=>{
          return(
            <div className='notice-box' key={index}>
              <div className='notice-box-contain'>
                <div className="notice-left">
                  <AiFillStar style={{margin:"0 5px 0 0",fontSize:"25px",color:"rgb(255, 221, 89)"}}></AiFillStar>
                  <Link to="/board/detail"><h3>{data.title}</h3></Link>
                </div>
                <div className="notice-right">
                  <span className="notice-date">{data.date}</span>
                  <img src={like} className="notice-like"></img>
                  <span className="notice-like-count">{data.like}</span>
                  <AiFillEye style={{margin:"0 4px 0 4px",fontSize:"24px",color:"gray",float:"right"}}></AiFillEye>
                  <span className="notice-view">{data.view}</span>
                </div>
              </div>
              <hr className='notice-line'></hr>
            </div>
          )
        })}
      </div>
      <FiMoreHorizontal style={{fontSize:"24px", margin:"0 auto", display:"flex"}}></FiMoreHorizontal>
    </div>
  )
}

export default Notice