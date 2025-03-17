import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error during auth callback:", error);
          navigate("/login");
          return;
        }

        // Successful authentication
        console.log("✅ Authentication callback successful");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error during auth callback:", error);
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Autenticando...</h2>
        <p className="text-gray-600">Por favor, aguarde.</p>
      </div>
    </div>
  );
}
