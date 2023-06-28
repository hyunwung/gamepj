import { useState } from 'react';
import { AiOutlineCheck , AiOutlineClose} from "react-icons/ai";
import { useParams, useNavigate } from 'react-router-dom';
import "./Report.scss";
import axios from 'axios';
import Swal from 'sweetalert2';

const Report = ({modalIsOpen , setModalIsOpen}) => {
	const param = useParams();
	const navigate = useNavigate();
	const [reportDetail, setReportDetail] = useState(false);

	const handleModal = () => {
		setModalIsOpen((prev)=>!prev)
	}
	// const [nickname,setNickname] = useState("김애용") // 임시 닉네임
	// const [content,setContent] = useState("김애용") // 임시 내용
	const [select,setSelect] = useState(0)

	const submitReport = async () => {
		console.log(select)
		try{
			const repo = await axios.post('/reports',{
				boardId: param.id,
				content: "string",
			},{
			  headers:{
				'Authorization': 'Bearer '+localStorage.getItem("accessToken")
			}
		},{ withCredentials: true })
			console.log(repo)
			navigate("/main")
			Swal.fire({title:"접수 되었습니다."})
		}catch(error){
			console.log(error)
			Swal.fire({icon: 'warning', html:"신고에 실패하였습니다. <br/> 다시 로그인 해주세요."})
			localStorage.removeItem('accessToken')
			localStorage.removeItem('user')
			localStorage.removeItem('id')
			navigate("/login")
		}
	}

	const handleSelect = (id) =>{
		setSelect(id)
	}

	const nextReport = () => {
		setReportDetail((prev)=>!prev)
	}

    return (
	<div>
		<div className='report' style={{display : modalIsOpen ? "block" : "none"}}>
			<div className='report-header'>
				<p className='report-title'>신고하기</p>
				<button className='report-close' onClick={()=>handleModal()}>
					<AiOutlineClose style={{fontSize:"26px"}} className="report-closeFont"></AiOutlineClose>
				</button>
			</div>
			<div className='report-container'>
				{/* <div className='report-data'>
					<span className='report-area'>작성자&nbsp;|<p>{nickname}</p></span>
					<span className='report-area2'>제 &nbsp;목&nbsp;&nbsp;|<p>{content}</p></span>
				</div> */}
				<div className='report-reason'>
					<h1 className='reason-title'>사유선택</h1>
					<ul>
						<li className='reason-item' onClick={()=>handleSelect(0)}>
							{select === 0 ? <div className='reason-select'><AiOutlineCheck style={{color:"white",fontSize:"20px"}}></AiOutlineCheck></div> : <div className='none-select'><AiOutlineCheck style={{color:"#dcdcdc",fontSize:"20px"}}></AiOutlineCheck></div>}
							<input type="radio" name="select" value="0" className="report-reasons"></input>
							<span className='report-reason-items'>스팸홍보/도배글입니다.</span>
						</li>
						<li className='reason-item' onClick={()=>handleSelect(1)}>
							{select === 1 ? <div className='reason-select'><AiOutlineCheck style={{color:"white",fontSize:"20px"}}></AiOutlineCheck></div> : <div className='none-select'><AiOutlineCheck style={{color:"#dcdcdc",fontSize:"20px"}}></AiOutlineCheck></div>}
							<input type="radio" name="select" value="0" className="report-reasons"></input>
							<span className='report-reason-items'>음란물입니다.</span>
						</li>
						<li className='reason-item' onClick={()=>handleSelect(2)}>
							{select === 2 ? <div className='reason-select'><AiOutlineCheck style={{color:"white",fontSize:"20px"}}></AiOutlineCheck></div> : <div className='none-select'><AiOutlineCheck style={{color:"#dcdcdc",fontSize:"20px"}}></AiOutlineCheck></div>}
							<input type="radio" name="select" value="0" className="report-reasons"></input>
							<span className='report-reason-items'>불법정보를 포함하고 있습니다.</span>
						</li>
						<li className='reason-item' onClick={()=>handleSelect(3)}>
							{select === 3 ? <div className='reason-select'><AiOutlineCheck style={{color:"white",fontSize:"20px"}}></AiOutlineCheck></div> : <div className='none-select'><AiOutlineCheck style={{color:"#dcdcdc",fontSize:"20px"}}></AiOutlineCheck></div>}
							<input type="radio" name="select" value="0" className="report-reasons"></input>
							<span className='report-reason-items'>청소년에게 유해한 내용입니다.</span>
						</li>
						<li className='reason-item' onClick={()=>handleSelect(4)}>
							{select === 4 ? <div className='reason-select'><AiOutlineCheck style={{color:"white",fontSize:"20px"}}></AiOutlineCheck></div> : <div className='none-select'><AiOutlineCheck style={{color:"#dcdcdc",fontSize:"20px"}}></AiOutlineCheck></div>}
							<input type="radio" name="select" value="0" className="report-reasons"></input>
							<span className='report-reason-items'>욕설/생명경시/혐오/차별적 표현입니다.</span>
						</li>
						<li className='reason-item' onClick={()=>handleSelect(5)}>
							{select === 5 ? <div className='reason-select'><AiOutlineCheck style={{color:"white",fontSize:"20px"}}></AiOutlineCheck></div> : <div className='none-select'><AiOutlineCheck style={{color:"#dcdcdc",fontSize:"20px"}}></AiOutlineCheck></div>}
							<input type="radio" name="select" value="0" className="report-reasons"></input>
							<span className='report-reason-items'>개인정보 노출 게시물입니다.</span>
						</li>
						<li className='reason-item' onClick={()=>handleSelect(6)}>
							{select === 6 ? <div className='reason-select'><AiOutlineCheck style={{color:"white",fontSize:"20px"}}></AiOutlineCheck></div> : <div className='none-select'><AiOutlineCheck style={{color:"#dcdcdc",fontSize:"20px"}}></AiOutlineCheck></div>}
							<input type="radio" name="select" value="0" className="report-reasons"></input>
							<span className='report-reason-items'>불쾌한 표현이 있습니다.</span>
						</li>
						<li className='reason-item' onClick={()=>handleSelect(7)}>
							{select === 7 ? <div className='reason-select'><AiOutlineCheck style={{color:"white",fontSize:"20px"}}></AiOutlineCheck></div> : <div className='none-select'><AiOutlineCheck style={{color:"#dcdcdc",fontSize:"20px"}}></AiOutlineCheck></div>}
							<input type="radio" name="select" value="0" className="report-reasons"></input>
							<span className='report-reason-items'>명예훼손 또는 저작권이 침해되었습니다.</span>
						</li>
						<li className='reason-item' onClick={()=>handleSelect(8)}>
							{select === 8 ? <div className='reason-select'><AiOutlineCheck style={{color:"white",fontSize:"20px"}}></AiOutlineCheck></div> : <div className='none-select'><AiOutlineCheck style={{color:"#dcdcdc",fontSize:"20px"}}></AiOutlineCheck></div>}
							<input type="radio" name="select" value="0" className="report-reasons"></input>
							<span className='report-reason-items'>불법촬영물등이 포함되어 있습니다.</span>
						</li>
					</ul>
					<button className='report-btn' onClick={()=>submitReport()}>신고하기</button>
				</div>
			</div>
		</div>
		<div className='report-background' style={{display : modalIsOpen ? "block" : "none"}}></div>
	</div>
    
  )
}

export default Report