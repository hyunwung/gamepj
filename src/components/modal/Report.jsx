import React from 'react';
import "./Report.scss";

const Report = ({modalIsOpen , setModalIsOpen}) => {
	const handleModal = () => {
		setModalIsOpen((prev)=>!prev)
	}
    return (
	<div>
		<div className='report' style={{display : modalIsOpen ? "block" : "none"}}>
			모달이당
			<button onClick={()=>handleModal()}>닫기</button>
		</div>
		<div className='report-background' style={{display : modalIsOpen ? "block" : "none"}}></div>
	</div>
    
  )
}

export default Report