import React from 'react';
import StandardButton from "@/component/common/Button";
import "../../css/HomePage.css";import "../ftp/PAside.css";
const PopularSide = () => {
    return (
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
                        <div className="infopp widget">
                          <div className="pptime">T5 05/11/24</div>
                          <div className="pCtg">Cong nghe</div>
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
                    <div style={{padding: '10px'}}>
                    <div className="clistlabels">
                      <div className="lbsz">
                        <a className="Cat">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="Cat">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="Cat">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="Cat">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="Cat">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="Cat">Cong nghe</a>
                      </div>
                      <div className="lbsz">
                        <a className="Cat">Cong nghe</a>
                      </div>
                    </div>
                    </div>
                    <div className="loadMorelb">
                      <StandardButton>LoadMore</StandardButton>
                    </div>
                  </div>
                </div>
              </div>
      </aside>
    );
};

export default PopularSide;
