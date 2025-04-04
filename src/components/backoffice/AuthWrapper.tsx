import { storage } from "@/lib/storage";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactElement;
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const [verified, setVerified] = React.useState(false);

  useEffect(() => {
    const get = async () => {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: storage.get("authCode", null) }),
      });
      const body = await response.json();
      setVerified(body.success);
    };

    get();
  }, []);

  if (!verified) {
    return <div></div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
