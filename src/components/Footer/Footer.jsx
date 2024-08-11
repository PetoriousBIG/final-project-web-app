import React from 'react'

function Footer() {
  return (
    <div>
        <footer id="footer" className="footer">
        <div className="container text-center">
            <a href="index.html" className="logo d-flex align-items-center justify-content-center">
            <span className="sitename">VeganLover</span>
            </a>
            <a href="/teams" className="logo d-flex align-items-center justify-content-center">Contact Teams</a>

            <div className="copyright mt-4">
            <p>© <strong className="px-1 sitename">VeganLover</strong> All Rights Reserved</p>
            </div>
        </div>


        </footer>
    </div>
  )
}

export default Footer