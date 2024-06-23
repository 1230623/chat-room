import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [form, setForm] = useState({
    // Estado inicial formulario
    name: "",
    email: "",
    password: "",
    phonenumber: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    // Atualiza o estado do formulario
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      setError(data.message || "Registration Failed");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} className="input" />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} className="input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={form.password} className="input" />
        <input name="phonenumber" placeholder="Phone Number" onChange={handleChange} value={form.phonenumber} className="input" />
        <button type="submit" className="button">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
