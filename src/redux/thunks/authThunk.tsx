import { createAsyncThunk } from "@reduxjs/toolkit";
import { TLoginSchema } from "@/schemas/auth.schema";
import { errorToast } from "@/lib/toastify";
import { successToast } from "@/lib/toastify";
import axios from "axios";

export const login = createAsyncThunk<
  { id: string; token: string; role: TLoginSchema["role"] },
  TLoginSchema
>("login", async (data) => {
  try {
    const response = await axios.post("/api/login", data);
    if (response.data.token === false) {
      errorToast("Account not found");
    } else {
      localStorage.setItem("loginId", response.data.id);
      successToast("Login success");
    }
    return response.data;
  } catch (error: any) {
    throw error;
  }
});
