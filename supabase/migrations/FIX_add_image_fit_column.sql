-- Adiciona a coluna image_fit na tabela news se ela não existir
ALTER TABLE news
ADD COLUMN IF NOT EXISTS image_fit TEXT DEFAULT 'cover' CHECK (image_fit IN ('cover', 'contain'));

-- Atualiza notícias existentes que não têm o campo definido
UPDATE news
SET image_fit = 'cover'
WHERE image_fit IS NULL;

-- Verifica se a coluna foi criada
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'news' AND column_name = 'image_fit';

