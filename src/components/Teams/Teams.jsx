import React from 'react'

function Teams() {
  return (
    <div>
        <section id="team" className="team section">
        <slot type="section-title" />
        <br />
        <br />
        <div class="container section-title" data-aos="fade-up">
            <h2>Section: 52323</h2>
            <p>CS5610 Team 11&nbsp;</p>
        </div>
        <div className="container">
            <div className="row">
            <p>
                <a href="https://github.com/PetoriousBIG/final-project-web-app" target="_blank" rel="noopener noreferrer">
                React.js Git Repo
                </a>
            </p>
            <p>
                <a href="https://github.com/PetoriousBIG/final-project-server-app" target="_blank" rel="noopener noreferrer">
                Node.js Git Repo
                </a>
            </p>
            <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay={100}>
                <div className="member">
                <img src="assets/img/team/team-1.jpg" className="img-fluid" alt="" />
                <div className="member-content">
                    <h4>Peter&nbsp;Martin</h4>
                </div>
                </div>
            </div>{/* End Team Member */}
            <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay={200}>
                <div className="member">
                <img src="assets/img/team/team-2.jpg" className="img-fluid" alt="" />
                <div className="member-content">
                    <h4>Siyi Lin</h4>
                </div>
                </div>
            </div>{/* End Team Member */}
            <div className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay={300}>
                <div className="member">
                <img src="assets/img/team/team-3.jpg" className="img-fluid" alt="" />
                <div className="member-content">
                    <h4>Dongni Zeng</h4>
                </div>
                </div>
            </div>{/* End Team Member */}
            </div>
        </div>
        </section>

    </div>
  )
}

export default Teams