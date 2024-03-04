import NavBar from "@/components/nav";
import Head from "next/head";
import { useEffect, useState } from "react";
import { LOGO } from "@/constants/images";
import axios from "axios";
import InsertCredentials from "./insert";
import CertificateTable from "./data";
import { errorToast } from "@/lib/toastify";

const demoUser: TUser[] = [
  { id: "234234", phone: "9805401044", name: "Aayush Adhikari" },
  { id: "wq3e4534", phone: "9833723845", name: "Aarjan KC" },
  { id: "54393845", phone: "9861444556", name: "Aniket Thapa" },
];
const demoDocument: TCredentials[] = [
  {
    did: "234234w34r234r23re23e23e",
    name: "Aayush Adhikari",
    phone: "9805401044",
    dob: "2000/01/01",
    email: "aayush123@gmail.com",
    address: "Kathmandu, Nepal",
    userId: "234234",
    userFullName: "Aayush Adhikari",
  },
  {
    did: "aserq3w4rq34rfwe4423se",
    name: "Aarjan KC",
    phone: "9833723845",
    dob: "2002/10/03",
    email: "aarjan123@gmail.com",
    address: "Butwal, Nepal",
  },
  {
    did: "as345uwer834r89734",
    name: "Aniket Thapa",
    phone: "9861444556",
    dob: "1999/05/10",
    email: "aniketthapa01@gmail.com",
    address: "Dolakha, Nepal",
    userId: "54393845",
    userFullName: "Aniket Thapa",
  },
];

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
  }, []);
  const handleUser = async (id: string, did: string) => {
    try {
      const response = await axios.post("/api/assign", { id, did });
      setDocuments((prev) =>
        prev.map((i) =>
          i.userId !== id
            ? i
            : {
                ...i,
                userId: response.data.id,
                userFullName: response.data.userFullName,
              }
        )
      );
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
