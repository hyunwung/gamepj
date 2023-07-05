import backImg from "../assets/banner2.png"
import downloadBtn from "../assets/google-play-badge.png"
import "../assets/back1.jpg"

const Intro = () => {
    return(
        <div className="intro">
            <img src={backImg} className="intro-img"></img>
            <div className="intro-options">
                <a href="https://play.google.com/store/apps/details?id=com.DefaultCompany.Team_Project"><img src={downloadBtn} className="options-btn"></img></a>
                <a href="/main"><button className="options-btn2">홈페이지</button></a>
            </div>
        </div>
    )
}
export default Intro