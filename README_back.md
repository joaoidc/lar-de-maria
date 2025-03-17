# Dashboard com Supabase e React - Guia Completo

Este guia explica como criar um dashboard completo usando Supabase como backend e React como frontend. É perfeito para iniciantes que querem entender como construir sistemas web modernos.

## 🌟 Visão Geral

Este projeto é um dashboard administrativo que permite:

- Autenticação de usuários
- Gerenciamento de conteúdo (notícias, eventos, etc.)
- Upload de imagens
- Controle de acesso baseado em funções (RBAC)

## 🔧 Tecnologias Utilizadas

- **Frontend**:

  - React (biblioteca UI)
  - TailwindCSS (estilização)
  - React Router (navegação)
  - React Hook Form (formulários)

- **Backend**:
  - Supabase (banco de dados e autenticação)
  - PostgreSQL (banco de dados)
  - Storage Bucket (armazenamento de arquivos)

## 📝 Estrutura do Banco de Dados

### Tabela: news

```sql
CREATE TABLE news (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Políticas de Segurança (RLS)

#### Para Tabelas

```sql
-- Permitir leitura pública
CREATE POLICY "Allow public read news"
    ON news FOR SELECT
    USING (true);

-- Permitir criação por usuários autenticados
CREATE POLICY "Allow authenticated create news"
    ON news FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Permitir atualização apenas pelo criador
CREATE POLICY "Allow users to update own news"
    ON news FOR UPDATE
    USING (auth.uid() = created_by);
```

#### Para Storage

```sql
-- Políticas para buckets de armazenamento
CREATE POLICY "Allow public read objects"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'news');

CREATE POLICY "Allow authenticated insert objects"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'news'
        AND auth.role() = 'authenticated'
    );
```

## 🚀 Como Implementar

### 1. Configuração do Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Guarde as credenciais:
   - URL do projeto
   - Chave anônima (anon key)
   - Chave de serviço (service_role key)

### 2. Configuração do Banco de Dados

1. Vá para o SQL Editor no Supabase
2. Execute os scripts de migração na seguinte ordem:
   - Criação de tabelas
   - Configuração de RLS
   - Criação de buckets

### 3. Configuração do Frontend

1. Instale as dependências:

```bash
npm install @supabase/supabase-js react-router-dom @tailwindcss/forms react-hook-form
```

2. Configure o cliente Supabase:

```typescript
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("SUA_URL_DO_SUPABASE", "SUA_ANON_KEY");
```

3. Configure o contexto de autenticação:

```typescript
// src/contexts/AuthContext.tsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession();

    // Ouvir mudanças de auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
```

## 📚 Boas Práticas

### Segurança

1. **Nunca confie apenas no frontend**

   - Sempre implemente RLS no banco de dados
   - Valide dados no backend

2. **Autenticação**
   - Use tokens JWT
   - Implemente refresh tokens
   - Armazene tokens com segurança

### Performance

1. **Otimização de Imagens**

   - Limite o tamanho dos arquivos
   - Use formatos otimizados (WebP)
   - Implemente lazy loading

2. **Consultas ao Banco**
   - Use paginação
   - Selecione apenas colunas necessárias
   - Implemente cache quando possível

## 🔍 Solução de Problemas Comuns

### 1. Erro de RLS

```
new row violates row-level security policy
```

**Solução**: Verifique se:

- O usuário está autenticado
- As políticas RLS estão configuradas corretamente
- O usuário tem as permissões necessárias

### 2. Erro de Upload

```
Error creating bucket
```

**Solução**: Verifique se:

- O bucket existe
- As políticas de storage estão configuradas
- O arquivo está dentro do limite de tamanho

### 3. Erro de Autenticação

```
JWT expired
```

**Solução**:

- Implemente refresh token
- Verifique se o token está sendo renovado
- Faça logout e login novamente

## 📱 Exemplos de Código

### Upload de Imagem

```typescript
async function handleImageUpload(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `news/${fileName}`;

  const { error } = await supabase.storage.from("news").upload(filePath, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("news").getPublicUrl(filePath);

  return publicUrl;
}
```

### Criar Notícia

```typescript
async function createNews({ title, content, image_url }) {
  const { data, error } = await supabase
    .from("news")
    .insert([{ title, content, image_url }]);

  if (error) throw error;
  return data;
}
```

## 🎯 Próximos Passos

1. **Melhorias de UX**

   - Adicionar feedback de loading
   - Implementar tratamento de erros
   - Melhorar validação de formulários

2. **Segurança**

   - Implementar autenticação de dois fatores
   - Adicionar logs de auditoria
   - Implementar rate limiting

3. **Performance**
   - Implementar SSR
   - Otimizar carregamento de imagens
   - Adicionar cache

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs do Supabase
2. Consulte a documentação oficial
3. Use o sistema de issues do GitHub
4. Participe da comunidade Supabase no Discord

## 📖 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do React](https://reactjs.org/docs)
- [Guia do TailwindCSS](https://tailwindcss.com/docs)
- [Tutorial de React Router](https://reactrouter.com/docs)
