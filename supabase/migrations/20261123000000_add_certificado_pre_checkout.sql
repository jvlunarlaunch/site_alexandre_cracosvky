-- Formulário pré-checkout da página /certificado (antes do Hotmart).
CREATE TABLE IF NOT EXISTS certificado_pre_checkout_alexandre_cracovsky (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL CHECK (char_length(nome) BETWEEN 2 AND 120),
  cargo text NOT NULL CHECK (cargo IN (
    'Empresário(a)',
    'Executivo(a) de Companhia ou Banco',
    'Advogado(a)',
    'Estudante',
    'Consultor(a)',
    'Outro'
  )),
  cargo_outro text CHECK (char_length(cargo_outro) <= 120),
  whatsapp text NOT NULL CHECK (whatsapp ~ '^[0-9]{10,15}$'),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS: permite INSERT anônimo, mesmo padrão das demais tabelas de captura.
ALTER TABLE certificado_pre_checkout_alexandre_cracovsky ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON certificado_pre_checkout_alexandre_cracovsky
  FOR INSERT TO anon WITH CHECK (true);
