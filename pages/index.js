import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Welcome to Chatroom</h1>
      <div className="links">
        <Link href="/register" legacyBehavior>
          <a className="link">Register</a>
        </Link>
        <Link href="/login" legacyBehavior>
          <a className="link">Login</a>
        </Link>
      </div>
    </div>
  );
}
