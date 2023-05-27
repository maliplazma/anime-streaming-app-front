import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./MyFooter"
import "../font/Japanese3017-Eljn.ttf"

function MyFooter() {
  return (
    <div className="footer__">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 ">
        <div class="mr-5 col-md-2 offset-1">
            <h4 className='footer__title'>
                   Sakura Mochi
            </h4>
        </div>


        <ul className="nav mr-8 ">
            <li className="ms-5"><InstagramIcon/></li>
            <li className="ms-5"><FacebookIcon/></li>
            <li className="ms-5"><YouTubeIcon/></li>
        </ul>
        
        <div class="col-md-3 d-flex align-items-center">
            <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <svg class="bi" width="30" height="24">Sakura mochi</svg>
            </a>
            <span class="text-muted">© 2021 Company, Inc</span>
        </div>

    </footer>
    </div>
  )
}

export default MyFooter