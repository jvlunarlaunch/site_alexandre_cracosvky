# Iscas digitais — Professor CFA
### Perguntas, fórmulas e peso de cada dimensão no resultado final

---

## Isca 1 — Quiz: minha empresa está pronta para ser vendida?

**Lógica do resultado:** cada pergunta vale de 0 a 3 pontos. A pontuação total alimenta um **Índice de Prontidão para Venda (IPV)**, que vai de 0 a 30.

$$
IPV = \sum_{i=1}^{10} P_i \quad \text{onde } P_i \in \{0, 1, 2, 3\}
$$

| Resposta | Pontos |
|---|---|
| Sim | 3 |
| Parcialmente | 1 |
| Não | 0 |

**Faixas de resultado:**

$$
\text{Resultado} = \begin{cases} \text{Não está na hora} & \text{se } IPV \leq 10 \\ \text{Quase pronto} & \text{se } 11 \leq IPV \leq 22 \\ \text{Empresa vendável} & \text{se } IPV \geq 23 \end{cases}
$$

### Perguntas e o que cada uma representa na fórmula

| # | Pergunta | Dimensão | Peso na fórmula |
|---|---|---|---|
| P1 | A empresa fatura sem depender da sua presença diária? | Independência operacional | Alta — dealbreaker para compradores financeiros |
| P2 | Você tem pelo menos 3 anos de demonstrações financeiras auditadas ou revisadas? | Qualidade da informação financeira | Alta — base da due diligence |
| P3 | Nenhum cliente representa mais de 20% da receita? | Concentração de receita | Alta — risco direto no múltiplo |
| P4 | Contratos formalizados com fornecedores e clientes-chave existem? | Solidez jurídica | Média |
| P5 | Há um time de gestão que funcionaria sem você? | Governança e sucessão | Alta — principal ajuste de múltiplo |
| P6 | O EBITDA é positivo e crescente nos últimos 2 anos? | Saúde financeira | Alta — base do valuation |
| P7 | Você conhece o valuation aproximado da sua empresa? | Preparo do vendedor | Média — sinaliza maturidade negocial |
| P8 | Os processos estão documentados e replicáveis? | Escalabilidade | Média |
| P9 | Não há passivos trabalhistas ou fiscais relevantes em aberto? | Risco de passivo oculto | Alta — causa de renegociação ou quebra de deal |
| P10 | Você já definiu o que quer fazer depois da venda? | Motivação do vendedor | Baixa — mas impacta o timing |

**Gráficos Highcharts:** Solid gauge (IPV geral) + Spider/radar (pontuação por dimensão) + Bar horizontal (ranking de critérios)

---

## Isca 2 — Calculadora: quanto vale minha empresa agora?

**Lógica do resultado:** valuation por múltiplo de EBITDA do benchmark do setor, aplicando descontos multiplicativos por porte, liquidez, riscos e região.

$$
M_{aplicado} = M_{setor} \times (1 - d_{porte}) \times (1 - d_{liquidez}) \times (1 - d_{riscos}) \times (1 - d_{regiao})
$$

$$
EV = EBITDA \times M_{aplicado}
$$

$$
Equity\ Value = EV_{central} - Dívida\ líquida
$$

**Descontos aplicados:**
- **Porte (por Receita):** >R$400M: 0% · R$200–400M: −2% · R$100–200M: −4% · R$50–100M: −6% · R$20–50M: −8% · <R$20M: −10%
- **Company-specific (soma de riscos):** Dependência do sócio (−2%), Concentração de clientes (−2%), Sem auditoria (−2%), Contingências não mapeadas (−2%), Crescimento baixo (−2%). (Máximo −10% somado).
- **Região:** SE (0%), S (−1%), CO (−2%), NE (−3%), N (−3%).
- **Liquidez:** Definida por setor (−1%, −2% ou −3%).

**Múltiplos de benchmark por setor (exemplos):**
- **Agro (Grãos/Trading):** 3,5–5,5x (Liquidez -3%)
- **Tech (AI/SaaS):** 8–13x (Liquidez -1%)
- **Saúde (Hospitais):** 7–10x (Liquidez -1%)
(Ver config completa para os 32 setores)

**Potencial com preparo (3ª barra):**
- EBITDA aumentado em 10%.
- Remoção do desconto de fatores de risco (company-specific).
- Múltiplo recalculado sem os riscos.

**Gráficos Highcharts:** Football field (3 faixas: empresa hoje, benchmark setor, potencial com preparo) + Donut (impacto dos descontos: valor retido, porte, liquidez, riscos, região).

---

## Isca 3 — Diagnóstico: os 7 pontos cegos que derrubam deals de M&A

**Lógica do resultado:** cada ponto cego recebe um **nível de risco** (0 = baixo, 1 = médio, 2 = alto). O **Índice de Risco de Deal (IRD)** é a soma ponderada dos riscos.

$$
IRD = \sum_{k=1}^{7} w_k \cdot r_k \quad \text{onde } r_k \in \{0, 1, 2\}
$$

$$
IRD_{max} = \sum_{k=1}^{7} 2 \cdot w_k = 2 \times \sum w_k
$$

**Classificação final:**

$$
\text{Risco} = \begin{cases} \text{Baixo} & \text{se } IRD \leq 4 \\ \text{Médio} & \text{se } 5 \leq IRD \leq 9 \\ \text{Alto — deal em risco} & \text{se } IRD \geq 10 \end{cases}
$$

### Pontos cegos, perguntas e pesos

| # | Ponto cego | Pergunta diagnóstica | Peso $w_k$ | Justificativa |
|---|---|---|---|---|
| PC1 | Dependência do fundador | A empresa para se você sair por 3 meses? | 3 | Causa mais frequente de desconto de múltiplo |
| PC2 | Concentração de clientes | Seu maior cliente representa mais de 25% da receita? | 3 | Risco sistêmico direto no fluxo de caixa futuro |
| PC3 | Passivo oculto | Há processos trabalhistas, fiscais ou ambientais em andamento? | 2 | Impacto financeiro quantificável — afeta preço final |
| PC4 | Contratos informais | Acordos relevantes existem apenas "na palavra"? | 2 | Risco jurídico que aparece na due diligence |
| PC5 | Qualidade do EBITDA | Sua margem inclui despesas pessoais do sócio? | 2 | Afeta a base de cálculo do valuation |
| PC6 | Governança fraca | Decisões financeiras dependem só de você, sem alçadas? | 1 | Sinaliza risco operacional pós-aquisição |
| PC7 | Narrativa do vendedor | Você já explicou ao comprador por que está vendendo? | 1 | Assimetria de informação — gera desconfiança |

**Benchmark de referência para o relatório:**

$$
\text{"Empresas com } IRD \geq 10 \text{ têm 60\% mais chance de ver o deal cair na due diligence"}
$$

**Gráficos Highcharts:** Heatmap (7 pontos × nível de risco) + Bar horizontal (score individual por ponto cego)

---

## Isca 4 — Teste: qual perfil de comprador é ideal para sua empresa?

**Lógica do resultado:** cada resposta pontua para um ou mais perfis de comprador. O perfil com maior pontuação é o recomendado.

$$
Score(perfil_j) = \sum_{i=1}^{8} a_{ij} \cdot R_i
$$

Onde $a_{ij} \in \{0, 1\}$ indica se a resposta $i$ pontua para o perfil $j$, e $R_i$ é a resposta escolhida.

**Perfis de comprador:**

| Código | Perfil |
|---|---|
| PE | Fundo de Private Equity |
| EST | Comprador Estratégico (concorrente / player do setor) |
| FAM | Comprador Familiar / Individual |
| CONC | Consolidador / Concorrente direto |

### Perguntas e mapeamento para perfis

| # | Pergunta | Resposta → Perfil pontuado |
|---|---|---|
| Q1 | Objetivo principal: maximizar preço ou preservar cultura? | Preço → PE, EST \| Cultura → FAM |
| Q2 | Quer sair totalmente ou ficar como minoritário? | Sair → PE, FAM \| Ficar → EST |
| Q3 | A empresa tem tecnologia escalável para outros mercados? | Sim → EST, PE \| Não → FAM, CONC |
| Q4 | Prefere processo rápido ou esperar o comprador certo? | Rápido → CONC, FAM \| Esperar → PE, EST |
| Q5 | Teria conforto com PE como sócio por 4–6 anos? | Sim → PE \| Não → EST, FAM |
| Q6 | É líder em nicho regional que player nacional poderia absorver? | Sim → EST, CONC \| Não → PE, FAM |
| Q7 | Há sócios familiares a contemplar no deal? | Sim → FAM \| Não → PE, EST |
| Q8 | Valuation máximo é mais importante que quem compra? | Sim → PE, EST \| Não → FAM |

**Compatibilidade percentual por perfil:**

$$
Compat(\%) = \frac{Score(perfil_j)}{Score_{max}(perfil_j)} \times 100
$$

**Gráficos Highcharts:** Donut com legenda (% de compatibilidade por perfil) + Spider/radar (o que o perfil ideal valoriza vs. o que a empresa entrega)

---

## Isca 5 — Ranking: em qual estágio de maturidade M&A sua empresa está?

**Lógica do resultado:** as respostas mapeiam para um dos 5 estágios de maturidade. O estágio é determinado pela soma ponderada das respostas, não por pontos individuais.

$$
E = f\left(\sum_{i=1}^{6} w_i \cdot R_i\right)
$$

**Mapeamento de estágios:**

| Estágio | Nome | Soma ponderada | Tempo médio para deal |
|---|---|---|---|
| 1 | Pré-consciência | 0–5 | Indefinido |
| 2 | Curiosidade | 6–10 | 3–5 anos |
| 3 | Preparação | 11–15 | 18–36 meses |
| 4 | Posicionamento | 16–20 | 6–18 meses |
| 5 | Negociação ativa | 21–24 | 0–6 meses |

### Perguntas e pesos

| # | Pergunta (múltipla escolha) | Opções e pontos | Peso $w_i$ |
|---|---|---|---|
| Q1 | Com que frequência você pensa em vender a empresa? | Nunca=0 / Às vezes=2 / Frequentemente=4 | 1× |
| Q2 | Suas demonstrações financeiras estão organizadas para apresentar a um comprador? | Não=0 / Parcialmente=2 / Sim, auditadas=4 | 1.5× |
| Q3 | Você já conversou com algum assessor financeiro ou banco de investimento? | Nunca=0 / Informalmente=2 / Formalmente=4 | 1× |
| Q4 | Você tem ou já preparou algum material de apresentação da empresa (IM, teaser)? | Não=0 / Esboço=2 / Completo=4 | 1.5× |
| Q5 | Há compradores potenciais que já demonstraram interesse? | Não=0 / Contatos informais=2 / Em negociação=4 | 1× |
| Q6 | Você tem clareza sobre o valor mínimo que aceitaria por sua empresa? | Não tenho ideia=0 / Tenho uma estimativa=2 / Tenho clareza total=4 | 1× |

**Avanço para próximo estágio — ações necessárias:**

$$
\Delta E = E_{alvo} - E_{atual} \Rightarrow \text{gap de ações prioritárias}
$$

**Gráficos Highcharts:** Gauge com faixas de 1 a 5 (estágio atual) + Area chart (jornada completa com tempo médio por fase)

---

## Isca 6 — Quiz: qual método de valuation usar em cada caso?

**Lógica do resultado:** 8 mini-cases, 1 ponto por acerto. A pontuação por categoria revela lacunas específicas.

$$
Score_{total} = \sum_{c=1}^{8} A_c \quad \text{onde } A_c \in \{0, 1\}
$$

**Categorias de método e seus cases:**

$$
Score_{cat} = \frac{\text{acertos na categoria}}{\text{total de questões da categoria}} \times 100
$$

### Cases, método correto e o que avalia

| # | Descrição do case | Método correto | Categoria avaliada |
|---|---|---|---|
| C1 | SaaS com crescimento de 80% a.a. e EBITDA negativo | DCF (fluxo futuro) | DCF em empresas de crescimento |
| C2 | Holding com participações em 4 setores diferentes | Soma das partes (SOTP) | Situações especiais |
| C3 | Aquisição alavancada por fundo de PE | LBO model | Situações especiais |
| C4 | Banco regional em fusão | P/BV e P/E (não EV/EBITDA) | Múltiplos setoriais |
| C5 | Startup pré-receita em rodada seed | VC method ou scorecard | Situações especiais |
| C6 | Indústria madura com receita estável | EV/EBITDA de comparáveis | Múltiplos de mercado |
| C7 | Empresa com ativos imobiliários relevantes | NAV (Net Asset Value) + múltiplos | Múltiplos e ativos |
| C8 | Empresa familiar sem comparáveis públicos | DCF + prêmio de controle + desconto de liquidez | DCF ajustado |

**Diagnóstico por categoria:**

| Categoria | Acertos | Diagnóstico |
|---|---|---|
| DCF | 0–1 / 2 | Revisar construção de fluxo de caixa e perpetuidade |
| Múltiplos | 0–1 / 2 | Estudar seleção e ajuste de comparáveis |
| Situações especiais | 0–1 / 3 | Aprofundar LBO, SOTP e VC method |

**Gráficos Highcharts:** Column agrupado (acertos por categoria) + Donut de desempenho geral (% acertos com faixa de proficiência)

---

## Isca 7 — Simulado relâmpago: você passaria no CFA nível I?

**Lógica do resultado:** 10 questões, 1 ponto por acerto. A nota simulada é comparada ao mínimo histórico de aprovação (≈60%) e ao desempenho médio por tópico.

$$
Nota_{simulada}(\%) = \frac{\sum_{i=1}^{10} A_i}{10} \times 100
$$

**Comparação com benchmark de aprovação:**

$$
Gap = Nota_{min\_aprovacao} - Nota_{simulada} = 60\% - Nota_{simulada}
$$

$$
\text{Se } Gap > 0 \Rightarrow \text{candidato em zona de risco}
$$

**Estimativa de horas de estudo restantes por tópico:**

$$
H_i = H_{base\_topico\_i} \times \left(1 - \frac{A_i}{1}\right) \times fator_{dificuldade\_i}
$$

Onde $H_{base}$ é a carga horária média recomendada pelo CFA Institute por tópico, e $A_i \in \{0,1\}$.

### Questões, tópicos e carga horária base do CFA Institute

| # | Tópico CFA | Peso no exame (%) | Horas base recomendadas |
|---|---|---|---|
| Q1 | Ética e padrões profissionais | 15–20% | 40h |
| Q2 | Análise quantitativa | 8–12% | 30h |
| Q3 | Economia | 8–12% | 25h |
| Q4 | Análise de demonstrações financeiras | 13–17% | 45h |
| Q5 | Finanças corporativas | 8–12% | 25h |
| Q6 | Renda variável | 10–12% | 30h |
| Q7 | Renda fixa | 10–12% | 35h |
| Q8 | Derivativos | 5–8% | 20h |
| Q9 | Gestão de portfólios | 5–8% | 20h |
| Q10 | Ativos alternativos | 5–8% | 15h |

**Total de horas base CFA Institute:** ~300h recomendadas para aprovação no nível I.

$$
H_{restantes\_total} = \sum_{i: A_i = 0} H_{base\_topico\_i}
$$

**Gráficos Highcharts:** Spider/radar (desempenho nos 10 tópicos) + Solid gauge (nota geral vs. mínimo 60%) + Bar horizontal (horas restantes por tópico)

---

## Isca 8 — Diagnóstico: em qual nível de valuation você está?

**Lógica do resultado:** 10 competências avaliadas numa escala de confiança de 1 a 5. O **Índice de Maturidade em Valuation (IMV)** posiciona o usuário num dos 3 níveis.

$$
IMV = \frac{\sum_{i=1}^{10} C_i}{10} \quad \text{onde } C_i \in \{1, 2, 3, 4, 5\}
$$

**Classificação por nível:**

$$
\text{Nível} = \begin{cases} \text{Iniciante} & \text{se } IMV < 2.5 \\ \text{Intermediário} & \text{se } 2.5 \leq IMV < 3.8 \\ \text{Avançado} & \text{se } IMV \geq 3.8 \end{cases}
$$

**Gap por competência vs. nível esperado para avançado:**

$$
Gap_i = 5 - C_i \quad \text{(prioridade de estudo inversamente proporcional ao Gap)}
$$

### Competências e o que representam no diagnóstico

| # | Competência avaliada | Nível mínimo esperado | Aplicação prática |
|---|---|---|---|
| C1 | Calcular o WACC do zero para empresa aberta | Intermediário | Base de qualquer DCF |
| C2 | Ajustar EBITDA para remover itens não recorrentes | Intermediário | Normalização financeira — impacta múltiplo |
| C3 | Diferença entre valor do equity e enterprise value (EV) | Iniciante | Fundamento de comparáveis e DCF |
| C4 | Quando usar EV/EBITDA vs. P/L vs. P/BV | Intermediário | Seleção de método por setor |
| C5 | Construir um DCF em planilha sem template | Avançado | Habilidade core de analista |
| C6 | Calcular terminal value (Gordon Growth e Exit Multiple) | Intermediário | Representa 60–80% do valor num DCF |
| C7 | Entender como alavancagem afeta retorno em LBO | Avançado | Essencial para PE e M&A |
| C8 | Analisar comparável e ajustar por diferenças | Avançado | Múltiplos de mercado na prática |
| C9 | Valuation em setores especiais (bancos, mineração) | Avançado | Diferenciação de analista sênior |
| C10 | Defender valuation num case de entrevista | Avançado | Síntese de todas as competências |

**Trilha de estudo por prioridade:**

$$
Prioridade_i = \frac{Gap_i}{\sum_{j=1}^{10} Gap_j} \times 100\%
$$

**Gráficos Highcharts:** Spider/radar (confiança atual nas 10 competências) + Column agrupado (nível atual vs. nível esperado para avançado por competência)

---

## Isca 13 — Quiz: o que destrói valor em uma empresa?

**Lógica do resultado:** 7 cases com 1 ponto por acerto. O relatório entrega o ranking dos destruidores de valor por frequência e impacto estimado no múltiplo.

$$
Score_{total} = \sum_{c=1}^{7} A_c \quad \text{onde } A_c \in \{0, 1\}
$$

**Impacto de cada destruidor no valuation — modelo de desconto acumulado:**

$$
EV_{final} = EV_{base} \times \prod_{k=1}^{n} (1 - d_k)
$$

Onde $d_k$ é o desconto no múltiplo causado pelo destruidor $k$ identificado.

### Cases, destruidor revelado e impacto estimado no múltiplo

| # | Situação do case | Destruidor de valor | Impacto no múltiplo |
|---|---|---|---|
| C1 | Receita dobrou mas FCF caiu 40% | Crescimento destruidor de caixa (capex + capital de giro desordenado) | −15 a −25% no EV |
| C2 | Empresário recusou R$50M e vendeu por R$20M 3 anos depois | Concentração em 1 cliente + dependência do fundador | −30 a −50% no EV |
| C3 | EBITDA de R$10M avaliado a 3× enquanto setor pratica 6× | Governança fraca + passivo oculto + ausência de gestão profissional | −40 a −60% no múltiplo |
| C4 | Fusão gerou sinergias no papel mas destruiu valor na prática | Falha de integração cultural + perda de talentos + sistemas incompatíveis | −20 a −40% no EV sinérgico |
| C5 | Empresa cresceu receita mas margem caiu de 30% para 8% | Crescimento de receita sem escalabilidade de margem | −20 a −35% no EV |
| C6 | Empresa com IP valioso vendida sem cláusula de non-compete | Erosão de vantagem competitiva pós-venda | −15 a −30% do prêmio estratégico |
| C7 | Negócio saudável mas dono desapareceu após anúncio de venda | Perda de key person durante o processo de M&A | −10 a −20% na avaliação final |

**Waterfall de destruição de valor (para o relatório visual):**

$$
EV_{final} = EV_{base} - \Delta_{C1} - \Delta_{C2} - \cdots - \Delta_{Cn}
$$

Onde cada $\Delta_{Ck} = EV_{base} \times d_k$ representa a parcela destruída pelo fator identificado pelo usuário como presente na sua empresa ou no case respondido errado.

**Ranking de frequência dos destruidores (benchmark de mercado):**

| Destruidor | Frequência em deals que fracassaram |
|---|---|
| Dependência do fundador | 72% |
| Concentração de clientes | 61% |
| Passivo oculto | 58% |
| Qualidade do EBITDA | 54% |
| Governança fraca | 49% |
| Falha de integração | 43% |
| Erosão de IP / non-compete | 31% |

**Gráficos Highcharts:** Waterfall chart (EV base → destruidores → EV final) + Bar horizontal (impacto por destruidor) + Donut (acertos/erros por categoria de destruidor)

---

*Documento produzido para uso interno do professor CFA — estrutura de iscas digitais com fórmulas de pontuação e lógica de relatório.*
