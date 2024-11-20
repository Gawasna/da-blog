import React, { useEffect, useState } from 'react';
import StandardButton from "@/component/common/Button";
import "../../css/HomePage.css"; import "../ftp/PAside.css";
import { getCategories } from '@/pages/Posts/api';
const PopularSide = () => {
  const [categories, setCategories] = useState([]);
  const [skip, setSkip] = useState(0);
  const take = 3;
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories(skip, take);
      setCategories(prev => [...prev, ...data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    setSkip(prev => prev + take);
  };

  useEffect(() => {
    fetchCategories();
  }, [skip]);

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
                  <img src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt="" id="thumbnailtest" />
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
            <div style={{ padding: '10px' }}>
              <div className="clistlabels">
                {categories.map((category) => (
                  <div key={category.id} className="lbsz">
                    <a className="Cat">{category.name}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="loadMorelb">
              <StandardButton onClick={handleLoadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
              </StandardButton>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PopularSide;
