import React, { useEffect, useState } from 'react';
import "../../css/HomePage.css";
import Banner from '../banner/banner';
import '../../../pages/Posts/api.js'
import { getLatestPosts } from '../../../pages/Posts/api.js';


function MainPosts() {

  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 6;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getLatestPosts(offset, limit);
      const updatedData = data.map(post => ({
        ...post,
        category: post.category || { name: '' }
      }));
      setPosts(prevPosts => [...prevPosts, ...updatedData]);
      setOffset(prevOffset => prevOffset + limit);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
    }
  };

  return (
    <main className="blogItm mainbar">
      <div
        className="sldO section"
        style={{
          background: "orange",
        }}
      >
        {/* <img id='testbn' src="https://i.ytimg.com/vi/jjQDWr65DAw/maxresdefault.jpg" alt="test" srcset="" /> */}
        <Banner></Banner>
      </div>

      <div className="section" id="main-widget">
        <div className="widget Blog" id="Blog1">
          <div className="blogtitle hm">
            <h3 className="btts">Bài đăng mới nhất</h3>
          </div>
          {/* <div className="blogList">
                    <article className="ntry">
                      <div className="Pthmb">
                        <a className="thmb">
                          <img className="imgThm" src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt=""/>
                        </a>
                      </div>
                      <div className="plcCtn">
                        <div className="plCtg">
                          <div className="plictg">
                            <a href="/">Cong nghe</a>
                          </div>
                        </div>
                        <h2 className="pltl">
                          <a href="/">Title bai viet se o day</a>
                        </h2>
                        <div className="pSmp">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat facilis cumque amet, at quo consequuntur culpa numquam aliquam saepe</div>
                        <div className="pptime">
                          <time datetime="">11/2/2000</time>
                        </div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                        <a className="thmb">
                          <img className="imgThm" src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt=""/>
                        </a>
                      </div>
                      <div className="plcCtn">
                        <div className="plCtg">
                          <div className="plictg">
                            <a href="/">Cong nghe</a>
                          </div>
                        </div>
                        <h2 className="pltl">
                          <a href="/">Title bai viet se o day</a>
                        </h2>
                        <div className="pSmp">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat facilis cumque amet, at quo consequuntur culpa numquam aliquam saepe</div>
                        <div className="pptime">
                          <time datetime="">11/2/2000</time>
                        </div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                        <a className="thmb">
                          <img className="imgThm" src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt=""/>
                        </a>
                      </div>
                      <div className="plcCtn">
                        <div className="plCtg">
                          <div className="plictg">
                            <a href="/">Cong nghe</a>
                          </div>
                        </div>
                        <h2 className="pltl">
                          <a href="/">Title bai viet se o day</a>
                        </h2>
                        <div className="pSmp">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat facilis cumque amet, at quo consequuntur culpa numquam aliquam saepe</div>
                        <div className="pptime">
                          <time datetime="">11/2/2000</time>
                        </div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                        <a className="thmb">
                          <img className="imgThm" src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt=""/>
                        </a>
                      </div>
                      <div className="plcCtn">
                        <div className="plCtg">
                          <div className="plictg">
                            <a href="/">Cong nghe</a>
                          </div>
                        </div>
                        <h2 className="pltl">
                          <a href="/">Title bai viet se o day</a>
                        </h2>
                        <div className="pSmp">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat facilis cumque amet, at quo consequuntur culpa numquam aliquam saepe</div>
                        <div className="pptime">
                          <time datetime="">11/2/2000</time>
                        </div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                        <a className="thmb">
                          <img className="imgThm" src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt=""/>
                        </a>
                      </div>
                      <div className="plcCtn">
                        <div className="plCtg">
                          <div className="plictg">
                            <a href="/">Cong nghe</a>
                          </div>
                        </div>
                        <h2 className="pltl">
                          <a href="/">Title bai viet se o day</a>
                        </h2>
                        <div className="pSmp">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat facilis cumque amet, at quo consequuntur culpa numquam aliquam saepe</div>
                        <div className="pptime">
                          <time datetime="">11/2/2000</time>
                        </div>
                      </div>
                    </article>
                    <article className="ntry">
                      <div className="Pthmb">
                        <a className="thmb">
                          <img className="imgThm" src="https://images-ng.pixai.art/images/orig/fbae40aa-dc75-481e-b643-dfb7f95896f9" alt=""/>
                        </a>
                      </div>
                      <div className="plcCtn">
                        <div className="plCtg">
                          <div className="plictg">
                            <a href="/">Cong nghe</a>
                          </div>
                        </div>
                        <h2 className="pltl">
                          <a href="/">Title bai viet se o day</a>
                        </h2>
                        <div className="pSmp">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat facilis cumque amet, at quo consequuntur culpa numquam aliquam saepe</div>
                        <div className="pptime">
                          <time datetime="">11/2/2000</time>
                        </div>
                      </div>
                    </article>
                  </div> */}

          <div className="blogList">
          {posts.map((post, index) => (
              <article className="ntry" key={index}>
                <div className="Pthmb">
                  <a className="thmb">
                    <img className="imgThm" src={post.image_path} alt={post.title} />
                  </a>
                </div>
                <div className="plcCtn">
                  <div className="plCtg">
                    <div className="plictg">
                      <a href="/">{post.category.name}</a>
                    </div>
                  </div>
                  <h2 className="pltl">
                    <a href="/">{post.title}</a>
                  </h2>
                  <div className="pSmp"></div>
                  <div className="pptime">
                    <time dateTime={new Date(post.created_at).toISOString()}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="blogPage">
          <a href="#" onClick={fetchPosts}>Tải thêm bài viết</a>
          </div>
        </div>
      </div>
      {/* <div className="section" id="add-widget"></div> */}
    </main>
  );
}
export default MainPosts;