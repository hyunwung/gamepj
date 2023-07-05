import "../../assets/Global.scss"
import "./ViewHeader.scss"
import {AiFillEye} from "react-icons/ai";
import { useLocation ,useNavigate} from 'react-router-dom'
import axios from "axios"
import { useEffect ,useState} from 'react';
import Swal from "sweetalert2";
import heart from "../../assets/heart.png";
import heart2 from "../../assets/heart2.png";

const ViewHeader = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [data,setData] = useState("")
  const [auth,setAuth] = useState(false)
  const [like,setLike] = useState(false)
  const [view,setView] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [likeCount, setLikeCount] = useState(0)

  const likeHandle = () => {
    setLike(prev => !prev)
    if(like === true){
      unlikeControl()
      setView(prev => !prev)
    }else{
      likeControl()
      setView(true)
    }
  }
  
  const likeControl = async () => {
    try{
			const repo = await axios.post(`/boards/${location.state.id}/likes`,{},{
			  headers:{
				'Authorization': 'Bearer '+localStorage.getItem("accessToken")
			}
		},{ withCredentials: true })
			console.log(repo)
      if(repo.status === 200){
        console.log('좋아요')
        getLikeCount()
      }
		}catch(error){
			console.log(error)
			Swal.fire({icon: 'warning', html:"작성에 실패하였습니다. <br/> 다시 로그인 해주세요."})
			localStorage.removeItem('accessToken')
			localStorage.removeItem('user')
			localStorage.removeItem('id')
			navigate("/login")
		}
  }

  const unlikeControl = async () => {
    try{
			const repo = await axios.patch(`/boards/${location.state.id}/unlikes`,{},{
			  headers:{
				'Authorization': 'Bearer '+localStorage.getItem("accessToken")
			}
		},{ withCredentials: true })
			console.log(repo.status)
      if(repo.status === 200){
        console.log('싫어요')
        getLikeCount()
      }
		}catch(error){
			console.log(error)
			Swal.fire({icon: 'warning', html:"작성에 실패하였습니다. <br/> 다시 로그인 해주세요."})
			localStorage.removeItem('accessToken')
			localStorage.removeItem('user')
			localStorage.removeItem('id')
			navigate("/login")
		}
  }

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
      console.log("게시글 정보 : ",repo.data.data)
      setData(repo.data.data)
      if(repo.data.data.mine === true){
        setAuth((prev)=>!prev)
      }
      if(repo.data.data.likeFlag === true){
        setLike(true)
      }else{
        setLike(false)
      }
    }catch(error){
      console.log(error)
      if(localStorage.getItem("accessToken") === null){
        navigate('/login')
        Swal.fire({icon: 'warning', html:"로그인을 해주세요."})
      }
      else{
        console.log(error)
        Swal.fire({icon: 'warning', html:"로딩에 실패하였습니다. <br/>로그인을 해주세요."})
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        navigate("/login")
      }
    }
  }

  const getBoardRead = async () =>{
    try{
      const repo = await axios.get(`/boards/read/${location.state.id}`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
        }
      })
      console.log("게시글 읽기 : ",repo.data)
      if(repo.data.message === "READ_VIEW_BOARD_SUCCESS"){
        setViewCount(repo.data.data)
      }
    }catch(error){
      console.log(error)
      if(localStorage.getItem("accessToken") === null){
        navigate('/login')
        Swal.fire({icon: 'warning', html:"로그인을 해주세요."})
      }
      else{
        console.log(error)
        Swal.fire({icon: 'warning', html:"로딩에 실패하였습니다. <br/>로그인을 해주세요."})
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        navigate("/login")
      }
    }
  }

  const getLikeCount = async () =>{
    try{
      const repo = await axios.get(`/boards/${location.state.id}/likes/counts`,{
        headers:{
          'Authorization': 'Bearer '+localStorage.getItem("accessToken")
        }
      })
      console.log("게시글 좋아요 갯수 : ",repo.data.data)
      if(repo.data.message === "READ_VIEW_BOARD_SUCCESS"){
        setLikeCount(repo.data.data)
      }
    }catch(error){
      console.log(error)
      if(localStorage.getItem("accessToken") === null){
        navigate('/login')
        Swal.fire({icon: 'warning', html:"로그인을 해주세요."})
      }
      else{
        console.log(error)
        Swal.fire({icon: 'warning', html:"로딩에 실패하였습니다. <br/>로그인을 해주세요."})
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        navigate("/login")
      }
    }
  }
  
  const handleModi = () => {
    navigate(`/modi/${location.state.id}`)
  }
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
          axios.delete(`/boards/${location.state.id}`,{
            headers:{
              'Authorization': 'Bearer '+localStorage.getItem("accessToken")
            }
          })
          navigate("/main")
          Swal.fire({title:"게시글 삭제 완료 !"})
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
    getBoardRead()
    getLikeCount()
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
                <span>{viewCount} &nbsp; &nbsp; </span>
                <img src={like ? heart : heart2} alt='heart' onClick={()=>likeHandle()}></img>&nbsp;
                <span>{likeCount} &nbsp; &nbsp; </span>
              </div>
              <div className='board-detail-title2'>
                {auth ? 
                <div>
                  <span style={{marginRight:"9px" , opacity:"0.7"}} onClick={()=>handleModi()} className='board-detail-items'>수정</span>
                  <span style={{marginRight:"9px" , opacity:"0.7"}} onClick={()=>handleDelete()} className='board-detail-items'>삭제</span>
                </div> : null}
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