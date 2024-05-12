"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  const response = await signOut();
  console.log(response);
};