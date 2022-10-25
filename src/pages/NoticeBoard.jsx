import Header from "../components/header/Header"
import NavBar from "../components/navBar/NavBar"
import Notice from "../components/notice/Notice"
import "../assets/Global.scss"

const NoticeBoard = () => {
    return(
        <div className="notices">
            <Header></Header>
            <div className="notices-container">
                <NavBar></NavBar>
                <div className="notices-page">
                    <Notice></Notice>
                </div>
            </div>
        </div>
    )
}
export default NoticeBoard