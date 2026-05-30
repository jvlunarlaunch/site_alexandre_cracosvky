/* Quiz Engine — Alexandre Cracovsky  */
const QuizEngine = (() => {
  let cfg, root, state;

  // ─── INIT ──────────────────────────────────────────────────────────────────
  function init(el, config) {
    cfg = config; root = el;
    state = { screen: 'welcome', qi: 0, answers: {}, captured: false };
    render();
  }

  // ─── RENDER DISPATCHER ────────────────────────────────────────────────────
  function render() {
    root.innerHTML = '';
    root.className = 'quiz-app';
    if (state.screen === 'welcome') renderWelcome();
    else if (state.screen === 'question') renderQuestion();
    else if (state.screen === 'capture') renderCapture();
    else if (state.screen === 'result') renderResult();
  }

  // ─── WELCOME ──────────────────────────────────────────────────────────────
  function renderWelcome() {
    const d = div('quiz-screen active');
    d.innerHTML = `
      <span class="welcome-icon">${cfg.icon||'📊'}</span>
      <h1 class="welcome-h1">${cfg.title}</h1>
      <p class="welcome-sub">${cfg.subtitle}</p>
      <div class="welcome-meta">
        <div class="welcome-meta-item">⏱ ${cfg.estimatedTime||'5 min'}</div>
        <div class="welcome-meta-item">📋 ${cfg.questions.length} perguntas</div>
      </div>
      <button class="btn-gold" id="btn-start">Começar agora →</button>
    `;
    root.appendChild(d);
    d.querySelector('#btn-start').onclick = () => { state.screen = 'question'; render(); };
  }

  // ─── QUESTION ─────────────────────────────────────────────────────────────
  function renderQuestion() {
    const q = cfg.questions[state.qi];
    const pct = Math.round((state.qi / cfg.questions.length) * 100);
    const d = div('quiz-screen active');
    d.innerHTML = `
      <div class="quiz-progress">
        <div class="progress-meta">
          <span class="progress-label">${q.dimension||''}</span>
          <span class="progress-count">${state.qi + 1} / ${cfg.questions.length}</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
      ${q.dimension ? `<div class="question-dim">${q.dimension}</div>` : ''}
      <div class="question-text">${q.text}</div>
      <div id="q-input"></div>
      <div class="quiz-nav">
        <button class="btn-outline btn-back" id="btn-back" style="font-size:11px;padding:9px 18px;color:var(--slate);border-color:var(--ruledark);">← Voltar</button>
        <div class="quiz-nav-right">
          <button class="btn-gold" id="btn-next" style="opacity:.4;pointer-events:none;">Próxima →</button>
        </div>
      </div>
    `;
    root.appendChild(d);

    const inputEl = d.querySelector('#q-input');
    const nextBtn = d.querySelector('#btn-next');
    const backBtn = d.querySelector('#btn-back');

    const saved = state.answers[q.id];
    if (saved !== undefined) { nextBtn.style.opacity = '1'; nextBtn.style.pointerEvents = 'auto'; }

    if (q.type === 'choice') renderChoice(q, inputEl, nextBtn, saved);
    else if (q.type === 'scale') renderScale(q, inputEl, nextBtn, saved);
    else if (q.type === 'number') renderNumber(q, inputEl, nextBtn, saved);
    else if (q.type === 'select') renderSelect(q, inputEl, nextBtn, saved);
    else if (q.type === 'multichoice') renderMulti(q, inputEl, nextBtn, saved);

    backBtn.onclick = () => {
      if (state.qi > 0) { state.qi--; render(); }
      else { state.screen = 'welcome'; render(); }
    };

    nextBtn.onclick = () => {
      state.qi++;
      if (state.qi >= cfg.questions.length) {
        state.screen = state.captured ? 'result' : 'capture';
      }
      render();
    };
  }

  function enableNext(btn) { btn.style.opacity = '1'; btn.style.pointerEvents = 'auto'; }

  function renderChoice(q, el, nextBtn, saved) {
    const ul = div('options-list');
    q.options.forEach(opt => {
      const b = document.createElement('button');
      b.className = 'option-btn' + (saved === opt.value ? ' selected' : '');
      b.textContent = opt.label;
      b.onclick = () => {
        ul.querySelectorAll('.option-btn').forEach(x => x.classList.remove('selected'));
        b.classList.add('selected');
        state.answers[q.id] = opt.value;
        enableNext(nextBtn);
      };
      ul.appendChild(b);
    });
    el.appendChild(ul);
  }

  function renderScale(q, el, nextBtn, saved) {
    const min = q.min||1, max = q.max||5;
    const val = saved !== undefined ? saved : Math.round((min+max)/2);
    el.innerHTML = `
      <div class="scale-input">
        <input type="range" min="${min}" max="${max}" value="${val}" id="range-input">
        <div class="scale-labels">
          <span class="scale-label">${q.minLabel||min}</span>
          <span class="scale-label" id="range-display" style="color:var(--gold);font-family:var(--mo);">${val}</span>
          <span class="scale-label">${q.maxLabel||max}</span>
        </div>
      </div>
    `;
    state.answers[q.id] = val;
    enableNext(nextBtn);
    el.querySelector('#range-input').oninput = function() {
      state.answers[q.id] = +this.value;
      el.querySelector('#range-display').textContent = this.value;
    };
  }

  function renderNumber(q, el, nextBtn, saved) {
    el.innerHTML = `<input class="number-input" type="number" id="num-in" placeholder="${q.placeholder||''}" value="${saved||''}" min="${q.min||0}">`;
    if (saved !== undefined) enableNext(nextBtn);
    el.querySelector('#num-in').oninput = function() {
      if (this.value) { state.answers[q.id] = +this.value; enableNext(nextBtn); }
    };
  }

  function renderSelect(q, el, nextBtn, saved) {
    let opts = q.options.map(o => `<option value="${o.value}" ${saved===o.value?'selected':''}>${o.label}</option>`).join('');
    el.innerHTML = `<select class="select-input" id="sel-in"><option value="">Selecione...</option>${opts}</select>`;
    if (saved !== undefined) enableNext(nextBtn);
    el.querySelector('#sel-in').onchange = function() {
      if (this.value) { state.answers[q.id] = this.value; enableNext(nextBtn); }
    };
  }

  function renderMulti(q, el, nextBtn, saved) {
    const chosen = saved || [];
    const ul = div('options-list');
    q.options.forEach(opt => {
      const b = document.createElement('button');
      b.className = 'option-btn' + (chosen.includes(opt.value) ? ' selected' : '');
      b.textContent = opt.label;
      b.onclick = () => {
        b.classList.toggle('selected');
        const sel = Array.from(ul.querySelectorAll('.option-btn.selected')).map(x => {
          return q.options.find(o => o.label === x.textContent).value;
        });
        state.answers[q.id] = sel;
        if (sel.length) enableNext(nextBtn); else { nextBtn.style.opacity='.4'; nextBtn.style.pointerEvents='none'; }
      };
      ul.appendChild(b);
    });
    if (chosen.length) enableNext(nextBtn);
    el.appendChild(ul);
  }

  // ─── CAPTURE ──────────────────────────────────────────────────────────────
  function renderCapture() {
    const d = div('quiz-screen active');
    const isEmp = cfg.segment === 'empreendedor';
    d.innerHTML = `
      <div class="quiz-capture">
        <h2>${cfg.captureTitle||'Seu resultado está pronto.'} <em>Onde enviamos?</em></h2>
        <p>Preencha os dados abaixo para receber seu diagnóstico completo e recomendações personalizadas.</p>
        ${isEmp ? `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nome Completo</label>
            <input class="form-input" id="cap-name" type="text" placeholder="Seu nome completo">
          </div>
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input class="form-input" id="cap-email" type="email" placeholder="seu@email.com">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nome da Empresa</label>
            <input class="form-input" id="cap-empresa" type="text" placeholder="Nome da empresa">
          </div>
          <div class="form-group">
            <label class="form-label">WhatsApp</label>
            <input class="form-input" id="cap-wa" type="tel" placeholder="(11) 99999-9999">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">O que deseja com M&amp;A (Fusões e Aquisições)?</label>
          <select class="form-input form-select" id="cap-obj">
            <option value="">Selecione...</option>
            <option>Quero vender o meu controle total ou majoritário (Sell-side)</option>
            <option>Procuro um sócio estratégico ou investidor minoritário</option>
            <option>Quero comprar outra empresa ou expandir mercado (Buy-side)</option>
            <option>Busco fusão com outra operação complementar</option>
            <option>Preciso de Reestruturação Financeira ou Operacional</option>
            <option>Ainda estou avaliando alternativas estratégicas</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Tamanho da Empresa (Funcionários)</label>
            <select class="form-input form-select" id="cap-tam">
              <option value="">Selecione...</option>
              <option>Até 20 funcionários</option>
              <option>21 a 100 funcionários</option>
              <option>101 a 500 funcionários</option>
              <option>Mais de 500 funcionários</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Faturamento Médio Anual</label>
            <select class="form-input form-select" id="cap-fat">
              <option value="">Selecione...</option>
              <option>Até R$ 50 Milhões</option>
              <option>De R$ 50 Milhões a R$ 100 Milhões</option>
              <option>De R$ 100 Milhões a R$ 500 Milhões</option>
              <option>Acima de R$ 500 Milhões</option>
            </select>
          </div>
        </div>
        ` : `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nome Completo</label>
            <input class="form-input" id="cap-name" type="text" placeholder="Seu nome completo">
          </div>
          <div class="form-group">
            <label class="form-label">Seu melhor E-mail</label>
            <input class="form-input" id="cap-email" type="email" placeholder="seu@email.com">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">WhatsApp</label>
          <input class="form-input" id="cap-wa" type="tel" placeholder="(11) 99999-9999">
        </div>
        <div class="form-group" style="margin-top:4px;">
          <label class="form-label">Qual é o seu nível atual de conhecimento em Valuation?</label>
          <div class="radio-group">
            <label class="radio-option"><input type="radio" name="cap-nivel" value="iniciante"> <strong>Iniciante:</strong> Sei o conceito básico, mas nunca montei um modelo de fluxo de caixa descontado (FCD).</label>
            <label class="radio-option"><input type="radio" name="cap-nivel" value="intermediario"> <strong>Intermediário:</strong> Entendo a teoria e já faço projeções básicas, mas tenho dúvidas em premissas (WACC, perpetuidade, etc.).</label>
            <label class="radio-option"><input type="radio" name="cap-nivel" value="avancado"> <strong>Avançado:</strong> Já faço valuations na prática e quero refinar e avançar minhas análises.</label>
          </div>
        </div>
        <div class="form-group" style="margin-top:4px;">
          <label class="form-label">Qual é o seu maior objetivo ao aprender Valuation hoje?</label>
          <div class="radio-group">
            <label class="radio-option"><input type="radio" name="cap-obj" value="mercado"> Conquistar uma vaga no mercado financeiro (M&amp;A, Equity Research, Investment Banking, etc.).</label>
            <label class="radio-option"><input type="radio" name="cap-obj" value="certificacao"> Estudar para passar em uma certificação do mercado financeiro (CFA, CNPI, etc.).</label>
            <label class="radio-option"><input type="radio" name="cap-obj" value="investimentos"> Utilizar para analisar e escolher ações/investimentos por conta própria.</label>
            <label class="radio-option"><input type="radio" name="cap-obj" value="empresa"> Aplicar no meu próprio negócio ou na empresa onde já trabalho.</label>
            <label class="radio-option"><input type="radio" name="cap-obj" value="faculdade"> Passar em disciplinas da faculdade ou entregar um TCC/projeto.</label>
          </div>
        </div>
        `}
        <button class="btn-gold btn-full mt-sm" id="btn-capture">Ver meu resultado →</button>
      </div>
    `;
    root.appendChild(d);
    d.querySelector('#btn-capture').onclick = () => {
      const name = d.querySelector('#cap-name').value.trim();
      const email = d.querySelector('#cap-email').value.trim();
      if (!name || !email) { alert('Por favor, informe nome e e-mail.'); return; }
      const lead = { name, email, wa: d.querySelector('#cap-wa')?.value };
      if (isEmp) {
        lead.empresa = d.querySelector('#cap-empresa')?.value;
        lead.obj = d.querySelector('#cap-obj')?.value;
        lead.tam = d.querySelector('#cap-tam')?.value;
        lead.fat = d.querySelector('#cap-fat')?.value;
      } else {
        lead.nivel = d.querySelector('input[name="cap-nivel"]:checked')?.value;
        lead.obj = d.querySelector('input[name="cap-obj"]:checked')?.value;
      }
      if (window._sb) {
        const scores = calcScores();
        const payload = { nome: lead.name, email: lead.email, whatsapp: lead.wa, objetivo: lead.obj, respostas: state.answers, score: scores.main };
        if (isEmp) { payload.empresa = lead.empresa; payload.tamanho = lead.tam; payload.faturamento = lead.fat; }
        else { payload.nivel = lead.nivel; }
        window._sb.from('isca_' + cfg.id + '_alexandre_cracovsky').insert(payload);
      }
      state.captured = true;
      state.lead = lead;
      state.screen = 'result';
      render();
    };
  }

  // ─── RESULT ───────────────────────────────────────────────────────────────
  function renderResult() {
    const scores = calcScores();
    const d = div('quiz-screen active');
    const level = getLevel(scores);
    const pct = Math.min(100, Math.round((scores.main / (cfg.scoring.max||10)) * 100));
    const deg = Math.round(pct * 3.6);

    d.innerHTML = `
      <div class="result-header ${level.class}">
        <div class="result-intro-label">Seu resultado foi:</div>
        <div class="result-score-label">${cfg.scoring.scoreLabel||'Pontuação'}</div>
        <div class="result-score-val">${formatScore(scores.main, cfg.scoring)}</div>
        <div class="result-level ${level.class}">${level.label}</div>
        <p class="result-desc">${level.description}</p>
      </div>
      <div id="charts-area"></div>
      <div class="result-ctas">
        <a href="../index.html" class="btn-navy">← Ver outras ferramentas</a>
        <button class="btn-outline" id="btn-restart" style="color:var(--slate);border-color:var(--ruledark);">Refazer →</button>
      </div>
    `;
    root.appendChild(d);
    d.querySelector('#btn-restart').onclick = () => {
      state = { screen: 'welcome', qi: 0, answers: {}, captured: false };
      render();
    };
    renderCharts(scores, d.querySelector('#charts-area'));
  }

  // ─── SCORING ──────────────────────────────────────────────────────────────
  function calcScores() {
    const t = cfg.scoring.type;
    if (t === 'sum') return scoreSum();
    if (t === 'weighted_sum') return scoreWeightedSum();
    if (t === 'average') return scoreAverage();
    if (t === 'profile') return scoreProfile();
    if (t === 'maturity') return scoreMaturity();
    if (t === 'correct_count') return scoreCorrectCount();
    if (t === 'valuation') return scoreValuation();
    if (t === 'imv') return scoreIMV();
    if (t === 'value_destroy') return scoreValueDestroy();
    return { main: 0 };
  }

  function scoreSum() {
    let total = 0;
    const dims = {};
    cfg.questions.forEach(q => {
      const v = +(state.answers[q.id] || 0);
      total += v;
      if (q.dimension) dims[q.dimension] = (dims[q.dimension]||0) + v;
    });
    return { main: total, dims };
  }

  function scoreWeightedSum() {
    let total = 0, wmax = 0;
    const items = [];
    cfg.questions.forEach(q => {
      const w = q.weight || 1;
      const v = +(state.answers[q.id] || 0);
      total += w * v;
      wmax += w * (q.maxVal || 2);
      items.push({ label: q.shortLabel || q.text.slice(0,30)+'…', score: v, weight: w, max: q.maxVal||2 });
    });
    return { main: total, max: wmax, items };
  }

  function scoreAverage() {
    const dims = {};
    cfg.questions.forEach(q => {
      const v = +(state.answers[q.id] || 1);
      dims[q.dimension || q.id] = v;
    });
    const vals = Object.values(dims);
    return { main: vals.reduce((a,b)=>a+b,0)/vals.length, dims };
  }

  function scoreProfile() {
    const totals = {};
    const maxes = {};
    cfg.questions.forEach(q => {
      const chosen = state.answers[q.id];
      const opt = q.options.find(o => o.value === chosen);
      if (!opt) return;
      (opt.profiles||[]).forEach(p => { totals[p] = (totals[p]||0)+1; });
      // compute max per profile
    });
    const profiles = cfg.scoring.profiles || ['PE','EST','FAM','CONC'];
    profiles.forEach(p => { maxes[p] = cfg.questions.length; });
    const pct = {};
    profiles.forEach(p => { pct[p] = Math.round(((totals[p]||0)/cfg.questions.length)*100); });
    const top = profiles.reduce((a,b) => (pct[a]>=pct[b]?a:b));
    return { main: pct[top], profiles: pct, topProfile: top };
  }

  function scoreMaturity() {
    let total = 0;
    cfg.questions.forEach(q => {
      const w = q.weight || 1;
      const v = +(state.answers[q.id] || 0);
      total += w * v;
    });
    const stages = cfg.scoring.stages;
    let stage = stages[0];
    for (const s of stages) { if (total >= s.min) stage = s; }
    return { main: total, stage };
  }

  function scoreCorrectCount() {
    let total = 0;
    const cats = {};
    cfg.questions.forEach(q => {
      const correct = state.answers[q.id] === q.correct;
      if (correct) total++;
      const c = q.category || 'Geral';
      if (!cats[c]) cats[c] = { correct: 0, total: 0 };
      cats[c].total++;
      if (correct) cats[c].correct++;
    });
    return { main: total, max: cfg.questions.length, cats };
  }

  function scoreValuation() {
    const rev = +(state.answers['receita'] || 0);
    const margin = +(state.answers['margem'] || 20) / 100;
    const ebitda = state.answers['ebitda'] ? +(state.answers['ebitda']) : rev * margin;
    const sector = state.answers['setor'] || 'servicos_b2b';
    const size = state.answers['porte'] || 'pequeno';
    const multiples = cfg.scoring.multiples;
    const m = multiples[sector]?.[size] || { min: 4, max: 7 };
    let delta = 0;
    const risks = state.answers['risks'] || [];
    const riskMap = cfg.scoring.riskDiscounts || {};
    risks.forEach(r => { delta += riskMap[r] || 0; });
    delta = Math.min(delta, 0.5);
    const evMin = ebitda * m.min * (1 - delta);
    const evMax = ebitda * m.max * (1 - delta);
    const evCentral = (evMin + evMax) / 2;
    return { main: evCentral, min: evMin, max: evMax, ebitda, sector, size, delta };
  }

  function scoreIMV() {
    const dims = {};
    cfg.questions.forEach(q => {
      dims[q.id] = +(state.answers[q.id] || 1);
    });
    const vals = Object.values(dims);
    const avg = vals.reduce((a,b)=>a+b,0)/vals.length;
    return { main: avg, dims };
  }

  function scoreValueDestroy() {
    let correct = 0;
    const cats = {};
    cfg.questions.forEach(q => {
      const c = state.answers[q.id] === q.correct;
      if (c) correct++;
      const cat = q.destroyer || q.id;
      if (!cats[cat]) cats[cat] = { correct: 0, discount: q.discount||0.1 };
      if (c) cats[cat].correct = 1;
    });
    return { main: correct, max: cfg.questions.length, cats };
  }

  function getLevel(scores) {
    const t = cfg.scoring.thresholds;
    for (const th of t) {
      if (scores.main <= th.max) return th;
    }
    return t[t.length - 1];
  }

  function formatScore(val, scoring) {
    if (scoring.type === 'valuation') return 'R$ ' + fmtMoney(val);
    if (scoring.type === 'average' || scoring.type === 'imv') return val.toFixed(1) + '/5';
    if (scoring.type === 'maturity') return val + '/24';
    if (scoring.type === 'correct_count' || scoring.type === 'value_destroy') return val + '/' + scoring.max;
    return Math.round(val);
  }

  function fmtMoney(v) {
    if (v >= 1e9) return (v/1e9).toFixed(1)+'B';
    if (v >= 1e6) return (v/1e6).toFixed(1)+'M';
    if (v >= 1e3) return (v/1e3).toFixed(0)+'K';
    return v.toFixed(0);
  }

  // ─── CHARTS ───────────────────────────────────────────────────────────────
  function renderCharts(scores, el) {
    if (!cfg.charts || !window.Highcharts) return;
    cfg.charts.forEach((ch, i) => {
      const wrap = div('chart-wrapper');
      wrap.innerHTML = `<div class="chart-title">${ch.title}</div><div id="hc-${i}" style="height:${ch.height||260}px"></div>`;
      el.appendChild(wrap);
      setTimeout(() => buildChart(ch, scores, `hc-${i}`), 50);
    });
  }

  const HC_THEME = {
    chart: { backgroundColor: '#fff', style: { fontFamily: "'Epilogue',sans-serif" } },
    colors: ['#1B3A7A','#B8952A','#2A52A8','#D4AE50','#6B7A8D','#0A1628'],
    title: { text: '' },
    credits: { enabled: false },
    legend: { itemStyle: { fontFamily: "'DM Mono',monospace", fontSize: '10px', fontWeight: '400', color: '#6B7A8D' } }
  };

  function buildChart(ch, scores, containerId) {
    const opts = Object.assign({}, HC_THEME, { chart: Object.assign({}, HC_THEME.chart, { renderTo: containerId }) });
    const type = ch.type;

    if (type === 'radar') {
      const dims = scores.dims || {};
      const keys = Object.keys(dims);
      const vals = keys.map(k => +(dims[k]||0));
      Object.assign(opts, {
        chart: Object.assign({}, opts.chart, { polar: true, type: 'area' }),
        xAxis: { categories: keys, tickmarkPlacement: 'on', lineWidth: 0, gridLineColor: '#EEF2F9', labels: { style: { fontSize: '10px', color: '#6B7A8D', fontFamily: "'DM Mono'" } } },
        yAxis: { min: 0, gridLineColor: '#EEF2F9', labels: { enabled: false } },
        series: [{ name: 'Pontuação', data: vals, pointPlacement: 'on', color: 'rgba(27,58,122,.6)', fillColor: 'rgba(27,58,122,.12)', lineWidth: 2, marker: { fillColor: '#B8952A', radius: 4 } }],
        tooltip: { pointFormat: '<b>{point.y}</b>' }
      });
    } else if (type === 'bar') {
      const items = scores.items || Object.entries(scores.dims||{}).map(([k,v])=>({label:k,score:+v,max:3}));
      Object.assign(opts, {
        chart: Object.assign({}, opts.chart, { type: 'bar' }),
        xAxis: { categories: items.map(x=>x.label), labels: { style: { fontSize: '10px', color: '#6B7A8D' } } },
        yAxis: { min: 0, title: { text: '' }, labels: { style: { fontSize: '10px' } } },
        series: [{ name: 'Score', data: items.map(x=>+x.score), color: '#1B3A7A' }],
        tooltip: { pointFormat: '<b>{point.y}</b>' }
      });
    } else if (type === 'column') {
      const cats = scores.cats || {};
      const keys = Object.keys(cats);
      Object.assign(opts, {
        chart: Object.assign({}, opts.chart, { type: 'column' }),
        xAxis: { categories: keys, labels: { style: { fontSize: '10px', color: '#6B7A8D' } } },
        yAxis: { min: 0, title: { text: '' } },
        series: [
          { name: 'Acertos', data: keys.map(k=>(cats[k].correct||0)), color: '#1B3A7A' },
          { name: 'Total', data: keys.map(k=>(cats[k].total||0)), color: '#EEF2F9' }
        ]
      });
    } else if (type === 'donut') {
      const data = ch.dataFn ? ch.dataFn(scores) : buildDonutData(scores);
      Object.assign(opts, {
        chart: Object.assign({}, opts.chart, { type: 'pie' }),
        plotOptions: { pie: { innerSize: '55%', dataLabels: { style: { fontSize: '11px', fontFamily: "'DM Mono'" } } } },
        series: [{ name: ch.seriesName||'Valor', data, colorByPoint: true }],
        tooltip: { pointFormat: '<b>{point.percentage:.0f}%</b>' }
      });
    } else if (type === 'area') {
      const stages = (cfg.scoring.stages||[]).map(s=>s.label);
      const times = (cfg.scoring.stages||[]).map(s=>s.avgMonths||0);
      const stageIdx = cfg.scoring.stages ? cfg.scoring.stages.findIndex(s=>s.label===(scores.stage&&scores.stage.label)) : 0;
      Object.assign(opts, {
        chart: Object.assign({}, opts.chart, { type: 'area' }),
        xAxis: { categories: stages, labels: { style: { fontSize: '10px', color: '#6B7A8D' } } },
        yAxis: { title: { text: 'Meses médios' }, labels: { style: { fontSize: '10px' } } },
        series: [{
          name: 'Tempo para deal',
          data: times,
          color: '#1B3A7A', fillColor: 'rgba(27,58,122,.1)',
          marker: { fillColor: i=>i===stageIdx?'#B8952A':'#1B3A7A', radius: 5 }
        }]
      });
    } else if (type === 'waterfall') {
      const base = 10;
      const cats = scores.cats || {};
      const series = [{ name: 'Base', y: base, color: '#1B3A7A' }];
      const keys = Object.keys(cats);
      keys.forEach(k => {
        if (!cats[k].correct) {
          series.push({ name: k, y: -(cats[k].discount||0.1)*base, color: '#9A2020', isIntermediateSum: false });
        }
      });
      series.push({ name: 'Valor Final', isSum: true, color: '#B8952A' });
      Object.assign(opts, {
        chart: Object.assign({}, opts.chart, { type: 'waterfall' }),
        xAxis: { type: 'category', labels: { style: { fontSize: '10px' } } },
        yAxis: { title: { text: 'Múltiplo de EV' } },
        series: [{ data: series, dataLabels: { enabled: true, style: { fontSize: '10px' } } }]
      });
    } else if (type === 'columnrange') {
      const ev = scores;
      Object.assign(opts, {
        chart: Object.assign({}, opts.chart, { type: 'columnrange', inverted: true }),
        xAxis: { categories: ['Sua empresa', 'Benchmark setor'] },
        yAxis: { title: { text: 'Valuation (R$M)' } },
        series: [{
          name: 'Faixa de valor',
          data: [[+(ev.min/1e6).toFixed(1), +(ev.max/1e6).toFixed(1)], [+(ev.min/1e6*.8).toFixed(1), +(ev.max/1e6*1.2).toFixed(1)]],
          color: '#1B3A7A'
        }]
      });
    }

    if (Highcharts) Highcharts.chart(containerId, opts);
  }

  function buildDonutData(scores) {
    if (scores.profiles) {
      return Object.entries(scores.profiles).map(([k,v])=>({name:k,y:v,color:profileColor(k)}));
    }
    if (scores.cats) {
      const correct = Object.values(scores.cats).filter(c=>c.correct).length;
      const wrong = Object.keys(scores.cats).length - correct;
      return [{name:'Acertos',y:correct,color:'#1B3A7A'},{name:'Erros',y:wrong,color:'#EEF2F9'}];
    }
    return [{name:'Score',y:scores.main,color:'#1B3A7A'},{name:'Restante',y:(scores.max||10)-scores.main,color:'#EEF2F9'}];
  }

  function profileColor(p) {
    const map = { PE:'#0A1628', EST:'#1B3A7A', FAM:'#B8952A', CONC:'#2A52A8' };
    return map[p] || '#6B7A8D';
  }

  // ─── UTILS ────────────────────────────────────────────────────────────────
  function div(cls) {
    const el = document.createElement('div');
    if (cls) el.className = cls;
    return el;
  }

  return { init };
})();
