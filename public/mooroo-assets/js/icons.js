/* 16×16 픽셀 아이콘. 글자 하나 = 칸 하나, 글자마다 색 클래스(.pk .pw …)로 칠해서 테마마다 색이 바뀐다.
   k 테두리 · w 흰색 · l 밝은 회색 · s 그림자 · a 강조색 · d 강조 진한색 · b 폴더/지구 파랑 · c 파랑 그림자 · y 노랑 · o 주황 · r 세일 빨강 */
(function () {
  var I = {
    app: [
      '',
      '.kkkkkkkkkkkkkk',
      '.kaaaaaaaaaakwk',
      '.kkkkkkkkkkkkkk',
      '.kwwwwwwwwwwwwk',
      '.kwllllwwwwwwwk',
      '.kwwwwwwwwwwwwk',
      '.kwllwwwwwwwwwk',
      '.kwwwwwwwwwwwwk',
      '.kwlllllwwwwwwk',
      '.kwwwwwwwwwwwwk',
      '.kkkkkkkkkkkkkk'
    ],
    folder: [
      '', '',
      '.kkkkk',
      'kbbbbbk',
      'kbbbbbbkkkkkkkk',
      'kbbbbbbbbbbbbbbk',
      'kkkkkkkkkkkkkkkk',
      'kwwwwwwwwwwwwwwk',
      'kbbbbbbbbbbbbbbk',
      'kbbbbbbbbbbbbbbk',
      'kbbbbbbbbbbbbbbk',
      'kbbbbbbbbbbbbbbk',
      'kcccccccccccccck',
      'kkkkkkkkkkkkkkkk'
    ],
    about: 'folder',
    new: [
      ['..kkkkkkkk',
       '..kwwwwwwkk',
       '..kwwwwwwklk',
       '..kwwwwwwkkkk',
       '..kwwwwwwwwwk',
       '..kwllllllwwk',
       '..kwwwwwwwwwk',
       '..kwlllllwwwk',
       '..kwwwwwwwwwk',
       '..kwllllwwwwk',
       '..kwwwwwwwwwk',
       '..kwwwwwwwwwk',
       '..kwwwwwwwwwk',
       '..kkkkkkkkkkk'],
      ['', '', '', '', '', '', '', '',
       '............d',
       '............a',
       '...........dad',
       '.........daawaad',
       '...........dad',
       '............a',
       '............d']
    ],
    sale: [
      '',
      '......kkkkkkkk',
      '.....krrrrrrrrk',
      '....krrrrrrrrrk',
      '...krrwwrrrrrrk',
      '..krrrwwrrrrrrk',
      '.krrrrrrrrrrrrk',
      '.krrrrrwrrrwrrk',
      '.krrrrrrrrwrrrk',
      '..krrrrrrwrrrrk',
      '...krrrrwrrrrrk',
      '....krrwrrrwrrk',
      '.....krrrrrrrrk',
      '......kkkkkkkk'
    ],
    best: [
      '', '', '',
      '.kk....kk....kk',
      '.kyk..kyyk..kyk',
      '.kyyk.kyyk.kyyk',
      '.kyyykyyyykyyyk',
      '.kyyyyyyyyyyyyk',
      '.kyyryyyryyyryk',
      '.kyyyyyyyyyyyyk',
      '.kooooooooooook',
      '.kkkkkkkkkkkkkk',
      '..kwwwwwwwwwwk',
      '..kkkkkkkkkkkk'
    ],
    coordi: [
      '', '',
      '...kkkk',
      '..kllllk...kkk',
      '.kkkkkkkkkkkkkk',
      '.kllllllllllaak',
      '.kllllkkkkllllk',
      '.klllkwwwwklllk',
      '.kllkwaawwwkllk',
      '.kllkwaaawwkllk',
      '.kllkwwaawwkllk',
      '.klllkwwwwklllk',
      '.kllllkkkkllllk',
      '.kkkkkkkkkkkkkk'
    ],
    cart: [
      '',
      'kk',
      '.k',
      '.kkkkkkkkkkkkkk',
      '..kwwwwwwwwwwk',
      '..kwlwlwlwlwlk',
      '..kwwwwwwwwwwk',
      '...kwlwlwlwlk',
      '...kwwwwwwwwk',
      '....kkkkkkkk',
      '....k......k',
      '...kkk....kkk',
      '...kak....kak',
      '...kkk....kkk'
    ],
    qna: [
      '',
      '.kkkkkkkkkkkkk',
      'kwwwwwwwwwwwwwk',
      'kwwwwkkkkwwwwwk',
      'kwwwkwwwwkwwwwk',
      'kwwwwwwwwkwwwwk',
      'kwwwwwwkkwwwwwk',
      'kwwwwwwkwwwwwwk',
      'kwwwwwwwwwwwwwk',
      'kwwwwwwkwwwwwwk',
      '.kkkkwwkkkkkkk',
      '....kwk',
      '....kk'
    ],
    user: [
      '', '',
      '.....kkkkk',
      '....kwwwwwk',
      '....kwwwwwk',
      '....kwwwwwk',
      '.....kkkkk',
      '',
      '...kkkkkkkkk',
      '..kwwwwwwwwwk',
      '.kwwwwwwwwwwwk',
      '.kwwwwwwwwwwwk',
      '.kkkkkkkkkkkkk'
    ],
    home: [
      '',
      '.......kk',
      '......kwwk',
      '.....kwwwwk',
      '....kwwwwwwk',
      '...kwwwwwwwwk',
      '..kwwwwwwwwwwk',
      '.kkkwwwwwwwwkkk',
      '...kwwwwwwwwk',
      '...kwwkkkwwwk',
      '...kwwkakwwwk',
      '...kwwkakwwwk',
      '...kkkkkkkkkk'
    ],
    globe: [
      '',
      '.....kkkkkk',
      '...kkbwbbwbkk',
      '..kbbbwbbwbbbk',
      '.kbbbbwbbwbbbbk',
      '.kwwwwwwwwwwwwk',
      'kbbbbwbbbbwbbbbk',
      'kbbbbwbbbbwbbbbk',
      'kbbbbwbbbbwbbbbk',
      'kbbbbwbbbbwbbbbk',
      '.kwwwwwwwwwwwwk',
      '.kbbbbwbbwbbbbk',
      '..kbbbwbbwbbbk',
      '...kkbwbbwbkk',
      '.....kkkkkk'
    ],
    heart: [
      '', '', '',
      '.....kk...kk',
      '....kaak.kaak',
      '...kaaaakaaaak',
      '...kaaaaaaaaak',
      '....kaaaaaaak',
      '.....kaaaaak',
      '......kaaak',
      '.......kak',
      '........k'
    ],
    floppy: [
      '',
      '.kkkkkkkkkkkkkk',
      '.kbbkwwwwwwkbbk',
      '.kbbkwwwwkwkbbk',
      '.kbbkwwwwkwkbbk',
      '.kbbkkkkkkkkbbk',
      '.kbbbbbbbbbbbbk',
      '.kbbkkkkkkkkbbk',
      '.kbkwwwwwwwwkbk',
      '.kbkwllllllwkbk',
      '.kbkwwwwwwwwkbk',
      '.kbkwllllllwkbk',
      '.kbkwwwwwwwwkbk',
      '.kkkkkkkkkkkkkk'
    ],
    cursor: [
      'k',
      'kk',
      'kwk',
      'kwwk',
      'kwwwk',
      'kwwwwk',
      'kwwwwwk',
      'kwwwwwwk',
      'kwwwwwwwk',
      'kwwwwkkkkk',
      'kwwkwwk',
      'kwk.kwwk',
      'kk...kwwk',
      'k.....kwwk',
      '.......kk'
    ]
  };

  function grid(name) {
    var g = I[name];
    if (typeof g === 'string') g = I[g];
    if (!g) return null;
    var layers = Array.isArray(g[0]) ? g : [g];
    var out = [];
    for (var y = 0; y < 16; y++) out.push('................'.split(''));
    layers.forEach(function (L) {
      L.forEach(function (row, y) {
        for (var x = 0; x < row.length && x < 16; x++) if (row[x] !== '.') out[y][x] = row[x];
      });
    });
    return out;
  }

  function svg(name) {
    var g = grid(name);
    if (!g) return '';
    var byChar = {};
    for (var y = 0; y < 16; y++) {
      var x = 0;
      while (x < 16) {
        var ch = g[y][x];
        if (ch === '.') { x++; continue; }
        var s = x;
        while (x < 16 && g[y][x] === ch) x++;
        (byChar[ch] = byChar[ch] || []).push('M' + s + ' ' + y + 'h' + (x - s) + 'v1h-' + (x - s) + 'z');
      }
    }
    var paths = Object.keys(byChar).map(function (c) {
      return '<path class="p' + c + '" d="' + byChar[c].join('') + '"/>';
    }).join('');
    return '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + paths + '</svg>';
  }

  window.MOOICON = {
    hydrate: function (root) {
      (root || document).querySelectorAll('.px[data-icon]:not([data-done])').forEach(function (el) {
        el.innerHTML = svg(el.getAttribute('data-icon'));
        el.setAttribute('data-done', '1');
      });
    }
  };
})();
