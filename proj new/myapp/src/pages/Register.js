function Register() {

  function save() {
    fetch("http://localhost:8081/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: document.getElementById("u").value,
        password: document.getElementById("p").value,
        role: document.getElementById("r").value
      })
    })
    .then(res => res.text())
    .then(data => {
      alert(data);
      if (data === "User registered successfully") {
        window.location.href = "/login";
      }
    });
  }

  return (
    <div className="form-page">
      <div className="form-box">
        <h2>Register</h2>
        <p className="form-text">Create your account</p>

        <input id="u" type="text" placeholder="Enter username" />
        <input id="p" type="password" placeholder="Enter password" />

        <select id="r">
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="admin">Admin</option>
        </select>

        <button className="form-btn" onClick={save}>Register</button>

        <p className="bottom-text">
          Already have an account?
          <span onClick={() => window.location.href="/login"}> Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;