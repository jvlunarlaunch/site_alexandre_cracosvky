/* Supabase client — inicializa window._sb a partir do supabase-js (carregado via CDN
 * antes deste arquivo). Código legível, sem ofuscação (política do projeto — ver CLAUDE.md).
 *
 * A anon key é pública por design: a proteção dos dados vem das policies de RLS
 * (insert-only nas tabelas das iscas; select sempre retorna []).
 */
(function () {
    'use strict';

    var SUPABASE_URL = 'https://dldsnfzqguoewnyxkxay.supabase.co';
    var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZHNuZnpxZ3VvZXdueXhreGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NDEyOTksImV4cCI6MjA2MTAxNzI5OX0.3zsl_E60gN-Gfzv2T1hmYGyS0-xpxmwkPOMquNH1kpY';

    try {
        window._sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
        window._sb = null;
    }
}());
