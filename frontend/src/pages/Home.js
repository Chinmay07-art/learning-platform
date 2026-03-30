function Home() {
  return (
    <div className="home-page">
      <div className="navbar">
        <h2 className="logo">MentorMesh</h2>

        <div className="nav-links">
          <span onClick={() => window.location.href="/"}>Home</span>
          <span onClick={() => window.location.href="/login"}>Login</span>
          <span onClick={() => window.location.href="/register"}>Register</span>
        </div>
      </div>

      <div className="hero-section">
        <div className="left-box">
          <button className="small-btn">India's Trusted Learning Platform</button>

          <h1>
            Learn From <span>Experts</span> <br />
            Anytime. <br />
            Anywhere.
          </h1>

          <p>
            MentorMesh helps students connect with certified teachers,
            book live sessions, and improve academic performance
            through structured digital learning.
          </p>
        </div>

        <div className="right-box">
          <img src="images.jpg" alt="mentor" className="hero-img" />
        </div>
      </div>
    </div>
  );
}

export default Home;