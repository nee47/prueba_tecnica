"use client";
import { useRouter } from "next/navigation";

export default function DSButton({ ds }: { ds: string }) {
  const router = useRouter();
  const buttonHandler = () => {
    router.push(`http://localhost:5000/downloadDS/${ds}`);
  };
  return (
    <button
      onClick={buttonHandler}
      className="text-xs rounded-md outline outline-2 outline-red-500 w-fit outline-offset-2"
    >
      PDF
    </button>
  );
}
