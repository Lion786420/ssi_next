import NavBar from "@/components/nav";
import Head from "next/head";
import { useEffect, useState } from "react";
import { LOGO } from "@/constants/images";
import axios from "axios";
import CertificateTable from "./data";
import { errorToast } from "@/lib/toastify";

const demoUser: TUser[] = [
  { id: "234234", phone: "9805401044", name: "Aayush Adhikari" },
  { id: "wq3e4534", phone: "9812345678", name: "Aarjan Xetri" },
];
const demoDocument: TCredentials[] = [];

export type TCredentials = {
  did: string;
  name: string;
  phone: string;
  dob: string;
  email: string;
  address: string;
  userId?: string;
  userFullName?: string;
};
export type TUser = {
  id: string;
  phone: string;
  name: string;
};
export default function Credentials() {
  const [documents, setDocuments] = useState<TCredentials[]>(demoDocument);
  let loginId = localStorage.getItem("loginId");
  console.log(loginId);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post("/api/cred", { loginId });
        setDocuments(response.data);
      } catch (error) {
        errorToast("Error");
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Head>
        <title>Credentials</title>
        <meta name="description" content="Content Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={LOGO.src} />
      </Head>
      <main>
        <div className="framecontainer">
          <div className="framecontainer-content">
            <div className="employee">
              <NavBar name="Holder (Credentials)" showBars />

              <CertificateTable data={documents} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
