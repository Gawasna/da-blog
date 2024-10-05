import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './component/layout/header/Header.jsx'
import HomePage from './component/layout/banner/banner.jsx'
import FeaturedPosts from './component/layout/ftp/ftp.jsx'
import Footer from './component/layout/footer/Footer.jsx'

// const styles = {
//   sidebar: {
//       width: '300px',
//       position: 'absolute',
//       top: '57px',
//       right: '0px',
//   },
// };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header></Header>
    {/* <HomePage></HomePage> */}
    {/* <div className='ftp' style={styles.sidebar}>
                <FeaturedPosts />
            </div> */}
    <div className="mainL">
      <div className="bannerL">

      </div>
      <div className="featuredL">

      </div>
      <div className="navmL">

      </div>
      <div className="postsL">

      </div>
    </div>
    <Footer></Footer>
  </StrictMode>,
)
