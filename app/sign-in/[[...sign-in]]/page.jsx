import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl relative z-10 gap-6 p-6">
        
        {/* Left column with image */}
        <div className="relative w-full h-[90vh] p-4">
          <Image
            src="/signin.jpeg"
            alt="Sign in illustration"
            fill
            className="object-cover rounded-lg shadow-2xl"
            priority
          />
        </div>

        {/* Right column with glassmorphism SignIn */}
        <div className="flex items-center justify-center p-6">
          <div className="flex items-center justify-center w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-8">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          </div>
        </div>
      </div>
    </div>
  );
}
