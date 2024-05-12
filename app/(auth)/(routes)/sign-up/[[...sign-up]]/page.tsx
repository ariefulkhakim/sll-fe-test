/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SingUpPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleSignupClick = () => {
    router.push("/sign-up");
  };

  return (
    <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-0">
      <div className="space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        <form className="space-y-6 w-[300px]" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Button type="submit" className="w-full" variant="default">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUpPage
