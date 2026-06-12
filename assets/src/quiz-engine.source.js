/* Fonte legível do quiz-engine. Editar AQUI e re-ofuscar para assets/quiz-engine.js (ver CLAUDE.md). */
/* Stub do antigo decoder de strings da ofuscação — aliases remanescentes apontam para cá e nunca são chamados. */
function a0_0x526a() { return ''; }
const QuizEngine = ((() => {
    const _0x1a688b = a0_0x526a;
    let _0x18181a, _0x3a5033, _0x274703;

    function _0x455745(_0x5d8586, _0x4b5934) {
        _0x18181a = _0x4b5934, _0x3a5033 = _0x5d8586, _0x274703 = {
            'screen': 'welcome',
            'qi': 0x0,
            'answers': {},
            'captured': ![]
        }, _0x4bb4a5();
    }

    function _0x4bb4a5() {
        const _0x19ed49 = a0_0x526a;
        _0x3a5033["innerHTML"] = '', _0x3a5033["className"] = "quiz-app";
        if (_0x274703["screen"] === 'welcome') _0x5bef08();
        else {
            if (_0x274703["screen"] === "question") _0x2a8034();
            else {
                if (_0x274703["screen"] === "capture") _0x10bfa4();
                else {
                    if (_0x274703["screen"] === 'result') _0x3eecce();
                }
            }
        }
    }

    function _0x5bef08() {
        const _0x4a09e3 = a0_0x526a,
            _0x539f00 = _0xdd5eb9("quiz-screen active");
        _0x539f00["innerHTML"] = "\n      <span class=\"welcome-icon\">" + (_0x18181a["icon"] || '📊') + "</span>\n      <h1 class=\"welcome-h1\">" + _0x18181a["title"] + '</h1>\x0a\x20\x20\x20\x20\x20\x20<p\x20class=\x22welcome-sub\x22>' + _0x18181a["subtitle"] + "</p>\n      <div class=\"welcome-meta\">\n        <div class=\"welcome-meta-item\">⏱ " + (_0x18181a["estimatedTime"] || "5 min") + "</div>\n        <div class=\"welcome-meta-item\">📋 " + _0x18181a['questions']['length'] + '\x20perguntas</div>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-gold\x22\x20id=\x22btn-start\x22>Começar\x20agora\x20→</button>\x0a\x20\x20\x20\x20', _0x3a5033["appendChild"](_0x539f00), _0x539f00["querySelector"]("#btn-start")["onclick"] = () => {
            const _0x6310a = _0x4a09e3;
            _0x274703["screen"] = "question", _0x4bb4a5();
        };
    }

    function _0x2a8034() {
        const _0x14cfb4 = a0_0x526a,
            _0x4b1f6b = _0x18181a["questions"][_0x274703['qi']],
            _0x38e8b6 = Math["round"](_0x274703['qi'] / _0x18181a["questions"]["length"] * 0x64),
            _0x1d87a7 = _0xdd5eb9('quiz-screen\x20active');
        _0x1d87a7["innerHTML"] = "\n      <div class=\"quiz-progress\">\n        <div class=\"progress-meta\">\n          <span class=\"progress-label\">" + (_0x4b1f6b["dimension"] || '') + "</span>\n          <span class=\"progress-count\">" + (_0x274703['qi'] + 0x1) + " / " + _0x18181a["questions"]["length"] + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22progress-bar\x22><div\x20class=\x22progress-fill\x22\x20style=\x22width:' + _0x38e8b6 + '%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20' + (_0x4b1f6b['dimension'] ? "<div class=\"question-dim\">" + _0x4b1f6b['dimension'] + "</div>" : '') + "\n      <div class=\"question-text\">" + _0x4b1f6b["text"] + "</div>\n      <div id=\"q-input\"></div>\n      <div class=\"quiz-nav\">\n        <button class=\"btn-outline btn-back\" id=\"btn-back\" style=\"font-size:11px;padding:9px 18px;color:var(--slate);border-color:var(--ruledark);\">← Voltar</button>\n        <div class=\"quiz-nav-right\">\n          <button class=\"btn-gold\" id=\"btn-next\" style=\"opacity:.4;pointer-events:none;\">Próxima →</button>\n        </div>\n      </div>\n    ", _0x3a5033['appendChild'](_0x1d87a7);
        const _0x457086 = _0x1d87a7['querySelector']("#q-input"),
            _0x5ac932 = _0x1d87a7["querySelector"]("#btn-next"),
            _0x588d0f = _0x1d87a7['querySelector']('#btn-back'),
            _0xffd5b1 = _0x274703["answers"][_0x4b1f6b['id']];
        _0xffd5b1 !== undefined && (_0x5ac932["style"]["opacity"] = '1', _0x5ac932["style"]["pointerEvents"] = "auto");
        if (_0x4b1f6b['type'] === "choice") _0x240b08(_0x4b1f6b, _0x457086, _0x5ac932, _0xffd5b1);
        else {
            if (_0x4b1f6b['type'] === "scale") _0x2b590d(_0x4b1f6b, _0x457086, _0x5ac932, _0xffd5b1);
            else {
                if (_0x4b1f6b['type'] === "number") _0x1c4a93(_0x4b1f6b, _0x457086, _0x5ac932, _0xffd5b1);
                else {
                    if (_0x4b1f6b["type"] === "select") _0x29ad13(_0x4b1f6b, _0x457086, _0x5ac932, _0xffd5b1);
                    else {
                        if (_0x4b1f6b["type"] === "multichoice") _0x36fc9b(_0x4b1f6b, _0x457086, _0x5ac932, _0xffd5b1);
                    }
                }
            }
        }
        _0x588d0f['onclick'] = () => {
            const _0x1ff00c = _0x14cfb4;
            _0x274703['qi'] > 0x0 ? (_0x274703['qi']--, _0x4bb4a5()) : (_0x274703["screen"] = "welcome", _0x4bb4a5());
        }, _0x5ac932["onclick"] = () => {
            const _0x4b9c6e = _0x14cfb4;
            _0x274703['qi']++, _0x274703['qi'] >= _0x18181a["questions"]["length"] && (_0x274703["screen"] = _0x274703['captured'] ? "result" : "capture"), _0x4bb4a5();
        };
    }

    function _0x3f6346(_0x5b11aa) {
        const _0x23d4f1 = a0_0x526a;
        _0x5b11aa['style']['opacity'] = '1', _0x5b11aa["style"]["pointerEvents"] = 'auto';
    }

    function _0x240b08(_0x27e819, _0x13928c, _0x514b4c, _0x595eca) {
        const _0x4460a5 = a0_0x526a,
            _0x370284 = _0xdd5eb9("options-list");
        _0x27e819['options']["forEach"](_0x2ed3b1 => {
            const _0xeea7d5 = _0x4460a5,
                _0x43f0d7 = document["createElement"]("button");
            _0x43f0d7['className'] = "option-btn" + (_0x595eca === _0x2ed3b1['value'] ? " selected" : ''), _0x43f0d7["textContent"] = _0x2ed3b1["label"], _0x43f0d7["onclick"] = () => {
                const _0x53bdba = _0xeea7d5;
                _0x370284["querySelectorAll"](".option-btn")["forEach"](_0x822fee => _0x822fee["classList"]['remove']("selected")), _0x43f0d7["classList"]["add"]("selected"), _0x274703["answers"][_0x27e819['id']] = _0x2ed3b1["value"], _0x3f6346(_0x514b4c);
            }, _0x370284["appendChild"](_0x43f0d7);
        }), _0x13928c["appendChild"](_0x370284);
    }

    function _0x2b590d(_0x58d65c, _0x3c5286, _0x363e02, _0x3a659b) {
        const _0x22d102 = a0_0x526a,
            _0x146a89 = _0x58d65c["min"] || 0x1,
            _0x3f9328 = _0x58d65c['max'] || 0x5,
            _0x39ee4f = _0x3a659b !== undefined ? _0x3a659b : Math["round"]((_0x146a89 + _0x3f9328) / 0x2);
        _0x3c5286["innerHTML"] = "\n      <div class=\"scale-input\">\n        <input type=\"range\" min=\"" + _0x146a89 + "\" max=\"" + _0x3f9328 + "\" value=\"" + _0x39ee4f + "\" id=\"range-input\">\n        <div class=\"scale-labels\">\n          <span class=\"scale-label\">" + (_0x58d65c['minLabel'] || _0x146a89) + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22scale-label\x22\x20id=\x22range-display\x22\x20style=\x22color:var(--gold);font-family:var(--mo);\x22>' + _0x39ee4f + "</span>\n          <span class=\"scale-label\">" + (_0x58d65c["maxLabel"] || _0x3f9328) + "</span>\n        </div>\n      </div>\n    ", _0x274703["answers"][_0x58d65c['id']] = _0x39ee4f, _0x3f6346(_0x363e02), _0x3c5286['querySelector']('#range-input')["oninput"] = function() {
            const _0x40a4e4 = _0x22d102;
            _0x274703["answers"][_0x58d65c['id']] = +this["value"], _0x3c5286["querySelector"]("#range-display")["textContent"] = this["value"];
        };
    }

    function _0x1c4a93(_0x31bb40, _0x31759c, _0x557ea4, _0x1d238e) {
        const _0x5ae895 = a0_0x526a;
        _0x31759c["innerHTML"] = "<input class=\"number-input\" type=\"number\" id=\"num-in\" placeholder=\"" + (_0x31bb40['placeholder'] || '') + "\" value=\"" + (_0x1d238e || '') + "\" min=\"" + (_0x31bb40['min'] || 0x0) + '\x22>';
        if (_0x1d238e !== undefined) _0x3f6346(_0x557ea4);
        _0x31759c["querySelector"]("#num-in")["oninput"] = function() {
            const _0x3795 = _0x5ae895;
            this['value'] && (_0x274703["answers"][_0x31bb40['id']] = +this["value"], _0x3f6346(_0x557ea4));
        };
    }

    function _0x29ad13(_0x2e15a9, _0x16e980, _0x57e085, _0x23f9b1) {
        const _0x31bb6e = a0_0x526a;
        let _0xa3d1e8 = _0x2e15a9["options"]["map"](_0x1a1b48 => "<option value=\"" + _0x1a1b48["value"] + '\x22\x20' + (_0x23f9b1 === _0x1a1b48["value"] ? 'selected' : '') + '>' + _0x1a1b48["label"] + "</option>")["join"]('');
        _0x16e980["innerHTML"] = '<select\x20class=\x22select-input\x22\x20id=\x22sel-in\x22><option\x20value=\x22\x22>Selecione...</option>' + _0xa3d1e8 + "</select>";
        if (_0x23f9b1 !== undefined) _0x3f6346(_0x57e085);
        _0x16e980["querySelector"]('#sel-in')["onchange"] = function() {
            const _0x5a17f7 = _0x31bb6e;
            this["value"] && (_0x274703["answers"][_0x2e15a9['id']] = this["value"], _0x3f6346(_0x57e085));
        };
    }

    function _0x36fc9b(_0x4c3495, _0x3ef23f, _0x59d754, _0x469283) {
        const _0x10b438 = a0_0x526a,
            _0x24df54 = _0x469283 || [],
            _0x48ce45 = _0xdd5eb9('options-list');
        _0x4c3495["options"]["forEach"](_0x266287 => {
            const _0x1b7e29 = _0x10b438,
                _0x2de998 = document["createElement"]("button");
            _0x2de998["className"] = "option-btn" + (_0x24df54['includes'](_0x266287["value"]) ? " selected" : ''), _0x2de998["textContent"] = _0x266287["label"], _0x2de998["onclick"] = () => {
                const _0x165488 = _0x1b7e29;
                _0x2de998["classList"]["toggle"]("selected");
                const _0xadcf7 = Array["from"](_0x48ce45["querySelectorAll"](".option-btn.selected"))["map"](_0x7d2425 => {
                    const _0x5db3a1 = _0x165488;
                    return _0x4c3495["options"]["find"](_0x1489e1 => _0x1489e1["label"] === _0x7d2425["textContent"])["value"];
                });
                _0x274703["answers"][_0x4c3495['id']] = _0xadcf7;
                if (_0xadcf7['length']) _0x3f6346(_0x59d754);
                else _0x59d754["style"]["opacity"] = '.4', _0x59d754["style"]["pointerEvents"] = "none";
            }, _0x48ce45["appendChild"](_0x2de998);
        });
        if (_0x24df54['length']) _0x3f6346(_0x59d754);
        _0x3ef23f["appendChild"](_0x48ce45);
    }

    function _0x10bfa4() {
        const _0x580cc4 = a0_0x526a,
            _0x2dd6d0 = _0xdd5eb9("quiz-screen active"),
            _0x1a906f = _0x18181a["segment"] === "empreendedor",
            _0x5cf6b8 = _0x1a906f ? _0x567aaf() : _0x14b5e3(),
            _0x5f3b1f = _0x5cf6b8["length"];
        let _0x92cf13 = 0x0;
        const _0x25fa34 = {},
            _0x26994c = _0xdd5eb9('quiz-capture');
        _0x2dd6d0["appendChild"](_0x26994c);
        const _0x138415 = _0xdd5eb9("quiz-progress");
        _0x138415['innerHTML'] = '<div\x20class=\x22progress-meta\x22><span\x20class=\x22progress-label\x22\x20id=\x22cp-lbl\x22></span><span\x20class=\x22progress-count\x22\x20id=\x22cp-cnt\x22></span></div><div\x20class=\x22progress-bar\x22><div\x20class=\x22progress-fill\x22\x20id=\x22cp-fill\x22\x20style=\x22width:0%\x22></div></div>', _0x26994c['appendChild'](_0x138415);
        const _0x9efcf7 = _0xdd5eb9('');
        _0x9efcf7['style']["cssText"] = "position:relative;overflow:hidden;min-height:280px;", _0x26994c['appendChild'](_0x9efcf7), _0x3a5033["appendChild"](_0x2dd6d0);

        function _0x1b4347(_0x1080e3) {
            const _0x14f6f9 = _0x580cc4,
                _0xb532ae = _0x2dd6d0["querySelector"]("#cp-fill"),
                _0x2459c2 = _0x2dd6d0["querySelector"]("#cp-cnt");
            if (_0xb532ae) _0xb532ae['style']["width"] = Math["round"](_0x1080e3 / _0x5f3b1f * 0x64) + '%';
            if (_0x2459c2) _0x2459c2['textContent'] = _0x1080e3 + 0x1 + " / " + _0x5f3b1f;
        }

        function _0x1c3719(_0x190bb8, _0x1b1404) {
            const _0x5d02b = _0x580cc4,
                _0x1807dd = _0x5cf6b8[_0x190bb8],
                _0x546b12 = _0x9efcf7["querySelector"](".cap-step"),
                _0x31c380 = document['createElement']("div");
            _0x31c380["className"] = "cap-step", _0x16b8de(_0x1807dd, _0x190bb8, _0x31c380), _0x31c380['style']['cssText'] = "opacity:0;transform:translateX(" + (_0x1b1404 >= 0x0 ? "32px" : "-32px") + ')';
            if (_0x546b12) {
                const _0x35bed4 = _0x546b12["offsetHeight"];
                _0x9efcf7["style"]["minHeight"] = _0x35bed4 + 'px', _0x546b12['style']["position"] = 'absolute', _0x546b12["style"]["top"] = '0', _0x546b12['style']["left"] = '0', _0x546b12['style']['right'] = '0', _0x546b12["style"]["zIndex"] = '1', _0x546b12["style"]["pointerEvents"] = 'none';
                const _0x49ea5d = _0x546b12;
                requestAnimationFrame(() => {
                    const _0x2798b6 = _0x5d02b;
                    _0x49ea5d['style']['transition'] = 'opacity\x20.22s\x20ease,transform\x20.22s\x20ease', _0x49ea5d['style']["opacity"] = '0', _0x49ea5d['style']["transform"] = 'translateX(' + (_0x1b1404 >= 0x0 ? "-32px" : '32px') + ')';
                }), setTimeout(() => {
                    const _0x9ee654 = _0x5d02b;
                    if (_0x49ea5d['parentNode']) _0x49ea5d["parentNode"]["removeChild"](_0x49ea5d);
                    _0x9efcf7['style']["minHeight"] = '';
                }, 0x104);
            }
            _0x9efcf7["appendChild"](_0x31c380), requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const _0x1be566 = a0_0x526a;
                    _0x31c380["style"]["transition"] = "opacity .28s ease,transform .28s ease", _0x31c380["style"]["opacity"] = '1', _0x31c380['style']["transform"] = "translateX(0)";
                    const _0x3258b9 = _0x31c380["querySelector"]("input:not([type=radio]),textarea");
                    if (_0x3258b9) setTimeout(() => {
                        const _0x30ef30 = _0x1be566;
                        try {
                            _0x3258b9["focus"]();
                        } catch (_0x35aae6) {}
                    }, 0x136);
                });
            }), _0x1b4347(_0x190bb8);
        }

        function _0x16b8de(_0x3dc548, _0x3e4005, _0x2dc9ed) {
            const _0x3dee42 = _0x580cc4;
            if (_0x3e4005 > 0x0) {
                const _0x50f30b = document['createElement']('button');
                _0x50f30b["className"] = "btn-outline btn-back", _0x50f30b["type"] = "button", _0x50f30b['style']["cssText"] = "font-size:11px;padding:8px 16px;color:var(--slate);border-color:var(--ruledark);margin-bottom:14px;display:inline-block;", _0x50f30b["textContent"] = "← Voltar", _0x50f30b["onclick"] = () => {
                    _0x92cf13 = _0x3e4005 - 0x1, _0x1c3719(_0x92cf13, -0x1);
                }, _0x2dc9ed["appendChild"](_0x50f30b);
            } else {
                const _0x318b72 = document["createElement"]("button");
                _0x318b72["className"] = "btn-outline btn-back", _0x318b72["type"] = "button", _0x318b72["style"]["cssText"] = 'font-size:11px;padding:8px\x2016px;color:var(--slate);border-color:var(--ruledark);margin-bottom:14px;display:inline-block;', _0x318b72['textContent'] = "← Voltar ao quiz", _0x318b72["onclick"] = () => {
                    const _0x47f372 = _0x3dee42;
                    _0x274703['qi'] = _0x18181a["questions"]["length"] - 0x1, _0x274703["screen"] = "question", _0x4bb4a5();
                }, _0x2dc9ed["appendChild"](_0x318b72);
            }
            const _0x21e84c = document["createElement"]("div");
            _0x21e84c["style"]["cssText"] = "font-family:var(--mo);font-size:11px;color:var(--gold2);letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px;opacity:.75;", _0x21e84c["textContent"] = _0x3e4005 + 0x1 + '\x20/\x20' + _0x5f3b1f, _0x2dc9ed['appendChild'](_0x21e84c);
            const _0xc8ab89 = document["createElement"]("div");
            _0xc8ab89["style"]["cssText"] = "font-family:var(--cg);font-size:clamp(1.6rem,3.5vw,2.1rem);font-weight:300;color:#fff;line-height:1.18;margin-bottom:24px;", _0xc8ab89["textContent"] = _0x3dc548['question'], _0x2dc9ed['appendChild'](_0xc8ab89), _0x3dc548["type"] === "radio" ? _0x267520(_0x3dc548, _0x2dc9ed, _0x3e4005) : _0x3383c3(_0x3dc548, _0x2dc9ed, _0x3e4005);
        }

        function _0x3383c3(_0x18d4db, _0x3b49a3, _0x22878e) {
            const _0x43ff49 = _0x580cc4,
                _0x459761 = document["createElement"]("input");
            _0x459761['type'] = _0x18d4db["type"] || "text", _0x459761["className"] = 'form-input', _0x459761['placeholder'] = _0x18d4db["placeholder"] || '';
            if (_0x25fa34[_0x18d4db['id']]) _0x459761["value"] = _0x25fa34[_0x18d4db['id']];
            _0x3b49a3['appendChild'](_0x459761);
            const _0x4f3021 = document["createElement"]("div");
            _0x4f3021["style"]['cssText'] = 'font-family:var(--mo);font-size:11px;color:rgba(255,255,255,.3);margin-top:10px;', _0x4f3021["textContent"] = 'Pressione\x20Enter\x20↵', _0x3b49a3["appendChild"](_0x4f3021), _0x459761["addEventListener"]("keydown", _0x3e31fc => {
                const _0x3694da = _0x43ff49;
                _0x3e31fc['key'] === "Enter" && (_0x3e31fc["preventDefault"](), _0x158aa2(_0x18d4db, _0x459761["value"], _0x22878e));
            });
            const _0x317186 = document["createElement"]('div');
            _0x317186["style"]["cssText"] = "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-top:20px;";
            const _0x117df1 = document["createElement"]("button");
            _0x117df1['className'] = 'btn-gold', _0x117df1["type"] = "button", _0x117df1["textContent"] = _0x22878e === _0x5f3b1f - 0x1 ? "Ver meu resultado →" : "Continuar →", _0x117df1["onclick"] = () => _0x158aa2(_0x18d4db, _0x459761["value"], _0x22878e), _0x317186["appendChild"](_0x117df1);
            if (_0x18d4db["optional"]) {
                const _0x3be378 = document["createElement"]("button");
                _0x3be378["type"] = 'button', _0x3be378["style"]["cssText"] = 'background:none;border:none;cursor:pointer;font-family:var(--mo);font-size:11px;color:rgba(255,255,255,.3);text-decoration:underline;text-underline-offset:3px;padding:4px\x200;min-height:44px;', _0x3be378["textContent"] = _0x18d4db["skipLabel"] || 'Pular', _0x3be378["onclick"] = () => {
                    _0x25fa34[_0x18d4db['id']] = null, _0xa4911e(_0x22878e);
                }, _0x317186["appendChild"](_0x3be378);
            }
            _0x3b49a3["appendChild"](_0x317186);
        }

        function _0x267520(_0x2804ff, _0xc1eaea, _0x5435d9) {
            const _0x11e27f = _0x580cc4,
                _0x5db82c = document['createElement']('div');
            _0x5db82c["style"]["cssText"] = "display:flex;flex-direction:column;gap:8px;", _0x2804ff['choices']["forEach"](_0x2ee426 => {
                const _0x1033a7 = _0x11e27f,
                    _0x57b99f = document['createElement']("button");
                _0x57b99f["type"] = "button", _0x57b99f["style"]["cssText"] = "width:100%;text-align:left;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:13px 16px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:border-color .2s,background .2s;-webkit-tap-highlight-color:transparent;min-height:44px;";
                _0x25fa34[_0x2804ff['id']] === _0x2ee426['value'] && (_0x57b99f["style"]['borderColor'] = "var(--gold)", _0x57b99f["style"]['background'] = "rgba(184,149,42,.1)");
                const _0x386644 = document['createElement']("span");
                _0x386644['style']["cssText"] = "font-family:var(--ep);font-size:14px;font-weight:500;color:rgba(255,255,255,.9);pointer-events:none;", _0x386644['textContent'] = _0x2ee426["label"], _0x57b99f["appendChild"](_0x386644);
                if (_0x2ee426["desc"]) {
                    const _0xbe80bd = document["createElement"]("span");
                    _0xbe80bd["style"]["cssText"] = "font-family:var(--ep);font-size:12px;font-weight:300;color:rgba(255,255,255,.45);line-height:1.5;pointer-events:none;", _0xbe80bd["textContent"] = _0x2ee426["desc"], _0x57b99f["appendChild"](_0xbe80bd);
                }
                _0x57b99f["addEventListener"]('mouseover', () => {
                    const _0x1c18a7 = _0x1033a7;
                    _0x25fa34[_0x2804ff['id']] !== _0x2ee426['value'] && (_0x57b99f['style']["borderColor"] = "rgba(184,149,42,.4)", _0x57b99f["style"]["background"] = "rgba(255,255,255,.07)");
                }), _0x57b99f["addEventListener"]("mouseout", () => {
                    const _0x372638 = _0x1033a7;
                    _0x25fa34[_0x2804ff['id']] !== _0x2ee426["value"] && (_0x57b99f["style"]["borderColor"] = 'rgba(255,255,255,.1)', _0x57b99f["style"]['background'] = "rgba(255,255,255,.04)");
                }), _0x57b99f['onclick'] = () => {
                    const _0x28f743 = _0x1033a7;
                    _0x5db82c["querySelectorAll"]("button")["forEach"](_0xdc0f2f => {
                        const _0x235017 = _0x28f743;
                        _0xdc0f2f["style"]['borderColor'] = 'rgba(255,255,255,.1)', _0xdc0f2f["style"]["background"] = "rgba(255,255,255,.04)";
                    }), _0x57b99f["style"]["borderColor"] = "var(--gold)", _0x57b99f["style"]['background'] = "rgba(184,149,42,.1)", _0x25fa34[_0x2804ff['id']] = _0x2ee426["value"], setTimeout(() => _0xa4911e(_0x5435d9), 0x118);
                }, _0x5db82c["appendChild"](_0x57b99f);
            }), _0xc1eaea['appendChild'](_0x5db82c);
        }

        function qeValidEmail(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
        }

        function qeValidPhone(v) {
            if (!v) return false;
            var d = String(v).replace(/\D/g, '');
            if (d.length >= 12 && d.slice(0, 2) === '55') d = d.slice(2);
            return d.length === 11 && d[2] === '9';
        }

        function qeFieldError(el, msg) {
            if (!el) return;
            var orig = el.style.borderBottomColor;
            el.style.borderBottomColor = 'var(--danger,#9A2020)';
            el.style.animation = 'qe-shake .35s ease';
            var errEl = el.parentNode && el.parentNode.querySelector('.qe-err-msg');
            if (!errEl && el.parentNode) {
                errEl = document.createElement('div');
                errEl.className = 'qe-err-msg';
                errEl.style.cssText = 'color:var(--danger,#9A2020);font-size:12px;margin-top:6px;font-family:var(--ep,"Epilogue",sans-serif);';
                el.parentNode.insertBefore(errEl, el.nextSibling);
            }
            if (errEl) errEl.textContent = msg || 'Campo inválido.';
            try {
                el.focus();
            } catch (x) {}
            setTimeout(() => {
                el.style.borderBottomColor = orig;
                el.style.animation = '';
                if (errEl && errEl.parentNode) errEl.parentNode.removeChild(errEl);
            }, 3500);
        }

        // Validação de formato no caminho único de submit (cobre clique E Enter)
        function qeFieldInvalid(field, value, input) {
            if (field['required'] && !value) {
                qeFieldError(input, 'Preencha este campo.');
                return true;
            }
            if (!value) return false;
            var type = field['type'] || 'text';
            if (field['id'] === 'nome' && String(value).length < 3) {
                qeFieldError(input, 'O nome deve ter pelo menos 3 letras.');
                return true;
            }
            if (type === 'email' && !qeValidEmail(value)) {
                qeFieldError(input, 'Digite um e-mail válido (ex: voce@email.com).');
                return true;
            }
            if (type === 'tel' && !qeValidPhone(value)) {
                qeFieldError(input, 'Digite um WhatsApp válido com DDD (ex: 11 99999-9999).');
                return true;
            }
            return false;
        }

        function _0x158aa2(_0x2bdc55, _0x1eab8c, _0x36022d) {
            const _0x2c698f = typeof _0x1eab8c === 'string' ? _0x1eab8c["trim"]() : _0x1eab8c;
            if (qeFieldInvalid(_0x2bdc55, _0x2c698f, _0x9efcf7["querySelector"](".form-input"))) return;
            _0x25fa34[_0x2bdc55['id']] = _0x2c698f || null, _0xa4911e(_0x36022d);
        }

        function _0xa4911e(_0x26a4c9) {
            _0x26a4c9 >= _0x5f3b1f - 0x1 ? _0xb01655() : (_0x92cf13 = _0x26a4c9 + 0x1, _0x1c3719(_0x92cf13, 0x1));
        }

        function _0xb01655() {
            const _0x311717 = _0x580cc4,
                _0x4a35c2 = _0x9efcf7["querySelector"](".btn-gold");
            _0x4a35c2 && (_0x4a35c2['disabled'] = !![], _0x4a35c2["textContent"] = "Calculando...");
            const _0x4ee383 = {
                'name': _0x25fa34["nome"],
                'email': _0x25fa34['email'],
                'wa': _0x25fa34["whatsapp"],
                'empresa': _0x25fa34["empresa"],
                'obj': _0x25fa34["objetivo"],
                'tam': _0x25fa34["tamanho"],
                'fat': _0x25fa34["faturamento"],
                'nivel': _0x25fa34['nivel']
            };
            if (window["_sb"]) {
                const _0x5bd6ad = _0x3b5628(),
                    _0x355bf5 = {
                        'nome': _0x4ee383["name"],
                        'email': _0x4ee383["email"],
                        'whatsapp': _0x4ee383['wa'],
                        'objetivo': _0x4ee383["obj"],
                        'respostas': _0x274703["answers"],
                        'score': _0x5bd6ad['main']
                    };
                _0x1a906f ? (_0x355bf5["empresa"] = _0x4ee383["empresa"], _0x355bf5["tamanho"] = _0x4ee383["tam"], _0x355bf5["faturamento"] = _0x4ee383["fat"]) : _0x355bf5["nivel"] = _0x4ee383["nivel"], window["_sb"]['from']("isca_" + _0x18181a['id'] + '_alexandre_cracovsky')["insert"](_0x355bf5)["then"](function() {}, function() {});
            }
            _0x274703['captured'] = !![], _0x274703["lead"] = _0x4ee383, _0x274703["screen"] = "result", _0x4bb4a5();
        }

        function _0x14b5e3() {
            const _0x198946 = _0x580cc4;
            return [{
                'id': "nome",
                'type': 'text',
                'question': 'Como\x20posso\x20te\x20chamar?',
                'placeholder': 'Seu\x20nome\x20completo',
                'required': !![]
            }, {
                'id': 'email',
                'type': "email",
                'question': "Qual é o seu melhor e-mail?",
                'placeholder': "voce@email.com",
                'required': !![]
            }, {
                'id': "whatsapp",
                'type': "tel",
                'question': "Qual é o seu WhatsApp?",
                'placeholder': '(11)\x2099999-9999',
                'optional': !![],
                'skipLabel': 'Pular'
            }, {
                'id': "nivel",
                'type': 'radio',
                'question': "Qual é o seu nível em Valuation?",
                'choices': [{
                    'value': "iniciante",
                    'label': "Iniciante",
                    'desc': 'Sei\x20o\x20conceito\x20básico,\x20mas\x20nunca\x20montei\x20um\x20FCD.'
                }, {
                    'value': "intermediario",
                    'label': "Intermediário",
                    'desc': 'Entendo\x20a\x20teoria,\x20mas\x20tenho\x20dúvidas\x20em\x20WACC,\x20perpetuidade,\x20etc.'
                }, {
                    'value': "avancado",
                    'label': "Avançado",
                    'desc': "Já faço valuations na prática e quero refinar minhas análises."
                }]
            }, {
                'id': 'objetivo',
                'type': "radio",
                'question': "Qual é o seu maior objetivo ao aprender Valuation?",
                'choices': [{
                    'value': "mercado",
                    'label': "Mercado financeiro",
                    'desc': "Conquistar uma vaga em M&A, Equity Research, Investment Banking."
                }, {
                    'value': "certificacao",
                    'label': "Certificação",
                    'desc': "Estudar para CFA, CNPI, ou outra certificação."
                }, {
                    'value': 'investimentos',
                    'label': "Investimentos pessoais",
                    'desc': 'Analisar\x20e\x20escolher\x20ações/investimentos\x20por\x20conta\x20própria.'
                }, {
                    'value': "empresa",
                    'label': 'Meu\x20negócio',
                    'desc': "Aplicar no meu próprio negócio ou empresa."
                }, {
                    'value': "faculdade",
                    'label': "Faculdade",
                    'desc': "Passar em disciplinas ou entregar um TCC/projeto."
                }]
            }];
        }

        function _0x567aaf() {
            const _0x1ec773 = _0x580cc4;
            return [{
                'id': "nome",
                'type': "text",
                'question': 'Como\x20posso\x20te\x20chamar?',
                'placeholder': 'Seu\x20nome\x20completo',
                'required': !![]
            }, {
                'id': "email",
                'type': "email",
                'question': "Qual é o seu melhor e-mail?",
                'placeholder': "voce@email.com",
                'required': !![]
            }, {
                'id': "empresa",
                'type': "text",
                'question': "Qual é o nome da sua empresa?",
                'placeholder': "Nome da empresa",
                'optional': !![],
                'skipLabel': "Pular"
            }, {
                'id': 'whatsapp',
                'type': "tel",
                'question': 'Qual\x20é\x20o\x20seu\x20WhatsApp?',
                'placeholder': '(11)\x2099999-9999',
                'optional': !![],
                'skipLabel': "Pular"
            }, {
                'id': 'objetivo',
                'type': 'radio',
                'question': "O que você deseja com M&A?",
                'choices': [{
                    'value': "Quero vender o meu controle total ou majoritário (Sell-side)",
                    'label': "Vender minha empresa",
                    'desc': "Sell-side: venda de controle total ou majoritário."
                }, {
                    'value': "Procuro um sócio estratégico ou investidor minoritário",
                    'label': "Sócio ou investidor",
                    'desc': "Entrada de capital com participação minoritária."
                }, {
                    'value': 'Quero\x20comprar\x20outra\x20empresa\x20ou\x20expandir\x20mercado\x20(Buy-side)',
                    'label': "Comprar / expandir",
                    'desc': "Buy-side: aquisição ou expansão de mercado."
                }, {
                    'value': "Busco fusão com outra operação complementar",
                    'label': "Fusão estratégica",
                    'desc': "Unir operações com empresa complementar."
                }, {
                    'value': "Preciso de Reestruturação Financeira ou Operacional",
                    'label': 'Reestruturação',
                    'desc': "Reestruturação financeira ou operacional."
                }, {
                    'value': "Ainda estou avaliando alternativas estratégicas",
                    'label': 'Avaliando\x20opções',
                    'desc': "Explorando alternativas estratégicas."
                }]
            }, {
                'id': 'tamanho',
                'type': "radio",
                'question': "Qual é o tamanho da sua empresa?",
                'choices': [{
                    'value': "Até 20 funcionários",
                    'label': 'Até\x2020\x20funcionários'
                }, {
                    'value': "21 a 100 funcionários",
                    'label': "21 a 100 funcionários"
                }, {
                    'value': "101 a 500 funcionários",
                    'label': "101 a 500 funcionários"
                }, {
                    'value': "Mais de 500 funcionários",
                    'label': "Mais de 500 funcionários"
                }]
            }, {
                'id': "faturamento",
                'type': "radio",
                'question': "Qual é o faturamento médio anual?",
                'choices': [{
                    'value': 'Até\x20R$\x2050\x20Milhões',
                    'label': 'Até\x20R$\x2050M'
                }, {
                    'value': "De R$ 50 Milhões a R$ 100 Milhões",
                    'label': "R$ 50M – R$ 100M"
                }, {
                    'value': "De R$ 100 Milhões a R$ 500 Milhões",
                    'label': "R$ 100M – R$ 500M"
                }, {
                    'value': "Acima de R$ 500 Milhões",
                    'label': "Acima de R$ 500M"
                }]
            }];
        }
        _0x1c3719(0x0, 0x1);
    }

    function _0x3eecce() {
        const _0xaddc03 = a0_0x526a,
            _0x4d17f7 = _0x3b5628();
        if (_0x18181a["scoring"]['normalize']) {
            _0x40ee4d(_0x4d17f7);
            return;
        }
        if (_0x18181a["scoring"]["type"] === 'valuation') {
            _0x250e75(_0x4d17f7);
            return;
        }
        if (_0x18181a["scoring"]["type"] === "blindspots") {
            _0x442d16(_0x4d17f7);
            return;
        }
        const _0xafa972 = _0xdd5eb9("quiz-screen active"),
            _0x47e21f = _0x240737(_0x4d17f7),
            _0x4d4360 = Math["min"](0x64, Math["round"](_0x4d17f7["main"] / (_0x18181a['scoring']["max"] || 0xa) * 0x64)),
            _0x263b67 = Math["round"](_0x4d4360 * 3.6);
        _0xafa972["innerHTML"] = "\n      <div class=\"result-header " + _0x47e21f['class'] + "\">\n        <div class=\"result-intro-label\">Seu resultado foi:</div>\n        <div class=\"result-score-label\">" + (_0x18181a['scoring']["scoreLabel"] || "Pontuação") + "</div>\n        <div class=\"result-score-val\">" + _0x3e1f30(_0x4d17f7["main"], _0x18181a['scoring']) + "</div>\n        <div class=\"result-level " + _0x47e21f["class"] + '\x22>' + _0x47e21f["label"] + "</div>\n        <p class=\"result-desc\">" + _0x47e21f['description'] + '</p>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20<div\x20id=\x22charts-area\x22></div>\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22result-ctas\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<a\x20href=\x22../index.html\x22\x20class=\x22btn-navy\x22>←\x20Ver\x20outras\x20ferramentas</a>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-outline\x22\x20id=\x22btn-restart\x22\x20style=\x22color:var(--slate);border-color:var(--ruledark);\x22>Refazer\x20→</button>\x0a\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20', _0x3a5033["appendChild"](_0xafa972), _0xafa972["querySelector"]("#btn-restart")["onclick"] = () => {
            _0x274703 = {
                'screen': 'welcome',
                'qi': 0x0,
                'answers': {},
                'captured': ![]
            }, _0x4bb4a5();
        }, _0x4b73db(_0x4d17f7, _0xafa972["querySelector"]("#charts-area"));
    }

    function _0x250e75(_0x2e2766) {
        const _0x39179e = _0xdd5eb9("quiz-screen active");

        // Compact million formatter: 195000000 → "195 mi", 1500000000 → "1.5B"
        function qeFmtM(v) {
            if (v >= 1e9) return (v / 1e9).toFixed(1) + 'B';
            if (v >= 1e6) { const m = v / 1e6; return (m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)) + ' mi'; }
            return _0x263ccb(v);
        }

        // Football field: axis + 3 horizontal bars in SVG
        function qeFFSvg() {
            const toM = v => v / 1e6;
            const vals = [_0x2e2766['min'], _0x2e2766['max'], _0x2e2766['benchMin'], _0x2e2766['benchMax'], _0x2e2766['consultMin'], _0x2e2766['consultMax']].map(toM);
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
                tickHtml += `<text x="${xp(t)}" y="48">${t % 1 === 0 ? t : t.toFixed(1)}</text>`;
            }
            const row = (lo, hi, mid, fill, label) => {
                const x1 = xp(toM(lo)), x2 = xp(toM(hi)), xm = xp(toM(mid));
                const w = Math.max(x2 - x1, 2).toFixed(1);
                return `<div style="margin-bottom:14px"><p style="font-size:13px;color:#5F5E5A;margin:0 0 4px"><b style="color:#2C2C2A">${label}</b> · R$ ${qeFmtM(lo)} – R$ ${qeFmtM(hi)} · central R$ ${qeFmtM(mid)}</p><svg viewBox="0 0 560 26" width="100%"><rect x="${x1}" y="3" width="${w}" height="20" rx="4" fill="${fill}" fill-opacity="0.85"></rect><line x1="${xm}" y1="0" x2="${xm}" y2="26" stroke="#FFFFFF" stroke-width="2"></line></svg></div>`;
            };
            return `<svg viewBox="0 0 560 60" width="100%" style="margin-top:6px"><line x1="${XS}" y1="30" x2="${XE}" y2="30" stroke="#C9C7BD" stroke-width="1"></line><g font-size="10" fill="#8A887F" text-anchor="middle">${tickHtml}</g><text x="${((XS + XE) / 2).toFixed(0)}" y="16" text-anchor="middle" font-size="10" fill="#5F5E5A">Enterprise Value (R$ milhões)</text></svg>${row(_0x2e2766['min'], _0x2e2766['max'], _0x2e2766['main'], '#4F77AB', 'Sua empresa')}${row(_0x2e2766['benchMin'], _0x2e2766['benchMax'], _0x2e2766['benchCentral'], '#B8932F', 'Benchmark do setor')}${row(_0x2e2766['consultMin'], _0x2e2766['consultMax'], _0x2e2766['consultCentral'], '#0F6E56', 'Potencial com preparo')}<p style="font-size:11px;color:#8A887F;margin:8px 0 0">A linha branca marca o valor central de cada faixa.</p>`;
        }

        // Donut: SVG pie chart showing discount breakdown
        function qeDonutSvg() {
            const d = _0x2e2766['discountAmounts'];
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
            const retidoPct = Math.round((d['valorRetido'] || 0) / total * 100);
            active.forEach(s => {
                const pct = d[s.key] / total;
                const len = pct * circ;
                circles += `<circle cx="90" cy="90" r="70" stroke="${s.color}" stroke-width="22" fill="none" stroke-dasharray="${len.toFixed(2)} ${(circ - len).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}"></circle>`;
                legItems += `<span style="display:flex;align-items:center;gap:8px"><span style="width:12px;height:12px;border-radius:3px;flex:0 0 auto;background:${s.color}"></span>${s.label} · ${Math.round(pct * 100)}%</span>`;
                offset += len;
            });
            const totalDiscPct = Math.round((1 - (d['valorRetido'] || 0) / total) * 100);
            return `<div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap"><svg viewBox="0 0 180 180" width="160" height="160"><g transform="rotate(-90 90 90)">${circles}</g><text x="90" y="84" text-anchor="middle" font-size="13" fill="#5F5E5A">Valor</text><text x="90" y="104" text-anchor="middle" font-size="22" font-weight="700" fill="#1A2A52">${retidoPct}%</text></svg><div style="display:flex;flex-direction:column;gap:9px;font-size:13px;color:#5F5E5A">${legItems}</div></div><p style="font-size:11px;color:#8A887F;margin:14px 0 0">Os descontos somam ${totalDiscPct}% do valor de referência. O risco específico da empresa é o fator mais endereçável com preparo.</p>`;
        }

        const qeDebt = _0x2e2766['equityValue'] !== null ? (_0x2e2766['main'] - _0x2e2766['equityValue']) : 0;
        const qeEquityLine = (_0x2e2766['equityValue'] !== null && qeDebt > 0)
            ? `<p style="font-size:14px;color:#5F5E5A;margin:14px 0 0">Descontada a dívida líquida (<b style="color:#2C2C2A">R$ ${qeFmtM(qeDebt)}</b>) do ponto médio, o <b style="color:#2C2C2A">equity value</b> estimado fica em torno de <b style="color:#2C2C2A">R$ ${qeFmtM(_0x2e2766['equityValue'])}</b>.</p>`
            : '';
        const qeBadge = _0x2e2766['attrClass'] === 'success'
            ? { bg: '#E8F5E9', color: '#1B7A3A' }
            : _0x2e2766['attrClass'] === 'warning'
                ? { bg: '#FAEEDA', color: '#854F0B' }
                : { bg: '#FDECEA', color: '#9A2020' };
        const qeUplift = _0x2e2766['upliftPct'].toFixed(0);
        const qeCtaLabel = (_0x18181a['scoring'] && _0x18181a['scoring']['cta'] && _0x18181a['scoring']['cta']['label']) || 'Falar sobre meu processo de M&amp;A';
        const qeCtaHref  = (_0x18181a['scoring'] && _0x18181a['scoring']['cta'] && _0x18181a['scoring']['cta']['href'])  || '/contato';

        _0x39179e['innerHTML'] = `<div style="display:flex;flex-direction:column;gap:16px;padding-bottom:8px">
  <div style="background:#FFF;border:1px solid #E7E5DC;border-radius:16px;padding:24px 26px">
    <p style="font-size:15px;color:#2C2C2A;font-weight:500;line-height:1.6;margin:0">O valuation real exige a análise do fluxo de caixa por trás dele. Partindo do benchmark do seu setor e descontando porte e riscos, a estimativa do EV/EBITDA da sua empresa indica:</p>
  </div>
  <div style="background:#FFF;border:1px solid #E7E5DC;border-radius:16px;padding:24px 26px">
    <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#B8932F;font-weight:700;margin:0 0 10px">Enterprise Value estimado</p>
    <div><span style="font-family:Georgia,serif;font-size:clamp(1.6rem,4vw,2.5rem);font-weight:700;color:#1A2A52;line-height:1.05">R$ ${qeFmtM(_0x2e2766['min'])} – ${qeFmtM(_0x2e2766['max'])}</span><span style="display:inline-block;background:${qeBadge.bg};color:${qeBadge.color};font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;vertical-align:middle;margin-left:12px">Atratividade ${_0x2e2766['attrLabel']}</span></div>
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
    <p style="font-size:13.5px;color:#6E4309;margin:0;line-height:1.6">Baseado na minha experiência em dezenas de projetos, um trabalho de preparação antes da venda costuma elevar tanto o múltiplo aplicado quanto o EBITDA normalizado, levando o valor de R$ ${qeFmtM(_0x2e2766['min'])} – R$ ${qeFmtM(_0x2e2766['max'])} para R$ ${qeFmtM(_0x2e2766['consultMin'])} – R$ ${qeFmtM(_0x2e2766['consultMax'])} (central R$ ${qeFmtM(_0x2e2766['consultCentral'])}). É a diferença entre vender a empresa como ela está e vendê-la pronta.</p>
  </div>
  <a href="${qeCtaHref}" style="display:block;background:#B8932F;color:#2C2C2A;font-size:16px;font-weight:700;padding:16px 20px;border-radius:12px;font-family:inherit;text-align:center;text-decoration:none">${qeCtaLabel}</a>
  <p style="font-size:11.5px;color:#8A887F;margin:0;text-align:center;line-height:1.5">Estimativa ilustrativa, com base em múltiplos de mercado por setor e porte e descontos de risco. Não substitui um valuation formal.</p>
  <p style="text-align:center;font-size:11.5px;color:#8A887F;margin:0">Alexandre Cracovsky, CFA · Quanto vale a minha empresa agora?</p>
  <div style="text-align:center;margin-top:4px"><button class="btn-outline" id="btn-restart" style="color:var(--slate);border-color:var(--ruledark)">Refazer →</button></div>
</div>`;

        _0x3a5033['appendChild'](_0x39179e);
        _0x39179e.querySelector('#btn-restart').onclick = () => {
            _0x274703 = { 'screen': 'welcome', 'qi': 0x0, 'answers': {}, 'captured': ![] };
            _0x4bb4a5();
        };
    }

    function _0x40ee4d(_0x319238) {
        const _0x227004 = a0_0x526a,
            _0x164818 = _0x240737(_0x319238),
            _0x140194 = _0xdd5eb9("quiz-screen active"),
            _0x2c69c6 = _0x18181a["scoring"]["stages"] || [],
            _0x36753f = _0x18181a['scoring']["subgroups"] || [],
            _0x501151 = _0x2c69c6["map"](_0x1ef83d => {
                const _0x49e93e = _0x227004,
                    _0x491424 = _0x319238["stages"][_0x1ef83d['id']] || {};
                return '<span\x20class=\x22res-leg-item\x22><span\x20class=\x22res-leg-dot\x22\x20style=\x22background:' + _0x1ef83d["color"] + "\"></span>" + _0x1ef83d['label'] + " · " + _0x491424['score'] + "</span>";
            })["join"](''),
            _0x52c7ef = _0x2c69c6["map"](_0xd58e15 => {
                const _0x5a4738 = _0x227004,
                    _0x52cc45 = _0x319238["stages"][_0xd58e15['id']] || {};
                return '<div\x20class=\x22res-stage-card\x22><div\x20class=\x22res-stage-label\x22>' + _0xd58e15["label"] + "</div><div class=\"res-stage-score\" style=\"color:" + _0xd58e15["color"] + '\x22>' + _0x52cc45["score"] + "</div></div>";
            })["join"](''),
            _0x1bdad7 = _0x18181a["scoring"]["actionPlan"] || [],
            _0x7915d9 = [..._0x1bdad7]["sort"]((_0x1be29b, _0x49fabd) => _0x1be29b['priority'] - _0x49fabd["priority"]),
            _0x33634e = _0x7915d9['filter'](_0x1f4312 => +(_0x274703["answers"][_0x1f4312["questionId"]] || 0x0) === 0x0),
            _0x402960 = _0x7915d9["filter"](_0xb7578 => +(_0x274703["answers"][_0xb7578["questionId"]] || 0x0) === 0x2),
            _0x542da3 = [..._0x33634e, ..._0x402960]["slice"](0x0, 0x3),
            _0x2973f8 = _0x542da3["map"]((_0x109d2f, _0x4d1c95) => {
                const _0x34c48b = _0x227004,
                    _0x171108 = _0x36753f["find"](_0x1fbddb => _0x1fbddb["questions"]["includes"](_0x109d2f["questionId"])),
                    _0x300738 = _0x171108 ? _0x171108["shortLabel"] || _0x171108['label'] : _0x109d2f["dimension"],
                    _0x39ca89 = _0x171108 ? _0x319238["dims"][_0x171108["shortLabel"] || _0x171108["label"]] ?? '—' : '—',
                    _0x32d926 = _0x4d1c95 === 0x0 ? "SEU MAIOR GAP" : 'AÇÃO\x20PRIORITÁRIA\x20' + (_0x4d1c95 + 0x1);
                return "\n        <div class=\"res-gap-card\">\n          <div class=\"res-gap-header\">" + _0x32d926 + " · " + _0x300738 + '\x20(' + _0x39ca89 + ")</div>\n          " + (_0x109d2f["title"] ? "<div class=\"res-gap-title\">" + _0x109d2f['title'] + "</div>" : '') + "\n          <p class=\"res-gap-text\">" + _0x109d2f['action'] + "</p>\n        </div>";
            })["join"](''),
            _0x249c6c = _0x18181a["scoring"]["cta"];
        _0x140194['innerHTML'] = "\n      <div class=\"result-header " + _0x164818["class"] + "\">\n        <div class=\"res-ipv-label\">" + (_0x18181a["scoring"]['scoreLabel'] || "PONTUAÇÃO") + "</div>\n        <div class=\"res-ipv-row\">\n          <div class=\"res-ipv-score\">" + _0x319238["main"] + "<span class=\"res-ipv-denom\"> /100</span></div>\n          <div class=\"result-level " + _0x164818["class"] + '\x22>' + _0x164818["label"] + '</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22result-desc\x22>' + _0x164818["description"] + "</p>\n      </div>\n      <div id=\"charts-area\"></div>\n      <div class=\"res-legend\">" + _0x501151 + "</div>\n      <div class=\"res-stage-cards\">" + _0x52c7ef + "</div>\n      " + _0x2973f8 + "\n      <div class=\"result-ctas\">\n        " + (_0x249c6c ? "<a href=\"" + _0x249c6c["href"] + "\" class=\"btn-gold\" style=\"text-align:center;\">" + _0x249c6c["label"] + "</a>" : '') + "\n        <button class=\"btn-outline\" id=\"btn-restart\" style=\"color:var(--slate);border-color:var(--ruledark);\">Refazer →</button>\n      </div>", _0x3a5033["appendChild"](_0x140194), _0x140194["querySelector"]("#btn-restart")["onclick"] = () => {
            const _0x296fdb = _0x227004;
            _0x274703 = {
                'screen': "welcome",
                'qi': 0x0,
                'answers': {},
                'captured': ![]
            }, _0x4bb4a5();
        }, _0x4b73db(_0x319238, _0x140194["querySelector"]("#charts-area"));
    }

    function _0x442d16(_0x5f3b63) {
        const _0x2ffbc9 = a0_0x526a,
            _0x4ef337 = _0x240737(_0x5f3b63),
            _0x300d0d = _0x5f3b63["pct"],
            _0x470275 = _0xdd5eb9('quiz-screen active');
        const _0x219d12 = {
            'green': { label: 'Protegido', dot: '#1E7A4B', bar: '#1E7A4B', text: '#1E7A4B' },
            'yellow': { label: 'Atenção', dot: '#B8932F', bar: '#B8932F', text: '#9A7A1F' },
            'red': { label: 'Risco alto', dot: '#B23A2E', bar: '#B23A2E', text: '#B23A2E' }
        };
        const _0x44149b = ({
            'danger': { bg: '#FAEEDA', color: '#854F0B' },
            'warning': { bg: '#FAEEDA', color: '#854F0B' },
            'success': { bg: '#EDF7F0', color: '#1E7A4B' }
        })[_0x4ef337["class"]] || { bg: '#FAEEDA', color: '#854F0B' };
        const _0x5efb36 = ({
            'danger': '#B23A2E', 'warning': '#B8932F', 'success': '#1E7A4B'
        })[_0x4ef337["class"]] || '#B8932F';
        const _0x50731f = _0x18181a["scoring"]["journey"] || {},
            _0x45a612 = _0x50731f["stages"] || [];
        let _0x250eee = _0x45a612[0x0] || { 'label': '', 'months': 0x18 };
        for (const _0x1f120f of _0x45a612) {
            if (_0x300d0d >= _0x1f120f["minPct"]) _0x250eee = _0x1f120f;
        }
        const _0x5d85b5 = (_0x50731f["text"] || '')["replace"]('{stage}', '<strong style="color:#B8932F">' + _0x250eee["label"] + '</strong>')["replace"]("{months}", _0x250eee['months']),
            _0x2c5d2b = _0x5f3b63['worst'] || {},
            _0x282b25 = _0x219d12[_0x2c5d2b["signal"]] || _0x219d12["red"];
        const bsRows = (_0x5f3b63["blindspots"] || [])["map"](function(bs) {
            const sig = _0x219d12[bs['signal']] || _0x219d12['red'],
                w = Math["round"](bs['pct'] * 0x64);
            return '<div class="bs-row">' +
                '<span class="bs-dot" style="background:' + sig.dot + '"></span>' +
                '<span class="bs-name">' + bs['label'] + '</span>' +
                '<div class="bs-bar"><span style="width:' + w + '%;background:' + sig.bar + '"></span></div>' +
                '<span class="bs-status" style="color:' + sig.text + '">' + sig.label + '</span>' +
                '</div>';
        })["join"]('');
        const svgJourney = (function() {
            if (!_0x45a612["length"]) return '';
            const n = _0x45a612["length"],
                x0 = 60, x1 = 560, y0 = 30, y1 = 210,
                maxM = Math["max"]["apply"](null, _0x45a612["map"](function(s) { return s['months']; })),
                xs = _0x45a612["map"](function(_, i) { return Math["round"](x0 + (x1 - x0) / (n - 1) * i); }),
                ys = _0x45a612["map"](function(s) { return Math["round"](y1 - (s['months'] / maxM) * (y1 - y0)); }),
                curIdx = _0x45a612["indexOf"](_0x250eee),
                polyPoints = xs["map"](function(x, i) { return x + ',' + ys[i]; })["join"](' '),
                areaPath = 'M' + xs["map"](function(x, i) { return x + ',' + ys[i]; })["join"](' L') + ' L' + xs[n - 1] + ',' + y1 + ' L' + xs[0] + ',' + y1 + ' Z',
                yStep = (y1 - y0) / 4,
                monthStep = maxM / 4;
            const gridLines = [1, 2, 3, 4]["map"](function(i) {
                const yy = Math["round"](y1 - i * yStep);
                return '<line x1="' + x0 + '" y1="' + yy + '" x2="' + x1 + '" y2="' + yy + '"/>';
            })["join"]('');
            const yLabels = [0, 1, 2, 3, 4]["map"](function(i) {
                return '<text x="52" y="' + Math["round"](y1 - i * yStep + 4) + '" text-anchor="end" font-size="9" fill="#8A887F">' + Math["round"](i * monthStep) + '</text>';
            })["join"]('');
            const circles = xs["map"](function(x, i) {
                if (i === curIdx) return '<circle cx="' + x + '" cy="' + ys[i] + '" r="5.5" fill="#B8932F" stroke="#FFFFFF" stroke-width="1.5"/>';
                return '<circle cx="' + x + '" cy="' + ys[i] + '" r="3" fill="#1A2A52"/>';
            })["join"]('');
            const cursorLine = curIdx >= 0 ? (
                '<line x1="' + xs[curIdx] + '" y1="' + ys[curIdx] + '" x2="' + xs[curIdx] + '" y2="' + y1 + '" stroke="#B8932F" stroke-width="1.5" stroke-dasharray="4 3"/>' +
                '<text x="' + xs[curIdx] + '" y="' + (ys[curIdx] - 10) + '" text-anchor="middle" font-size="9.5" font-weight="700" fill="#854F0B">você está aqui</text>'
            ) : '';
            const stageLabels = _0x45a612["map"](function(s, i) {
                const isCur = i === curIdx;
                return '<text x="' + xs[i] + '" y="228" text-anchor="middle" font-size="9" ' +
                    (isCur ? 'font-weight="700" fill="#854F0B"' : 'fill="#8A887F"') + '>' + s['label'] + '</text>';
            })["join"]('');
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
        })();
        const calloutHTML = _0x18181a["scoring"]["callout"] ?
            '<div class="bs-inaction"><p>' + _0x18181a["scoring"]["callout"] + '</p></div>' : '';
        const ctaCfg = _0x18181a["scoring"]["cta"];
        const ctaHTML = ctaCfg ?
            '<a href="' + ctaCfg["href"] + '" class="bs-cta">' + ctaCfg["label"] + '</a>' : '';
        if (!document["getElementById"]('bs-result-styles')) {
            const _0x5a1a9f = document["createElement"]('style');
            _0x5a1a9f["id"] = 'bs-result-styles';
            _0x5a1a9f["textContent"] = [
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
            ]["join"]('');
            document["head"]["appendChild"](_0x5a1a9f);
        }
        _0x470275["innerHTML"] = '<div class="bs-wrap">' +
            '<div class="bs-card">' +
            '<p class="bs-eyebrow">Seu diagnóstico de pontos cegos</p>' +
            '<div><span class="bs-score">' + _0x300d0d + '%</span>' +
            '<span class="bs-badge" style="background:' + _0x44149b['bg'] + ';color:' + _0x44149b['color'] + '">' + _0x4ef337['label'] + '</span></div>' +
            '<div class="bs-track"><div class="bs-fill" style="width:' + _0x300d0d + '%;background:' + _0x5efb36 + '"></div></div>' +
            '<p class="bs-lead">' + _0x4ef337['description'] + '</p>' +
            '</div>' +
            '<div class="bs-card">' +
            '<h2 class="bs-section-h">Onde está o seu risco</h2>' +
            bsRows +
            '</div>' +
            '<div class="bs-card">' +
            '<p class="bs-journey-title">Onde você está na jornada</p>' +
            '<p class="bs-journey-lead">' + _0x5d85b5 + '</p>' +
            svgJourney +
            '<p class="bs-journey-cap">Tempo médio até o fechamento conforme a maturidade do vendedor. A posição acompanha o seu score: quanto mais alto, mais perto da negociação.</p>' +
            '</div>' +
            '<div class="bs-card">' +
            '<p class="bs-risk-h">O seu maior risco hoje está em <span style="color:' + _0x282b25['text'] + '">' + (_0x2c5d2b['label'] || '') + '</span></p>' +
            '<p class="bs-risk-p">' + (_0x18181a["scoring"]["resultText"] || '') + '</p>' +
            '<div class="bs-next"><p class="bs-next-label">Próximo passo</p>' +
            '<p class="bs-next-text">' + (_0x2c5d2b['action'] || '') + '</p></div>' +
            '</div>' +
            calloutHTML + ctaHTML +
            '<p class="bs-foot">ADVISIA Investimentos · ' + _0x18181a['title'] + '</p>' +
            '<div style="text-align:center"><button class="btn-outline" id="btn-restart" style="color:var(--slate);border-color:var(--ruledark)">Refazer →</button></div>' +
            '</div>';
        _0x3a5033["appendChild"](_0x470275);
        _0x470275["querySelector"]('#btn-restart')["onclick"] = () => {
            _0x274703 = { 'screen': "welcome", 'qi': 0x0, 'answers': {}, 'captured': ![] };
            _0x4bb4a5();
        };
    }

    function _0x3b5628() {
        const _0x300a66 = a0_0x526a,
            _0x958869 = _0x18181a["scoring"]["type"];
        if (_0x958869 === "blindspots") return _0x8693f2();
        if (_0x958869 === "sum") return _0x314b5d();
        if (_0x958869 === "weighted_sum") return _0x601f16();
        if (_0x958869 === 'average') return _0x2304ed();
        if (_0x958869 === "profile") return _0x3b38a();
        if (_0x958869 === "maturity") return _0x2cfd70();
        if (_0x958869 === "correct_count") return _0x1c1596();
        if (_0x958869 === "valuation") return _0xae649f();
        if (_0x958869 === "imv") return _0x1f921b();
        if (_0x958869 === "value_destroy") return _0x4407cb();
        return {
            'main': 0x0
        };
    }

    function _0x314b5d() {
        const _0x41bd2b = a0_0x526a;
        let _0x684378 = 0x0;
        const _0x596db0 = {};
        _0x18181a["questions"]["forEach"](_0x3a2e58 => {
            const _0xbd33a = _0x41bd2b,
                _0x286ed9 = +(_0x274703["answers"][_0x3a2e58['id']] || 0x0);
            _0x684378 += _0x286ed9;
            if (_0x3a2e58["dimension"]) _0x596db0[_0x3a2e58['dimension']] = (_0x596db0[_0x3a2e58["dimension"]] || 0x0) + _0x286ed9;
        });
        if (!_0x18181a["scoring"]['normalize']) return {
            'main': _0x684378,
            'dims': _0x596db0
        };
        const _0x5e5ac9 = _0x18181a['scoring']['max'],
            _0x3b1473 = _0x5e5ac9 / _0x18181a["questions"]['length'],
            _0xf0d1b9 = Math["round"](_0x684378 / _0x5e5ac9 * 0x64),
            _0x589651 = _0x18181a["scoring"]["subgroups"] || [],
            _0xe5e86b = {};
        _0x589651["forEach"](_0x312506 => {
            const _0x58a1ba = _0x41bd2b,
                _0x558865 = _0x312506["shortLabel"] || _0x312506["label"],
                _0x217c9c = _0x312506["questions"]["reduce"]((_0x278a92, _0x4f1db7) => _0x278a92 + +(_0x274703["answers"][_0x4f1db7] || 0x0), 0x0),
                _0x21c4db = _0x312506["questions"]["length"] * _0x3b1473;
            _0xe5e86b[_0x558865] = Math["round"](_0x217c9c / _0x21c4db * 0x64);
        });
        const _0x4926fb = {};
        return (_0x18181a["scoring"]["stages"] || [])['forEach'](_0x36f3e7 => {
            const _0x3cfbcc = _0x41bd2b,
                _0x564b35 = (_0x36f3e7["subgroups"] || [])["flatMap"](_0x3c6ffc => {
                    const _0x2b6cd9 = _0x3cfbcc,
                        _0x20a534 = _0x589651["find"](_0x9c8806 => _0x9c8806['id'] === _0x3c6ffc);
                    return _0x20a534 ? _0x20a534["questions"] : [];
                });
            if (!_0x564b35["length"]) return;
            const _0x184506 = _0x564b35["reduce"]((_0x215d04, _0x3a0a2e) => _0x215d04 + +(_0x274703["answers"][_0x3a0a2e] || 0x0), 0x0),
                _0x2f3cda = _0x564b35['length'] * _0x3b1473;
            _0x4926fb[_0x36f3e7['id']] = {
                'label': _0x36f3e7["label"],
                'score': Math["round"](_0x184506 / _0x2f3cda * 0x64),
                'color': _0x36f3e7["color"]
            };
        }), {
            'main': _0xf0d1b9,
            'dims': Object["keys"](_0xe5e86b)["length"] ? _0xe5e86b : _0x596db0,
            'stages': _0x4926fb
        };
    }

    function _0x8693f2() {
        const _0x3600ee = a0_0x526a,
            _0x58c1d9 = _0x18181a['scoring']["blindspots"] || [],
            _0x481e87 = _0x18181a["scoring"]["signalThresholds"] || {
                'green': 0.75,
                'yellow': 0.45
            },
            _0x4a67fa = 0x2;
        let _0xa56b4c = 0x0;
        const _0x595ec0 = _0x58c1d9['map'](_0x4ed567 => {
                const _0x57bd63 = _0x3600ee,
                    _0x2b3888 = _0x4ed567["questions"]["reduce"]((_0x5001b1, _0x447d5c) => _0x5001b1 + +(_0x274703["answers"][_0x447d5c] || 0x0), 0x0),
                    _0x10289d = _0x4ed567["questions"]["length"] * _0x4a67fa,
                    _0x3877fa = _0x10289d > 0x0 ? _0x2b3888 / _0x10289d : 0x0;
                let _0x316d20;
                if (_0x3877fa >= _0x481e87["green"]) _0x316d20 = "green";
                else {
                    if (_0x3877fa >= _0x481e87["yellow"]) _0x316d20 = "yellow";
                    else _0x316d20 = 'red';
                }
                return _0xa56b4c += _0x2b3888, {
                    'id': _0x4ed567['id'],
                    'label': _0x4ed567['label'],
                    'action': _0x4ed567["action"],
                    'score': _0x2b3888,
                    'maxScore': _0x10289d,
                    'pct': _0x3877fa,
                    'signal': _0x316d20
                };
            }),
            _0x2b3c20 = _0x18181a["scoring"]["max"] || 0x18,
            _0x321d66 = Math['min'](0x64, Math['round'](_0xa56b4c / _0x2b3c20 * 0x64)),
            _0x24f602 = [..._0x595ec0]["sort"]((_0x229698, _0x91b861) => _0x229698["pct"] - _0x91b861["pct"])[0x0] || _0x595ec0[0x0];
        return {
            'main': _0xa56b4c,
            'pct': _0x321d66,
            'blindspots': _0x595ec0,
            'worst': _0x24f602
        };
    }

    function _0x601f16() {
        const _0x49c45e = a0_0x526a;
        let _0x2cd6d3 = 0x0,
            _0x1da5e6 = 0x0;
        const _0x50c527 = [];
        return _0x18181a["questions"]["forEach"](_0x5bc1ac => {
            const _0x3cc5ac = _0x49c45e,
                _0x317e5d = _0x5bc1ac["weight"] || 0x1,
                _0x21ebef = +(_0x274703["answers"][_0x5bc1ac['id']] || 0x0);
            _0x2cd6d3 += _0x317e5d * _0x21ebef, _0x1da5e6 += _0x317e5d * (_0x5bc1ac['maxVal'] || 0x2), _0x50c527["push"]({
                'label': _0x5bc1ac["shortLabel"] || _0x5bc1ac["text"]["slice"](0x0, 0x1e) + '…',
                'score': _0x21ebef,
                'weight': _0x317e5d,
                'max': _0x5bc1ac["maxVal"] || 0x2
            });
        }), {
            'main': _0x2cd6d3,
            'max': _0x1da5e6,
            'items': _0x50c527
        };
    }

    function _0x2304ed() {
        const _0x32f2b5 = a0_0x526a,
            _0x2202bc = {};
        _0x18181a['questions']["forEach"](_0x1b568f => {
            const _0x579dc0 = _0x32f2b5,
                _0xa4ac64 = +(_0x274703["answers"][_0x1b568f['id']] || 0x1);
            _0x2202bc[_0x1b568f["dimension"] || _0x1b568f['id']] = _0xa4ac64;
        });
        const _0x2d4ad1 = Object["values"](_0x2202bc);
        return {
            'main': _0x2d4ad1['reduce']((_0x2fe7ab, _0x555c98) => _0x2fe7ab + _0x555c98, 0x0) / _0x2d4ad1["length"],
            'dims': _0x2202bc
        };
    }

    function _0x3b38a() {
        const _0x149a36 = a0_0x526a,
            _0xb2081e = {},
            _0x3acedc = {};
        _0x18181a['questions']["forEach"](_0x522659 => {
            const _0x3e0c97 = _0x149a36,
                _0x963741 = _0x274703['answers'][_0x522659['id']],
                _0x4a9776 = _0x522659["options"]["find"](_0x4c9a04 => _0x4c9a04["value"] === _0x963741);
            if (!_0x4a9776) return;
            (_0x4a9776["profiles"] || [])['forEach'](_0xed7b4a => {
                _0xb2081e[_0xed7b4a] = (_0xb2081e[_0xed7b4a] || 0x0) + 0x1;
            });
        });
        const _0x101c5e = _0x18181a['scoring']['profiles'] || ['PE', "EST", 'FAM', "CONC"];
        _0x101c5e["forEach"](_0x2a9e82 => {
            const _0x1fc84f = _0x149a36;
            _0x3acedc[_0x2a9e82] = _0x18181a['questions']["length"];
        });
        const _0x1d07c2 = {};
        _0x101c5e["forEach"](_0x3c4fd0 => {
            const _0x46dceb = _0x149a36;
            _0x1d07c2[_0x3c4fd0] = Math["round"]((_0xb2081e[_0x3c4fd0] || 0x0) / _0x18181a["questions"]["length"] * 0x64);
        });
        const _0x58a533 = _0x101c5e["reduce"]((_0x4ce6e1, _0x6d85cc) => _0x1d07c2[_0x4ce6e1] >= _0x1d07c2[_0x6d85cc] ? _0x4ce6e1 : _0x6d85cc);
        return {
            'main': _0x1d07c2[_0x58a533],
            'profiles': _0x1d07c2,
            'topProfile': _0x58a533
        };
    }

    function _0x2cfd70() {
        const _0xc7ece6 = a0_0x526a;
        let _0x3180fe = 0x0;
        _0x18181a['questions']["forEach"](_0x349f6b => {
            const _0x23ee78 = _0xc7ece6,
                _0x2cf9d5 = _0x349f6b['weight'] || 0x1,
                _0x2f172c = +(_0x274703["answers"][_0x349f6b['id']] || 0x0);
            _0x3180fe += _0x2cf9d5 * _0x2f172c;
        });
        const _0xe7fe92 = _0x18181a["scoring"]['stages'];
        let _0xdc6cd7 = _0xe7fe92[0x0];
        for (const _0x278695 of _0xe7fe92) {
            if (_0x3180fe >= _0x278695["min"]) _0xdc6cd7 = _0x278695;
        }
        return {
            'main': _0x3180fe,
            'stage': _0xdc6cd7
        };
    }

    function _0x1c1596() {
        const _0x1f76fe = a0_0x526a;
        let _0x37b8b4 = 0x0;
        const _0x4d2cbf = {};
        return _0x18181a["questions"]["forEach"](_0x58cd27 => {
            const _0x17c44a = _0x1f76fe,
                _0xda094f = _0x274703["answers"][_0x58cd27['id']] === _0x58cd27['correct'];
            if (_0xda094f) _0x37b8b4++;
            const _0x51aefa = _0x58cd27["category"] || "Geral";
            if (!_0x4d2cbf[_0x51aefa]) _0x4d2cbf[_0x51aefa] = {
                'correct': 0x0,
                'total': 0x0
            };
            _0x4d2cbf[_0x51aefa]['total']++;
            if (_0xda094f) _0x4d2cbf[_0x51aefa]["correct"]++;
        }), {
            'main': _0x37b8b4,
            'max': _0x18181a['questions']["length"],
            'cats': _0x4d2cbf
        };
    }

    function _0xae649f() {
        const _0x18c632 = a0_0x526a,
            _0x3qr = _0x18181a["questions"]["find"](q => q["id"] === "receita"),
            _0x3qd = _0x18181a["questions"]["find"](q => q["id"] === "divida_liquida"),
            _0x3sr = _0x3qr && _0x3qr["scale"] ? _0x3qr["scale"] : 1,
            _0x3sd = _0x3qd && _0x3qd["scale"] ? _0x3qd["scale"] : 1,
            _0x212f5d = +(_0x274703["answers"]["receita"] || 0x0) * _0x3sr,
            _0x827192 = +(_0x274703["answers"]['margem'] || 0x14) / 0x64,
            _0x49ff6b = _0x212f5d * _0x827192,
            _0x560769 = _0x274703['answers']["setor"] || "servicos_facilities",
            _0x4a79ee = +(_0x274703["answers"]["divida_liquida"] || 0x0) * _0x3sd,
            _0x543775 = _0x18181a["scoring"]["porteRanges"] || [];
        let _0x29ab07 = "grande",
            _0x712b9a = 0x0;
        for (const _0x48c3cf of _0x543775) {
            if (_0x212f5d <= _0x48c3cf["maxReceita"]) {
                _0x29ab07 = _0x48c3cf["band"], _0x712b9a = _0x48c3cf["discount"];
                break;
            }
        }
        const _0x413e4b = _0x18181a["scoring"]["multiples"],
            _0x560227 = _0x413e4b[_0x560769] && _0x413e4b[_0x560769][_0x29ab07] || {
                'min': 0x4,
                'max': 0x7
            },
            _0x2c80ec = _0x18181a["questions"]["find"](_0x4a43bc => _0x4a43bc['id'] === "setor"),
            _0x157704 = _0x2c80ec ? _0x2c80ec["options"]["find"](_0x59a816 => _0x59a816['value'] === _0x560769) : null,
            _0x4a221b = _0x157704 ? _0x157704["liquidity"] || "media" : 'media',
            _0x2968f8 = _0x18181a["scoring"]["liquidityDiscounts"] || {
                'alta': 0.03,
                'media': 0.05,
                'baixa': 0.07
            },
            _0x399ef0 = _0x2968f8[_0x4a221b] || 0.05,
            _0x2e76da = _0x18181a["questions"]["find"](_0x2d4abe => _0x2d4abe['id'] === "risks"),
            _0x547fa9 = _0x2e76da ? _0x2e76da['options'] : [],
            _0x13738d = _0x274703['answers']["risks"] || [];
        let _0x43e815 = 0x0;
        !_0x13738d['includes']("none") && _0x13738d["forEach"](_0x3c9b89 => {
            const _0x1ab50e = _0x18c632,
                _0x49528c = _0x547fa9["find"](_0x12515d => _0x12515d["value"] === _0x3c9b89);
            if (_0x49528c && _0x49528c["discount"]) _0x43e815 += _0x49528c["discount"];
        });
        _0x43e815 = Math['min'](_0x43e815, 0.5);
        const _0x15c507 = _0x18181a["questions"]["find"](_0x5f1efb => _0x5f1efb['id'] === 'regiao'),
            _0x36bba4 = _0x15c507 ? _0x15c507["options"]['find'](_0x49ceca => _0x49ceca["value"] === _0x274703["answers"]["regiao"]) : null,
            _0x153f34 = _0x36bba4 ? _0x36bba4["discount"] || 0x0 : 0x0,
            _0x261112 = (0x1 - _0x712b9a) * (0x1 - _0x399ef0) * (0x1 - _0x43e815) * (0x1 - _0x153f34),
            _0x44f8e4 = (0x1 - _0x712b9a) * (0x1 - _0x399ef0) * (0x1 - _0x153f34),
            _0x11c745 = _0x49ff6b * _0x560227["min"] * _0x261112,
            _0x4b86ca = _0x49ff6b * _0x560227['max'] * _0x261112,
            _0x17abc4 = (_0x11c745 + _0x4b86ca) / 0x2,
            _0x4dfc8d = _0x49ff6b * _0x560227['min'],
            _0x47b147 = _0x49ff6b * _0x560227["max"],
            _0xf4701b = (_0x4dfc8d + _0x47b147) / 0x2,
            _0x4b9016 = _0x49ff6b * 1.1,
            _0x3fddac = _0x4b9016 * _0x560227["min"] * _0x44f8e4,
            _0x3d5b10 = _0x4b9016 * _0x560227["max"] * _0x44f8e4,
            _0x16ee62 = (_0x3fddac + _0x3d5b10) / 0x2,
            _0x5f346b = _0x4a79ee > 0x0 ? _0x17abc4 - _0x4a79ee : null,
            _0x1d3736 = _0xf4701b > 0x0 ? _0x17abc4 / _0xf4701b : 0x0,
            _0x5558ae = _0x18181a["scoring"]["attractivenessThresholds"] || {
                'high': 0.85,
                'medium': 0.7
            };
        let _0xcf549, _0x30fb28;
        if (_0x1d3736 >= _0x5558ae['high']) _0xcf549 = "success", _0x30fb28 = "Alta";
        else _0x1d3736 >= _0x5558ae["medium"] ? (_0xcf549 = 'warning', _0x30fb28 = "Média") : (_0xcf549 = "danger", _0x30fb28 = 'Requer\x20Preparação');
        const _0x4f49c2 = _0x17abc4 > 0x0 ? (_0x16ee62 - _0x17abc4) / _0x17abc4 * 0x64 : 0x0,
            _0x588de3 = _0xf4701b * _0x712b9a,
            _0x244139 = _0xf4701b * (0x1 - _0x712b9a) * _0x399ef0,
            _0x3b74ac = _0xf4701b * (0x1 - _0x712b9a) * (0x1 - _0x399ef0) * _0x43e815,
            _0x24b705 = _0xf4701b * (0x1 - _0x712b9a) * (0x1 - _0x399ef0) * (0x1 - _0x43e815) * _0x153f34;
        return {
            'main': _0x17abc4,
            'min': _0x11c745,
            'max': _0x4b86ca,
            'benchMin': _0x4dfc8d,
            'benchMax': _0x47b147,
            'benchCentral': _0xf4701b,
            'consultMin': _0x3fddac,
            'consultMax': _0x3d5b10,
            'consultCentral': _0x16ee62,
            'equityValue': _0x5f346b,
            'attrPct': _0x1d3736,
            'attrClass': _0xcf549,
            'attrLabel': _0x30fb28,
            'upliftPct': _0x4f49c2,
            'ebitda': _0x49ff6b,
            'sector': _0x560769,
            'porteBand': _0x29ab07,
            'discountAmounts': {
                'valorRetido': _0x17abc4,
                'porte': _0x588de3,
                'liquidez': _0x244139,
                'company': _0x3b74ac,
                'regiao': _0x24b705
            }
        };
    }

    function _0x1f921b() {
        const _0x1899bd = a0_0x526a,
            _0x40a95f = {};
        _0x18181a["questions"]["forEach"](_0x4df6ee => {
            const _0x965508 = _0x1899bd;
            _0x40a95f[_0x4df6ee['id']] = +(_0x274703["answers"][_0x4df6ee['id']] || 0x1);
        });
        const _0x24dfd3 = Object['values'](_0x40a95f),
            _0x323c66 = _0x24dfd3["reduce"]((_0x236fc6, _0x161f19) => _0x236fc6 + _0x161f19, 0x0) / _0x24dfd3["length"];
        return {
            'main': _0x323c66,
            'dims': _0x40a95f
        };
    }

    function _0x4407cb() {
        const _0x28ee7b = a0_0x526a;
        let _0x3fa738 = 0x0;
        const _0x4243fe = {};
        return _0x18181a["questions"]["forEach"](_0x27c525 => {
            const _0x33eb14 = _0x28ee7b,
                _0x3b3128 = _0x274703['answers'][_0x27c525['id']] === _0x27c525["correct"];
            if (_0x3b3128) _0x3fa738++;
            const _0x166cda = _0x27c525["destroyer"] || _0x27c525['id'];
            if (!_0x4243fe[_0x166cda]) _0x4243fe[_0x166cda] = {
                'correct': 0x0,
                'discount': _0x27c525["discount"] || 0.1
            };
            if (_0x3b3128) _0x4243fe[_0x166cda]["correct"] = 0x1;
        }), {
            'main': _0x3fa738,
            'max': _0x18181a["questions"]["length"],
            'cats': _0x4243fe
        };
    }

    function _0x240737(_0x3fdf3c) {
        const _0x239caa = a0_0x526a,
            _0x42bb4c = _0x18181a["scoring"]["thresholds"];
        for (const _0x2920a9 of _0x42bb4c) {
            if (_0x3fdf3c['main'] <= _0x2920a9['max']) return _0x2920a9;
        }
        return _0x42bb4c[_0x42bb4c['length'] - 0x1];
    }

    function _0x3e1f30(_0x460244, _0x4dc804) {
        const _0x52a399 = a0_0x526a;
        if (_0x4dc804["type"] === "valuation") return "R$ " + _0x263ccb(_0x460244);
        if (_0x4dc804["type"] === "average" || _0x4dc804["type"] === "imv") return _0x460244["toFixed"](0x1) + '/5';
        if (_0x4dc804["type"] === "maturity") return _0x460244 + '/24';
        if (_0x4dc804["type"] === "correct_count" || _0x4dc804['type'] === "value_destroy") return _0x460244 + '/' + _0x4dc804["max"];
        return Math["round"](_0x460244);
    }

    function _0x263ccb(_0x34070e) {
        const _0x53cef3 = a0_0x526a;
        if (_0x34070e >= 0x3b9aca00) return (_0x34070e / 0x3b9aca00)['toFixed'](0x1) + 'B';
        if (_0x34070e >= 0xf4240) return (_0x34070e / 0xf4240)['toFixed'](0x1) + 'M';
        if (_0x34070e >= 0x3e8) return (_0x34070e / 0x3e8)["toFixed"](0x0) + 'K';
        return _0x34070e["toFixed"](0x0);
    }

    function _0x4b73db(_0x374b46, _0x39522b) {
        const _0x2f461f = a0_0x526a;
        if (!_0x18181a["charts"] || !window["Highcharts"]) return;
        _0x18181a["charts"]['forEach']((_0x3b5ed8, _0x39f047) => {
            const _0x49135a = _0x2f461f,
                _0x48bcf8 = _0xdd5eb9("chart-wrapper");
            _0x48bcf8["innerHTML"] = "<div class=\"chart-title\">" + _0x3b5ed8["title"] + "</div><div id=\"hc-" + _0x39f047 + "\" style=\"height:" + (_0x3b5ed8["height"] || 0x104) + "px\"></div>", _0x39522b['appendChild'](_0x48bcf8), setTimeout(() => _0x5983ec(_0x3b5ed8, _0x374b46, "hc-" + _0x39f047), 0x32);
        });
    }
    const _0x2ca0ab = {
        'chart': {
            'backgroundColor': "#fff",
            'style': {
                'fontFamily': "'Epilogue',sans-serif"
            }
        },
        'colors': ['#1B3A7A', "#B8952A", "#2A52A8", '#D4AE50', "#6B7A8D", "#0A1628"],
        'title': {
            'text': ''
        },
        'credits': {
            'enabled': ![]
        },
        'legend': {
            'itemStyle': {
                'fontFamily': "'DM Mono',monospace",
                'fontSize': '10px',
                'fontWeight': "400",
                'color': '#6B7A8D'
            }
        }
    };

    function _0x5983ec(_0x254fb4, _0x51c2fa, _0x276146) {
        const _0x5c488a = _0x1a688b,
            _0x4028e6 = Object['assign']({}, _0x2ca0ab, {
                'chart': Object["assign"]({}, _0x2ca0ab["chart"], {
                    'renderTo': _0x276146
                })
            }),
            _0x6ffa13 = _0x254fb4['type'];
        if (_0x6ffa13 === "radar") {
            const _0x2663db = _0x51c2fa["dims"] || {},
                _0x482947 = Object["keys"](_0x2663db),
                _0x375a34 = _0x482947["map"](_0x55623e => +(_0x2663db[_0x55623e] || 0x0));
            // Cada ponto herda a cor da etapa (stage) do subgrupo correspondente,
            // definida em scoring.stages do QUIZ_CONFIG. Sem stages, mantém dourado.
            const qeScoring = _0x18181a && _0x18181a["scoring"] || {},
                qeStageColor = {};
            (qeScoring["stages"] || []).forEach(qeSt => {
                qeStageColor[qeSt["id"]] = qeSt["color"];
            });
            const qePointColor = qeKey => {
                const qeSg = (qeScoring["subgroups"] || []).find(qeS => (qeS["shortLabel"] || qeS["label"]) === qeKey);
                return (qeSg && qeStageColor[qeSg["stage"]]) || "#B8952A";
            };
            const qeRadarData = _0x482947.map((qeKey, qeI) => ({
                'y': _0x375a34[qeI],
                'marker': {
                    'fillColor': qePointColor(qeKey),
                    'lineColor': qePointColor(qeKey),
                    'radius': 0x4
                }
            }));
            Object['assign'](_0x4028e6, {
                'chart': Object["assign"]({}, _0x4028e6["chart"], {
                    'polar': !![],
                    'type': "area"
                }),
                'xAxis': {
                    'categories': _0x482947,
                    'tickmarkPlacement': 'on',
                    'lineWidth': 0x0,
                    'gridLineColor': "#EEF2F9",
                    'labels': {
                        'style': {
                            'fontSize': '10px',
                            'color': '#6B7A8D',
                            'fontFamily': "'DM Mono'"
                        }
                    }
                },
                'yAxis': {
                    'min': 0x0,
                    'max': _0x254fb4["yMax"] || undefined,
                    'gridLineColor': '#EEF2F9',
                    'labels': {
                        'enabled': ![]
                    }
                },
                'series': [{
                    'name': "Pontuação",
                    'data': qeRadarData,
                    'pointPlacement': 'on',
                    'color': "rgba(27,58,122,.6)",
                    'fillColor': 'rgba(27,58,122,.12)',
                    'lineWidth': 0x2,
                    'marker': {
                        'fillColor': "#B8952A",
                        'radius': 0x4
                    }
                }],
                'tooltip': {
                    'pointFormat': '<b>{point.y}</b>'
                }
            });
        } else {
            if (_0x6ffa13 === "bar") {
                const _0x1fe40d = _0x51c2fa["items"] || Object["entries"](_0x51c2fa["dims"] || {})["map"](([_0x2d3b68, _0x484b5d]) => ({
                    'label': _0x2d3b68,
                    'score': +_0x484b5d,
                    'max': 0x3
                }));
                Object["assign"](_0x4028e6, {
                    'chart': Object["assign"]({}, _0x4028e6["chart"], {
                        'type': 'bar'
                    }),
                    'xAxis': {
                        'categories': _0x1fe40d["map"](_0x47338f => _0x47338f["label"]),
                        'labels': {
                            'style': {
                                'fontSize': "10px",
                                'color': "#6B7A8D"
                            }
                        }
                    },
                    'yAxis': {
                        'min': 0x0,
                        'title': {
                            'text': ''
                        },
                        'labels': {
                            'style': {
                                'fontSize': "10px"
                            }
                        }
                    },
                    'series': [{
                        'name': 'Score',
                        'data': _0x1fe40d["map"](_0x522b6b => +_0x522b6b["score"]),
                        'color': '#1B3A7A'
                    }],
                    'tooltip': {
                        'pointFormat': "<b>{point.y}</b>"
                    }
                });
            } else {
                if (_0x6ffa13 === "column") {
                    const _0x15a695 = _0x51c2fa["cats"] || {},
                        _0x7f955b = Object["keys"](_0x15a695);
                    Object["assign"](_0x4028e6, {
                        'chart': Object['assign']({}, _0x4028e6["chart"], {
                            'type': "column"
                        }),
                        'xAxis': {
                            'categories': _0x7f955b,
                            'labels': {
                                'style': {
                                    'fontSize': "10px",
                                    'color': "#6B7A8D"
                                }
                            }
                        },
                        'yAxis': {
                            'min': 0x0,
                            'title': {
                                'text': ''
                            }
                        },
                        'series': [{
                            'name': 'Acertos',
                            'data': _0x7f955b["map"](_0x44049c => _0x15a695[_0x44049c]["correct"] || 0x0),
                            'color': '#1B3A7A'
                        }, {
                            'name': "Total",
                            'data': _0x7f955b['map'](_0xf97265 => _0x15a695[_0xf97265]["total"] || 0x0),
                            'color': "#EEF2F9"
                        }]
                    });
                } else {
                    if (_0x6ffa13 === 'donut') {
                        const _0x41e9db = _0x254fb4['dataFn'] ? _0x254fb4["dataFn"](_0x51c2fa) : _0x39662f(_0x51c2fa);
                        Object['assign'](_0x4028e6, {
                            'chart': Object["assign"]({}, _0x4028e6["chart"], {
                                'type': "pie"
                            }),
                            'plotOptions': {
                                'pie': {
                                    'innerSize': '55%',
                                    'dataLabels': {
                                        'style': {
                                            'fontSize': "11px",
                                            'fontFamily': '\x27DM\x20Mono\x27'
                                        }
                                    }
                                }
                            },
                            'series': [{
                                'name': _0x254fb4["seriesName"] || "Valor",
                                'data': _0x41e9db,
                                'colorByPoint': !![]
                            }],
                            'tooltip': {
                                'pointFormat': _0x51c2fa['discountAmounts'] ? '<b>{point.name}:\x20R$\x20{point.y:,.0f}\x20({point.percentage:.0f}%)</b>' : "<b>{point.percentage:.0f}%</b>"
                            }
                        });
                    } else {
                        if (_0x6ffa13 === "area") {
                            const _0x3d0da9 = (_0x18181a["scoring"]["stages"] || [])['map'](_0x369f6e => _0x369f6e["label"]),
                                _0x44768b = (_0x18181a["scoring"]["stages"] || [])['map'](_0x2965a7 => _0x2965a7["avgMonths"] || 0x0),
                                _0x22e62f = _0x18181a["scoring"]["stages"] ? _0x18181a["scoring"]["stages"]["findIndex"](_0x2c6f18 => _0x2c6f18['label'] === (_0x51c2fa["stage"] && _0x51c2fa["stage"]["label"])) : 0x0;
                            Object['assign'](_0x4028e6, {
                                'chart': Object["assign"]({}, _0x4028e6['chart'], {
                                    'type': 'area'
                                }),
                                'xAxis': {
                                    'categories': _0x3d0da9,
                                    'labels': {
                                        'style': {
                                            'fontSize': '10px',
                                            'color': "#6B7A8D"
                                        }
                                    }
                                },
                                'yAxis': {
                                    'title': {
                                        'text': 'Meses\x20médios'
                                    },
                                    'labels': {
                                        'style': {
                                            'fontSize': '10px'
                                        }
                                    }
                                },
                                'series': [{
                                    'name': "Tempo para deal",
                                    'data': _0x44768b,
                                    'color': "#1B3A7A",
                                    'fillColor': "rgba(27,58,122,.1)",
                                    'marker': {
                                        'fillColor': _0x304f31 => _0x304f31 === _0x22e62f ? "#B8952A" : "#1B3A7A",
                                        'radius': 0x5
                                    }
                                }]
                            });
                        } else {
                            if (_0x6ffa13 === 'waterfall') {
                                const _0x50849d = 0xa,
                                    _0x3e8ecd = _0x51c2fa["cats"] || {},
                                    _0x212df8 = [{
                                        'name': "Base",
                                        'y': _0x50849d,
                                        'color': "#1B3A7A"
                                    }],
                                    _0x5a6c81 = Object["keys"](_0x3e8ecd);
                                _0x5a6c81['forEach'](_0x741667 => {
                                    const _0x238cf2 = _0x5c488a;
                                    !_0x3e8ecd[_0x741667]['correct'] && _0x212df8["push"]({
                                        'name': _0x741667,
                                        'y': -(_0x3e8ecd[_0x741667]["discount"] || 0.1) * _0x50849d,
                                        'color': "#9A2020",
                                        'isIntermediateSum': ![]
                                    });
                                }), _0x212df8['push']({
                                    'name': "Valor Final",
                                    'isSum': !![],
                                    'color': "#B8952A"
                                }), Object["assign"](_0x4028e6, {
                                    'chart': Object["assign"]({}, _0x4028e6["chart"], {
                                        'type': "waterfall"
                                    }),
                                    'xAxis': {
                                        'type': "category",
                                        'labels': {
                                            'style': {
                                                'fontSize': "10px"
                                            }
                                        }
                                    },
                                    'yAxis': {
                                        'title': {
                                            'text': "Múltiplo de EV"
                                        }
                                    },
                                    'series': [{
                                        'data': _0x212df8,
                                        'dataLabels': {
                                            'enabled': !![],
                                            'style': {
                                                'fontSize': "10px"
                                            }
                                        }
                                    }]
                                });
                            } else {
                                if (_0x6ffa13 === "columnrange") {
                                    const _0x19a1f3 = _0x51c2fa,
                                        _0x1a669f = _0x2701f9 => +(_0x2701f9 / 0xf4240)["toFixed"](0x2);
                                    Object["assign"](_0x4028e6, {
                                        'chart': Object["assign"]({}, _0x4028e6["chart"], {
                                            'type': "columnrange",
                                            'inverted': !![]
                                        }),
                                        'xAxis': {
                                            'categories': ["Sua empresa hoje", "Benchmark do setor", 'Com\x20preparação'],
                                            'labels': {
                                                'style': {
                                                    'fontSize': "11px",
                                                    'color': "#6B7A8D"
                                                }
                                            }
                                        },
                                        'yAxis': {
                                            'title': {
                                                'text': "Enterprise Value (R$ M)"
                                            },
                                            'labels': {
                                                'style': {
                                                    'fontSize': '10px'
                                                }
                                            }
                                        },
                                        'plotOptions': {
                                            'columnrange': {
                                                'grouping': ![],
                                                'borderWidth': 0x0,
                                                'pointWidth': 0x1c
                                            }
                                        },
                                        'legend': {
                                            'enabled': !![]
                                        },
                                        'series': [{
                                            'name': "Sua empresa hoje",
                                            'color': "#1B3A7A",
                                            'data': [
                                                [_0x1a669f(_0x19a1f3["min"]), _0x1a669f(_0x19a1f3["max"])], null, null
                                            ]
                                        }, {
                                            'name': "Benchmark do setor",
                                            'color': "#6B7A8D",
                                            'data': [null, [_0x1a669f(_0x19a1f3["benchMin"]), _0x1a669f(_0x19a1f3['benchMax'])], null]
                                        }, {
                                            'name': 'Com\x20preparação',
                                            'color': '#B8952A',
                                            'data': [null, null, [_0x1a669f(_0x19a1f3["consultMin"]), _0x1a669f(_0x19a1f3["consultMax"])]]
                                        }],
                                        'tooltip': {
                                            'pointFormat': "<span style=\"color:{series.color}\">●</span> {series.name}: <b>R$ {point.low}M – R$ {point.high}M</b><br/>"
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        if (Highcharts) Highcharts["chart"](_0x276146, _0x4028e6);
    }

    function _0x39662f(_0x54691b) {
        const _0xffd8ad = _0x1a688b;
        if (_0x54691b["discountAmounts"]) {
            const _0x57ea84 = _0x54691b["discountAmounts"];
            return [{
                'name': 'Valor\x20retido',
                'y': _0x57ea84["valorRetido"],
                'color': '#1B3A7A'
            }, {
                'name': 'Desconto\x20de\x20porte',
                'y': _0x57ea84['porte'],
                'color': '#9A2020'
            }, {
                'name': "Desconto de liquidez",
                'y': _0x57ea84["liquidez"],
                'color': "#B85820"
            }, {
                'name': "Riscos da empresa",
                'y': _0x57ea84["company"],
                'color': "#C09030"
            }, {
                'name': "Desconto de região",
                'y': _0x57ea84["regiao"],
                'color': '#6B7A8D'
            }]["filter"](_0x305383 => _0x305383['y'] > 0x0);
        }
        if (_0x54691b["profiles"]) return Object["entries"](_0x54691b["profiles"])['map'](([_0x14dfc6, _0x5a8bef]) => ({
            'name': _0x14dfc6,
            'y': _0x5a8bef,
            'color': _0x295e9d(_0x14dfc6)
        }));
        if (_0x54691b["cats"]) {
            const _0x3eb45d = Object["values"](_0x54691b['cats'])["filter"](_0x21bd00 => _0x21bd00['correct'])["length"],
                _0x4dba19 = Object['keys'](_0x54691b["cats"])['length'] - _0x3eb45d;
            return [{
                'name': "Acertos",
                'y': _0x3eb45d,
                'color': "#1B3A7A"
            }, {
                'name': "Erros",
                'y': _0x4dba19,
                'color': '#EEF2F9'
            }];
        }
        return [{
            'name': "Score",
            'y': _0x54691b['main'],
            'color': "#1B3A7A"
        }, {
            'name': 'Restante',
            'y': (_0x54691b["max"] || 0xa) - _0x54691b["main"],
            'color': '#EEF2F9'
        }];
    }

    function _0x295e9d(_0x1dc865) {
        const _0x4cc55a = _0x1a688b,
            _0x16f267 = {
                'PE': "#0A1628",
                'EST': "#1B3A7A",
                'FAM': '#B8952A',
                'CONC': "#2A52A8"
            };
        return _0x16f267[_0x1dc865] || '#6B7A8D';
    }

    function _0xdd5eb9(_0x1e1a6c) {
        const _0x13e583 = _0x1a688b,
            _0x36719d = document["createElement"]("div");
        if (_0x1e1a6c) _0x36719d["className"] = _0x1e1a6c;
        return _0x36719d;
    }
    return {
        'init': _0x455745
    };
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
        try {
            el.focus();
        } catch (x) {}
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
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                shakeErr(txt, 'Preencha este campo.');
                return;
            }
            if (tv.length < 3) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                shakeErr(txt, 'O nome deve ter pelo menos 3 letras.');
                return;
            }
        }
        var em = capture.querySelector('input[type=email].form-input');
        if (em) {
            var ev = em.value.trim();
            if (!ev) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                shakeErr(em, 'Preencha seu e-mail.');
                return;
            }
            if (!validateEmail(ev)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                shakeErr(em, 'Digite um e-mail válido (ex: voce@email.com).');
                return;
            }
        }
        var tel = capture.querySelector('input[type=tel].form-input');
        if (tel) {
            var pv = tel.value.trim();
            if (!pv) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                shakeErr(tel, 'Preencha seu WhatsApp com DDD (ex: 11 99999-9999).');
                return;
            }
            if (!validatePhone(pv)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
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