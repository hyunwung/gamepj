import { useState } from 'react';
import "./ReportDetail.scss";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';

const ReportDetail = ({reportDetail,setReportDetail,modalIsOpen,setModalIsOpen,category}) => {
	const [text,setText] = useState("")
	const [image,setImage] = useState("")
	console.log(category)
	const onSelectFile = (e) => {
        const selectedFiles = e.target.files[0]; 
        setImage(selectedFiles)
    }
	const submitReport = async () => {
		try{
			const repo = await axios.post('/reports',{
			  headers:{
				'Authorization': 'Bearer '+localStorage.getItem("accessToken")
			}})
			console.log(repo)
		}catch(error){
			console.log(error)
		}
	}
	const handleTexts = (e) => {
		e.preventDefault();
		setText(e.target.value)
	}
	const handleModal = () => {
		setReportDetail((prev)=>!prev)
	}
	const handleModal2 = () => {
		setModalIsOpen((prev)=>!prev)
		setReportDetail((prev)=>!prev)
	}
	return (
		<div className='report-detail' style={{display : reportDetail ? "block" : "none"}}>
			<div className='report-header'>
				<button className='report-back' onClick={()=>handleModal()}>
					<BiArrowBack style={{fontSize:"26px"}}></BiArrowBack>
				</button>
				{/* <p className='report-title'>신고하기</p> */}
				<button className='report-close' onClick={()=>handleModal2()}>
					<AiOutlineClose style={{fontSize:"26px"}}></AiOutlineClose>
				</button>
			</div>
			<div className='report-detail-container'>
				<label>제목</label>
				<input type="text" placeholder='제목을 작성해주세요.'></input>
				<label>사진</label>
				<input
                    type="file"
                    onChange={onSelectFile}
                    accept="image/*" 
                    className="file-input"></input>
				<label>내용</label>
				<textarea value={text} cols="100" rows="10" placeholder="확증을 위해 스크린샷을 첨부해주세요." onChange={handleTexts}></textarea>
                <button onClick={submitReport}>신고하기</button>
			</div>
		</div>
	)
}

export default ReportDetail