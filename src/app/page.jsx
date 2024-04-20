import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-green-600 font-extralight">Home</h1>
      <Link href="/test">
        Go Test
      </Link>
    </>
  );
}
