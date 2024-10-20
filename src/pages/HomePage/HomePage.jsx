import Banner from "../../component/layout/banner/banner";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
import StandardButton from "@/component/common/Button";

function HomePage() {
  const navigate = useNavigate();
  const handleNavToRegister = (path) => {
    navigate(path);
  };

  return (
    <div className="mainL">
      <div className="navmL"></div>
      <div className="blogCtn">
        {/* <div className="bannerL"></div>
        <div className="postsL"></div>
        <div className="featuredL"></div> */}
        <div className="secBIn">
          <div className="blogM">

            <main className="blogItm mainbar">

              <div className="sldO section">
                <img src="https://images-ng.pixai.art/images/orig/c2670750-6d09-4dc5-bde2-1bdb9417cfc5" alt="" id="bannertest" />
              </div>

              <div className="section" id="main-widget">
                <div className="widget Blog" id="Blog1">
                  <div className="blogtitle hm">
                    <h3 className="btts">
                      Bài đăng mới nhất
                    </h3>
                  </div>
                  <div className="blogList">
                    <article className="ntry">
                      <div className="Pthmb">
                        <img src="https://images-ng.pixai.art/images/thumb/87b9a744-0604-43d3-85ba-4ed0f87b0f80" alt="" id="thumbnailtest"/>
                      </div>
                      <div className="pcCtn">
                        <div className="pCtg"></div>
                        <div className="pTitle"></div>
                        <div className="pSmp"></div>
                        <div className="pptime"></div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                      <img src="https://images-ng.pixai.art/images/thumb/87b9a744-0604-43d3-85ba-4ed0f87b0f80" alt="" id="thumbnailtest"/>
                      </div>
                      <div className="pcCtn">
                        <div className="pCtg"></div>
                        <div className="pTitle"></div>
                        <div className="pSmp"></div>
                        <div className="pptime"></div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                      <img src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt="" id="thumbnailtest"/>
                      </div>
                      <div className="pcCtn">
                        <div className="pCtg"></div>
                        <div className="pTitle"></div>
                        <div className="pSmp"></div>
                        <div className="pptime"></div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                      <img src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt="" id="thumbnailtest"/>
                      </div>
                      <div className="pcCtn">
                        <div className="pCtg"></div>
                        <div className="pTitle"></div>
                        <div className="pSmp"></div>
                        <div className="pptime"></div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                      <img src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt="" id="thumbnailtest"/>
                      </div>
                      <div className="pcCtn">
                        <div className="pCtg"></div>
                        <div className="pTitle"></div>
                        <div className="pSmp"></div>
                        <div className="pptime"></div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                      <img src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt="" id="thumbnailtest"/>
                      </div>
                      <div className="pcCtn">
                        <div className="pCtg"></div>
                        <div className="pTitle"></div>
                        <div className="pSmp"></div>
                        <div className="pptime"></div>
                      </div>
                    </article>
                  </div>
                  <div className="blogPage">
                    <a href="">Tải thêm bài viết</a>
                  </div>
                </div>
              </div>

              {/* <div className="section" id="add-widget"></div> */}

            </main>

            <aside className="blogItm sidebar">
              <div className="sideIn">
                <div className="section" id="side-widget">
                  <div className="widget popularPost" id="ppost">
                    <h3 className="ptts">
                      Bài viết phổ biến
                    </h3>
                    <div className="itemPp" role="feed">
                      <article className="itm mostP">
                        <div className="Pthmb">
                        <img src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt="" id="thumbnailtest"/>
                        </div>
                        <div className="infopp">
                          <div className="pptime">Thu 5 2 th 9 2024</div>
                          <div className="pCtg">/Cong nghe</div>
                        </div>
                        <div className="pcCtn">
                          <div className="pTitle">Tiêu đề</div>
                        </div>
                        <div className="pSmp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam cumque, asperiores corporis labore deleniti, esse nisi culpa</div>
                      </article>

                      <article className="itm">
                        <div className="infopp">
                          <div className="pptime">thời gian</div>
                          <div className="pCtg">category</div>
                        </div>
                        <div className="pcCtn">
                          <div className="pTitle">Tiêu đề</div>
                        </div>
                        <div className="pSmp">Nội dung</div>
                      </article>

                      <article className="itm">
                        <div className="infopp">
                          <div className="pptime">thời gian</div>
                          <div className="pCtg">category</div>
                        </div>
                        <div className="pcCtn">
                          <div className="pTitle">Tiêu đề</div>
                        </div>
                        <div className="pSmp">Nội dung</div>
                      </article>

                      <article className="itm">
                        <div className="infopp">
                          <div className="pptime">thời gian</div>
                          <div className="pCtg">category</div>
                        </div>
                        <div className="pcCtn">
                          <div className="pTitle">Tiêu đề</div>
                        </div>
                        <div className="pSmp">Nội dung</div>
                      </article>

                      <article className="itm">
                        <div className="infopp">
                          <div className="pptime">thời gian</div>
                          <div className="pCtg">category</div>
                        </div>
                        <div className="pcCtn">
                          <div className="pTitle">Tiêu đề</div>
                        </div>
                        <div className="pSmp">Nội dung</div>
                      </article>

                      <article className="itm">
                        <div className="infopp">
                          <div className="pptime">thời gian</div>
                          <div className="pCtg">category</div>
                        </div>
                        <div className="pcCtn">
                          <div className="pTitle">Tiêu đề</div>
                        </div>
                        <div className="pSmp">Nội dung</div>
                      </article>
                    </div>
                  </div>
                  <div className="widget label" id="labelPP">
                    <h3 className="btts">
                      Label
                    </h3>
                    <div className="clistlabels">
                      <div className="lbsz">
                        <a className="">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="">Cong nghe</a>
                      </div>
                    </div>
                    <div className="loadMorelb">
                      <StandardButton>LoadMore</StandardButton>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
