import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <Link href="/signal">Signal</Link>
      <Link href="/codeinput">Product Code Input</Link>
    </div>
  );
}
