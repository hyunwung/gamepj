import "../../assets/Global.scss"
import "./ViewHeader.scss"
import {AiFillEye} from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import heart from "../../assets/heart.png"
import { useLocation ,useNavigate} from 'react-router-dom'
import axios from "axios"
import { useEffect ,useState} from 'react';
import Swal from "sweetalert2";

const ViewHeader = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [data,setData] = useState("")
  const getBoardData = async () =>{
    try{
      const repo = await axios.get(`/boards/${location.state.id}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
      }})
      console.log(repo)
      setData(repo.data)
    }catch(error){
      console.log(error)
    }
  }
  const handleModi = () => {
    navigate("/modi",{
      state:{
        datas:data,
        id:location.state.id
    }}
  )}
  const handleDelete = () => {
    Swal.fire({
      icon: "warning",
      title: "삭제",
      text: "게시글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      }).then((res) => {
      if(res.isConfirmed) {
         try{
          axios.delete(`/${location.state.id}`)
          navigate("/main")
        }catch(error){
          console.log(error)
        }
      }
      else{
        return
      }
    });
  }
  useEffect(()=>{
    getBoardData()
  },[])
  return (
    <div className='viewBoard'>
      <h3 className='board-category'>공지사항</h3>
      <hr style={{opacity:"0.5"}}></hr>
      {data === "" || null || undefined ? null :
        <div>
          <div className='board-detail-header'>
            <h4 className='board-detail-title'>{data.data.title}</h4>
            <div className="board-detail-bottom">
              <div className='board-detail-title1'>
                <span>{data.data.createTime[0]}. {data.data.createTime[1]}. {data.data.createTime[2]} &nbsp; {data.data.createTime[3]}:{data.data.createTime[4]}&nbsp;&nbsp; | &nbsp; &nbsp;</span>
                <img src={heart} className="board-detail-heart"></img> &nbsp; 
                <span>{data.data.like} &nbsp; &nbsp; |</span> &nbsp; &nbsp;
                <AiFillEye style={{ marginTop:"3px", fontSize:"23px",color:"gray"}}></AiFillEye> &nbsp;
                <span>{data.data.views} &nbsp; &nbsp; </span>
              </div>
              <div className='board-detail-title2'>
                <span style={{marginRight:"9px" , opacity:"0.7"}} onClick={handleModi}>수정</span>
                <span style={{marginRight:"9px" , opacity:"0.7"}} onClick={handleDelete}>삭제</span>
                <BsLink45Deg style={{color:"gray",fontSize:"22px"}}></BsLink45Deg>
              </div>
            </div>
            <hr style={{opacity:"0.3" , color:"gray" ,margin:"15px 0 15px 0"}}></hr>
          </div>
          <div 
            className='board-detail-content'
            dangerouslySetInnerHTML={{__html:data.data.content}}>
          </div>
        </div>}
    </div>
  )
}

export default ViewHeader