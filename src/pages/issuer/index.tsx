import NavBar from "@/components/nav";
import Head from "next/head";
import { useEffect, useState } from "react";
import { LOGO } from "@/constants/images";
import axios from "axios";
import InsertCredentials from "./insert";
import CertificateTable from "./data";
import { errorToast } from "@/lib/toastify";
import { MetaMaskProvider } from "@metamask/sdk-react";

const demoUser: TUser[] = [
  { id: "20", phone: "9861444556", name: "Aniket Thapa" },
  { id: "21", phone: "9805401044", name: "Aayush Adhikari" },
  { id: "22", phone: "9833723845", name: "Aarjan KC" },
  { id: "23", phone: "9751234865", name: "Abhijeet Thakur" },
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
  fullName?: string;
};
export type TUser = {
  id: string;
  phone: string;
  name: string;
};
export default function Credentials() {
  const [refresh, setRefresh] = useState(true);
  const [documents, setDocuments] = useState<TCredentials[]>(demoDocument);
  const [users, setUsers] = useState<TUser[]>(demoUser);

  const [insert, setInsert] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/all");
        setDocuments(response.data);
      } catch (error) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, [refresh]);
  const handleUser = async (id: string, did: string) => {
    try {
      const response = await axios.post("/api/assign", { id, did });
      setDocuments((prev) =>
        prev.map((i) =>
          i.userId !== id
            ? i
            : {
                ...i,
                fullName: response.data.userfullName,
              }
        )
      );
      setRefresh(!refresh);
    } catch (error: any) {
      errorToast(error.message);
    }
  };
  return (
    <>
      <Head>
        <title>Credentials</title>
        <meta name="description" content="SSI System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={LOGO.src} />
      </Head>
      <main>
        <div className="framecontainer">
          <div className="framecontainer-content">
            <div className="employee">
              <NavBar name="Issuer (Credentials)" showBars />

              {insert ? (
                <InsertCredentials onClose={() => setInsert(false)} />
              ) : null}

              <CertificateTable
                users={users}
                data={documents}
                handleUser={handleUser}
                handleInsert={() => setInsert(true)}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
