import { storage } from "@/lib/storage";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/InputField";
import Button from "../Button";

interface Props {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const { register, handleSubmit } = useForm<{ code: string }>({
    defaultValues: {
      code: "",
    },
  });

  const authorize = useCallback(async () => {
    const authCode = storage.get("AuthCode", null);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authCode }),
      });
      const body = await response.json();
      setAuthorized(body.success);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (data: { code: string }) => {
    try {
      storage.set("AuthCode", data.code);
      await authorize();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const code = storage.get("AuthCode", null);
    if (code) {
      authorize();
    } else {
      setLoading(false);
    }
  }, [authorize]);

  if (loading) {
    return <div>Autorizacija...</div>;
  }

  if (!authorized) {
    return (
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 max-w-[400px] mt-3 w-full mx-auto p-4  text-black gap-y-3"
        >
          <InputField name="code" label="Lozinka" register={register} />
          <Button type="submit" label="Provjeri" />
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
