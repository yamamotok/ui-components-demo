import Link from 'next/link';

export default function Home() {
  return (
    <ul className="container mx-auto flex flex-col gap-8 py-8">
      <li>
        <Link href="/validated">Generic ValidatedInput</Link>
      </li>
      <li>
        <Link href="/alphanumeric">Alpha-numeric inputs</Link>
      </li>
      <li>
        <Link href="/signal">Signal</Link>
      </li>
      <li>
        <Link href="/codeinput">Product Code Input</Link>
      </li>
    </ul>
  );
}
