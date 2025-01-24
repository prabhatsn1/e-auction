import { useRouter } from "next/router";
import { useEffect } from "react";

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check");
      if (!response.ok) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);
}
