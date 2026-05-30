/* Step Form Engine — Alexandre Cracovsky */
(function (global) {
  'use strict';

  // ─── STEP PRESETS ─────────────────────────────────────────────────────────

  var CAPTURAS_STEPS = [
    {
      id: 'nome', type: 'text',
      question: 'Como posso te chamar?',
      placeholder: 'Seu nome completo',
      required: true
    },
    {
      id: 'email', type: 'email',
      question: 'Qual é o seu melhor e-mail?',
      placeholder: 'voce@email.com',
      required: true
    },
    {
      id: 'whatsapp', type: 'tel',
      question: 'Qual é o seu WhatsApp?',
      placeholder: '(11) 99999-9999',
      required: false, optional: true, skipLabel: 'Pular esta etapa'
    },
    {
      id: 'nivel', type: 'radio',
      question: 'Qual é o seu nível atual em Valuation?',
      choices: [
        { value: 'iniciante',    label: 'Iniciante',    desc: 'Sei o conceito básico, mas nunca montei um modelo de FCD.' },
        { value: 'intermediario',label: 'Intermediário', desc: 'Entendo a teoria e já faço projeções, mas tenho dúvidas em WACC, perpetuidade, etc.' },
        { value: 'avancado',     label: 'Avançado',      desc: 'Já faço valuations na prática e quero refinar minhas análises.' }
      ]
    },
    {
      id: 'objetivo', type: 'radio',
      question: 'Qual é o seu maior objetivo ao aprender Valuation?',
      choices: [
        { value: 'mercado',      label: 'Mercado financeiro',  desc: 'Conquistar uma vaga em M&A, Equity Research, Investment Banking, etc.' },
        { value: 'certificacao', label: 'Certificação',        desc: 'Estudar para CFA, CNPI, ou outra certificação do mercado financeiro.' },
        { value: 'investimentos',label: 'Investimentos pessoais', desc: 'Analisar e escolher ações e investimentos por conta própria.' },
        { value: 'empresa',      label: 'Meu negócio',         desc: 'Aplicar no meu próprio negócio ou na empresa onde trabalho.' },
        { value: 'faculdade',    label: 'Faculdade',           desc: 'Passar em disciplinas ou entregar um TCC/projeto acadêmico.' }
      ]
    }
  ];

  var CAPTURAS_STEPS_EMP = [
    {
      id: 'nome', type: 'text',
      question: 'Como posso te chamar?',
      placeholder: 'Seu nome completo',
      required: true
    },
    {
      id: 'email', type: 'email',
      question: 'Qual é o seu melhor e-mail?',
      placeholder: 'voce@email.com',
      required: true
    },
    {
      id: 'empresa', type: 'text',
      question: 'Qual é o nome da sua empresa?',
      placeholder: 'Nome da empresa',
      required: false, optional: true, skipLabel: 'Pular'
    },
    {
      id: 'whatsapp', type: 'tel',
      question: 'Qual é o seu WhatsApp?',
      placeholder: '(11) 99999-9999',
      required: false, optional: true, skipLabel: 'Pular esta etapa'
    },
    {
      id: 'objetivo', type: 'radio',
      question: 'O que você deseja com M&A?',
      choices: [
        { value: 'Quero vender o meu controle total ou majoritário (Sell-side)', label: 'Vender minha empresa',  desc: 'Sell-side: venda de controle total ou majoritário.' },
        { value: 'Procuro um sócio estratégico ou investidor minoritário',       label: 'Sócio ou investidor',  desc: 'Entrada de capital com participação minoritária.' },
        { value: 'Quero comprar outra empresa ou expandir mercado (Buy-side)',   label: 'Comprar / expandir',   desc: 'Buy-side: aquisição ou expansão de mercado.' },
        { value: 'Busco fusão com outra operação complementar',                  label: 'Fusão estratégica',    desc: 'Unir operações com empresa complementar.' },
        { value: 'Preciso de Reestruturação Financeira ou Operacional',          label: 'Reestruturação',       desc: 'Reestruturação financeira ou operacional.' },
        { value: 'Ainda estou avaliando alternativas estratégicas',              label: 'Avaliando opções',     desc: 'Explorando alternativas estratégicas.' }
      ]
    },
    {
      id: 'tamanho', type: 'radio',
      question: 'Qual é o tamanho da sua empresa?',
      choices: [
        { value: 'Até 20 funcionários',        label: 'Até 20 funcionários' },
        { value: '21 a 100 funcionários',      label: '21 a 100 funcionários' },
        { value: '101 a 500 funcionários',     label: '101 a 500 funcionários' },
        { value: 'Mais de 500 funcionários',   label: 'Mais de 500 funcionários' }
      ]
    },
    {
      id: 'faturamento', type: 'radio',
      question: 'Qual é o faturamento médio anual?',
      choices: [
        { value: 'Até R$ 50 Milhões',                    label: 'Até R$ 50M' },
        { value: 'De R$ 50 Milhões a R$ 100 Milhões',    label: 'R$ 50M – R$ 100M' },
        { value: 'De R$ 100 Milhões a R$ 500 Milhões',   label: 'R$ 100M – R$ 500M' },
        { value: 'Acima de R$ 500 Milhões',              label: 'Acima de R$ 500M' }
      ]
    }
  ];

  // ─── EMBEDDED STYLES ──────────────────────────────────────────────────────

  var SF_CSS = [
    '.sf-wrap{position:relative;overflow:hidden;}',
    '.sf-prog-bar{position:absolute;top:0;left:0;right:0;height:2px;background:rgba(184,149,42,.15);z-index:1;}',
    '.sf-prog-fill{height:100%;background:var(--gold,#B8952A);transition:width .45s cubic-bezier(.4,0,.2,1);}',
    '.sf-step-slot{position:relative;overflow:hidden;min-height:300px;padding:28px 0 8px;}',
    '.sf-step{width:100%;box-sizing:border-box;}',

    /* back */
    '.sf-back-btn{background:none;border:none;cursor:pointer;font-family:var(--mo,"DM Mono",monospace);font-size:11px;color:rgba(255,255,255,.3);letter-spacing:.1em;padding:0;margin-bottom:12px;display:inline-flex;align-items:center;gap:6px;transition:color .2s;-webkit-tap-highlight-color:transparent;min-height:36px;}',
    '.sf-back-btn:hover,.sf-back-btn:focus{color:rgba(255,255,255,.6);outline:none;}',

    /* counter */
    '.sf-counter{font-family:var(--mo,"DM Mono",monospace);font-size:11px;color:var(--gold2,#D4AE50);letter-spacing:.2em;text-transform:uppercase;margin-bottom:18px;opacity:.75;}',

    /* question */
    '.sf-question{font-family:var(--cg,"Cormorant Garamond",serif);font-size:clamp(1.7rem,4vw,2.4rem);font-weight:300;color:#fff;line-height:1.15;margin-bottom:26px;letter-spacing:-.015em;}',

    /* input */
    '.sf-input{width:100%;box-sizing:border-box;font-family:var(--ep,"Epilogue",sans-serif);font-size:18px;font-weight:300;color:#fff;background:rgba(255,255,255,.05);border:none;border-bottom:1.5px solid rgba(255,255,255,.2);padding:14px 8px;outline:none;transition:border-color .3s,background .3s;border-radius:0;-webkit-appearance:none;}',
    '.sf-input::placeholder{color:rgba(255,255,255,.22);}',
    '.sf-input:focus{border-bottom-color:var(--gold,#B8952A);background:rgba(255,255,255,.07);}',
    '.sf-input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #0A1628 inset;-webkit-text-fill-color:#fff;}',
    'textarea.sf-input{resize:none;line-height:1.75;border:1.5px solid rgba(255,255,255,.2);border-radius:2px;padding:14px 12px;}',
    'textarea.sf-input:focus{border-color:var(--gold,#B8952A);}',
    '@media(max-width:480px){.sf-input{font-size:16px;}}',

    /* hint */
    '.sf-enter-hint{font-family:var(--mo,"DM Mono",monospace);font-size:11px;color:rgba(255,255,255,.3);margin-top:10px;letter-spacing:.04em;}',
    '.sf-enter-hint kbd{font-family:var(--mo,"DM Mono",monospace);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:3px;padding:1px 6px;font-size:10px;}',

    /* btn row */
    '.sf-btn-row{display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-top:22px;}',
    '.sf-btn-next{font-family:var(--ep,"Epilogue",sans-serif);font-size:14px;font-weight:500;letter-spacing:.06em;background:var(--gold,#B8952A);color:var(--navy,#0A1628);border:none;padding:13px 28px;border-radius:2px;cursor:pointer;transition:background .2s,transform .15s;-webkit-tap-highlight-color:transparent;min-height:44px;}',
    '.sf-btn-next:hover{background:var(--gold2,#D4AE50);}',
    '.sf-btn-next:active{transform:scale(.97);}',
    '.sf-btn-next:disabled{opacity:.55;cursor:not-allowed;transform:none;}',
    '@media(max-width:480px){.sf-btn-next{width:100%;font-size:15px;padding:15px;}}',
    '.sf-skip-btn{background:none;border:none;cursor:pointer;font-family:var(--mo,"DM Mono",monospace);font-size:11px;color:rgba(255,255,255,.3);letter-spacing:.08em;padding:4px 0;text-decoration:underline;text-underline-offset:3px;transition:color .2s;-webkit-tap-highlight-color:transparent;min-height:44px;}',
    '.sf-skip-btn:hover{color:rgba(255,255,255,.5);}',

    /* radio */
    '.sf-radio-list{display:flex;flex-direction:column;gap:8px;}',
    '.sf-radio-card{width:100%;box-sizing:border-box;text-align:left;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:13px 16px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:border-color .2s,background .2s,transform .12s;-webkit-tap-highlight-color:transparent;min-height:44px;}',
    '.sf-radio-card:hover{border-color:rgba(184,149,42,.4);background:rgba(255,255,255,.07);}',
    '.sf-radio-card.sf-sel{border-color:var(--gold,#B8952A);background:rgba(184,149,42,.1);}',
    '.sf-radio-card:active{transform:scale(.99);}',
    '.sf-radio-lbl{font-family:var(--ep,"Epilogue",sans-serif);font-size:14px;font-weight:500;color:rgba(255,255,255,.9);pointer-events:none;}',
    '.sf-radio-desc{font-family:var(--ep,"Epilogue",sans-serif);font-size:12px;font-weight:300;color:rgba(255,255,255,.45);line-height:1.5;pointer-events:none;}',

    /* success */
    '.sf-success{text-align:center;padding:52px 16px 32px;opacity:0;transform:scale(.97);transition:opacity .35s ease,transform .35s ease;}',
    '.sf-success.sf-ok{opacity:1;transform:scale(1);}',
    '.sf-success-icon{width:52px;height:52px;border:1px solid var(--gold,#B8952A);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-family:var(--mo,"DM Mono",monospace);font-size:20px;color:var(--gold2,#D4AE50);}',
    '.sf-success-title{font-family:var(--cg,"Cormorant Garamond",serif);font-size:clamp(1.8rem,4vw,2.4rem);font-weight:300;color:#fff;margin-bottom:12px;}',
    '.sf-success-desc{font-family:var(--ep,"Epilogue",sans-serif);font-size:15px;font-weight:300;color:rgba(255,255,255,.45);line-height:1.85;max-width:300px;margin:0 auto;}',
    '.sf-success-extra{margin-top:22px;}',

    /* error */
    '.sf-err{border-bottom-color:var(--danger,#c0392b)!important;animation:sf-shake .35s ease;}',
    'textarea.sf-err{border-color:var(--danger,#c0392b)!important;}',
    '@keyframes sf-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}60%{transform:translateX(5px)}80%{transform:translateX(-3px)}}'
  ].join('');

  var _stylesInj = false;
  function ensureStyles() {
    if (_stylesInj) return;
    _stylesInj = true;
    var s = document.createElement('style');
    s.textContent = SF_CSS;
    document.head.appendChild(s);
  }

  // ─── HELPERS ──────────────────────────────────────────────────────────────

  function mk(tag, cls) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    return el;
  }

  // ─── ENGINE ────────────────────────────────────────────────────────────────

  function StepForm() {}

  StepForm.CAPTURAS_STEPS     = CAPTURAS_STEPS;
  StepForm.CAPTURAS_STEPS_EMP = CAPTURAS_STEPS_EMP;

  StepForm.init = function (container, cfg) {
    ensureStyles();

    var steps   = cfg.steps;
    var total   = steps.length;
    var ci      = 0;
    var data    = {};

    container.innerHTML = '';
    container.classList.add('sf-wrap');

    var progBar  = mk('div', 'sf-prog-bar');
    var progFill = mk('div', 'sf-prog-fill');
    progBar.appendChild(progFill);
    container.appendChild(progBar);

    var slot = mk('div', 'sf-step-slot');
    container.appendChild(slot);

    function setProgress(idx) {
      progFill.style.width = Math.round((idx / total) * 100) + '%';
    }

    // ── Transition ──
    function showStep(idx, dir) {
      var step     = steps[idx];
      var old      = slot.querySelector('.sf-step');
      var entering = mk('div', 'sf-step');

      buildStep(step, idx, entering);

      // Animate entering step from off-screen
      entering.style.opacity   = '0';
      entering.style.transform = dir >= 0 ? 'translateX(32px)' : 'translateX(-32px)';

      if (old) {
        var h = old.offsetHeight;
        slot.style.minHeight = h + 'px';
        old.style.position   = 'absolute';
        old.style.top        = '0';
        old.style.left       = '0';
        old.style.right      = '0';
        old.style.zIndex     = '1';
        old.style.pointerEvents = 'none';
        var oldEl = old;
        requestAnimationFrame(function () {
          oldEl.style.transition = 'opacity .22s ease, transform .22s ease';
          oldEl.style.opacity    = '0';
          oldEl.style.transform  = dir >= 0 ? 'translateX(-32px)' : 'translateX(32px)';
        });
        setTimeout(function () {
          if (oldEl.parentNode) oldEl.parentNode.removeChild(oldEl);
          slot.style.minHeight = '';
        }, 260);
      }

      slot.appendChild(entering);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          entering.style.transition = 'opacity .28s ease, transform .28s ease';
          entering.style.opacity    = '1';
          entering.style.transform  = 'translateX(0)';
          var inp = entering.querySelector('input:not([type=radio]), textarea');
          if (inp) setTimeout(function () { try { inp.focus(); } catch(e){} }, 310);
        });
      });

      setProgress(idx);
    }

    // ── Build step DOM ──
    function buildStep(step, idx, el) {
      if (idx > 0) {
        var back = mk('button', 'sf-back-btn');
        back.type        = 'button';
        back.textContent = '← Voltar';
        back.addEventListener('click', function () { ci = idx - 1; showStep(ci, -1); });
        el.appendChild(back);
      }

      var ctr = mk('div', 'sf-counter');
      ctr.textContent = (idx + 1) + ' / ' + total;
      el.appendChild(ctr);

      var qEl = mk('div', 'sf-question');
      qEl.textContent = step.question;
      el.appendChild(qEl);

      if (step.type === 'radio') {
        buildRadioArea(step, el, idx);
      } else {
        buildTextArea(step, el, idx);
      }
    }

    function buildTextArea(step, parent, idx) {
      var inp;
      if (step.type === 'textarea') {
        inp      = mk('textarea', 'sf-input');
        inp.rows = 4;
      } else {
        inp      = mk('input', 'sf-input');
        inp.type = step.type || 'text';
      }
      inp.placeholder = step.placeholder || '';
      if (data[step.id]) inp.value = data[step.id];
      parent.appendChild(inp);

      if (step.type !== 'textarea') {
        var isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0);
        if (!isMobile) {
          var hint = mk('div', 'sf-enter-hint');
          hint.innerHTML = 'Pressione <kbd>Enter ↵</kbd>';
          parent.appendChild(hint);
        }
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); advance(step, inp.value, idx); }
        });
      }

      var row = mk('div', 'sf-btn-row');

      var btn = mk('button', 'sf-btn-next');
      btn.type        = 'button';
      btn.textContent = idx === total - 1 ? (cfg.submitLabel || 'Enviar →') : 'Continuar →';
      btn.addEventListener('click', function () { advance(step, inp.value, idx); });
      row.appendChild(btn);

      if (step.optional) {
        var skip = mk('button', 'sf-skip-btn');
        skip.type        = 'button';
        skip.textContent = step.skipLabel || 'Pular';
        skip.addEventListener('click', function () { data[step.id] = null; goNext(idx); });
        row.appendChild(skip);
      }

      parent.appendChild(row);
    }

    function buildRadioArea(step, parent, idx) {
      var list = mk('div', 'sf-radio-list');

      step.choices.forEach(function (choice) {
        var card = mk('button', 'sf-radio-card');
        card.type = 'button';
        if (data[step.id] === choice.value) card.classList.add('sf-sel');

        var lbl = mk('span', 'sf-radio-lbl');
        lbl.textContent = choice.label;
        card.appendChild(lbl);

        if (choice.desc) {
          var desc = mk('span', 'sf-radio-desc');
          desc.textContent = choice.desc;
          card.appendChild(desc);
        }

        card.addEventListener('click', function () {
          list.querySelectorAll('.sf-radio-card').forEach(function (c) { c.classList.remove('sf-sel'); });
          card.classList.add('sf-sel');
          data[step.id] = choice.value;
          setTimeout(function () { goNext(idx); }, 280);
        });

        list.appendChild(card);
      });

      parent.appendChild(list);
    }

    // ── Validation & navigation ──
    function advance(step, value, idx) {
      var v = typeof value === 'string' ? value.trim() : value;
      if (step.required && !v) {
        var inp = slot.querySelector('.sf-input');
        if (inp) {
          inp.classList.add('sf-err');
          try { inp.focus(); } catch(e){}
          setTimeout(function () { inp.classList.remove('sf-err'); }, 1000);
        }
        return;
      }
      data[step.id] = v || null;
      goNext(idx);
    }

    function goNext(idx) {
      if (idx >= total - 1) {
        submitForm();
      } else {
        ci = idx + 1;
        showStep(ci, 1);
      }
    }

    // ── Submit ──
    function submitForm() {
      var btn = slot.querySelector('.sf-btn-next');
      if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
      slot.querySelectorAll('.sf-radio-card').forEach(function (c) { c.disabled = true; });

      if (cfg.onSubmit) {
        cfg.onSubmit(data, function () {
          setProgress(total);
          showSuccess();
        });
      } else {
        setProgress(total);
        showSuccess();
      }
    }

    function showSuccess() {
      var old = slot.querySelector('.sf-step');
      function render() {
        var s    = mk('div', 'sf-success');
        var icon = mk('div', 'sf-success-icon');
        icon.textContent = '✓';
        s.appendChild(icon);

        var ttl = mk('div', 'sf-success-title');
        ttl.textContent = cfg.successTitle || 'Pronto!';
        s.appendChild(ttl);

        var dsc = mk('p', 'sf-success-desc');
        dsc.textContent = cfg.successDesc || 'Recebemos seus dados. O material chegará no seu e-mail em breve.';
        s.appendChild(dsc);

        if (cfg.successExtra) {
          var ex = mk('div', 'sf-success-extra');
          ex.innerHTML = cfg.successExtra;
          s.appendChild(ex);
        }

        slot.appendChild(s);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { s.classList.add('sf-ok'); });
        });

        if (cfg.onSuccess) cfg.onSuccess(data);
      }

      if (old) {
        old.style.transition = 'opacity .18s ease';
        old.style.opacity    = '0';
        setTimeout(function () {
          if (old.parentNode) old.parentNode.removeChild(old);
          render();
        }, 200);
      } else {
        render();
      }
    }

    // ── Kick off ──
    showStep(0, 1);
  };

  global.StepForm = StepForm;
})(window);
