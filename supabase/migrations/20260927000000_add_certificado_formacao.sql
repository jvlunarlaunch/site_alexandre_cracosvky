-- Lista de espera da Formação em Valuation, Estratégia e M&A (página /certificado).
CREATE TABLE certificado_formacao_alexandre_cracovsky (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL, email text NOT NULL,
  whatsapp text,
  created_at timestamptz DEFAULT now()
);

-- RLS: permite INSERT anônimo, mesmo padrão das demais tabelas de captura.
ALTER TABLE certificado_formacao_alexandre_cracovsky ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON certificado_formacao_alexandre_cracovsky FOR INSERT TO anon WITH CHECK (true);
