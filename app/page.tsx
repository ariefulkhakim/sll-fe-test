"use client";
import TableCustom from "@/components/tableCustom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card } from "antd";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    // Jika pengguna sudah login, redirect ke halaman dashboard
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);
  return (
    <>
      {/* <div className="bgHero bg-[#0026b6] z-[1] opacity-80"></div> */}
      <div className="bgHome relative"></div>
      <div className="absolute top-5 bottom-0 w-full text-white">
      <div className="container pb-10">
        <div className="text-center py-10 z-50">
          <h2 className="text-[32px] font-semibold">
            Daftar Terlengkap Tentang Jenis-Jenis Species Ikan
          </h2>
          <div className="pt-2 flex-col space-y-3 w-full justify-center">
            <p>
              Jika kamu ingin mengelola data species, kamu bisa login atau
              mendaftar dibawah ini.
            </p>
            <Button
              type="button"
              onClick={() => router.push("/sign-in")}
              className="w-40"
              variant="default"
            >
              Sign in
            </Button>
          </div>
        </div>
        <Card>
          <TableCustom />
        </Card>
      </div>
      </div>
    </>
  );
}
