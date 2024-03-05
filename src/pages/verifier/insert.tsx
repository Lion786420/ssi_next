import { errorToast } from "@/lib/toastify";
import UIButton from "@/ui/uibutton";
import UIInput from "@/ui/uiinput";
import UIModal from "@/ui/uimodal";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { TCredentials } from ".";
import NavBar from "@/components/nav";

interface VerifyCredentialsProps {
  onClose: () => void;
}

export default function VerifyCredentials({ onClose }: VerifyCredentialsProps) {
  const [did, setDID] = useState<string | null>(null);
  const [credential, setCredential] = useState();
  const [message, setMessage] = useState("No Documents found");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value?.trim();
    setDID((_) => (value ? value : null));
  };
  const handleSave = async () => {
    if (!did) return errorToast("Document ID is required");

    try {
      const response = await axios.post("/api/verify", {
        did,
      });
      if (response.data === "No") {
        setCredential();
      } else {
        setCredential(response.data);
      }
    } catch (error: any) {
      errorToast(error.message);
    }
  };
  return (
    <>
      <UIModal onClose={onClose}>
        <div className="employee-insert">
          <h2 className="employee-insert--heading">Verify Credential</h2>
          <UIInput
            id="did"
            isRequired
            label="Document ID"
            placeholder="eg. Insert Credential.."
            name="did"
            onChange={handleInput}
            defaultValue={did}
          />
          <div className="employee-insert--actions">
            <UIButton
              label="Verify Now"
              type="primary"
              onClick={handleSave}
              style={{ minWidth: "13rem" }}
            />
          </div>
          {credential ? (
            <table width={"100%"} style={{ color: "white" }}>
              <thead>
                <tr>
                  <td>Status</td>
                  <td>Verified</td>
                </tr>
                <tr>
                  <td>Fullname</td>
                  <td>{credential.name}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{credential.phone}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{credential.dob}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{credential.email}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{credential.address}</td>
                </tr>
              </thead>
            </table>
          ) : (
            <span
              className="noresult"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {message}
            </span>
          )}
        </div>
      </UIModal>
    </>
  );
}
