/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast"

const LoginPage: React.FC = () => {
  const {login, isAuthenticated} = useAuth();
  const router = useRouter();
  const { toast } = useToast()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password).catch(({response}) => {
      if (response.data) {
        toast({
          description: "Username atau password anda salah. coba cek lagi.",
          variant: 'destructive'
        })
      }
    })
  };

  const handleSignupClick = () => {
    router.push("/sign-up");
  };

  useEffect(() => {
    // Jika pengguna sudah login, redirect ke halaman dashboard
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Log in
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
              Sign in
            </Button>
          </div>

          <div>
            <p className="text-center">
              Don't have an account?{" "}
              <a
                className="text-primary cursor-pointer"
                onClick={handleSignupClick}
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
