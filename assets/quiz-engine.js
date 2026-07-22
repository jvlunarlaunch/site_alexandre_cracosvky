const QuizEngine = ((() => {
    let config, el, state;

    function init(container, quizConfig) {
        config = quizConfig;
        el = container;
        state = {
            screen: 'welcome',
            qi: 0,
            answers: {},
            captured: false
        };
        render();
    }

    function render() {
        el.innerHTML = '';
        el.className = 'quiz-app';
        if (state.screen === 'welcome') renderWelcome();
        else if (state.screen === 'question') renderQuestion();
        else if (state.screen === 'capture') renderCapture();
        else if (state.screen === 'result') renderResult();
    }

    function renderWelcome() {
        const screen = makeDiv('quiz-screen active');
        screen.innerHTML = "\n      <span class=\"welcome-icon\">" + (config.icon || '📊') + "</span>\n      <h1 class=\"welcome-h1\">" + config.title + '</h1>\n      <p class="welcome-sub">' + config.subtitle + "</p>\n      <div class=\"welcome-meta\">\n        <div class=\"welcome-meta-item\">⏱ " + (config.estimatedTime || '5 min') + "</div>\n        <div class=\"welcome-meta-item\">📋 " + config.questions.length + ' perguntas</div>\n      </div>\n      <button class="btn-gold" id="btn-start">Começar agora →</button>\n    ';
        el.appendChild(screen);
        screen.querySelector('#btn-start').onclick = () => {
            state.screen = 'question';
            render();
        };
    }

    function renderQuestion() {
        const q = config.questions[state.qi];
        const pct = Math.round(state.qi / config.questions.length * 100);
        const screen = makeDiv('quiz-screen active');
        screen.innerHTML = "\n      <div class=\"quiz-progress\">\n        <div class=\"progress-meta\">\n          <span class=\"progress-label\">" + (q.dimension || '') + "</span>\n          <span class=\"progress-count\">" + (state.qi + 1) + " / " + config.questions.length + '</span>\n        </div>\n        <div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>\n      </div>\n      ' + (q.dimension ? "<div class=\"question-dim\">" + q.dimension + "</div>" : '') + "\n      <div class=\"question-text\">" + q.text + "</div>\n      <div id=\"q-input\"></div>\n      <div class=\"quiz-nav\">\n        <button class=\"btn-outline btn-back\" id=\"btn-back\" style=\"font-size:11px;padding:9px 18px;color:var(--slate);border-color:var(--ruledark);\">← Voltar</button>\n        <div class=\"quiz-nav-right\">\n          <button class=\"btn-gold\" id=\"btn-next\" style=\"opacity:.4;pointer-events:none;\">Próxima →</button>\n        </div>\n      </div>\n    ";
        el.appendChild(screen);
        const inputArea = screen.querySelector('#q-input');
        const btnNext = screen.querySelector('#btn-next');
        const btnBack = screen.querySelector('#btn-back');
        const existing = state.answers[q.id];
        if (existing !== undefined) {
            btnNext.style.opacity = '1';
            btnNext.style.pointerEvents = 'auto';
        }
        if (q.type === 'choice') renderChoice(q, inputArea, btnNext, existing);
        else if (q.type === 'scale') renderScale(q, inputArea, btnNext, existing);
        else if (q.type === 'number') renderNumber(q, inputArea, btnNext, existing);
        else if (q.type === 'select') renderSelect(q, inputArea, btnNext, existing);
        else if (q.type === 'multichoice') renderMultichoice(q, inputArea, btnNext, existing);

        btnBack.onclick = () => {
            if (state.qi > 0) { state.qi--; render(); }
            else { state.screen = 'welcome'; render(); }
        };
        btnNext.onclick = () => {
            state.qi++;
            if (state.qi >= config.questions.length) {
                state.screen = state.captured ? 'result' : 'capture';
            }
            render();
        };
    }

    function enableBtn(btn) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
    }

    // Página de origem do segmento, para o link "Ver outras ferramentas".
    function segmentHref() {
        return config.segment === 'empreendedor' ? '../empreendedor.html' : '../estudante.html';
    }

    // CTA de contato no resultado (empresário): em vez de mandar para /contato e
    // repetir os dados, abre um formulário inline já com o lead capturado, pedindo
    // apenas uma mensagem. Mantém o link original como fallback.
    function wireContactCta(screen) {
        const cta = screen.querySelector('.quiz-cta-contato');
        if (!cta) return;
        if (config.segment !== 'empreendedor' || !state.lead) return;
        cta.addEventListener('click', function (e) {
            e.preventDefault();
            openInlineContact(cta);
        });
    }

    function openInlineContact(ctaEl) {
        const lead = state.lead || {};
        const firstName = (lead.name || '').trim().split(/\s+/)[0] || '';
        const sub = [lead.cargo, lead.empresa].filter(Boolean).join(' · ');

        const panel = document.createElement('div');
        panel.style.cssText = 'background:#FFF;border:1px solid #E7E5DC;border-radius:16px;padding:22px 24px;text-align:left;';
        panel.innerHTML =
            '<p style="font-family:var(--cg),Georgia,serif;font-size:clamp(1.25rem,3.5vw,1.6rem);font-weight:600;color:#1A2A52;margin:0 0 2px">'
                + 'Olá' + (firstName ? ', ' + escapeHtml(firstName) : '') + '!</p>'
            + (sub ? '<p style="font-size:12.5px;color:#8A887F;margin:0 0 14px">' + escapeHtml(sub) + '</p>' : '<div style="height:10px"></div>')
            + '<label style="display:block;font-size:13.5px;font-weight:600;color:#2C2C2A;margin:0 0 8px">Conte mais sobre seu objetivo</label>'
            + '<textarea id="qe-contato-msg" rows="4" placeholder="Ex.: gostaria de entender as opções para a minha empresa…" '
                + 'style="width:100%;box-sizing:border-box;font-family:inherit;font-size:15px;color:#2C2C2A;border:1px solid #D8D6CC;border-radius:10px;padding:12px 14px;resize:vertical;outline:none"></textarea>'
            + '<div id="qe-contato-err" style="display:none;color:#9A2020;font-size:12.5px;margin-top:6px"></div>'
            + '<button id="qe-contato-send" type="button" disabled '
                + 'style="margin-top:14px;width:100%;background:var(--gold,#B8932F);color:#2C2C2A;font-size:16px;font-weight:700;padding:14px 20px;border:none;border-radius:12px;font-family:inherit;cursor:pointer;opacity:.55">Enviar →</button>';

        ctaEl.parentNode.replaceChild(panel, ctaEl);

        const textarea = panel.querySelector('#qe-contato-msg');
        const sendBtn = panel.querySelector('#qe-contato-send');
        const errBox = panel.querySelector('#qe-contato-err');
        textarea.focus();

        textarea.addEventListener('input', function () {
            const hasText = textarea.value.trim().length > 0;
            sendBtn.disabled = !hasText;
            sendBtn.style.opacity = hasText ? '1' : '.55';
            if (hasText) errBox.style.display = 'none';
        });

        sendBtn.addEventListener('click', function () {
            const msg = textarea.value.trim();
            if (!msg) {
                errBox.textContent = 'Escreva uma mensagem antes de enviar.';
                errBox.style.display = 'block';
                return;
            }
            sendBtn.disabled = true;
            sendBtn.textContent = 'Enviando...';
            if (window._sb) {
                window._sb.from('contato_alexandre_cracovsky').insert({
                    nome: lead.name,
                    email: lead.email,
                    whatsapp: lead.wa,
                    assunto: config.title,
                    mensagem: msg
                }).then(function () {}, function () {});
            }
            panel.innerHTML =
                '<p style="font-family:var(--cg),Georgia,serif;font-size:clamp(1.3rem,3.5vw,1.7rem);font-weight:600;color:#1B7A3A;margin:0 0 8px">Recebido! ✓</p>'
                + '<p style="font-size:14px;color:#2C2C2A;margin:0;line-height:1.6">Obrigado'
                    + (firstName ? ', ' + escapeHtml(firstName) : '')
                    + '. Em breve entro em contato pelo seu e-mail ou WhatsApp.</p>';
        });
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function renderChoice(q, inputArea, btnNext, existing) {
        const list = makeDiv('options-list');
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn' + (existing === opt.value ? ' selected' : '');
            btn.textContent = opt.label;
            btn.onclick = () => {
                list.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.answers[q.id] = opt.value;
                enableBtn(btnNext);
            };
            list.appendChild(btn);
        });
        inputArea.appendChild(list);
    }

    function renderScale(q, inputArea, btnNext, existing) {
        const min = q.min || 1;
        const max = q.max || 5;
        const val = existing !== undefined ? existing : Math.round((min + max) / 2);
        inputArea.innerHTML = "\n      <div class=\"scale-input\">\n        <input type=\"range\" min=\"" + min + "\" max=\"" + max + "\" value=\"" + val + "\" id=\"range-input\">\n        <div class=\"scale-labels\">\n          <span class=\"scale-label\">" + (q.minLabel || min) + '</span>\n          <span class="scale-label" id="range-display" style="color:var(--gold);font-family:var(--mo);">' + val + "</span>\n          <span class=\"scale-label\">" + (q.maxLabel || max) + "</span>\n        </div>\n      </div>\n    ";
        state.answers[q.id] = val;
        enableBtn(btnNext);
        inputArea.querySelector('#range-input').oninput = function() {
            state.answers[q.id] = +this.value;
            inputArea.querySelector('#range-display').textContent = this.value;
        };
    }

    function numberPreview(kind, scale, raw) {
        const val = parseFloat(raw);
        if (raw === '' || isNaN(val)) return '';
        if (kind === 'millions') return '= R$ ' + (val * (scale || 1000000)).toLocaleString('pt-BR');
        if (kind === 'percent') return '= ' + val + '%';
        return '';
    }

    function renderNumber(q, inputArea, btnNext, existing) {
        inputArea.innerHTML = "<input class=\"number-input\" type=\"number\" id=\"num-in\" placeholder=\"" + (q.placeholder || '') + "\" value=\"" + (existing || '') + "\" min=\"" + (q.min || 0) + '">';
        const input = inputArea.querySelector('#num-in');
        let preview = null;
        if (q.preview) {
            preview = document.createElement('div');
            preview.style.cssText = 'font-family:var(--mo);font-size:13px;color:var(--gold2);margin-top:8px;letter-spacing:.02em;min-height:20px;';
            preview.textContent = numberPreview(q.preview, q.scale, input.value);
            input.parentNode.insertBefore(preview, input.nextSibling);
        }
        if (existing !== undefined) enableBtn(btnNext);
        input.oninput = function() {
            if (this.value) {
                state.answers[q.id] = +this.value;
                enableBtn(btnNext);
            }
            if (preview) preview.textContent = numberPreview(q.preview, q.scale, this.value);
        };
    }

    function renderSelect(q, inputArea, btnNext, existing) {
        let opts = q.options.map(o => "<option value=\"" + o.value + '" ' + (existing === o.value ? 'selected' : '') + '>' + o.label + "</option>").join('');
        inputArea.innerHTML = '<select class="select-input" id="sel-in"><option value="">Selecione...</option>' + opts + "</select>";
        if (existing !== undefined) enableBtn(btnNext);
        inputArea.querySelector('#sel-in').onchange = function() {
            if (this.value) {
                state.answers[q.id] = this.value;
                enableBtn(btnNext);
            }
        };
    }

    function renderMultichoice(q, inputArea, btnNext, existing) {
        const selected = existing || [];
        const list = makeDiv('options-list');
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn' + (selected.includes(opt.value) ? ' selected' : '');
            btn.textContent = opt.label;
            btn.onclick = () => {
                btn.classList.toggle('selected');
                const vals = Array.from(list.querySelectorAll('.option-btn.selected')).map(b => {
                    return q.options.find(o => o.label === b.textContent).value;
                });
                state.answers[q.id] = vals;
                if (vals.length) enableBtn(btnNext);
                else { btnNext.style.opacity = '.4'; btnNext.style.pointerEvents = 'none'; }
            };
            list.appendChild(btn);
        });
        if (selected.length) enableBtn(btnNext);
        inputArea.appendChild(list);
    }

    function renderCapture() {
        const screen = makeDiv('quiz-screen active');
        const isEmpreendedor = config.segment === 'empreendedor';
        const steps = isEmpreendedor ? captureStepsEmpreendedor() : captureStepsEstudante();
        const totalSteps = steps.length;
        let currentStep = 0;
        const captureData = {};
        const captureWrap = makeDiv('quiz-capture');
        screen.appendChild(captureWrap);

        const progressBar = makeDiv('quiz-progress');
        progressBar.innerHTML = '<div class="progress-meta"><span class="progress-label" id="cp-lbl"></span><span class="progress-count" id="cp-cnt"></span></div><div class="progress-bar"><div class="progress-fill" id="cp-fill" style="width:0%"></div></div>';
        captureWrap.appendChild(progressBar);

        const slideArea = makeDiv('');
        slideArea.style.cssText = 'position:relative;overflow:hidden;min-height:280px;';
        captureWrap.appendChild(slideArea);
        el.appendChild(screen);

        function updateProgress(idx) {
            const fill = screen.querySelector('#cp-fill');
            const cnt = screen.querySelector('#cp-cnt');
            if (fill) fill.style.width = Math.round(idx / totalSteps * 100) + '%';
            if (cnt) cnt.textContent = (idx + 1) + ' / ' + totalSteps;
        }

        function showCaptureStep(idx, direction) {
            const stepCfg = steps[idx];
            const prevStep = slideArea.querySelector('.cap-step');
            const newStep = document.createElement('div');
            newStep.className = 'cap-step';
            buildCaptureStep(stepCfg, idx, newStep);
            newStep.style.cssText = 'opacity:0;transform:translateX(' + (direction >= 0 ? '32px' : '-32px') + ')';
            if (prevStep) {
                const h = prevStep.offsetHeight;
                slideArea.style.minHeight = h + 'px';
                prevStep.style.position = 'absolute';
                prevStep.style.top = '0';
                prevStep.style.left = '0';
                prevStep.style.right = '0';
                prevStep.style.zIndex = '1';
                prevStep.style.pointerEvents = 'none';
                const outgoing = prevStep;
                requestAnimationFrame(() => {
                    outgoing.style.transition = 'opacity .22s ease,transform .22s ease';
                    outgoing.style.opacity = '0';
                    outgoing.style.transform = 'translateX(' + (direction >= 0 ? '-32px' : '32px') + ')';
                });
                setTimeout(() => {
                    if (outgoing.parentNode) outgoing.parentNode.removeChild(outgoing);
                    slideArea.style.minHeight = '';
                }, 260);
            }
            slideArea.appendChild(newStep);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    newStep.style.transition = 'opacity .28s ease,transform .28s ease';
                    newStep.style.opacity = '1';
                    newStep.style.transform = 'translateX(0)';
                    const focusable = newStep.querySelector('input:not([type=radio]),textarea');
                    if (focusable) setTimeout(() => {
                        try { focusable.focus(); } catch (e) {}
                    }, 310);
                });
            });
            updateProgress(idx);
        }

        function buildCaptureStep(stepCfg, idx, container) {
            if (idx > 0) {
                const backBtn = document.createElement('button');
                backBtn.className = 'btn-outline btn-back';
                backBtn.type = 'button';
                backBtn.style.cssText = 'font-size:11px;padding:8px 16px;color:var(--slate);border-color:var(--ruledark);margin-bottom:14px;display:inline-block;';
                backBtn.textContent = '← Voltar';
                backBtn.onclick = () => { currentStep = idx - 1; showCaptureStep(currentStep, -1); };
                container.appendChild(backBtn);
            } else {
                const backBtn = document.createElement('button');
                backBtn.className = 'btn-outline btn-back';
                backBtn.type = 'button';
                backBtn.style.cssText = 'font-size:11px;padding:8px 16px;color:var(--slate);border-color:var(--ruledark);margin-bottom:14px;display:inline-block;';
                backBtn.textContent = '← Voltar ao quiz';
                backBtn.onclick = () => {
                    state.qi = config.questions.length - 1;
                    state.screen = 'question';
                    render();
                };
                container.appendChild(backBtn);
            }
            if (totalSteps > 1) {
                const counter = document.createElement('div');
                counter.style.cssText = 'font-family:var(--mo);font-size:11px;color:var(--gold2);letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px;opacity:.75;';
                counter.textContent = (idx + 1) + ' / ' + totalSteps;
                container.appendChild(counter);
            }

            const questionEl = document.createElement('div');
            questionEl.style.cssText = 'font-family:var(--cg);font-size:clamp(1.6rem,3.5vw,2.1rem);font-weight:300;color:#fff;line-height:1.18;margin-bottom:24px;';
            questionEl.textContent = stepCfg.question;
            container.appendChild(questionEl);

            if (stepCfg.type === 'radio') renderRadioField(stepCfg, container, idx);
            else if (stepCfg.type === 'group') renderGroupField(stepCfg, container, idx);
            else renderTextField(stepCfg, container, idx);
        }

        // Maps a logical field type to a valid DOM input type.
        function qeDomInputType(t) {
            if (t === 'workemail') return 'email';
            if (t === 'url') return 'url';
            if (t === 'tel' || t === 'email' || t === 'number') return t;
            return 'text';
        }

        function renderTextField(field, container, idx) {
            const input = document.createElement('input');
            input.type = qeDomInputType(field.type);
            input.className = 'form-input';
            input.placeholder = field.placeholder || '';
            if (captureData[field.id]) input.value = captureData[field.id];
            container.appendChild(input);

            const hint = document.createElement('div');
            hint.style.cssText = 'font-family:var(--mo);font-size:11px;color:rgba(255,255,255,.3);margin-top:10px;';
            hint.textContent = 'Pressione Enter ↵';
            container.appendChild(hint);

            input.addEventListener('keydown', e => {
                if (e.key === 'Enter') { e.preventDefault(); validateAndAdvance(field, input.value, idx); }
            });

            const row = document.createElement('div');
            row.style.cssText = 'display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-top:20px;';

            const continueBtn = document.createElement('button');
            continueBtn.className = 'btn-gold';
            continueBtn.type = 'button';
            continueBtn.textContent = idx === totalSteps - 1 ? 'Ver meu resultado →' : 'Continuar →';
            continueBtn.onclick = () => validateAndAdvance(field, input.value, idx);
            row.appendChild(continueBtn);
            container.appendChild(row);
        }

        function renderRadioField(field, container, idx) {
            const wrap = document.createElement('div');
            wrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
            field.choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.style.cssText = 'width:100%;text-align:left;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:13px 16px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:border-color .2s,background .2s;-webkit-tap-highlight-color:transparent;min-height:44px;';
                if (captureData[field.id] === choice.value) {
                    btn.style.borderColor = 'var(--gold)';
                    btn.style.background = 'rgba(184,149,42,.1)';
                }
                const labelEl = document.createElement('span');
                labelEl.style.cssText = 'font-family:var(--ep);font-size:14px;font-weight:500;color:rgba(255,255,255,.9);pointer-events:none;';
                labelEl.textContent = choice.label;
                btn.appendChild(labelEl);
                if (choice.desc) {
                    const descEl = document.createElement('span');
                    descEl.style.cssText = 'font-family:var(--ep);font-size:12px;font-weight:300;color:rgba(255,255,255,.45);line-height:1.5;pointer-events:none;';
                    descEl.textContent = choice.desc;
                    btn.appendChild(descEl);
                }
                btn.addEventListener('mouseover', () => {
                    if (captureData[field.id] !== choice.value) {
                        btn.style.borderColor = 'rgba(184,149,42,.4)';
                        btn.style.background = 'rgba(255,255,255,.07)';
                    }
                });
                btn.addEventListener('mouseout', () => {
                    if (captureData[field.id] !== choice.value) {
                        btn.style.borderColor = 'rgba(255,255,255,.1)';
                        btn.style.background = 'rgba(255,255,255,.04)';
                    }
                });
                btn.onclick = () => {
                    wrap.querySelectorAll('button').forEach(b => {
                        b.style.borderColor = 'rgba(255,255,255,.1)';
                        b.style.background = 'rgba(255,255,255,.04)';
                    });
                    btn.style.borderColor = 'var(--gold)';
                    btn.style.background = 'rgba(184,149,42,.1)';
                    captureData[field.id] = choice.value;
                    setTimeout(() => advanceCapture(idx), 280);
                };
                wrap.appendChild(btn);
            });
            container.appendChild(wrap);
        }

        function renderGroupField(field, container, idx) {
            const inputs = [];
            (field.fields || []).forEach(sub => {
                const label = document.createElement('label');
                label.style.cssText = 'display:block;font-family:var(--ep);font-size:13px;font-weight:500;color:rgba(255,255,255,.6);margin:16px 0 6px;';
                label.textContent = sub.label + (sub.optional ? ' (opcional)' : '');
                container.appendChild(label);

                let input;
                if (sub.type === 'select') {
                    input = document.createElement('select');
                    input.className = 'form-select';
                    input.innerHTML = '<option value="">' + (sub.placeholder || 'Selecione...') + '</option>'
                        + (sub.options || []).map(o => '<option value="' + o.value + '">' + o.label + '</option>').join('');
                    if (captureData[sub.id]) input.value = captureData[sub.id];
                } else {
                    input = document.createElement('input');
                    input.type = qeDomInputType(sub.type);
                    input.className = 'form-input';
                    input.placeholder = sub.placeholder || '';
                    if (captureData[sub.id]) input.value = captureData[sub.id];
                    input.addEventListener('keydown', e => {
                        if (e.key === 'Enter') { e.preventDefault(); tryAdvance(); }
                    });
                }
                container.appendChild(input);
                inputs.push({ sub, input });
            });

            const row = document.createElement('div');
            row.style.cssText = 'display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-top:24px;';
            const continueBtn = document.createElement('button');
            continueBtn.className = 'btn-gold';
            continueBtn.type = 'button';
            continueBtn.textContent = idx === totalSteps - 1 ? 'Ver meu resultado →' : 'Continuar →';
            continueBtn.onclick = tryAdvance;
            row.appendChild(continueBtn);
            container.appendChild(row);

            function tryAdvance() {
                for (let k = 0; k < inputs.length; k++) {
                    const v = inputs[k].input.value.trim();
                    if (qeFieldInvalid(inputs[k].sub, v, inputs[k].input)) return;
                }
                inputs.forEach(it => { captureData[it.sub.id] = it.input.value.trim() || null; });
                advanceCapture(idx);
            }
        }

        function qeValidEmail(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
        }

        function qeValidSite(v) {
            if (!v) return true; // opcional
            return /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/.test(String(v).trim());
        }

        function qeValidPhone(v) {
            if (!v) return false;
            var d = String(v).replace(/\D/g, '');
            if (d.length >= 12 && d.slice(0, 2) === '55') d = d.slice(2);
            return d.length === 11 && d[2] === '9';
        }

        function qeFieldError(inputEl, msg) {
            if (!inputEl) return;
            var orig = inputEl.style.borderBottomColor;
            inputEl.style.borderBottomColor = 'var(--danger,#9A2020)';
            inputEl.style.animation = 'qe-shake .35s ease';
            var errEl = inputEl.parentNode && inputEl.parentNode.querySelector('.qe-err-msg');
            if (!errEl && inputEl.parentNode) {
                errEl = document.createElement('div');
                errEl.className = 'qe-err-msg';
                errEl.style.cssText = 'color:var(--danger,#9A2020);font-size:12px;margin-top:6px;font-family:var(--ep,"Epilogue",sans-serif);';
                inputEl.parentNode.insertBefore(errEl, inputEl.nextSibling);
            }
            if (errEl) errEl.textContent = msg || 'Campo inválido.';
            try { inputEl.focus(); } catch (x) {}
            setTimeout(() => {
                inputEl.style.borderBottomColor = orig;
                inputEl.style.animation = '';
                if (errEl && errEl.parentNode) errEl.parentNode.removeChild(errEl);
            }, 3500);
        }

        function qeFieldInvalid(field, value, inputEl) {
            if (field.required && !value) {
                qeFieldError(inputEl, field.type === 'select' ? 'Selecione uma faixa.' : 'Preencha este campo.');
                return true;
            }
            if (!value) return false;
            var type = field.type || 'text';
            if (field.id === 'nome' && String(value).length < 3) {
                qeFieldError(inputEl, 'O nome deve ter pelo menos 3 letras.');
                return true;
            }
            if (type === 'email' && !qeValidEmail(value)) {
                qeFieldError(inputEl, 'Digite um e-mail válido (ex: voce@email.com).');
                return true;
            }
            if (type === 'workemail' && !qeValidEmail(value)) {
                qeFieldError(inputEl, 'Digite um e-mail válido (ex: nome@empresa.com).');
                return true;
            }
            if (type === 'url' && !qeValidSite(value)) {
                qeFieldError(inputEl, 'Digite um site válido (ex: empresa.com.br).');
                return true;
            }
            if (type === 'tel' && !qeValidPhone(value)) {
                qeFieldError(inputEl, 'Digite um WhatsApp válido com DDD (ex: 11 99999-9999).');
                return true;
            }
            return false;
        }

        function validateAndAdvance(field, rawValue, idx) {
            const value = typeof rawValue === 'string' ? rawValue.trim() : rawValue;
            if (qeFieldInvalid(field, value, slideArea.querySelector('.form-input'))) return;
            captureData[field.id] = value || null;
            advanceCapture(idx);
        }

        function advanceCapture(idx) {
            if (idx >= totalSteps - 1) submitCapture();
            else { currentStep = idx + 1; showCaptureStep(currentStep, 1); }
        }

        function submitCapture() {
            const submitBtn = slideArea.querySelector('.btn-gold');
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Calculando...'; }
            const lead = {
                name: captureData.nome,
                email: captureData.email,
                wa: captureData.whatsapp,
                empresa: captureData.empresa,
                site: captureData.site,
                cargo: captureData.cargo,
                obj: captureData.objetivo,
                tam: captureData.tamanho,
                fat: captureData.faturamento,
                nivel: captureData.nivel
            };
            if (window._sb) {
                const scores = computeScore();
                const row = {
                    nome: lead.name,
                    email: lead.email,
                    whatsapp: lead.wa,
                    objetivo: lead.obj,
                    respostas: state.answers,
                    score: scores.main
                };
                if (isEmpreendedor) {
                    row.empresa = lead.empresa;
                    row.site = lead.site;
                    row.cargo = lead.cargo;
                    row.tamanho = lead.tam;
                    row.faturamento = lead.fat;
                } else {
                    row.nivel = lead.nivel;
                }
                window._sb.from('isca_' + config.id + '_alexandre_cracovsky').insert(row).then(function() {}, function() {});
            }
            state.captured = true;
            state.lead = lead;
            state.screen = 'result';
            render();
        }

        function captureStepsEstudante() {
            return [{
                id: 'nome',
                type: 'text',
                question: 'Como posso te chamar?',
                placeholder: 'Seu nome completo',
                required: true
            }, {
                id: 'email',
                type: 'email',
                question: 'Qual é o seu melhor e-mail?',
                placeholder: 'voce@email.com',
                required: true
            }, {
                id: 'whatsapp',
                type: 'tel',
                question: 'Qual é o seu WhatsApp?',
                placeholder: '(11) 99999-9999',
                required: true
            }, {
                id: 'nivel',
                type: 'radio',
                question: 'Qual é o seu nível em Valuation?',
                choices: [{
                    value: 'iniciante',
                    label: 'Iniciante',
                    desc: 'Sei o conceito básico, mas nunca montei um FCD.'
                }, {
                    value: 'intermediario',
                    label: 'Intermediário',
                    desc: 'Entendo a teoria, mas tenho dúvidas em WACC, perpetuidade, etc.'
                }, {
                    value: 'avancado',
                    label: 'Avançado',
                    desc: 'Já faço valuations na prática e quero refinar minhas análises.'
                }]
            }, {
                id: 'objetivo',
                type: 'radio',
                question: 'Qual é o seu maior objetivo ao aprender Valuation?',
                choices: [{
                    value: 'mercado',
                    label: 'Mercado financeiro',
                    desc: 'Conquistar uma vaga em M&A, Equity Research, Investment Banking.'
                }, {
                    value: 'certificacao',
                    label: 'Certificação',
                    desc: 'Estudar para CFA, CNPI, ou outra certificação.'
                }, {
                    value: 'investimentos',
                    label: 'Investimentos pessoais',
                    desc: 'Analisar e escolher ações/investimentos por conta própria.'
                }, {
                    value: 'empresa',
                    label: 'Meu negócio',
                    desc: 'Aplicar no meu próprio negócio ou empresa.'
                }, {
                    value: 'faculdade',
                    label: 'Faculdade',
                    desc: 'Passar em disciplinas ou entregar um TCC/projeto.'
                }]
            }];
        }

        // Empreendedor: tela única — nome, e-mail de trabalho (aceita provedores
        // pessoais), cargo, telefone e faixa de faturamento.
        function captureStepsEmpreendedor() {
            return [{
                id: 'dados',
                type: 'group',
                question: 'Preencha para ver o seu resultado',
                fields: [
                    { id: 'nome', type: 'text', label: 'Nome', placeholder: 'Seu nome completo', required: true },
                    { id: 'email', type: 'workemail', label: 'E-mail de trabalho', placeholder: 'nome@empresa.com', required: true },
                    { id: 'cargo', type: 'text', label: 'Cargo', placeholder: 'Ex: CEO, Sócio, Diretor Financeiro', required: true },
                    { id: 'whatsapp', type: 'tel', label: 'Telefone (WhatsApp)', placeholder: '(11) 99999-9999', required: true },
                    {
                        id: 'faturamento', type: 'select', label: 'Faixa de faturamento anual', required: true,
                        placeholder: 'Selecione a faixa...',
                        options: [
                            { value: 'Até R$ 10 milhões', label: 'Até R$ 10 mi' },
                            { value: 'R$ 10 milhões a R$ 50 milhões', label: 'R$ 10–50 mi' },
                            { value: 'R$ 50 milhões a R$ 100 milhões', label: 'R$ 50–100 mi' },
                            { value: 'R$ 100 milhões a R$ 500 milhões', label: 'R$ 100–500 mi' },
                            { value: 'R$ 500 milhões a R$ 1 Bilhão', label: 'R$ 500 mi – 1 bi' },
                            { value: 'Mais de R$ 1 Bilhão', label: 'Mais de R$ 1 bi' }
                        ]
                    }
                ]
            }];
        }

        showCaptureStep(0, 1);
    }

    function renderResult() {
        const scores = computeScore();
        if (config.scoring.normalize) { renderResultNormalize(scores); return; }
        if (config.scoring.type === 'valuation') { renderResultValuation(scores); return; }
        if (config.scoring.type === 'blindspots') { renderResultBlinspots(scores); return; }
        if (config.scoring.type === 'maturity' && config.scoring.dimensions) { renderResultMaturity(scores); return; }

        const screen = makeDiv('quiz-screen active');
        const threshold = getThreshold(scores);
        const pct = Math.min(100, Math.round(scores.main / (config.scoring.max || 10) * 100));
        const deg = Math.round(pct * 3.6);
        const cta = config.scoring.cta;
        const ctaHtml = cta
            ? '<div style="background:var(--navy,#0A1628);border-radius:16px;padding:28px 26px;text-align:center;margin-top:8px">'
                + (cta.description ? '<p style="color:rgba(255,255,255,.7);font-size:14.5px;line-height:1.7;margin:0 0 18px">' + cta.description + '</p>' : '')
                + '<a href="' + cta.href + '" class="btn-gold" style="display:inline-block;text-align:center">' + cta.label + ' →</a>'
                + '</div>'
            : '';
        screen.innerHTML = "\n      <div class=\"result-header " + threshold.class + "\">\n        <div class=\"result-intro-label\">Seu resultado foi:</div>\n        <div class=\"result-score-label\">" + (config.scoring.scoreLabel || 'Pontuação') + "</div>\n        <div class=\"result-score-val\">" + formatScore(scores.main, config.scoring) + "</div>\n        <div class=\"result-level " + threshold.class + '">' + threshold.label + "</div>\n        <p class=\"result-desc\">" + threshold.description + '</p>\n      </div>\n      <div id="charts-area"></div>\n      ' + ctaHtml + '\n      <div class="result-ctas">\n        <a href="' + segmentHref() + '" class="btn-navy">← Ver outras ferramentas</a>\n        <button class="btn-outline" id="btn-restart" style="color:var(--slate);border-color:var(--ruledark);">Refazer →</button>\n      </div>\n    ';
        el.appendChild(screen);
        screen.querySelector('#btn-restart').onclick = () => {
            state = { screen: 'welcome', qi: 0, answers: {}, captured: false };
            render();
        };
        renderCharts(scores, screen.querySelector('#charts-area'));
    }

    function renderResultValuation(scores) {
        const screen = makeDiv('quiz-screen active');

        // Compact million formatter: 195000000 → "195 mi", 1500000000 → "1.5B"
        // vírgula decimal (pt-BR), 1 casa
        const qeDec = n => String(n).replace('.', ',');
        function qeFmtM(v) {
            if (v >= 1e9) return qeDec((v / 1e9).toFixed(1)) + 'B';
            if (v >= 1e6) { const m = v / 1e6; return qeDec(m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)) + ' mi'; }
            return formatCurrency(v);
        }

        // Football field: axis + 3 horizontal bars in SVG
        function qeFFSvg() {
            const toM = v => v / 1e6;
            const vals = [scores.min, scores.max, scores.benchMin, scores.benchMax, scores.consultMin, scores.consultMax].map(toM);
            const dMin = Math.min.apply(null, vals), dMax = Math.max.apply(null, vals);
            const padding = (dMax - dMin) * 0.1 || dMax * 0.1 || 10;
            const rawStep = (dMax - dMin + 2 * padding) / 4;
            const mag = Math.pow(10, Math.floor(Math.log10(rawStep || 1)));
            const norm = rawStep / mag;
            const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
            const axMin = Math.floor((dMin - padding) / step) * step;
            const nSteps = Math.max(4, Math.ceil((dMax + padding - axMin) / step));
            const axMax = axMin + nSteps * step;
            const XS = 70, XE = 540, span = axMax - axMin;
            const xp = vM => +(XS + (vM - axMin) / span * (XE - XS)).toFixed(1);
            let tickHtml = '';
            for (let i = 0; i <= nSteps; i++) {
                const t = +(axMin + i * step).toFixed(10);
                tickHtml += `<text x="${xp(t)}" y="48">${t % 1 === 0 ? t : qeDec(t.toFixed(1))}</text>`;
            }
            const row = (lo, hi, mid, fill, label) => {
                const x1 = xp(toM(lo)), x2 = xp(toM(hi)), xm = xp(toM(mid));
                const w = Math.max(x2 - x1, 2).toFixed(1);
                return `<div style="margin-bottom:14px"><p style="font-size:13px;color:#5F5E5A;margin:0 0 4px"><b style="color:#2C2C2A">${label}</b> · R$ ${qeFmtM(lo)} – R$ ${qeFmtM(hi)} · central R$ ${qeFmtM(mid)}</p><svg viewBox="0 0 560 26" width="100%"><rect x="${x1}" y="3" width="${w}" height="20" rx="4" fill="${fill}" fill-opacity="0.85"></rect><line x1="${xm}" y1="0" x2="${xm}" y2="26" stroke="#FFFFFF" stroke-width="2"></line></svg></div>`;
            };
            return `<svg viewBox="0 0 560 60" width="100%" style="margin-top:6px"><line x1="${XS}" y1="30" x2="${XE}" y2="30" stroke="#C9C7BD" stroke-width="1"></line><g font-size="10" fill="#8A887F" text-anchor="middle">${tickHtml}</g><text x="${((XS + XE) / 2).toFixed(0)}" y="16" text-anchor="middle" font-size="10" fill="#5F5E5A">Enterprise Value (R$ milhões)</text></svg>${row(scores.min, scores.max, scores.main, '#4F77AB', 'Sua empresa')}${row(scores.benchMin, scores.benchMax, scores.benchCentral, '#B8932F', 'Benchmark do setor')}${row(scores.consultMin, scores.consultMax, scores.consultCentral, '#0F6E56', 'Potencial com preparo')}<p style="font-size:11px;color:#8A887F;margin:8px 0 0">A linha branca marca o valor central de cada faixa.</p>`;
        }

        // Donut: SVG pie chart showing discount breakdown
        function qeDonutSvg() {
            const d = scores.discountAmounts;
            if (!d) return '';
            const sliceDefs = [
                { key: 'valorRetido', label: 'Valor retido',               color: '#1A2A52' },
                { key: 'company',     label: 'Risco específico da empresa', color: '#B8932F' },
                { key: 'liquidez',    label: 'Liquidez',                    color: '#0F6E56' },
                { key: 'regiao',      label: 'Mercado local (região)',       color: '#A8843C' },
                { key: 'porte',       label: 'Porte',                       color: '#888780' },
            ];
            const active = sliceDefs.filter(s => d[s.key] > 0);
            const total = active.reduce((acc, s) => acc + d[s.key], 0);
            if (total <= 0) return '';
            const circ = 2 * Math.PI * 70;
            let offset = 0, circles = '', legItems = '';
            const retidoPct = Math.round((d.valorRetido || 0) / total * 100);
            active.forEach(s => {
                const pct = d[s.key] / total;
                const len = pct * circ;
                circles += `<circle cx="90" cy="90" r="70" stroke="${s.color}" stroke-width="22" fill="none" stroke-dasharray="${len.toFixed(2)} ${(circ - len).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}"></circle>`;
                legItems += `<span style="display:flex;align-items:center;gap:8px"><span style="width:12px;height:12px;border-radius:3px;flex:0 0 auto;background:${s.color}"></span>${s.label} · ${Math.round(pct * 100)}%</span>`;
                offset += len;
            });
            const totalDiscPct = Math.round((1 - (d.valorRetido || 0) / total) * 100);
            return `<div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap"><svg viewBox="0 0 180 180" width="160" height="160"><g transform="rotate(-90 90 90)">${circles}</g><text x="90" y="84" text-anchor="middle" font-size="13" fill="#5F5E5A">Valor</text><text x="90" y="104" text-anchor="middle" font-size="22" font-weight="700" fill="#1A2A52">${retidoPct}%</text></svg><div style="display:flex;flex-direction:column;gap:9px;font-size:13px;color:#5F5E5A">${legItems}</div></div><p style="font-size:11px;color:#8A887F;margin:14px 0 0">Os descontos somam ${totalDiscPct}% do valor de referência.</p>`;
        }

        const qeDebt = scores.equityValue !== null ? (scores.main - scores.equityValue) : 0;
        const qeEquityLine = (scores.equityValue !== null && qeDebt > 0)
            ? `<p style="font-size:14px;color:#5F5E5A;margin:14px 0 0">Descontada a dívida líquida (<b style="color:#2C2C2A">R$ ${qeFmtM(qeDebt)}</b>) do ponto médio, o <b style="color:#2C2C2A">equity value</b> estimado fica em torno de <b style="color:#2C2C2A">R$ ${qeFmtM(scores.equityValue)}</b>.</p>`
            : '';
        const qeBadge = scores.attrClass === 'success'
            ? { bg: '#E8F5E9', color: '#1B7A3A' }
            : scores.attrClass === 'warning'
                ? { bg: '#FAEEDA', color: '#854F0B' }
                : { bg: '#FDECEA', color: '#9A2020' };
        const qeUplift = scores.upliftPct.toFixed(0);
        const qeCtaLabel = (config.scoring && config.scoring.cta && config.scoring.cta.label) || 'Falar sobre meu processo de M&amp;A';
        const qeCtaHref  = (config.scoring && config.scoring.cta && config.scoring.cta.href)  || '/contato';

        screen.innerHTML = `<div style="display:flex;flex-direction:column;gap:16px;padding-bottom:8px">
  <div style="background:#FFF;border:1px solid #E7E5DC;border-radius:16px;padding:24px 26px">
    <p style="font-size:15px;color:#2C2C2A;font-weight:500;line-height:1.6;margin:0">Estimativa de Enterprise Value pelo múltiplo de EV/EBITDA do seu setor, ajustada por porte e riscos:</p>
  </div>
  <div style="background:#FFF;border:1px solid #E7E5DC;border-radius:16px;padding:24px 26px">
    <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#B8932F;font-weight:700;margin:0 0 10px">Enterprise Value estimado</p>
    <div><span style="font-family:Georgia,serif;font-size:clamp(1.6rem,4vw,2.5rem);font-weight:700;color:#1A2A52;line-height:1.05">R$ ${qeFmtM(scores.min)} – ${qeFmtM(scores.max)}</span><span style="display:inline-block;background:${qeBadge.bg};color:${qeBadge.color};font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;vertical-align:middle;margin-left:12px">Atratividade ${scores.attrLabel}</span></div>
    ${qeEquityLine}
  </div>
  <div style="background:#FFF;border:1px solid #E7E5DC;border-radius:16px;padding:24px 26px">
    <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#B8932F;font-weight:700;margin:0 0 10px">Onde você está na régua do setor</p>
    ${qeFFSvg()}
  </div>
  <div style="background:#FFF;border:1px solid #E7E5DC;border-radius:16px;padding:24px 26px">
    <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#B8932F;font-weight:700;margin:0 0 10px">O que está descontando o seu valor</p>
    ${qeDonutSvg()}
  </div>
  <div style="background:#FAEEDA;border-radius:16px;padding:20px 24px">
    <p style="font-family:Georgia,serif;font-size:clamp(1.4rem,4vw,1.875rem);font-weight:700;color:#854F0B;margin:0 0 6px">+${qeUplift}% de valuation</p>
    <p style="font-size:13.5px;color:#6E4309;margin:0;line-height:1.6">Com preparação prévia à venda, a faixa estimada passa de R$ ${qeFmtM(scores.min)} – R$ ${qeFmtM(scores.max)} para R$ ${qeFmtM(scores.consultMin)} – R$ ${qeFmtM(scores.consultMax)} (central R$ ${qeFmtM(scores.consultCentral)}).</p>
  </div>
  <a href="${qeCtaHref}" class="quiz-cta-contato" style="display:block;background:#B8932F;color:#2C2C2A;font-size:16px;font-weight:700;padding:16px 20px;border-radius:12px;font-family:inherit;text-align:center;text-decoration:none">${qeCtaLabel}</a>
  <p style="font-size:11.5px;color:#8A887F;margin:0;text-align:center;line-height:1.5">Estimativa ilustrativa, com base em múltiplos de mercado por setor e porte e descontos de risco. Não substitui um valuation formal.</p>
  <p style="text-align:center;font-size:11.5px;color:#8A887F;margin:0">Alexandre Cracovsky, CFA · Quanto vale a minha empresa agora?</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:4px"><a href="${segmentHref()}" class="btn-navy">← Ver outras ferramentas</a><button class="btn-outline" id="btn-restart" style="color:var(--slate);border-color:var(--ruledark)">Refazer →</button></div>
</div>`;

        el.appendChild(screen);
        screen.querySelector('#btn-restart').onclick = () => {
            state = { screen: 'welcome', qi: 0, answers: {}, captured: false };
            render();
        };
        wireContactCta(screen);
    }

    function renderResultNormalize(scores) {
        const threshold = getThreshold(scores);
        const screen = makeDiv('quiz-screen active');
        const stageCfgs = config.scoring.stages || [];
        const subgroups = config.scoring.subgroups || [];
        const legendHtml = stageCfgs.map(st => {
            const stageScores = scores.stages[st.id] || {};
            return '<span class="res-leg-item"><span class="res-leg-dot" style="background:' + st.color + '"></span>' + st.label + ' · ' + stageScores.score + '</span>';
        }).join('');
        const stageCardsHtml = stageCfgs.map(st => {
            const stageScores = scores.stages[st.id] || {};
            return '<div class="res-stage-card"><div class="res-stage-label">' + st.label + '</div><div class="res-stage-score" style="color:' + st.color + '">' + stageScores.score + '</div></div>';
        }).join('');
        const actionPlan = config.scoring.actionPlan || [];
        const sortedPlan = [...actionPlan].sort((a, b) => a.priority - b.priority);
        const zeroItems = sortedPlan.filter(item => +(state.answers[item.questionId] || 0) === 0);
        const twoItems = sortedPlan.filter(item => +(state.answers[item.questionId] || 0) === 2);
        const topGaps = [...zeroItems, ...twoItems].slice(0, 3);
        const gapsHtml = topGaps.map((item, i) => {
            const sg = subgroups.find(s => s.questions.includes(item.questionId));
            const dimLabel = sg ? (sg.shortLabel || sg.label) : item.dimension;
            const dimScore = sg ? (scores.dims[sg.shortLabel || sg.label] ?? '—') : '—';
            const gapLabel = i === 0 ? 'SEU MAIOR GAP' : 'AÇÃO PRIORITÁRIA ' + (i + 1);
            return "\n        <div class=\"res-gap-card\">\n          <div class=\"res-gap-header\">" + gapLabel + " · " + dimLabel + ' (' + dimScore + ")</div>\n          " + (item.title ? "<div class=\"res-gap-title\">" + item.title + "</div>" : '') + "\n          <p class=\"res-gap-text\">" + item.action + "</p>\n        </div>";
        }).join('');
        const cta = config.scoring.cta;
        screen.innerHTML = "\n      <div class=\"result-header " + threshold.class + "\">\n        <div class=\"res-ipv-label\">" + (config.scoring.scoreLabel || 'PONTUAÇÃO') + "</div>\n        <div class=\"res-ipv-row\">\n          <div class=\"res-ipv-score\">" + scores.main + "<span class=\"res-ipv-denom\"> /100</span></div>\n          <div class=\"result-level " + threshold.class + '">' + threshold.label + '</div>\n        </div>\n        <p class="result-desc">' + threshold.description + "</p>\n      </div>\n      <div id=\"charts-area\"></div>\n      <div class=\"res-legend\">" + legendHtml + "</div>\n      <div class=\"res-stage-cards\">" + stageCardsHtml + "</div>\n      " + gapsHtml + "\n      <div class=\"result-ctas\">\n        " + (cta ? "<a href=\"" + cta.href + "\" class=\"btn-gold quiz-cta-contato\" style=\"text-align:center;\">" + cta.label + "</a>" : '') + "\n        <a href=\"" + segmentHref() + "\" class=\"btn-navy\">← Ver outras ferramentas</a>\n        <button class=\"btn-outline\" id=\"btn-restart\" style=\"color:var(--slate);border-color:var(--ruledark);\">Refazer →</button>\n      </div>";
        el.appendChild(screen);
        screen.querySelector('#btn-restart').onclick = () => {
            state = { screen: 'welcome', qi: 0, answers: {}, captured: false };
            render();
        };
        wireContactCta(screen);
        renderCharts(scores, screen.querySelector('#charts-area'));
    }

    function injectBsStyles() {
        if (document.getElementById('bs-result-styles')) return;
        const styleEl = document.createElement('style');
        styleEl.id = 'bs-result-styles';
        styleEl.textContent = [
            '.bs-wrap{display:flex;flex-direction:column;gap:16px;padding:24px 0 56px}',
            '.bs-card{background:#fff;border:1px solid #E7E5DC;border-radius:16px;padding:24px 26px}',
            '.bs-eyebrow{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#B8932F;font-weight:700;margin:0 0 10px;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-score{font-family:Georgia,serif;font-weight:700;color:#1A2A52;font-size:52px;line-height:1;margin:0;display:inline}',
            '.bs-badge{display:inline-block;font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;vertical-align:middle;margin-left:12px;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-track{background:#EFEDE6;border-radius:6px;height:11px;overflow:hidden;margin:16px 0 0}',
            '.bs-fill{height:11px;border-radius:6px}',
            '.bs-lead{font-size:14px;color:#5F5E5A;margin:14px 0 0;font-family:var(--ep,"Epilogue",sans-serif);line-height:1.6}',
            '.bs-section-h{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8A887F;font-weight:700;margin:0 0 18px;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-row{display:flex;align-items:center;gap:12px;margin-bottom:16px}',
            '.bs-row:last-child{margin-bottom:0}',
            '.bs-dot{width:11px;height:11px;border-radius:50%;flex:0 0 auto}',
            '.bs-name{width:172px;flex:0 0 auto;font-size:13.5px;color:#5F5E5A;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-bar{flex:1;background:#EFEDE6;border-radius:5px;height:18px;overflow:hidden}',
            '.bs-bar>span{display:block;height:18px;border-radius:5px}',
            '.bs-status{width:82px;flex:0 0 auto;text-align:right;font-size:12.5px;font-weight:600;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-journey-title{font-size:15px;font-weight:600;color:#2C2C2A;margin:0 0 4px;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-journey-lead{font-size:13.5px;color:#5F5E5A;margin:0 0 10px;font-family:var(--ep,"Epilogue",sans-serif);line-height:1.6}',
            '.bs-journey-cap{font-size:11.5px;color:#8A887F;margin:8px 0 0;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-risk-h{font-family:Georgia,serif;font-size:21px;font-weight:700;color:#2C2C2A;margin:0 0 12px}',
            '.bs-risk-p{font-size:14px;color:#5F5E5A;margin:0 0 16px;font-family:var(--ep,"Epilogue",sans-serif);line-height:1.65}',
            '.bs-next{background:#F1F6F4;border-left:4px solid #0F6E56;border-radius:8px;padding:14px 16px}',
            '.bs-next-label{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#0F6E56;font-weight:700;margin:0 0 5px;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-next-text{font-size:13.5px;color:#5F5E5A;margin:0;line-height:1.55;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-inaction{background:#FAEEDA;border-radius:16px;padding:20px 24px}',
            '.bs-inaction p{font-size:13.5px;color:#6E4309;margin:0;line-height:1.65;font-family:var(--ep,"Epilogue",sans-serif)}',
            '.bs-cta{display:block;width:100%;background:#B8932F;color:#2C2C2A;text-decoration:none;text-align:center;font-size:16px;font-weight:700;padding:16px 20px;border-radius:12px;font-family:inherit;box-sizing:border-box}',
            '.bs-cta:hover{background:#A8841F}',
            '.bs-foot{text-align:center;font-size:11.5px;color:#8A887F;margin:4px 0 0;font-family:var(--ep,"Epilogue",sans-serif)}',
            '@media(max-width:520px){.bs-card{padding:20px 18px}.bs-score{font-size:42px}.bs-name{width:118px;font-size:12.5px}.bs-status{width:66px;font-size:11.5px}}'
        ].join('');
        document.head.appendChild(styleEl);
    }

    // Builds the "Jornada M&A" area chart (months per stage, with a cursor at the
    // current stage). `stages` is an array of { label, months }; `curIdx` is the
    // index of the stage the user is in.
    function buildJourneySvg(stages, curIdx) {
        if (!stages.length) return '';
        const n = stages.length;
        const x0 = 60, x1 = 560, y0 = 30, y1 = 210;
        const maxM = Math.max.apply(null, stages.map(s => s.months));
        const xs = n > 1 ? stages.map((_, i) => Math.round(x0 + (x1 - x0) / (n - 1) * i)) : [Math.round((x0 + x1) / 2)];
        const ys = stages.map(s => Math.round(y1 - (s.months / maxM) * (y1 - y0)));
        const polyPoints = xs.map((x, i) => x + ',' + ys[i]).join(' ');
        const areaPath = 'M' + xs.map((x, i) => x + ',' + ys[i]).join(' L') + ' L' + xs[n - 1] + ',' + y1 + ' L' + xs[0] + ',' + y1 + ' Z';
        const yStep = (y1 - y0) / 4;
        const monthStep = maxM / 4;
        const gridLines = [1, 2, 3, 4].map(i => {
            const yy = Math.round(y1 - i * yStep);
            return '<line x1="' + x0 + '" y1="' + yy + '" x2="' + x1 + '" y2="' + yy + '"/>';
        }).join('');
        const yLabels = [0, 1, 2, 3, 4].map(i => {
            return '<text x="52" y="' + Math.round(y1 - i * yStep + 4) + '" text-anchor="end" font-size="9" fill="#8A887F">' + Math.round(i * monthStep) + '</text>';
        }).join('');
        const circles = xs.map((x, i) => {
            if (i === curIdx) return '<circle cx="' + x + '" cy="' + ys[i] + '" r="5.5" fill="#B8932F" stroke="#FFFFFF" stroke-width="1.5"/>';
            return '<circle cx="' + x + '" cy="' + ys[i] + '" r="3" fill="#1A2A52"/>';
        }).join('');
        const cursorLine = curIdx >= 0 ? (
            '<line x1="' + xs[curIdx] + '" y1="' + ys[curIdx] + '" x2="' + xs[curIdx] + '" y2="' + y1 + '" stroke="#B8932F" stroke-width="1.5" stroke-dasharray="4 3"/>' +
            '<text x="' + xs[curIdx] + '" y="' + (ys[curIdx] - 10) + '" text-anchor="middle" font-size="9.5" font-weight="700" fill="#854F0B">você está aqui</text>'
        ) : '';
        const stageLabels = stages.map((s, i) => {
            const isCur = i === curIdx;
            return '<text x="' + xs[i] + '" y="228" text-anchor="middle" font-size="9" ' +
                (isCur ? 'font-weight="700" fill="#854F0B"' : 'fill="#8A887F"') + '>' + s.label + '</text>';
        }).join('');
        return '<svg viewBox="0 0 600 270" width="100%" role="img" aria-label="Jornada M&amp;A · tempo médio por estágio">' +
            '<text x="300" y="16" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1A2A52">Jornada M&amp;A · tempo médio por estágio (meses)</text>' +
            '<g stroke="#E7E5DC" stroke-width="0.8">' + gridLines + '</g>' +
            '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="#C9C7BD" stroke-width="1"/>' +
            '<line x1="' + x0 + '" y1="' + y1 + '" x2="' + x1 + '" y2="' + y1 + '" stroke="#C9C7BD" stroke-width="1"/>' +
            yLabels +
            '<text x="20" y="120" text-anchor="middle" font-size="9.5" fill="#5F5E5A" transform="rotate(-90 20 120)">Meses médios</text>' +
            '<path d="' + areaPath + '" fill="#1A2A52" opacity="0.08"/>' +
            '<polyline points="' + polyPoints + '" fill="none" stroke="#1A2A52" stroke-width="2.4"/>' +
            circles + cursorLine + stageLabels + '</svg>';
    }

    function renderResultMaturity(scores) {
        const screen = makeDiv('quiz-screen active');
        injectBsStyles();
        const pct = scores.pct;
        const stage = scores.stage || {};
        const signalStyles = {
            green:  { label: 'Sólido',     dot: '#1E7A4B', bar: '#1E7A4B', text: '#1E7A4B' },
            yellow: { label: 'Em construção', dot: '#B8932F', bar: '#B8932F', text: '#9A7A1F' },
            red:    { label: 'Frágil',     dot: '#B23A2E', bar: '#B23A2E', text: '#B23A2E' }
        };
        // Header colour follows maturity: low → amber/red, high → green.
        const tclass = pct >= 80 ? 'success' : (pct >= 50 ? 'warning' : 'danger');
        const badgeStyle = ({
            danger:  { bg: '#FAEEDA', color: '#854F0B' },
            warning: { bg: '#FAEEDA', color: '#854F0B' },
            success: { bg: '#EDF7F0', color: '#1E7A4B' }
        })[tclass];
        const fillColor = ({ danger: '#B23A2E', warning: '#B8932F', success: '#1E7A4B' })[tclass];

        const dimRows = (scores.dims || []).map(function(d) {
            const sig = signalStyles[d.signal] || signalStyles.red;
            const w = Math.round(d.pct * 100);
            return '<div class="bs-row">' +
                '<span class="bs-dot" style="background:' + sig.dot + '"></span>' +
                '<span class="bs-name">' + d.label + '</span>' +
                '<div class="bs-bar"><span style="width:' + w + '%;background:' + sig.bar + '"></span></div>' +
                '<span class="bs-status" style="color:' + sig.text + '">' + sig.label + '</span>' +
                '</div>';
        }).join('');

        const stages = config.scoring.stages || [];
        const curIdx = stages.indexOf(stage);
        const journeyStages = stages.map(s => ({ label: s.label, months: s.avgMonths }));
        const svgJourney = buildJourneySvg(journeyStages, curIdx);
        const journeyLead = (config.scoring.journeyText ||
            'Pelo seu diagnóstico, você está no estágio de <strong style="color:#B8932F">{stage}</strong>, a cerca de {months} meses de um deal. Cada frente que você fortalece encurta esse caminho.')
            .replace('{stage}', '<strong style="color:#B8932F">' + (stage.label || '') + '</strong>')
            .replace('{months}', stage.avgMonths != null ? stage.avgMonths : '');

        const worst = scores.worst || {};
        const worstStyle = signalStyles[worst.signal] || signalStyles.red;

        const calloutHTML = config.scoring.callout ?
            '<div class="bs-inaction"><p>' + config.scoring.callout + '</p></div>' : '';
        const ctaCfg = config.scoring.cta;
        const ctaHTML = ctaCfg ?
            '<a href="' + ctaCfg.href + '" class="bs-cta quiz-cta-contato">' + ctaCfg.label + '</a>' : '';

        screen.innerHTML = '<div class="bs-wrap">' +
            '<div class="bs-card">' +
            '<p class="bs-eyebrow">Sua maturidade para um M&amp;A</p>' +
            '<div><span class="bs-score">' + pct + '%</span>' +
            '<span class="bs-badge" style="background:' + badgeStyle.bg + ';color:' + badgeStyle.color + '">' + (stage.label || '') + '</span></div>' +
            '<div class="bs-track"><div class="bs-fill" style="width:' + pct + '%;background:' + fillColor + '"></div></div>' +
            '<p class="bs-lead">' + (stage.description || '') + '</p>' +
            '</div>' +
            '<div class="bs-card">' +
            '<h2 class="bs-section-h">Onde você está mais preparado — e mais frágil</h2>' +
            dimRows +
            '</div>' +
            '<div class="bs-card">' +
            '<p class="bs-journey-title">Onde você está na jornada</p>' +
            '<p class="bs-journey-lead">' + journeyLead + '</p>' +
            svgJourney +
            '<p class="bs-journey-cap">Tempo médio até o fechamento conforme a maturidade do vendedor. A posição acompanha o seu score: quanto mais alto, mais perto da negociação.</p>' +
            '</div>' +
            '<div class="bs-card">' +
            '<p class="bs-risk-h">A frente que mais atrasa o seu deal hoje é <span style="color:' + worstStyle.text + '">' + (worst.label || '') + '</span></p>' +
            '<p class="bs-risk-p">' + (config.scoring.resultText || '') + '</p>' +
            '<div class="bs-next"><p class="bs-next-label">Próximo passo</p>' +
            '<p class="bs-next-text">' + (worst.action || '') + '</p></div>' +
            '</div>' +
            calloutHTML + ctaHTML +
            '<p class="bs-foot">' + config.title + '</p>' +
            '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><a href="' + segmentHref() + '" class="btn-navy">← Ver outras ferramentas</a><button class="btn-outline" id="btn-restart" style="color:var(--slate);border-color:var(--ruledark)">Refazer →</button></div>' +
            '</div>';

        el.appendChild(screen);
        screen.querySelector('#btn-restart').onclick = () => {
            state = { screen: 'welcome', qi: 0, answers: {}, captured: false };
            render();
        };
        wireContactCta(screen);
    }

    function renderResultBlinspots(scores) {
        const threshold = getThreshold(scores);
        const pct = scores.pct;
        const screen = makeDiv('quiz-screen active');
        const signalStyles = {
            green:  { label: 'Protegido',  dot: '#1E7A4B', bar: '#1E7A4B', text: '#1E7A4B' },
            yellow: { label: 'Atenção',    dot: '#B8932F', bar: '#B8932F', text: '#9A7A1F' },
            red:    { label: 'Risco alto', dot: '#B23A2E', bar: '#B23A2E', text: '#B23A2E' }
        };
        const badgeStyle = ({
            danger:  { bg: '#FAEEDA', color: '#854F0B' },
            warning: { bg: '#FAEEDA', color: '#854F0B' },
            success: { bg: '#EDF7F0', color: '#1E7A4B' }
        })[threshold.class] || { bg: '#FAEEDA', color: '#854F0B' };
        const fillColor = ({
            danger: '#B23A2E', warning: '#B8932F', success: '#1E7A4B'
        })[threshold.class] || '#B8932F';
        const journey = config.scoring.journey || {};
        const journeyStages = journey.stages || [];
        let currentJourneyStage = journeyStages[0] || { label: '', months: 24 };
        for (const s of journeyStages) {
            if (pct >= s.minPct) currentJourneyStage = s;
        }
        const journeyText = (journey.text || '').replace('{stage}', '<strong style="color:#B8932F">' + currentJourneyStage.label + '</strong>').replace('{months}', currentJourneyStage.months);
        const worst = scores.worst || {};
        const worstStyle = signalStyles[worst.signal] || signalStyles.red;

        const bsRows = (scores.blindspots || []).map(function(bs) {
            const sig = signalStyles[bs.signal] || signalStyles.red;
            const w = Math.round(bs.pct * 100);
            return '<div class="bs-row">' +
                '<span class="bs-dot" style="background:' + sig.dot + '"></span>' +
                '<span class="bs-name">' + bs.label + '</span>' +
                '<div class="bs-bar"><span style="width:' + w + '%;background:' + sig.bar + '"></span></div>' +
                '<span class="bs-status" style="color:' + sig.text + '">' + sig.label + '</span>' +
                '</div>';
        }).join('');

        const svgJourney = buildJourneySvg(journeyStages, journeyStages.indexOf(currentJourneyStage));

        const calloutHTML = config.scoring.callout ?
            '<div class="bs-inaction"><p>' + config.scoring.callout + '</p></div>' : '';
        const ctaCfg = config.scoring.cta;
        const ctaHTML = ctaCfg ?
            '<a href="' + ctaCfg.href + '" class="bs-cta quiz-cta-contato">' + ctaCfg.label + '</a>' : '';

        injectBsStyles();

        screen.innerHTML = '<div class="bs-wrap">' +
            '<div class="bs-card">' +
            '<p class="bs-eyebrow">Seu diagnóstico de pontos cegos</p>' +
            '<div><span class="bs-score">' + pct + '%</span>' +
            '<span class="bs-badge" style="background:' + badgeStyle.bg + ';color:' + badgeStyle.color + '">' + threshold.label + '</span></div>' +
            '<div class="bs-track"><div class="bs-fill" style="width:' + pct + '%;background:' + fillColor + '"></div></div>' +
            '<p class="bs-lead">' + threshold.description + '</p>' +
            '</div>' +
            '<div class="bs-card">' +
            '<h2 class="bs-section-h">Onde está o seu risco</h2>' +
            bsRows +
            '</div>' +
            '<div class="bs-card">' +
            '<p class="bs-journey-title">Onde você está na jornada</p>' +
            '<p class="bs-journey-lead">' + journeyText + '</p>' +
            svgJourney +
            '<p class="bs-journey-cap">Tempo médio até o fechamento conforme a maturidade do vendedor. A posição acompanha o seu score: quanto mais alto, mais perto da negociação.</p>' +
            '</div>' +
            '<div class="bs-card">' +
            '<p class="bs-risk-h">O seu maior risco hoje está em <span style="color:' + worstStyle.text + '">' + (worst.label || '') + '</span></p>' +
            '<p class="bs-risk-p">' + (config.scoring.resultText || '') + '</p>' +
            '<div class="bs-next"><p class="bs-next-label">Próximo passo</p>' +
            '<p class="bs-next-text">' + (worst.action || '') + '</p></div>' +
            '</div>' +
            calloutHTML + ctaHTML +
            '<p class="bs-foot">' + config.title + '</p>' +
            '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><a href="' + segmentHref() + '" class="btn-navy">← Ver outras ferramentas</a><button class="btn-outline" id="btn-restart" style="color:var(--slate);border-color:var(--ruledark)">Refazer →</button></div>' +
            '</div>';

        el.appendChild(screen);
        screen.querySelector('#btn-restart').onclick = () => {
            state = { screen: 'welcome', qi: 0, answers: {}, captured: false };
            render();
        };
        wireContactCta(screen);
    }

    function computeScore() {
        const type = config.scoring.type;
        if (type === 'blindspots')    return scoreBlinspots();
        if (type === 'sum')           return scoreSum();
        if (type === 'weighted_sum')  return scoreWeightedSum();
        if (type === 'average')       return scoreAverage();
        if (type === 'profile')       return scoreProfile();
        if (type === 'maturity')      return scoreMaturity();
        if (type === 'correct_count') return scoreCorrectCount();
        if (type === 'valuation')     return scoreValuation();
        if (type === 'imv')           return scoreImv();
        if (type === 'value_destroy') return scoreValueDestroy();
        return { main: 0 };
    }

    function scoreSum() {
        let total = 0;
        const dims = {};
        config.questions.forEach(q => {
            const val = +(state.answers[q.id] || 0);
            total += val;
            if (q.dimension) dims[q.dimension] = (dims[q.dimension] || 0) + val;
        });
        if (!config.scoring.normalize) return { main: total, dims };
        const maxScore = config.scoring.max;
        const perQ = maxScore / config.questions.length;
        const normalized = Math.round(total / maxScore * 100);
        const subgroups = config.scoring.subgroups || [];
        const dimScores = {};
        subgroups.forEach(sg => {
            const key = sg.shortLabel || sg.label;
            const sgTotal = sg.questions.reduce((acc, qid) => acc + +(state.answers[qid] || 0), 0);
            const sgMax = sg.questions.length * perQ;
            dimScores[key] = Math.round(sgTotal / sgMax * 100);
        });
        const stageScores = {};
        (config.scoring.stages || []).forEach(stage => {
            const stageQids = (stage.subgroups || []).flatMap(sgId => {
                const sg = subgroups.find(s => s.id === sgId);
                return sg ? sg.questions : [];
            });
            if (!stageQids.length) return;
            const stageTotal = stageQids.reduce((acc, qid) => acc + +(state.answers[qid] || 0), 0);
            const stageMax = stageQids.length * perQ;
            stageScores[stage.id] = {
                label: stage.label,
                score: Math.round(stageTotal / stageMax * 100),
                color: stage.color
            };
        });
        return {
            main: normalized,
            dims: Object.keys(dimScores).length ? dimScores : dims,
            stages: stageScores
        };
    }

    function scoreBlinspots() {
        const blindspots = config.scoring.blindspots || [];
        const signalThresholds = config.scoring.signalThresholds || { green: 0.75, yellow: 0.45 };
        const maxPerQ = 2;
        let totalRaw = 0;
        const results = blindspots.map(bs => {
            const raw = bs.questions.reduce((acc, qid) => acc + +(state.answers[qid] || 0), 0);
            const maxRaw = bs.questions.length * maxPerQ;
            const pct = maxRaw > 0 ? raw / maxRaw : 0;
            let signal;
            if (pct >= signalThresholds.green) signal = 'green';
            else if (pct >= signalThresholds.yellow) signal = 'yellow';
            else signal = 'red';
            totalRaw += raw;
            return { id: bs.id, label: bs.label, action: bs.action, score: raw, maxScore: maxRaw, pct, signal };
        });
        const maxTotal = config.scoring.max || 24;
        const pct = Math.min(100, Math.round(totalRaw / maxTotal * 100));
        const worst = [...results].sort((a, b) => a.pct - b.pct)[0] || results[0];
        return { main: totalRaw, pct, blindspots: results, worst };
    }

    function scoreWeightedSum() {
        let total = 0, maxTotal = 0;
        const items = [];
        config.questions.forEach(q => {
            const w = q.weight || 1;
            const val = +(state.answers[q.id] || 0);
            total += w * val;
            maxTotal += w * (q.maxVal || 2);
            items.push({ label: q.shortLabel || q.text.slice(0, 30) + '…', score: val, weight: w, max: q.maxVal || 2 });
        });
        return { main: total, max: maxTotal, items };
    }

    function scoreAverage() {
        const dims = {};
        config.questions.forEach(q => {
            const val = +(state.answers[q.id] || 1);
            dims[q.dimension || q.id] = val;
        });
        const vals = Object.values(dims);
        return { main: vals.reduce((a, b) => a + b, 0) / vals.length, dims };
    }

    function scoreProfile() {
        const votes = {};
        const maxVotes = {};
        config.questions.forEach(q => {
            const ans = state.answers[q.id];
            const opt = q.options.find(o => o.value === ans);
            if (!opt) return;
            (opt.profiles || []).forEach(p => { votes[p] = (votes[p] || 0) + 1; });
        });
        const profiles = config.scoring.profiles || ['PE', 'EST', 'FAM', 'CONC'];
        profiles.forEach(p => { maxVotes[p] = config.questions.length; });
        const pcts = {};
        profiles.forEach(p => { pcts[p] = Math.round((votes[p] || 0) / config.questions.length * 100); });
        const topProfile = profiles.reduce((a, b) => pcts[a] >= pcts[b] ? a : b);
        return { main: pcts[topProfile], profiles: pcts, topProfile };
    }

    function scoreMaturity() {
        let total = 0;
        config.questions.forEach(q => {
            const w = q.weight || 1;
            const val = +(state.answers[q.id] || 0);
            total += w * val;
        });
        const stages = config.scoring.stages;
        let stage = stages[0];
        for (const s of stages) {
            if (total >= s.min) stage = s;
        }
        const max = config.scoring.max || total || 1;
        const pct = Math.min(100, Math.round(total / max * 100));

        // Per-dimension breakdown (raw value vs. max per dimension, ignoring weight).
        const sigT = config.scoring.signalThresholds || { green: 0.75, yellow: 0.45 };
        const dimCfgs = config.scoring.dimensions || [];
        const dims = dimCfgs.map(d => {
            const qids = d.questions || [];
            const raw = qids.reduce((acc, qid) => acc + +(state.answers[qid] || 0), 0);
            const maxRaw = qids.length * 4;
            const dpct = maxRaw > 0 ? raw / maxRaw : 0;
            const signal = dpct >= sigT.green ? 'green' : (dpct >= sigT.yellow ? 'yellow' : 'red');
            return { label: d.label, pct: dpct, signal, action: d.action || '' };
        });
        let worst = dims[0];
        dims.forEach(d => { if (d.pct < worst.pct) worst = d; });

        return { main: total, stage, pct: pct, dims: dims, worst: worst || {} };
    }

    function scoreCorrectCount() {
        let correct = 0;
        const cats = {};
        config.questions.forEach(q => {
            const isCorrect = state.answers[q.id] === q.correct;
            if (isCorrect) correct++;
            const cat = q.category || 'Geral';
            if (!cats[cat]) cats[cat] = { correct: 0, total: 0 };
            cats[cat].total++;
            if (isCorrect) cats[cat].correct++;
        });
        return { main: correct, max: config.questions.length, cats };
    }

    function scoreValuation() {
        const qReceita = config.questions.find(q => q.id === 'receita');
        const qDivida = config.questions.find(q => q.id === 'divida_liquida');
        const scaleReceita = qReceita && qReceita.scale ? qReceita.scale : 1;
        const scaleDivida = qDivida && qDivida.scale ? qDivida.scale : 1;
        const receita = +(state.answers.receita || 0) * scaleReceita;
        const margemPct = +(state.answers.margem || 20) / 100;
        const ebitda = receita * margemPct;
        const setor = state.answers.setor || 'servicos_facilities';
        const divida = +(state.answers.divida_liquida || 0) * scaleDivida;
        const porteRanges = config.scoring.porteRanges || [];
        let porteBand = 'grande', porteDiscount = 0;
        for (const pr of porteRanges) {
            if (receita <= pr.maxReceita) { porteBand = pr.band; porteDiscount = pr.discount; break; }
        }
        const multiples = config.scoring.multiples;
        const multipleRange = (multiples[setor] && multiples[setor][porteBand]) || { min: 4, max: 7 };
        const qSetor = config.questions.find(q => q.id === 'setor');
        const setorOpt = qSetor ? qSetor.options.find(o => o.value === setor) : null;
        const liquidityClass = setorOpt ? (setorOpt.liquidity || 'media') : 'media';
        const liquidityDiscounts = config.scoring.liquidityDiscounts || { alta: 0.03, media: 0.05, baixa: 0.07 };
        const liquidityDiscount = liquidityDiscounts[liquidityClass] || 0.05;
        const qRisks = config.questions.find(q => q.id === 'risks');
        const riskOpts = qRisks ? qRisks.options : [];
        const selectedRisks = state.answers.risks || [];
        let companyDiscount = 0;
        if (!selectedRisks.includes('none')) {
            selectedRisks.forEach(r => {
                const opt = riskOpts.find(o => o.value === r);
                if (opt && opt.discount) companyDiscount += opt.discount;
            });
        }
        companyDiscount = Math.min(companyDiscount, 0.5);
        const qRegiao = config.questions.find(q => q.id === 'regiao');
        const regiaoOpt = qRegiao ? qRegiao.options.find(o => o.value === state.answers.regiao) : null;
        const regiaoDiscount = regiaoOpt ? (regiaoOpt.discount || 0) : 0;
        const combinedDiscount = (1 - porteDiscount) * (1 - liquidityDiscount) * (1 - companyDiscount) * (1 - regiaoDiscount);
        const noCompanyDiscount = (1 - porteDiscount) * (1 - liquidityDiscount) * (1 - regiaoDiscount);
        const evMin = ebitda * multipleRange.min * combinedDiscount;
        const evMax = ebitda * multipleRange.max * combinedDiscount;
        const evCentral = (evMin + evMax) / 2;
        const benchMin = ebitda * multipleRange.min;
        const benchMax = ebitda * multipleRange.max;
        const benchCentral = (benchMin + benchMax) / 2;
        const consultEbitda = ebitda * 1.15;
        const consultMin = consultEbitda * multipleRange.min * noCompanyDiscount;
        const consultMax = consultEbitda * multipleRange.max * noCompanyDiscount;
        const consultCentral = (consultMin + consultMax) / 2;
        const equityValue = divida > 0 ? evCentral - divida : null;
        const attrPct = benchCentral > 0 ? evCentral / benchCentral : 0;
        const attractivenessThresholds = config.scoring.attractivenessThresholds || { high: 0.85, medium: 0.7 };
        let attrClass, attrLabel;
        if (attrPct >= attractivenessThresholds.high) { attrClass = 'success'; attrLabel = 'Alta'; }
        else if (attrPct >= attractivenessThresholds.medium) { attrClass = 'warning'; attrLabel = 'Média'; }
        else { attrClass = 'danger'; attrLabel = 'Requer Preparação'; }
        const upliftPct = evCentral > 0 ? (consultCentral - evCentral) / evCentral * 100 : 0;
        const discountPorte    = benchCentral * porteDiscount;
        const discountLiquidez = benchCentral * (1 - porteDiscount) * liquidityDiscount;
        const discountCompany  = benchCentral * (1 - porteDiscount) * (1 - liquidityDiscount) * companyDiscount;
        const discountRegiao   = benchCentral * (1 - porteDiscount) * (1 - liquidityDiscount) * (1 - companyDiscount) * regiaoDiscount;
        return {
            main: evCentral, min: evMin, max: evMax,
            benchMin, benchMax, benchCentral,
            consultMin, consultMax, consultCentral,
            equityValue, attrPct, attrClass, attrLabel, upliftPct,
            ebitda, sector: setor, porteBand,
            discountAmounts: {
                valorRetido: evCentral,
                porte: discountPorte,
                liquidez: discountLiquidez,
                company: discountCompany,
                regiao: discountRegiao
            }
        };
    }

    function scoreImv() {
        const dims = {};
        config.questions.forEach(q => { dims[q.id] = +(state.answers[q.id] || 1); });
        const vals = Object.values(dims);
        const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
        return { main: avg, dims };
    }

    function scoreValueDestroy() {
        let correct = 0;
        const cats = {};
        config.questions.forEach(q => {
            const isCorrect = state.answers[q.id] === q.correct;
            if (isCorrect) correct++;
            const destroyer = q.destroyer || q.id;
            if (!cats[destroyer]) cats[destroyer] = { correct: 0, discount: q.discount || 0.1 };
            if (isCorrect) cats[destroyer].correct = 1;
        });
        return { main: correct, max: config.questions.length, cats };
    }

    function getThreshold(scores) {
        const thresholds = config.scoring.thresholds;
        for (const t of thresholds) {
            if (scores.main <= t.max) return t;
        }
        return thresholds[thresholds.length - 1];
    }

    function formatScore(value, scoring) {
        if (scoring.type === 'valuation') return 'R$ ' + formatCurrency(value);
        if (scoring.type === 'average' || scoring.type === 'imv') return value.toFixed(1) + '/5';
        if (scoring.type === 'maturity') return value + '/24';
        if (scoring.type === 'correct_count' || scoring.type === 'value_destroy') return value + '/' + scoring.max;
        return Math.round(value);
    }

    function formatCurrency(value) {
        if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
        if (value >= 1000000)    return (value / 1000000).toFixed(1) + 'M';
        if (value >= 1000)       return (value / 1000).toFixed(0) + 'K';
        return value.toFixed(0);
    }

    function renderCharts(scores, chartsArea) {
        if (!config.charts || !window.Highcharts) return;
        config.charts.forEach((chartCfg, idx) => {
            const wrapper = makeDiv('chart-wrapper');
            wrapper.innerHTML = "<div class=\"chart-title\">" + chartCfg.title + "</div><div id=\"hc-" + idx + "\" style=\"height:" + (chartCfg.height || 260) + "px\"></div>";
            chartsArea.appendChild(wrapper);
            setTimeout(() => buildChart(chartCfg, scores, 'hc-' + idx), 50);
        });
    }

    const hcBaseTheme = {
        chart: {
            backgroundColor: '#fff',
            style: { fontFamily: "'Epilogue',sans-serif" }
        },
        colors: ['#1B3A7A', '#B8952A', '#2A52A8', '#D4AE50', '#6B7A8D', '#0A1628'],
        title: { text: '' },
        credits: { enabled: false },
        legend: {
            itemStyle: {
                fontFamily: "'DM Mono',monospace",
                fontSize: '10px',
                fontWeight: '400',
                color: '#6B7A8D'
            }
        }
    };

    function buildChart(chartCfg, scores, containerId) {
        const opts = Object.assign({}, hcBaseTheme, {
            chart: Object.assign({}, hcBaseTheme.chart, { renderTo: containerId })
        });
        const type = chartCfg.type;
        if (type === 'radar') {
            const dims = scores.dims || {};
            const keys = Object.keys(dims);
            const vals = keys.map(k => +(dims[k] || 0));
            const scoring = config && config.scoring || {};
            const stageColorMap = {};
            (scoring.stages || []).forEach(st => { stageColorMap[st.id] = st.color; });
            const getPointColor = key => {
                const sg = (scoring.subgroups || []).find(s => (s.shortLabel || s.label) === key);
                return (sg && stageColorMap[sg.stage]) || '#B8952A';
            };
            const radarData = keys.map((key, i) => ({
                y: vals[i],
                marker: { fillColor: getPointColor(key), lineColor: getPointColor(key), radius: 4 }
            }));
            Object.assign(opts, {
                chart: Object.assign({}, opts.chart, { polar: true, type: 'area' }),
                xAxis: {
                    categories: keys,
                    tickmarkPlacement: 'on',
                    lineWidth: 0,
                    gridLineColor: '#EEF2F9',
                    labels: { style: { fontSize: '10px', color: '#6B7A8D', fontFamily: "'DM Mono'" } }
                },
                yAxis: {
                    min: 0,
                    max: chartCfg.yMax || undefined,
                    gridLineColor: '#EEF2F9',
                    labels: { enabled: false }
                },
                series: [{
                    name: 'Pontuação',
                    data: radarData,
                    pointPlacement: 'on',
                    color: 'rgba(27,58,122,.6)',
                    fillColor: 'rgba(27,58,122,.12)',
                    lineWidth: 2,
                    marker: { fillColor: '#B8952A', radius: 4 }
                }],
                tooltip: { pointFormat: '<b>{point.y}</b>' }
            });
        } else if (type === 'column') {
            const cats = scores.cats || {};
            const catKeys = Object.keys(cats);
            Object.assign(opts, {
                chart: Object.assign({}, opts.chart, { type: 'column' }),
                xAxis: { categories: catKeys, labels: { style: { fontSize: '10px', color: '#6B7A8D' } } },
                yAxis: { min: 0, title: { text: '' } },
                series: [
                    { name: 'Acertos', data: catKeys.map(k => cats[k].correct || 0), color: '#1B3A7A' },
                    { name: 'Total',   data: catKeys.map(k => cats[k].total   || 0), color: '#EEF2F9' }
                ]
            });
        } else if (type === 'donut') {
            const donutData = chartCfg.dataFn ? chartCfg.dataFn(scores) : buildDonutData(scores);
            Object.assign(opts, {
                chart: Object.assign({}, opts.chart, { type: 'pie' }),
                plotOptions: { pie: { innerSize: '55%', dataLabels: { style: { fontSize: '11px', fontFamily: "'DM Mono'" } } } },
                series: [{ name: chartCfg.seriesName || 'Valor', data: donutData, colorByPoint: true }],
                tooltip: { pointFormat: scores.discountAmounts ? '<b>{point.name}: R$ {point.y:,.0f} ({point.percentage:.0f}%)</b>' : '<b>{point.percentage:.0f}%</b>' }
            });
        } else if (type === 'waterfall') {
            const base = 10;
            const cats = scores.cats || {};
            const wfData = [{ name: 'Base', y: base, color: '#1B3A7A' }];
            const catKeys = Object.keys(cats);
            catKeys.forEach(k => {
                if (!cats[k].correct) wfData.push({ name: k, y: -(cats[k].discount || 0.1) * base, color: '#9A2020', isIntermediateSum: false });
            });
            wfData.push({ name: 'Valor Final', isSum: true, color: '#B8952A' });
            Object.assign(opts, {
                chart: Object.assign({}, opts.chart, { type: 'waterfall' }),
                xAxis: { type: 'category', labels: { style: { fontSize: '10px' } } },
                yAxis: { title: { text: 'Múltiplo de EV' } },
                series: [{ data: wfData, dataLabels: { enabled: true, style: { fontSize: '10px' } } }]
            });
        } else if (type === 'columnrange') {
            const toM = v => +(v / 1000000).toFixed(2);
            Object.assign(opts, {
                chart: Object.assign({}, opts.chart, { type: 'columnrange', inverted: true }),
                xAxis: {
                    categories: ['Sua empresa hoje', 'Benchmark do setor', 'Com preparação'],
                    labels: { style: { fontSize: '11px', color: '#6B7A8D' } }
                },
                yAxis: { title: { text: 'Enterprise Value (R$ M)' }, labels: { style: { fontSize: '10px' } } },
                plotOptions: { columnrange: { grouping: false, borderWidth: 0, pointWidth: 28 } },
                legend: { enabled: true },
                series: [
                    { name: 'Sua empresa hoje',   color: '#1B3A7A', data: [[toM(scores.min),      toM(scores.max)],      null, null] },
                    { name: 'Benchmark do setor', color: '#6B7A8D', data: [null, [toM(scores.benchMin),  toM(scores.benchMax)],  null] },
                    { name: 'Com preparação',     color: '#B8952A', data: [null, null, [toM(scores.consultMin), toM(scores.consultMax)]] }
                ],
                tooltip: { pointFormat: "<span style=\"color:{series.color}\">●</span> {series.name}: <b>R$ {point.low}M – R$ {point.high}M</b><br/>" }
            });
        }
        if (Highcharts) Highcharts.chart(containerId, opts);
    }

    function buildDonutData(scores) {
        if (scores.discountAmounts) {
            const d = scores.discountAmounts;
            return [
                { name: 'Valor retido',        y: d.valorRetido, color: '#1B3A7A' },
                { name: 'Desconto de porte',   y: d.porte,       color: '#9A2020' },
                { name: 'Desconto de liquidez',y: d.liquidez,    color: '#B85820' },
                { name: 'Riscos da empresa',   y: d.company,     color: '#C09030' },
                { name: 'Desconto de região',  y: d.regiao,      color: '#6B7A8D' }
            ].filter(item => item.y > 0);
        }
        if (scores.profiles) {
            return Object.entries(scores.profiles).map(([name, y]) => ({ name, y, color: profileColor(name) }));
        }
        if (scores.cats) {
            const correctCount = Object.values(scores.cats).filter(c => c.correct).length;
            const errCount = Object.keys(scores.cats).length - correctCount;
            return [
                { name: 'Acertos', y: correctCount, color: '#1B3A7A' },
                { name: 'Erros',   y: errCount,     color: '#EEF2F9' }
            ];
        }
        return [
            { name: 'Score',    y: scores.main,                          color: '#1B3A7A' },
            { name: 'Restante', y: (scores.max || 10) - scores.main,     color: '#EEF2F9' }
        ];
    }

    function profileColor(profile) {
        const map = { PE: '#0A1628', EST: '#1B3A7A', FAM: '#B8952A', CONC: '#2A52A8' };
        return map[profile] || '#6B7A8D';
    }

    function makeDiv(className) {
        const div = document.createElement('div');
        if (className) div.className = className;
        return div;
    }

    return { init };
})());

(function() {
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function validateEmail(v) {
        return EMAIL_RE.test(v);
    }

    function validatePhone(v) {
        if (!v) return false;
        var d = v.replace(/\D/g, '');
        if (d.length >= 12 && d.slice(0, 2) === '55') d = d.slice(2);
        return d.length === 11 && d[2] === '9';
    }

    function shakeErr(el, msg) {
        var orig = el.style.borderColor;
        el.style.borderColor = 'var(--danger,#9A2020)';
        el.style.animation = 'qe-shake .35s ease';
        var errEl = el.parentNode && el.parentNode.querySelector('.qe-err-msg');
        if (!errEl && el.parentNode) {
            errEl = document.createElement('div');
            errEl.className = 'qe-err-msg';
            errEl.style.cssText = 'color:var(--danger,#9A2020);font-size:12px;margin-top:6px;font-family:var(--ep,"Epilogue",sans-serif);';
            el.parentNode.insertBefore(errEl, el.nextSibling);
        }
        if (errEl) errEl.textContent = msg || 'Campo inválido.';
        try { el.focus(); } catch (x) {}
        setTimeout(function() {
            el.style.borderColor = orig;
            el.style.animation = '';
            if (errEl && errEl.parentNode) errEl.parentNode.removeChild(errEl);
        }, 3500);
    }

    var _s = document.createElement('style');
    _s.textContent = '@keyframes qe-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}60%{transform:translateX(5px)}80%{transform:translateX(-3px)}}';
    document.head && document.head.appendChild(_s);

    document.addEventListener('click', function(e) {
        var btn = e.target.closest('.btn-gold');
        if (!btn) return;
        var capture = btn.closest('.quiz-capture');
        if (!capture) return;
        var txt = capture.querySelector('input[type=text].form-input');
        if (txt) {
            var tv = txt.value.trim();
            if (!tv) {
                e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
                shakeErr(txt, 'Preencha este campo.');
                return;
            }
            if (tv.length < 3) {
                e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
                shakeErr(txt, 'O nome deve ter pelo menos 3 letras.');
                return;
            }
        }
        var em = capture.querySelector('input[type=email].form-input');
        if (em) {
            var ev = em.value.trim();
            if (!ev) {
                e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
                shakeErr(em, 'Preencha seu e-mail.');
                return;
            }
            if (!validateEmail(ev)) {
                e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
                shakeErr(em, 'Digite um e-mail válido (ex: voce@email.com).');
                return;
            }
        }
        var tel = capture.querySelector('input[type=tel].form-input');
        if (tel) {
            var pv = tel.value.trim();
            if (!pv) {
                e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
                shakeErr(tel, 'Preencha seu WhatsApp com DDD (ex: 11 99999-9999).');
                return;
            }
            if (!validatePhone(pv)) {
                e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
                shakeErr(tel, 'Digite um WhatsApp válido com DDD (ex: 11 99999-9999).');
                return;
            }
        }
    }, true);

    document.addEventListener('blur', function(e) {
        var el = e.target;
        if (!el.classList.contains('form-input')) return;
        var v = el.value.trim();
        if (el.type === 'email' && v && !validateEmail(v)) shakeErr(el, 'Digite um e-mail válido (ex: voce@email.com).');
        if (el.type === 'tel' && v && !validatePhone(v)) shakeErr(el, 'Digite um WhatsApp válido com DDD (ex: 11 99999-9999).');
    }, true);
})();
