import "./Home.css";
import MetaData from "../../utils/MetaData";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <MetaData title="India's Leading Fashion Store | Alasca Fashion" />
      <div>
        <div className="homeHeight"></div>
        <div className="homeTileDivDesk">
          <p className="homeTileText">Curated Exclusively For you</p>
          <p className="homeTileBtnPara">
            <Link to="/products?sortBy=latest" className="homeTileLink">
              View Catalogue
            </Link>
          </p>
        </div>
        <div className="homeTileDivPhon">
          <p className="homeTileText">Curated Exclusively For you</p>
          <p className="homeTileBtnPara">
            <Link to="/products?sortBy=latest" className="homeTileLink">
              View Catalogue
            </Link>
          </p>
        </div>
        <div className="homeTileDivTabl">
          <p className="homeTileText">Curated Exclusively For you</p>
          <p className="homeTileBtnPara">
            <Link to="/products?sortBy=latest" className="homeTileLink">
              View Catalogue
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
