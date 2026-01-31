import { headers } from "next/headers";

export const getHostUrl = async () => {
  const headersList = await headers();
  if (process.env.NODE_ENV === "production") {
    return `https://${headersList.get("host")}`;
  }
  return `http://${headersList.get("host")}`;
};
