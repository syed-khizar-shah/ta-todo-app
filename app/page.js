"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("data: ", session);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        <p>
          Please{" "}
          <a href="/auth/signin" className="text-blue-500">
            login
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}!</h1>
        <p className="text-gray-600 mb-6">Manage your tasks efficiently.</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/todos")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full transition duration-300"
          >
            View Task List
          </button>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg w-full transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
