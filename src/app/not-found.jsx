import Link from 'next/link';

export default function NotFound () {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Oops! There isn&apos;t anything here (yet).</p>
      <p>
        Why don&apos;t you try to navigate to something that actually exist?
      </p>
      <p>For example, <Link href="/">blog feed</Link>.</p>
    </div>
  );
}
