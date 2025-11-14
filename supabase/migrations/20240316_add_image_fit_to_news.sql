-- Add image_fit column to news table
-- 'cover' = corta a imagem para preencher o espaço (padrão)
-- 'contain' = mostra a imagem inteira sem cortar
ALTER TABLE news
ADD COLUMN IF NOT EXISTS image_fit TEXT DEFAULT 'cover' CHECK (image_fit IN ('cover', 'contain'));

