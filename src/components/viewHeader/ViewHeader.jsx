import "../../assets/Global.scss"
import "./ViewHeader.scss"
import {AiFillEye} from "react-icons/ai";
import { useLocation ,useNavigate} from 'react-router-dom'
import axios from "axios"
import { useEffect ,useState} from 'react';
import Swal from "sweetalert2";

const ViewHeader = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [data,setData] = useState("")

  const options = {
    'NONE':'에러',
    'NOTICE':'공지사항',
    'EVENT':'이벤트',
    'UPDATE':'업데이트',
    'DEVELOPER_NOTES':'개발 노트',
    'BUG':'버그',
    'GUIDE':'가이드',
    'FAQ':'FAQ'
  }
  const getBoardData = async () =>{
    try{
      const repo = await axios.get(`/boards/${location.state.id}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
        }
      })
      console.log(repo.data.data)
      setData(repo.data.data)
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
      <h3 className='board-category'>{options[data.type]}</h3>
      <hr style={{opacity:"0.5"}}></hr>
      {data === "" || null || undefined ? null :
        <div>
          <div className='board-detail-header'>
            <h4 className='board-detail-title'>{data.title}</h4>
            <div className="board-detail-bottom">
              <div className='board-detail-title1'>
                <span>{data.createTime[0]}. {data.createTime[1]}. {data.createTime[2]} &nbsp; {data.createTime[3]}:{data.createTime[4]}&nbsp;&nbsp;</span>&nbsp;&nbsp;
                <AiFillEye style={{ marginTop:"3px", fontSize:"23px",color:"gray"}}></AiFillEye>&nbsp;
                <span>{data.view} &nbsp; &nbsp; </span>
              </div>
              <div className='board-detail-title2'>
                <span style={{marginRight:"9px" , opacity:"0.7"}} onClick={handleModi} className='board-detail-items'>수정</span>
                <span style={{marginRight:"9px" , opacity:"0.7"}} onClick={handleDelete} className='board-detail-items'>삭제</span>
              </div>
            </div>
            <hr style={{opacity:"0.3" , color:"gray" ,margin:"15px 0 15px 0"}}></hr>
          </div>
          <div 
            className='board-detail-content'
            dangerouslySetInnerHTML={{__html:data.content}}>
          </div>
        </div>}
    </div>
  )
}

export default ViewHeader