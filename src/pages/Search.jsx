import Header from "../components/header/Header"
import NavBar from "../components/navBar/NavBar"
import SearchItem from "../components/search/SearchItem"
import "../assets/Global.scss"

const Search = () => {
    return(
        <div className="default">
            <Header></Header>
            <div className="default-slice">
                <div className="이미지1"></div>
                <div className="default-container">
                    <NavBar></NavBar>
                    <div className="default-page">
                        <SearchItem></SearchItem>
                    </div>
                </div>
                <div className="이미지2"></div>
            </div>
        </div>
    )
}
export default Search