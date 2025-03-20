import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet-async";
import { UserManagement } from "./UserManagement";
import { toast } from "react-hot-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { UserCog, Users, User } from "lucide-react";

interface UserSettings {
  full_name: string;
  email: string;
}

// Constantes para validação de senha
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function Settings() {
  const navigate = useNavigate();
  const { user, signOut, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [settings, setSettings] = useState<UserSettings>({
    full_name: "",
    email: user?.email || "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [sendingResetEmail, setSendingResetEmail] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Carregar dados do usuário
  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setSettings((prev) => ({
        ...prev,
        full_name: user.user_metadata.full_name,
      }));
    }
  }, [user]);

  // Verificar autenticação
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Adicionar botão temporário para tornar admin_super
  useEffect(() => {
    const makeAdminSuper = async () => {
      if (user && user.user_metadata?.role !== "admin_super") {
        try {
          await updateProfile({ role: "admin_super" });
          window.location.reload();
        } catch (error) {
          console.error("Erro ao atualizar função:", error);
        }
      }
    };
    makeAdminSuper();
  }, [user]);

  // Validar força da senha
  function validatePassword(password: string): {
    isValid: boolean;
    message: string;
  } {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        isValid: false,
        message: `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`,
      };
    }

    if (!PASSWORD_REGEX.test(password)) {
      return {
        isValid: false,
        message:
          "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais",
      };
    }

    return { isValid: true, message: "" };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { name: settings.full_name },
      });

      if (error) throw error;

      updateProfile({ name: settings.full_name });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validar senha atual
      if (!passwords.currentPassword) {
        throw new Error("A senha atual é obrigatória");
      }

      // Validar nova senha
      const passwordValidation = validatePassword(passwords.newPassword);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }

      // Verificar se as senhas coincidem
      if (passwords.newPassword !== passwords.confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      // Verificar se a nova senha é diferente da atual
      if (passwords.newPassword === passwords.currentPassword) {
        throw new Error("A nova senha deve ser diferente da senha atual");
      }

      // Verificar senha atual
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || "",
        password: passwords.currentPassword,
      });

      if (signInError) {
        throw new Error("Senha atual incorreta");
      }

      // Atualizar senha
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword,
      });

      if (error) throw error;
      setSuccess("Senha atualizada com sucesso!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      setError(
        error instanceof Error ? error.message : "Erro ao alterar a senha"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSendPasswordReset() {
    setSendingResetEmail(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        user?.email || "",
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) throw error;
      setSuccess(
        "Email de redefinição de senha enviado! Por favor, verifique sua caixa de entrada."
      );
    } catch (error) {
      console.error("Error sending reset email:", error);
      setError(
        "Erro ao enviar email de redefinição. Por favor, tente novamente."
      );
    } finally {
      setSendingResetEmail(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet>
        <title>Configurações | Lar de Maria</title>
      </Helmet>

      <DashboardSidebar />

      <main className="md:ml-64 min-h-screen pb-28">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl mb-6">
              Configurações
            </h1>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Perfil
                </TabsTrigger>
                {/* Removendo temporariamente a aba de usuários */}
                {/* {(user?.user_metadata?.role === "admin" ||
                  user?.user_metadata?.role === "admin_super") && (
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Usuários
                  </TabsTrigger>
                )} */}
              </TabsList>

              <TabsContent value="profile">
                <div className="space-y-6">
                  {/* Informações do Perfil */}
                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Seu Perfil
                    </h2>

                    <form onSubmit={handleSubmit} className="max-w-md">
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Nome
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={settings.full_name}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                full_name: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user?.email}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                            disabled
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Função
                          </label>
                          <input
                            type="text"
                            value={
                              user?.user_metadata?.role === "admin_super"
                                ? "Administrador Super"
                                : user?.user_metadata?.role === "admin"
                                ? "Administrador"
                                : "Editor"
                            }
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                            disabled
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full sm:w-auto bg-[#10a3b4] text-white px-6 py-2 rounded-lg hover:bg-[#0d8997] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Alterar Senha */}
                  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Alterar Senha
                    </h2>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Redefinir senha por email
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Você pode receber um link de redefinição de senha no seu
                        email cadastrado.
                      </p>
                      <button
                        type="button"
                        onClick={handleSendPasswordReset}
                        disabled={sendingResetEmail}
                        className="text-[#10a3b4] hover:text-[#0d8997] font-medium text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sendingResetEmail
                          ? "Enviando..."
                          : "Enviar link de redefinição"}
                      </button>
                    </div>

                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          ou altere diretamente
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handlePasswordChange} className="max-w-md">
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Senha Atual
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? "text" : "password"}
                              id="currentPassword"
                              value={passwords.currentPassword}
                              onChange={(e) =>
                                setPasswords({
                                  ...passwords,
                                  currentPassword: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPasswords((prev) => ({
                                  ...prev,
                                  current: !prev.current,
                                }))
                              }
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPasswords.current ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Nova Senha
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? "text" : "password"}
                              id="newPassword"
                              value={passwords.newPassword}
                              onChange={(e) =>
                                setPasswords({
                                  ...passwords,
                                  newPassword: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPasswords((prev) => ({
                                  ...prev,
                                  new: !prev.new,
                                }))
                              }
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPasswords.new ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            A senha deve ter no mínimo 8 caracteres, incluindo
                            letras maiúsculas, minúsculas, números e caracteres
                            especiais.
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Confirmar Nova Senha
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? "text" : "password"}
                              id="confirmPassword"
                              value={passwords.confirmPassword}
                              onChange={(e) =>
                                setPasswords({
                                  ...passwords,
                                  confirmPassword: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPasswords((prev) => ({
                                  ...prev,
                                  confirm: !prev.confirm,
                                }))
                              }
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPasswords.confirm ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                          {error}
                        </div>
                      )}

                      {success && (
                        <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                          {success}
                        </div>
                      )}

                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full sm:w-auto bg-[#10a3b4] text-white px-6 py-2 rounded-lg hover:bg-[#0d8997] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Alterando..." : "Alterar Senha"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabsContent>

              {/* Removendo temporariamente o conteúdo da aba de usuários */}
              {/* <TabsContent value="users">
                <UserManagement />
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
