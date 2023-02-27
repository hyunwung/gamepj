import Header from "../components/header/Header"
import NavBar from "../components/navBar/NavBar"
import BoardItems from "../components/boardItems/BoardItems"
import "../assets/Global.scss"

const NoticeBoard = () => {
    return(
        <div className="default">
            <Header></Header>
            <div className="default-slice">
                <div className="이미지1"></div>
                <div className="default-container">
                    <NavBar></NavBar>
                    <div className="default-page">
                        <BoardItems></BoardItems>
                    </div>
                </div>
                <div className="이미지2"></div>
            </div>
        </div>
    )
}
export default NoticeBoard