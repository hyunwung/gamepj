import React from 'react';
import "./ReportDetail.scss";

const ReportDetail = ({reportDetail,setReportDetail}) => {
	const handleModal = () => {
		setReportDetail((prev)=>!prev)
	}
	return (
		<div className='report-detail' style={{display : reportDetail ? "block" : "none"}}>
			
			<button onClick={()=>handleModal()}>뒤로가기</button>
		</div>
	)
}

export default ReportDetail