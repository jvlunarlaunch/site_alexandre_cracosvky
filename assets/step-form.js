/* StepForm — formulário multi-etapas das páginas de captura (capturas/*) e contato.
 *
 * Código legível, sem ofuscação (política do projeto — ver CLAUDE.md).
 * API pública (não alterar sem atualizar as páginas que a consomem):
 *   StepForm.init(el, { steps, submitLabel, successTitle, successDesc, successExtra, onSubmit, onSuccess })
 *   StepForm.CAPTURAS_STEPS      → fluxo Estudante
 *   StepForm.CAPTURAS_STEPS_EMP  → fluxo Empreendedor
 *
 * onSubmit(data, done): recebe um objeto { <id>: valor } e deve chamar done() ao concluir
 * (ex.: depois do insert no Supabase). Se ausente, o sucesso é exibido direto.
 */
(function (window) {
    'use strict';

    // ---- Estilos (injetados uma única vez) -----------------------------------
    var CSS = '.sf-wrap{position:relative;overflow:hidden;}.sf-prog-bar{position:absolute;top:0;left:0;right:0;height:2px;background:rgba(184,149,42,.15);z-index:1;}.sf-prog-fill{height:100%;background:var(--gold,#B8952A);transition:width .45s cubic-bezier(.4,0,.2,1);}.sf-step-slot{position:relative;overflow:hidden;min-height:300px;padding:28px 0 8px;}.sf-step{width:100%;box-sizing:border-box;}.sf-back-btn{background:none;border:none;cursor:pointer;font-family:var(--mo,"DM Mono",monospace);font-size:11px;color:rgba(255,255,255,.3);letter-spacing:.1em;padding:0;margin-bottom:12px;display:inline-flex;align-items:center;gap:6px;transition:color .2s;-webkit-tap-highlight-color:transparent;min-height:36px;}.sf-back-btn:hover,.sf-back-btn:focus{color:rgba(255,255,255,.6);outline:none;}.sf-counter{font-family:var(--mo,"DM Mono",monospace);font-size:11px;color:var(--gold2,#D4AE50);letter-spacing:.2em;text-transform:uppercase;margin-bottom:18px;opacity:.75;}.sf-question{font-family:var(--cg,"Cormorant Garamond",serif);font-size:clamp(1.7rem,4vw,2.4rem);font-weight:300;color:#fff;line-height:1.15;margin-bottom:26px;letter-spacing:-.015em;}.sf-input{width:100%;box-sizing:border-box;font-family:var(--ep,"Epilogue",sans-serif);font-size:18px;font-weight:300;color:#fff;background:rgba(255,255,255,.05);border:none;border-bottom:1.5px solid rgba(255,255,255,.2);padding:14px 8px;outline:none;transition:border-color .3s,background .3s;border-radius:0;-webkit-appearance:none;}.sf-input::placeholder{color:rgba(255,255,255,.22);}.sf-input:focus{border-bottom-color:var(--gold,#B8952A);background:rgba(255,255,255,.07);}.sf-input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #0A1628 inset;-webkit-text-fill-color:#fff;}textarea.sf-input{resize:none;line-height:1.75;border:1.5px solid rgba(255,255,255,.2);border-radius:2px;padding:14px 12px;}textarea.sf-input:focus{border-color:var(--gold,#B8952A);}@media(max-width:480px){.sf-input{font-size:16px;}}.sf-field-label{display:block;font-family:var(--ep,"Epilogue",sans-serif);font-size:13px;font-weight:500;color:rgba(255,255,255,.6);margin:16px 0 6px;}.sf-enter-hint{font-family:var(--mo,"DM Mono",monospace);font-size:11px;color:rgba(255,255,255,.3);margin-top:10px;letter-spacing:.04em;}.sf-enter-hint kbd{font-family:var(--mo,"DM Mono",monospace);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:3px;padding:1px 6px;font-size:10px;}.sf-err-msg{color:var(--danger,#c0392b);font-size:12px;margin-top:6px;font-family:var(--ep,"Epilogue",sans-serif);}.sf-btn-row{display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-top:22px;}.sf-btn-next{font-family:var(--ep,"Epilogue",sans-serif);font-size:14px;font-weight:500;letter-spacing:.06em;background:var(--gold,#B8952A);color:var(--navy,#0A1628);border:none;padding:13px 28px;border-radius:2px;cursor:pointer;transition:background .2s,transform .15s;-webkit-tap-highlight-color:transparent;min-height:44px;}.sf-btn-next:hover{background:var(--gold2,#D4AE50);}.sf-btn-next:active{transform:scale(.97);}.sf-btn-next:disabled{opacity:.55;cursor:not-allowed;transform:none;}@media(max-width:480px){.sf-btn-next{width:100%;font-size:15px;padding:15px;}}.sf-skip-btn{background:none;border:none;cursor:pointer;font-family:var(--mo,"DM Mono",monospace);font-size:11px;color:rgba(255,255,255,.3);letter-spacing:.08em;padding:4px 0;text-decoration:underline;text-underline-offset:3px;transition:color .2s;-webkit-tap-highlight-color:transparent;min-height:44px;}.sf-skip-btn:hover{color:rgba(255,255,255,.5);}.sf-radio-list{display:flex;flex-direction:column;gap:8px;}.sf-radio-card{width:100%;box-sizing:border-box;text-align:left;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:13px 16px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:border-color .2s,background .2s,transform .12s;-webkit-tap-highlight-color:transparent;min-height:44px;}.sf-radio-card:hover{border-color:rgba(184,149,42,.4);background:rgba(255,255,255,.07);}.sf-radio-card.sf-sel{border-color:var(--gold,#B8952A);background:rgba(184,149,42,.1);}.sf-radio-card:active{transform:scale(.99);}.sf-radio-lbl{font-family:var(--ep,"Epilogue",sans-serif);font-size:14px;font-weight:500;color:rgba(255,255,255,.9);pointer-events:none;}.sf-radio-desc{font-family:var(--ep,"Epilogue",sans-serif);font-size:12px;font-weight:300;color:rgba(255,255,255,.45);line-height:1.5;pointer-events:none;}.sf-slider-val{font-family:var(--cg,"Cormorant Garamond",serif);font-size:clamp(1.4rem,3vw,1.9rem);font-weight:400;color:var(--gold2,#D4AE50);margin-bottom:18px;min-height:1.4em;}.sf-slider{width:100%;accent-color:var(--gold,#B8952A);cursor:pointer;}.sf-slider-ticks{display:flex;justify-content:space-between;gap:6px;font-family:var(--mo,"DM Mono",monospace);font-size:10px;color:rgba(255,255,255,.35);margin-top:8px;}.sf-success{text-align:center;padding:52px 16px 32px;opacity:0;transform:scale(.97);transition:opacity .35s ease,transform .35s ease;}.sf-success.sf-ok{opacity:1;transform:scale(1);}.sf-success-icon{width:52px;height:52px;border:1px solid var(--gold,#B8952A);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-family:var(--mo,"DM Mono",monospace);font-size:20px;color:var(--gold2,#D4AE50);}.sf-success-title{font-family:var(--cg,"Cormorant Garamond",serif);font-size:clamp(1.8rem,4vw,2.4rem);font-weight:300;color:#fff;margin-bottom:12px;}.sf-success-desc{font-family:var(--ep,"Epilogue",sans-serif);font-size:15px;font-weight:300;color:rgba(255,255,255,.45);line-height:1.85;max-width:300px;margin:0 auto;}.sf-success-extra{margin-top:22px;}.sf-err{border-bottom-color:var(--danger,#c0392b)!important;animation:sf-shake .35s ease;}textarea.sf-err{border-color:var(--danger,#c0392b)!important;}@keyframes sf-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}60%{transform:translateX(5px)}80%{transform:translateX(-3px)}}';

    var cssInjected = false;
    function injectCSS() {
        if (cssInjected) return;
        cssInjected = true;
        var tag = document.createElement('style');
        tag.textContent = CSS;
        document.head.appendChild(tag);
    }

    // ---- Validação -----------------------------------------------------------
    function validEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    }
    function validSite(v) {
        if (!v) return true; // opcional
        return /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/.test(String(v).trim());
    }
    function validPhone(v) {
        if (!v) return false;
        var d = String(v).replace(/\D/g, '');
        if (d.length >= 12 && d.slice(0, 2) === '55') d = d.slice(2);
        return d.length === 11 && d[2] === '9';
    }

    // mapeia o tipo lógico para um type de <input> válido
    function domInputType(t) {
        if (t === 'workemail') return 'email';
        if (t === 'url') return 'url';
        if (t === 'tel' || t === 'email' || t === 'number') return t;
        return 'text';
    }

    // retorna mensagem de erro (string) ou null se válido
    function fieldError(field, value) {
        var type = field.type || 'text';
        if (field.required && !value) return 'Preencha este campo.';
        if (!value) return null;
        if (field.id === 'nome' && value.length < 3) return 'O nome deve ter pelo menos 3 letras.';
        if (type === 'email' && !validEmail(value)) return 'Digite um e-mail válido (ex: voce@email.com).';
        if (type === 'workemail' && !validEmail(value)) return 'Digite um e-mail válido (ex: nome@empresa.com).';
        if (type === 'url' && !validSite(value)) return 'Digite um site válido (ex: empresa.com.br).';
        if (type === 'tel' && !validPhone(value)) return 'Digite um WhatsApp válido com DDD (ex: 11 99999-9999).';
        return null;
    }

    function el(tag, cls) {
        var node = document.createElement(tag);
        if (cls) node.className = cls;
        return node;
    }

    function showInputError(inputEl, msg) {
        if (!inputEl) return;
        inputEl.classList.add('sf-err');
        var holder = inputEl.parentNode;
        var existing = holder && holder.querySelector('.sf-err-msg');
        if (!existing && holder) {
            existing = el('div', 'sf-err-msg');
            holder.insertBefore(existing, inputEl.nextSibling);
        }
        if (existing) existing.textContent = msg;
        try { inputEl.focus(); } catch (e) {}
        setTimeout(function () {
            inputEl.classList.remove('sf-err');
            if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        }, 3500);
    }

    function init(root, opts) {
        injectCSS();
        var steps = opts.steps;
        var total = steps.length;
        var current = 0;
        var data = {};

        root.innerHTML = '';
        root.classList.add('sf-wrap');

        var progBar = el('div', 'sf-prog-bar');
        var progFill = el('div', 'sf-prog-fill');
        progBar.appendChild(progFill);
        root.appendChild(progBar);

        var slot = el('div', 'sf-step-slot');
        root.appendChild(slot);

        function updateProgress(idx) {
            progFill.style.width = Math.round(idx / total * 100) + '%';
        }

        function showStep(idx, direction) {
            var cfg = steps[idx];
            var prev = slot.querySelector('.sf-step');
            var step = el('div', 'sf-step');
            buildStep(cfg, idx, step);
            step.style.opacity = '0';
            step.style.transform = direction >= 0 ? 'translateX(32px)' : 'translateX(-32px)';

            if (prev) {
                slot.style.minHeight = prev.offsetHeight + 'px';
                prev.style.position = 'absolute';
                prev.style.top = '0';
                prev.style.left = '0';
                prev.style.right = '0';
                prev.style.zIndex = '1';
                prev.style.pointerEvents = 'none';
                requestAnimationFrame(function () {
                    prev.style.transition = 'opacity .22s ease, transform .22s ease';
                    prev.style.opacity = '0';
                    prev.style.transform = direction >= 0 ? 'translateX(-32px)' : 'translateX(32px)';
                });
                setTimeout(function () {
                    if (prev.parentNode) prev.parentNode.removeChild(prev);
                    slot.style.minHeight = '';
                }, 260);
            }

            slot.appendChild(step);
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    step.style.transition = 'opacity .28s ease, transform .28s ease';
                    step.style.opacity = '1';
                    step.style.transform = 'translateX(0)';
                    var focusable = step.querySelector('input:not([type=radio]):not([type=range]), textarea');
                    if (focusable) setTimeout(function () {
                        try { focusable.focus(); } catch (e) {}
                    }, 310);
                });
            });
            updateProgress(idx);
        }

        function buildStep(cfg, idx, container) {
            if (idx > 0) {
                var back = el('button', 'sf-back-btn');
                back.type = 'button';
                back.textContent = '← Voltar';
                back.addEventListener('click', function () { current = idx - 1; showStep(current, -1); });
                container.appendChild(back);
            }

            if (total > 1) {
                var counter = el('div', 'sf-counter');
                counter.textContent = (idx + 1) + ' / ' + total;
                container.appendChild(counter);
            }

            var question = el('div', 'sf-question');
            question.textContent = cfg.question;
            container.appendChild(question);

            if (cfg.type === 'radio') renderRadio(cfg, idx, container);
            else if (cfg.type === 'slider') renderSlider(cfg, idx, container);
            else if (cfg.type === 'group') renderGroup(cfg, idx, container);
            else renderText(cfg, idx, container);
        }

        function nextLabel(idx) {
            return idx === total - 1 ? (opts.submitLabel || 'Enviar →') : 'Continuar →';
        }

        function renderText(field, idx, container) {
            var input;
            if (field.type === 'textarea') {
                input = el('textarea', 'sf-input');
                input.rows = 4;
            } else {
                input = el('input', 'sf-input');
                input.type = domInputType(field.type);
            }
            input.placeholder = field.placeholder || '';
            if (data[field.id]) input.value = data[field.id];
            container.appendChild(input);

            if (field.type !== 'textarea') {
                var touch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
                if (!touch) {
                    var hint = el('div', 'sf-enter-hint');
                    hint.innerHTML = 'Pressione <kbd>Enter ↵</kbd>';
                    container.appendChild(hint);
                }
                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') { e.preventDefault(); validateAndAdvance(field, input.value, idx, input); }
                });
            }

            var row = el('div', 'sf-btn-row');
            var next = el('button', 'sf-btn-next');
            next.type = 'button';
            next.textContent = nextLabel(idx);
            next.addEventListener('click', function () { validateAndAdvance(field, input.value, idx, input); });
            row.appendChild(next);

            if (field.optional) {
                var skip = el('button', 'sf-skip-btn');
                skip.type = 'button';
                skip.textContent = field.skipLabel || 'Pular';
                skip.addEventListener('click', function () { data[field.id] = null; advance(idx); });
                row.appendChild(skip);
            }
            container.appendChild(row);
        }

        function renderRadio(field, idx, container) {
            var list = el('div', 'sf-radio-list');
            field.choices.forEach(function (choice) {
                var card = el('button', 'sf-radio-card');
                card.type = 'button';
                if (data[field.id] === choice.value) card.classList.add('sf-sel');
                var lbl = el('span', 'sf-radio-lbl');
                lbl.textContent = choice.label;
                card.appendChild(lbl);
                if (choice.desc) {
                    var desc = el('span', 'sf-radio-desc');
                    desc.textContent = choice.desc;
                    card.appendChild(desc);
                }
                card.addEventListener('click', function () {
                    list.querySelectorAll('.sf-radio-card').forEach(function (c) { c.classList.remove('sf-sel'); });
                    card.classList.add('sf-sel');
                    data[field.id] = choice.value;
                    setTimeout(function () { advance(idx); }, 280);
                });
                list.appendChild(card);
            });
            container.appendChild(list);
        }

        function renderSlider(field, idx, container) {
            var stops = field.stops || [];
            // Quando required, exige escolha ativa: começa sem valor e o botão
            // só libera após mover o slider.
            var hasValue = data[field.id] != null;
            var pos = stops.findIndex(function (s) { return s.value === data[field.id]; });
            if (pos < 0) pos = Math.floor((stops.length - 1) / 2);
            var touched = !field.required || hasValue;

            var valueLabel = el('div', 'sf-slider-val');
            var slider = el('input', 'sf-slider');
            slider.type = 'range';
            slider.min = '0';
            slider.max = String(stops.length - 1);
            slider.step = '1';
            slider.value = String(pos);

            var ticks = el('div', 'sf-slider-ticks');
            ticks.innerHTML = '<span>' + stops[0].label + '</span><span>' + stops[stops.length - 1].label + '</span>';

            function sync() {
                var i = parseInt(slider.value, 10);
                valueLabel.textContent = stops[i].label;
                slider.setAttribute('aria-valuetext', stops[i].label);
                data[field.id] = stops[i].value;
            }
            slider.addEventListener('input', function () {
                if (!touched) {
                    touched = true;
                    next.disabled = false;
                }
                sync();
            });
            if (touched) {
                sync();
            } else {
                valueLabel.textContent = 'Mova para escolher';
            }

            container.appendChild(valueLabel);
            container.appendChild(slider);
            container.appendChild(ticks);

            var row = el('div', 'sf-btn-row');
            var next = el('button', 'sf-btn-next');
            next.type = 'button';
            next.disabled = !touched;
            next.textContent = nextLabel(idx);
            next.addEventListener('click', function () { advance(idx); });
            row.appendChild(next);
            container.appendChild(row);
        }

        function renderGroup(field, idx, container) {
            var inputs = [];
            var sliders = [];
            (field.fields || []).forEach(function (sub) {
                var label = el('label', 'sf-field-label');
                label.textContent = sub.label + (sub.optional ? ' (opcional)' : '');
                container.appendChild(label);

                if (sub.type === 'slider') {
                    sliders.push(renderGroupSlider(sub, container));
                    return;
                }

                var input = el('input', 'sf-input');
                input.type = domInputType(sub.type);
                input.placeholder = sub.placeholder || '';
                if (data[sub.id]) input.value = data[sub.id];
                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') { e.preventDefault(); tryAdvanceGroup(); }
                });
                container.appendChild(input);
                inputs.push({ sub: sub, input: input });
            });

            var row = el('div', 'sf-btn-row');
            var next = el('button', 'sf-btn-next');
            next.type = 'button';
            next.textContent = nextLabel(idx);
            next.addEventListener('click', tryAdvanceGroup);
            row.appendChild(next);
            container.appendChild(row);

            function tryAdvanceGroup() {
                for (var k = 0; k < inputs.length; k++) {
                    var v = inputs[k].input.value.trim();
                    var err = fieldError(inputs[k].sub, v);
                    if (err) { showInputError(inputs[k].input, err); return; }
                }
                for (var s = 0; s < sliders.length; s++) {
                    if (sliders[s].sub.required && !sliders[s].touched()) {
                        showInputError(sliders[s].slider, 'Mova o controle para escolher uma faixa.');
                        return;
                    }
                }
                inputs.forEach(function (it) { data[it.sub.id] = it.input.value.trim() || null; });
                advance(idx);
            }
        }

        // Slider usado como sub-campo de um group (sem botão próprio).
        // Quando required, exige escolha ativa antes do envio.
        function renderGroupSlider(sub, container) {
            var stops = sub.stops || [];
            var hasValue = data[sub.id] != null;
            var pos = stops.findIndex(function (s) { return s.value === data[sub.id]; });
            if (pos < 0) pos = Math.floor((stops.length - 1) / 2);
            var touched = !sub.required || hasValue;

            var valueLabel = el('div', 'sf-slider-val');
            var slider = el('input', 'sf-slider');
            slider.type = 'range';
            slider.min = '0';
            slider.max = String(stops.length - 1);
            slider.step = '1';
            slider.value = String(pos);

            var ticks = el('div', 'sf-slider-ticks');
            ticks.innerHTML = '<span>' + stops[0].label + '</span><span>' + stops[stops.length - 1].label + '</span>';

            function sync() {
                var i = parseInt(slider.value, 10);
                valueLabel.textContent = stops[i].label;
                slider.setAttribute('aria-valuetext', stops[i].label);
                data[sub.id] = stops[i].value;
            }
            slider.addEventListener('input', function () { touched = true; sync(); });
            if (touched) sync();
            else valueLabel.textContent = 'Mova para escolher';

            container.appendChild(valueLabel);
            container.appendChild(slider);
            container.appendChild(ticks);
            return { sub: sub, slider: slider, touched: function () { return touched; } };
        }

        function validateAndAdvance(field, rawValue, idx, inputEl) {
            var value = typeof rawValue === 'string' ? rawValue.trim() : rawValue;
            var err = fieldError(field, value);
            if (err) { showInputError(inputEl, err); return; }
            data[field.id] = value || null;
            advance(idx);
        }

        function advance(idx) {
            if (idx >= total - 1) submit();
            else { current = idx + 1; showStep(current, 1); }
        }

        function submit() {
            var next = slot.querySelector('.sf-btn-next');
            if (next) { next.disabled = true; next.textContent = 'Enviando...'; }
            slot.querySelectorAll('.sf-radio-card').forEach(function (c) { c.disabled = true; });
            if (opts.onSubmit) {
                opts.onSubmit(data, function () { updateProgress(total); showSuccess(); });
            } else {
                updateProgress(total);
                showSuccess();
            }
        }

        function showSuccess() {
            var step = slot.querySelector('.sf-step');
            function build() {
                var box = el('div', 'sf-success');
                var icon = el('div', 'sf-success-icon');
                icon.textContent = '✓';
                box.appendChild(icon);
                var title = el('div', 'sf-success-title');
                title.textContent = opts.successTitle || 'Pronto!';
                box.appendChild(title);
                var desc = el('p', 'sf-success-desc');
                desc.textContent = opts.successDesc || 'Recebemos seus dados. O material chegará no seu e-mail em breve.';
                box.appendChild(desc);
                if (opts.successExtra) {
                    var extra = el('div', 'sf-success-extra');
                    extra.innerHTML = opts.successExtra;
                    box.appendChild(extra);
                }
                slot.appendChild(box);
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () { box.classList.add('sf-ok'); });
                });
                if (opts.onSuccess) opts.onSuccess(data);
            }
            if (step) {
                step.style.transition = 'opacity .18s ease';
                step.style.opacity = '0';
                setTimeout(function () {
                    if (step.parentNode) step.parentNode.removeChild(step);
                    build();
                }, 200);
            } else {
                build();
            }
        }

        showStep(0, 1);
    }

    // ---- Definições de etapas ------------------------------------------------

    // Estudante: WhatsApp obrigatório (não há "pular").
    var CAPTURAS_STEPS = [
        { id: 'nome', type: 'text', question: 'Como posso te chamar?', placeholder: 'Seu nome completo', required: true },
        { id: 'email', type: 'email', question: 'Qual é o seu melhor e-mail?', placeholder: 'voce@email.com', required: true },
        { id: 'whatsapp', type: 'tel', question: 'Qual é o seu WhatsApp?', placeholder: '(11) 99999-9999', required: true },
        {
            id: 'nivel', type: 'radio', question: 'Qual é o seu nível atual em Valuation?',
            choices: [
                { value: 'iniciante', label: 'Iniciante', desc: 'Sei o conceito básico, mas nunca montei um modelo de FCD.' },
                { value: 'intermediario', label: 'Intermediário', desc: 'Entendo a teoria e já faço projeções, mas tenho dúvidas em WACC, perpetuidade, etc.' },
                { value: 'avancado', label: 'Avançado', desc: 'Já faço valuations na prática e quero refinar minhas análises.' }
            ]
        },
        {
            id: 'objetivo', type: 'radio', question: 'Qual é o seu maior objetivo ao aprender Valuation?',
            choices: [
                { value: 'mercado', label: 'Mercado financeiro', desc: 'Conquistar uma vaga em M&A, Equity Research, Investment Banking, etc.' },
                { value: 'certificacao', label: 'Certificação', desc: 'Estudar para CFA, CNPI, ou outra certificação do mercado financeiro.' },
                { value: 'investimentos', label: 'Investimentos pessoais', desc: 'Analisar e escolher ações e investimentos por conta própria.' },
                { value: 'empresa', label: 'Meu negócio', desc: 'Aplicar no meu próprio negócio ou na empresa onde trabalho.' },
                { value: 'faculdade', label: 'Faculdade', desc: 'Passar em disciplinas ou entregar um TCC/projeto acadêmico.' }
            ]
        }
    ];

    // Empreendedor: tela única — nome, e-mail de trabalho (aceita provedores
    // pessoais), cargo, telefone e faixa de faturamento.
    var CAPTURAS_STEPS_EMP = [
        {
            id: 'dados', type: 'group', question: 'Preencha para receber o material',
            fields: [
                { id: 'nome', type: 'text', label: 'Nome', placeholder: 'Seu nome completo', required: true },
                { id: 'email', type: 'workemail', label: 'E-mail de trabalho', placeholder: 'nome@empresa.com', required: true },
                { id: 'cargo', type: 'text', label: 'Cargo', placeholder: 'Ex: CEO, Sócio, Diretor Financeiro', required: true },
                { id: 'whatsapp', type: 'tel', label: 'Telefone (WhatsApp)', placeholder: '(11) 99999-9999', required: true },
                {
                    id: 'faturamento', type: 'slider', label: 'Faixa de faturamento anual', required: true,
                    stops: [
                        { value: 'Até R$ 10 milhões', label: 'Até R$ 10 mi' },
                        { value: 'R$ 10 milhões a R$ 50 milhões', label: 'R$ 10–50 mi' },
                        { value: 'R$ 50 milhões a R$ 100 milhões', label: 'R$ 50–100 mi' },
                        { value: 'R$ 100 milhões a R$ 500 milhões', label: 'R$ 100–500 mi' },
                        { value: 'R$ 500 milhões a R$ 1 Bilhão', label: 'R$ 500 mi – 1 bi' },
                        { value: 'Mais de R$ 1 Bilhão', label: 'Mais de R$ 1 bi' }
                    ]
                }
            ]
        }
    ];

    window.StepForm = {
        init: init,
        CAPTURAS_STEPS: CAPTURAS_STEPS,
        CAPTURAS_STEPS_EMP: CAPTURAS_STEPS_EMP
    };
}(window));
