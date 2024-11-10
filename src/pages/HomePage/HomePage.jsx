import Banner from "../../component/layout/banner/banner";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
import StandardButton from "@/component/common/Button";
import NavBar from "@/component/layout/nav/Nav";
import { useState, useEffect } from "react";
import PopularSide from "@/component/layout/ftp/PAside";
import MainPosts from "@/component/layout/pl/MainPosts";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadArticles(page);
  }, [page]);

  const loadArticles = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts?page=${page}`);
      setArticles((prevArticles) => [...prevArticles, ...response.data]);
    } catch (error) {
      console.error("Error loading articles: ", error);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleNavToRegister = (path) => {
    navigate(path);
  };

  return (
    <div className="mainL">
      <div className="navmL">
        <NavBar />
      </div>
      <div className="blogCtn">
        <div className="secBIn">
          <div className="blogM">

            <MainPosts></MainPosts>

              <PopularSide/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
