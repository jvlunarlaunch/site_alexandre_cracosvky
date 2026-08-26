-- Novas capturas: 3 pacotes consolidados (Finanças, Economia, Estratégia/Valuation/M&A)
-- + 1 página de download avulso dos 9 materiais individuais.
-- Formulário simplificado: apenas nome, email, whatsapp.

CREATE TABLE pacote_financas_contabilidade_alexandre_cracovsky (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL, email text NOT NULL,
  whatsapp text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE pacote_economia_investimentos_alexandre_cracovsky (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL, email text NOT NULL,
  whatsapp text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE pacote_estrategia_valuation_ma_alexandre_cracovsky (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL, email text NOT NULL,
  whatsapp text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE nove_materiais_alexandre_cracovsky (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL, email text NOT NULL,
  whatsapp text,
  created_at timestamptz DEFAULT now()
);

-- RLS: permite INSERT anônimo, mesmo padrão das demais tabelas de captura.
ALTER TABLE pacote_financas_contabilidade_alexandre_cracovsky ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON pacote_financas_contabilidade_alexandre_cracovsky FOR INSERT TO anon WITH CHECK (true);

ALTER TABLE pacote_economia_investimentos_alexandre_cracovsky ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON pacote_economia_investimentos_alexandre_cracovsky FOR INSERT TO anon WITH CHECK (true);

ALTER TABLE pacote_estrategia_valuation_ma_alexandre_cracovsky ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON pacote_estrategia_valuation_ma_alexandre_cracovsky FOR INSERT TO anon WITH CHECK (true);

ALTER TABLE nove_materiais_alexandre_cracovsky ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON nove_materiais_alexandre_cracovsky FOR INSERT TO anon WITH CHECK (true);
