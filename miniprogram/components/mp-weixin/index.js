'use strict';
function e(e, t, n) {
  return (
    t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e
  );
}
/*!
 * mp-html v2.4.0
 * https://github.com/jin-yufeng/mp-html
 *
 * Released under the MIT license
 * Author: Jin Yufeng
 */
var t = require('./parser'),
  n = [require('./markdown/index.js'), require('./highlight/index.js')];
Component({
  data: { nodes: [] },
  properties: {
    markdown: Boolean,
    containerStyle: String,
    content: {
      type: String,
      value: '',
      observer: function (e) {
        this.setContent(e);
      },
    },
    copyLink: { type: Boolean, value: !0 },
    domain: String,
    errorImg: String,
    lazyLoad: Boolean,
    loadingImg: String,
    pauseVideo: { type: Boolean, value: !0 },
    previewImg: { type: Boolean, value: !0 },
    scrollTable: Boolean,
    selectable: null,
    setTitle: { type: Boolean, value: !0 },
    showImgMenu: { type: Boolean, value: !0 },
    tagStyle: Object,
    useAnchor: null,
  },
  created: function () {
    this.plugins = [];
    for (var e = n.length; e--; ) this.plugins.push(new n[e](this));
  },
  detached: function () {
    this._hook('onDetached');
  },
  methods: {
    in: function (e, t, n) {
      e && t && n && (this._in = { page: e, selector: t, scrollTop: n });
    },
    navigateTo: function (t, n) {
      var i = this;
      return (
        (t = this._ids[decodeURI(t)] || t),
        new Promise(function (o, r) {
          if (!i.data.useAnchor) return void r(Error('Anchor is disabled'));
          var a = wx
            .createSelectorQuery()
            .in(i._in ? i._in.page : i)
            .select((i._in ? i._in.selector : '._root') + (t ? ''.concat('>>>', '#').concat(t) : ''))
            .boundingClientRect();
          i._in
            ? a.select(i._in.selector).scrollOffset().select(i._in.selector).boundingClientRect()
            : a.selectViewport().scrollOffset(),
            a.exec(function (t) {
              if (!t[0]) return void r(Error('Label not found'));
              var a = t[1].scrollTop + t[0].top - (t[2] ? t[2].top : 0) + (n || parseInt(i.data.useAnchor) || 0);
              i._in ? i._in.page.setData(e({}, i._in.scrollTop, a)) : wx.pageScrollTo({ scrollTop: a, duration: 300 }),
                o();
            });
        })
      );
    },
    getText: function (e) {
      var t = '';
      return (
        (function e(n) {
          for (var i = 0; i < n.length; i++) {
            var o = n[i];
            if ('text' === o.type) t += o.text.replace(/&amp;/g, '&');
            else if ('br' === o.name) t += '\n';
            else {
              var r =
                'p' === o.name ||
                'div' === o.name ||
                'tr' === o.name ||
                'li' === o.name ||
                ('h' === o.name[0] && o.name[1] > '0' && o.name[1] < '7');
              r && t && '\n' !== t[t.length - 1] && (t += '\n'),
                o.children && e(o.children),
                r && '\n' !== t[t.length - 1] ? (t += '\n') : ('td' !== o.name && 'th' !== o.name) || (t += '\t');
            }
          }
        })(e || this.data.nodes),
        t
      );
    },
    getRect: function () {
      var e = this;
      return new Promise(function (t, n) {
        wx.createSelectorQuery()
          .in(e)
          .select('._root')
          .boundingClientRect()
          .exec(function (e) {
            return e[0] ? t(e[0]) : n(Error('Root label not found'));
          });
      });
    },
    pauseMedia: function () {
      for (var e = (this._videos || []).length; e--; ) this._videos[e].pause();
    },
    setPlaybackRate: function (e) {
      this.playbackRate = e;
      for (var t = (this._videos || []).length; t--; ) this._videos[t].playbackRate(e);
    },
    setContent: function (e, n) {
      var i = this;
      (this.imgList && n) || (this.imgList = []), (this._videos = []);
      var o = {},
        r = new t(this).parse(e);
      if (n) for (var a = this.data.nodes.length, s = r.length; s--; ) o['nodes['.concat(a + s, ']')] = r[s];
      else o.nodes = r;
      if (
        (this.setData(o, function () {
          i._hook('onLoad'), i.triggerEvent('load');
        }),
        this.data.lazyLoad || this.imgList._unloadimgs < this.imgList.length / 2)
      ) {
        var l,
          c = function e(t) {
            t.height === l
              ? i.triggerEvent('ready', t)
              : ((l = t.height),
                setTimeout(function () {
                  i.getRect().then(e);
                }, 350));
          };
        this.getRect().then(c);
      } else
        this.imgList._unloadimgs ||
          this.getRect(function (e) {
            i.triggerEvent('ready', e);
          });
    },
    _hook: function (e) {
      for (var t = n.length; t--; ) this.plugins[t][e] && this.plugins[t][e]();
    },
    _add: function (e) {
      e.detail.root = this;
    },
  },
});
