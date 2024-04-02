import { LoginFields } from "@/types/types";

const isEmailValided = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@udea\.edu\.co$/;
  return emailRegex.test(email);
};
