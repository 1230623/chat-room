import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/"); //--->> depois mudar para a pagina correta
    } else {
      const data = await response.json();
      setError(data.message || "Login Failed");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="email" placeholder="Email" onChange={handleChange} className="input" />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
