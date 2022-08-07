import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { push } = useRouter();

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", credentials);
    if (res.status === 200) {
      push("/dashboard");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </div>
  );
}
export default LoginPage;
