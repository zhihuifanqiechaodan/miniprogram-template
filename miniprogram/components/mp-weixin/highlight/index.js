'use strict';
function e(e) {
  this.vm = e;
}
var r = require('./prism.min'),
  s = require('./config'),
  t = require('../parser');
(e.prototype.onParse = function (e, a) {
  if ('pre' === e.name) {
    if (a.options.editable) return void (e.attrs.class = (e.attrs.class || '') + ' hl-pre');
    var n;
    for (n = e.children.length; n-- && 'code' !== e.children[n].name; );
    if (-1 === n) return;
    var l = e.children[n],
      i = l.attrs.class + ' ' + e.attrs.class;
    (n = i.indexOf('language-')),
      -1 === n ? ((n = i.indexOf('lang-')), -1 === n ? ((i = 'language-text'), (n = 9)) : (n += 5)) : (n += 9);
    var c;
    for (c = n; c < i.length && ' ' !== i[c]; c++);
    var h = i.substring(n, c);
    if (l.children.length) {
      var o = this.vm.getText(l.children).replace(/&amp;/g, '&');
      if (!o) return;
      if (
        (e.c && (e.c = void 0),
        r.languages[h] &&
          (l.children = new t(this.vm).parse(
            '<pre>' + r.highlight(o, r.languages[h], h).replace(/token /g, 'hl-') + '</pre>'
          )[0].children),
        (e.attrs.class = 'hl-pre'),
        (l.attrs.class = 'hl-code'),
        s.showLanguageName &&
          e.children.push({
            name: 'div',
            attrs: { class: 'hl-language', style: 'user-select:none' },
            children: [{ type: 'text', text: h }],
          }),
        s.copyByLongPress &&
          ((e.attrs.style += (e.attrs.style || '') + ';user-select:none'), (e.attrs['data-content'] = o), a.expose()),
        s.showLineNumber)
      ) {
        for (var g = o.split('\n').length, p = [], u = g; u--; ) p.push({ name: 'span', attrs: { class: 'span' } });
        e.children.push({ name: 'span', attrs: { class: 'line-numbers-rows' }, children: p });
      }
    }
  }
}),
  (module.exports = e);
