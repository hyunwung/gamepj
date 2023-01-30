import React from 'react';
import { useState } from 'react';
import "./Report.scss";

const Report = ({modalIsOpen , setModalIsOpen}) => {
	const handleModal = () => {
		setModalIsOpen((prev)=>!prev)
	}
	const [nickname,setNickname] = useState("김애용") // 임시 닉네임
	const [content,setContent] = useState("김애용") // 임시 내용

    return (
	<div>
		<div className='report' style={{display : modalIsOpen ? "block" : "none"}}>
			<div className='report-header'>
				<p className='report-title'>신고하기</p>
				<button className='report-close' onClick={()=>handleModal()}>
					<span className='report-closeFont'>X</span>
				</button>
			</div>
			<div className='report-container'>
				<div className='report-data'>
					<span className='report-area'>작성자&nbsp;|<p>{nickname}</p></span>
					<span className='report-area2'>제 &nbsp;목&nbsp;&nbsp;|<p>{content}</p></span>
				</div>
				<div className='report-reason'>
					<span>사유선택</span>
					<ul>
						<li>스팸홍보/도배글입니다.</li>
						<li>음란물입니다.</li>
						<li>불법정보를 포함하고 있습니다.</li>
						<li>청소년에게 유해한 내용입니다.</li>
						<li>욕설/생명경시/혐오/차별적 표현입니다.</li>
						<li>개인정보 노출 게시물입니다.</li>
						<li>불쾌한 표현이 있습니다.</li>
						<li>명예훼손 또는 저작권이 침해되었습니다.</li>
						<li>불법촬영물등이 포함되어 있습니다.</li>
					</ul>
				</div>
				<button className='report-btn'>신고하기</button>
			</div>
		</div>
		<div className='report-background' style={{display : modalIsOpen ? "block" : "none"}}></div>
	</div>
    
  )
}

export default Report