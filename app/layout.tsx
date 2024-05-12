import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import ReactQueryProvider from "@/providers/reactQueryProvider";
import { ConfigProvider, theme } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Managment Data Spices Ikan",
  description: "The website managment the data spicies fish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#0026b6"
            }
          }}
        >
          <AuthProvider>
            <html lang="en">
              <body className={inter.className}>
                <main>{children}</main>
                <Toaster />
              </body>
            </html>
          </AuthProvider>
        </ConfigProvider>
      </AntdRegistry>
    </ReactQueryProvider>
  );
}
