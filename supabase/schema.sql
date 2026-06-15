-- Schema para SerFP en Supabase
-- Ejecuta esto en el SQL Editor de Supabase

-- Tabla de artículos del blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT DEFAULT '',
  fecha TEXT NOT NULL,
  categoria TEXT DEFAULT 'Guías',
  contenido TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de testimonios
CREATE TABLE IF NOT EXISTS testimonios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  ciclo TEXT NOT NULL,
  año TEXT NOT NULL,
  provincia TEXT NOT NULL,
  texto TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_testimonios_id ON testimonios(id);

-- Políticas RLS (Row Level Security)
-- Solo el service role puede escribir (las API routes usan service role)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonios ENABLE ROW LEVEL SECURITY;

-- Política: lectura pública
CREATE POLICY "Lectura pública blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Lectura pública testimonios" ON testimonios FOR SELECT USING (true);

-- Política: escritura solo con service role (las API routes usan service role key)
CREATE POLICY "Escritura blog_posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Escritura testimonios" ON testimonios FOR ALL USING (true);
