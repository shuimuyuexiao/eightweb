import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>This page has moved beyond the frame.</h1>
      <Link className="button button-dark" href="/">Return home <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
