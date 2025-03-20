import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  Loader2,
  UserPlus,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  Pencil,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface ExtendedUser {
  id: string;
  email: string;
  created_at: string;
  display_name: string;
  role?: string;
}

interface RawUser {
  id: string;
  email: string;
  created_at: string;
  raw_user_meta_data: {
    name?: string;
    role?: string;
  };
}

export function UserManagement() {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editingUser, setEditingUser] = useState<ExtendedUser | null>(null);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    role: "view",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data: usersData, error } = await supabase.rpc("list_users");

      if (error) throw error;

      // Formatar os dados dos usuários
      const formattedUsers = (usersData as RawUser[]).map((user) => ({
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        display_name: user.raw_user_meta_data?.name || "-",
        role: user.raw_user_meta_data?.role || "view",
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Criar usuário usando RPC personalizada
      const { data, error } = await supabase.rpc("create_new_user", {
        user_email: newUser.email,
        user_password: newUser.password,
        user_name: newUser.name,
        user_role: newUser.role,
      });

      if (error) throw error;

      if (data && !data.success) {
        throw new Error(data.message || "Erro ao criar usuário");
      }

      toast.success("Usuário criado com sucesso!");
      setShowNewUserForm(false);
      setNewUser({ email: "", password: "", name: "", role: "view" });
      await fetchUsers(); // Recarregar a lista de usuários
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      toast.error(error.message || error.details || "Erro ao criar usuário");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;

      toast.success("Usuário excluído com sucesso!");
      fetchUsers(); // Recarregar a lista de usuários
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast.error("Erro ao excluir usuário");
    }
  };

  const updateToDevAdmin = async (userId: string) => {
    try {
      // Encontrar o usuário atual na lista
      const user = users.find((u) => u.id === userId);
      if (!user) throw new Error("Usuário não encontrado");

      // Chamar a função SQL que atualiza o usuário
      const { error } = await supabase.rpc("make_dev_admin", {
        target_email: user.email,
      });

      if (error) throw error;

      toast.success("Usuário atualizado para Dev Admin com sucesso!");
      fetchUsers(); // Recarregar a lista de usuários
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário");
    }
  };

  useEffect(() => {
    // Atualizar o usuário específico para dev_admin
    const devUser = users.find(
      (user) => user.email === "yladacz@gmail.com" && user.role !== "dev_admin"
    );
    if (devUser) {
      updateToDevAdmin(devUser.id);
    }
  }, [users]);

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      // Atualiza o usuário usando RPC personalizada
      const { data, error } = await supabase.rpc("update_user_metadata", {
        user_id: editingUser.id,
        user_name: editingUser.display_name,
        user_role: editingUser.role,
      });

      if (error) throw error;

      if (data && !data.success) {
        throw new Error(data.message || "Erro ao atualizar usuário");
      }

      toast.success("Usuário atualizado com sucesso!");
      setShowEditUserForm(false);
      setEditingUser(null);
      await fetchUsers(); // Recarrega a lista de usuários
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error(
        error.message || error.details || "Erro ao atualizar usuário"
      );
    }
  };

  const openEditModal = (user: ExtendedUser) => {
    setEditingUser(user);
    setShowEditUserForm(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Gerenciar Usuários
        </h2>
        <button
          onClick={() => setShowNewUserForm(true)}
          className="bg-[#10a3b4] text-white px-4 py-2 rounded-lg hover:bg-[#0d8997] transition-colors flex items-center gap-2"
        >
          <UserPlus className="h-5 w-5" />
          Novo Usuário
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#10a3b4]" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  Nome
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  Função
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                  Data de Criação
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{user.display_name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin_super"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "dev_admin"
                          ? "bg-indigo-100 text-indigo-800"
                          : user.role === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role === "admin_super"
                        ? "Administrador Super"
                        : user.role === "dev_admin"
                        ? "Dev Admin"
                        : user.role === "admin"
                        ? "Administrador"
                        : "Visualizador"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(user.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-2 text-blue-500 hover:text-blue-600 transition-colors mr-2"
                      title="Editar Usuário"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors"
                      title="Excluir usuário"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Novo Usuário */}
      {showNewUserForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Novo Usuário
              </h3>
              <button
                onClick={() => setShowNewUserForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
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
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent pr-10"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Mínimo de 8 caracteres
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Função
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent mb-4"
                  >
                    <option value="view">Visualizador</option>
                    <option value="admin">Administrador</option>
                    <option value="admin_super">Administrador Super</option>
                    <option value="dev_admin">Dev Admin</option>
                  </select>

                  {/* Explicação da função selecionada */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    {newUser.role === "view" && (
                      <div className="flex items-start gap-2">
                        <User className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">
                            Visualizador
                          </p>
                          <p className="text-sm text-gray-600">
                            Acesso somente leitura. Pode visualizar conteúdo mas
                            não pode criar, editar ou excluir.
                          </p>
                        </div>
                      </div>
                    )}

                    {newUser.role === "admin" && (
                      <div className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">
                            Administrador
                          </p>
                          <p className="text-sm text-gray-600">
                            Acesso total ao conteúdo. Pode criar, editar e
                            excluir notícias, mas não pode gerenciar outros
                            usuários.
                          </p>
                        </div>
                      </div>
                    )}

                    {newUser.role === "admin_super" && (
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">
                            Administrador Super
                          </p>
                          <p className="text-sm text-gray-600">
                            Acesso completo ao sistema. Pode gerenciar usuários,
                            conteúdo e configurações do sistema.
                          </p>
                        </div>
                      </div>
                    )}

                    {newUser.role === "dev_admin" && (
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">Dev Admin</p>
                          <p className="text-sm text-gray-600">
                            Acesso total com privilégios de desenvolvimento.
                            Pode acessar recursos técnicos e configurações
                            avançadas do sistema.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewUserForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#10a3b4] text-white rounded-lg hover:bg-[#0d8997] transition-colors flex items-center gap-2"
                >
                  <Check className="h-5 w-5" />
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Edição de Usuário */}
      {showEditUserForm && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Editar Usuário
              </h3>
              <button
                onClick={() => {
                  setShowEditUserForm(false);
                  setEditingUser(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditUser}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={editingUser.display_name}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        display_name: e.target.value,
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
                    value={editingUser.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Função
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        role: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10a3b4] focus:border-transparent mb-4"
                  >
                    <option value="view">Visualizador</option>
                    <option value="admin">Administrador</option>
                    <option value="admin_super">Administrador Super</option>
                    <option value="dev_admin">Dev Admin</option>
                  </select>

                  {/* Explicação da função selecionada */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    {editingUser.role === "view" && (
                      <div className="flex items-start gap-2">
                        <User className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">
                            Visualizador
                          </p>
                          <p className="text-sm text-gray-600">
                            Acesso somente leitura. Pode visualizar conteúdo mas
                            não pode criar, editar ou excluir.
                          </p>
                        </div>
                      </div>
                    )}

                    {editingUser.role === "admin" && (
                      <div className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">
                            Administrador
                          </p>
                          <p className="text-sm text-gray-600">
                            Acesso total ao conteúdo. Pode criar, editar e
                            excluir notícias, mas não pode gerenciar outros
                            usuários.
                          </p>
                        </div>
                      </div>
                    )}

                    {editingUser.role === "admin_super" && (
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">
                            Administrador Super
                          </p>
                          <p className="text-sm text-gray-600">
                            Acesso completo ao sistema. Pode gerenciar usuários,
                            conteúdo e configurações do sistema.
                          </p>
                        </div>
                      </div>
                    )}

                    {editingUser.role === "dev_admin" && (
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">Dev Admin</p>
                          <p className="text-sm text-gray-600">
                            Acesso total com privilégios de desenvolvimento.
                            Pode acessar recursos técnicos e configurações
                            avançadas do sistema.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditUserForm(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#10a3b4] text-white rounded-lg hover:bg-[#0d8997] transition-colors flex items-center gap-2"
                >
                  <Check className="h-5 w-5" />
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
