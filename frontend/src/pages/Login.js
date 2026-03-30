function Login() {
  function checkLogin() {
    fetch("http://localhost:8081/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: document.getElementById("u").value,
        password: document.getElementById("p").value
      })
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("Raw response:", text);

        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Response is not valid JSON: " + text);
        }
      })
      .then((data) => {
        console.log("Parsed data:", data);

        if (data.message === "Login successful") {
          localStorage.setItem("user", JSON.stringify(data));

          if (data.role === "admin") {
            window.location.href = "/admin";
          } else if (data.role === "student") {
            window.location.href = "/student";
          } else if (data.role === "tutor") {
            window.location.href = "/tutor";
          } else {
            alert("Role not found");
          }
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed: " + error.message);
      });
  }

  return (
    <div className="form-page">
      <div className="form-box">
        <h2>Login</h2>
        <p className="form-text">Login to your account</p>

        <input id="u" type="text" placeholder="Enter username" />
        <input id="p" type="password" placeholder="Enter password" />

        <button className="form-btn" onClick={checkLogin}>Login</button>

        <p className="bottom-text">
          New user?
          <span onClick={() => window.location.href = "/register"}> Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;