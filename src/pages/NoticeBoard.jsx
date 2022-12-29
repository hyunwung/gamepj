import Header from "../components/header/Header"
import NavBar from "../components/navBar/NavBar"
import BoardItems from "../components/boardItems/BoardItems"
import "../assets/Global.scss"

const NoticeBoard = () => {
    return(
        <div className="notices">
            <Header></Header>
            <div className="notices-container">
                <NavBar></NavBar>
                <div className="notices-page">
                    <BoardItems></BoardItems>
                </div>
            </div>
        </div>
    )
}
export default NoticeBoard