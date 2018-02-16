// ==UserScript==
// @name         Google Search "View Image" Button
// @namespace    https://github.com/devunt/make-gis-great-again
// @version      1.1
// @description  This userscript adds "View Image" button to Google Image Search results.
// @author       Bae Junehyeon
// @run-at       document-end
// @match        *://*.google.ac/*tbm=isch*
// @match        *://*.google.ad/*tbm=isch*
// @match        *://*.google.ae/*tbm=isch*
// @match        *://*.google.com.af/*tbm=isch*
// @match        *://*.google.com.ag/*tbm=isch*
// @match        *://*.google.com.ai/*tbm=isch*
// @match        *://*.google.al/*tbm=isch*
// @match        *://*.google.am/*tbm=isch*
// @match        *://*.google.co.ao/*tbm=isch*
// @match        *://*.google.com.ar/*tbm=isch*
// @match        *://*.google.as/*tbm=isch*
// @match        *://*.google.at/*tbm=isch*
// @match        *://*.google.com.au/*tbm=isch*
// @match        *://*.google.az/*tbm=isch*
// @match        *://*.google.ba/*tbm=isch*
// @match        *://*.google.com.bd/*tbm=isch*
// @match        *://*.google.be/*tbm=isch*
// @match        *://*.google.bf/*tbm=isch*
// @match        *://*.google.bg/*tbm=isch*
// @match        *://*.google.com.bh/*tbm=isch*
// @match        *://*.google.bi/*tbm=isch*
// @match        *://*.google.bj/*tbm=isch*
// @match        *://*.google.com.bn/*tbm=isch*
// @match        *://*.google.com.bo/*tbm=isch*
// @match        *://*.google.com.br/*tbm=isch*
// @match        *://*.google.bs/*tbm=isch*
// @match        *://*.google.bt/*tbm=isch*
// @match        *://*.google.co.bw/*tbm=isch*
// @match        *://*.google.by/*tbm=isch*
// @match        *://*.google.com.bz/*tbm=isch*
// @match        *://*.google.ca/*tbm=isch*
// @match        *://*.google.com.kh/*tbm=isch*
// @match        *://*.google.cc/*tbm=isch*
// @match        *://*.google.cd/*tbm=isch*
// @match        *://*.google.cf/*tbm=isch*
// @match        *://*.google.cat/*tbm=isch*
// @match        *://*.google.cg/*tbm=isch*
// @match        *://*.google.ch/*tbm=isch*
// @match        *://*.google.ci/*tbm=isch*
// @match        *://*.google.co.ck/*tbm=isch*
// @match        *://*.google.cl/*tbm=isch*
// @match        *://*.google.cm/*tbm=isch*
// @match        *://*.google.cn/*tbm=isch*
// @match        *://*.google.com.co/*tbm=isch*
// @match        *://*.google.co.cr/*tbm=isch*
// @match        *://*.google.com.cu/*tbm=isch*
// @match        *://*.google.cv/*tbm=isch*
// @match        *://*.google.com.cy/*tbm=isch*
// @match        *://*.google.cz/*tbm=isch*
// @match        *://*.google.de/*tbm=isch*
// @match        *://*.google.dj/*tbm=isch*
// @match        *://*.google.dk/*tbm=isch*
// @match        *://*.google.dm/*tbm=isch*
// @match        *://*.google.com.do/*tbm=isch*
// @match        *://*.google.dz/*tbm=isch*
// @match        *://*.google.com.ec/*tbm=isch*
// @match        *://*.google.ee/*tbm=isch*
// @match        *://*.google.com.eg/*tbm=isch*
// @match        *://*.google.es/*tbm=isch*
// @match        *://*.google.com.et/*tbm=isch*
// @match        *://*.google.fi/*tbm=isch*
// @match        *://*.google.com.fj/*tbm=isch*
// @match        *://*.google.fm/*tbm=isch*
// @match        *://*.google.fr/*tbm=isch*
// @match        *://*.google.ga/*tbm=isch*
// @match        *://*.google.ge/*tbm=isch*
// @match        *://*.google.gf/*tbm=isch*
// @match        *://*.google.gg/*tbm=isch*
// @match        *://*.google.com.gh/*tbm=isch*
// @match        *://*.google.com.gi/*tbm=isch*
// @match        *://*.google.gl/*tbm=isch*
// @match        *://*.google.gm/*tbm=isch*
// @match        *://*.google.gp/*tbm=isch*
// @match        *://*.google.gr/*tbm=isch*
// @match        *://*.google.com.gt/*tbm=isch*
// @match        *://*.google.gy/*tbm=isch*
// @match        *://*.google.com.hk/*tbm=isch*
// @match        *://*.google.hn/*tbm=isch*
// @match        *://*.google.hr/*tbm=isch*
// @match        *://*.google.ht/*tbm=isch*
// @match        *://*.google.hu/*tbm=isch*
// @match        *://*.google.co.id/*tbm=isch*
// @match        *://*.google.iq/*tbm=isch*
// @match        *://*.google.ie/*tbm=isch*
// @match        *://*.google.co.il/*tbm=isch*
// @match        *://*.google.im/*tbm=isch*
// @match        *://*.google.co.in/*tbm=isch*
// @match        *://*.google.io/*tbm=isch*
// @match        *://*.google.is/*tbm=isch*
// @match        *://*.google.it/*tbm=isch*
// @match        *://*.google.je/*tbm=isch*
// @match        *://*.google.com.jm/*tbm=isch*
// @match        *://*.google.jo/*tbm=isch*
// @match        *://*.google.co.jp/*tbm=isch*
// @match        *://*.google.co.ke/*tbm=isch*
// @match        *://*.google.ki/*tbm=isch*
// @match        *://*.google.kg/*tbm=isch*
// @match        *://*.google.co.kr/*tbm=isch*
// @match        *://*.google.com.kw/*tbm=isch*
// @match        *://*.google.kz/*tbm=isch*
// @match        *://*.google.la/*tbm=isch*
// @match        *://*.google.com.lb/*tbm=isch*
// @match        *://*.google.com.lc/*tbm=isch*
// @match        *://*.google.li/*tbm=isch*
// @match        *://*.google.lk/*tbm=isch*
// @match        *://*.google.co.ls/*tbm=isch*
// @match        *://*.google.lt/*tbm=isch*
// @match        *://*.google.lu/*tbm=isch*
// @match        *://*.google.lv/*tbm=isch*
// @match        *://*.google.com.ly/*tbm=isch*
// @match        *://*.google.co.ma/*tbm=isch*
// @match        *://*.google.md/*tbm=isch*
// @match        *://*.google.me/*tbm=isch*
// @match        *://*.google.mg/*tbm=isch*
// @match        *://*.google.mk/*tbm=isch*
// @match        *://*.google.ml/*tbm=isch*
// @match        *://*.google.com.mm/*tbm=isch*
// @match        *://*.google.mn/*tbm=isch*
// @match        *://*.google.ms/*tbm=isch*
// @match        *://*.google.com.mt/*tbm=isch*
// @match        *://*.google.mu/*tbm=isch*
// @match        *://*.google.mv/*tbm=isch*
// @match        *://*.google.mw/*tbm=isch*
// @match        *://*.google.com.mx/*tbm=isch*
// @match        *://*.google.com.my/*tbm=isch*
// @match        *://*.google.co.mz/*tbm=isch*
// @match        *://*.google.com.na/*tbm=isch*
// @match        *://*.google.ne/*tbm=isch*
// @match        *://*.google.com.nf/*tbm=isch*
// @match        *://*.google.com.ng/*tbm=isch*
// @match        *://*.google.com.ni/*tbm=isch*
// @match        *://*.google.nl/*tbm=isch*
// @match        *://*.google.no/*tbm=isch*
// @match        *://*.google.com.np/*tbm=isch*
// @match        *://*.google.nr/*tbm=isch*
// @match        *://*.google.nu/*tbm=isch*
// @match        *://*.google.co.nz/*tbm=isch*
// @match        *://*.google.com.om/*tbm=isch*
// @match        *://*.google.com.pk/*tbm=isch*
// @match        *://*.google.com.pa/*tbm=isch*
// @match        *://*.google.com.pe/*tbm=isch*
// @match        *://*.google.com.ph/*tbm=isch*
// @match        *://*.google.pl/*tbm=isch*
// @match        *://*.google.com.pg/*tbm=isch*
// @match        *://*.google.pn/*tbm=isch*
// @match        *://*.google.com.pr/*tbm=isch*
// @match        *://*.google.ps/*tbm=isch*
// @match        *://*.google.pt/*tbm=isch*
// @match        *://*.google.com.py/*tbm=isch*
// @match        *://*.google.com.qa/*tbm=isch*
// @match        *://*.google.ro/*tbm=isch*
// @match        *://*.google.rs/*tbm=isch*
// @match        *://*.google.ru/*tbm=isch*
// @match        *://*.google.rw/*tbm=isch*
// @match        *://*.google.com.sa/*tbm=isch*
// @match        *://*.google.com.sb/*tbm=isch*
// @match        *://*.google.sc/*tbm=isch*
// @match        *://*.google.se/*tbm=isch*
// @match        *://*.google.com.sg/*tbm=isch*
// @match        *://*.google.sh/*tbm=isch*
// @match        *://*.google.si/*tbm=isch*
// @match        *://*.google.sk/*tbm=isch*
// @match        *://*.google.com.sl/*tbm=isch*
// @match        *://*.google.sn/*tbm=isch*
// @match        *://*.google.sm/*tbm=isch*
// @match        *://*.google.so/*tbm=isch*
// @match        *://*.google.st/*tbm=isch*
// @match        *://*.google.sr/*tbm=isch*
// @match        *://*.google.com.sv/*tbm=isch*
// @match        *://*.google.td/*tbm=isch*
// @match        *://*.google.tg/*tbm=isch*
// @match        *://*.google.co.th/*tbm=isch*
// @match        *://*.google.com.tj/*tbm=isch*
// @match        *://*.google.tk/*tbm=isch*
// @match        *://*.google.tl/*tbm=isch*
// @match        *://*.google.tm/*tbm=isch*
// @match        *://*.google.to/*tbm=isch*
// @match        *://*.google.tn/*tbm=isch*
// @match        *://*.google.com.tr/*tbm=isch*
// @match        *://*.google.tt/*tbm=isch*
// @match        *://*.google.com.tw/*tbm=isch*
// @match        *://*.google.co.tz/*tbm=isch*
// @match        *://*.google.com.ua/*tbm=isch*
// @match        *://*.google.co.ug/*tbm=isch*
// @match        *://*.google.co.uk/*tbm=isch*
// @match        *://*.google.com/*tbm=isch*
// @match        *://*.google.com.uy/*tbm=isch*
// @match        *://*.google.co.uz/*tbm=isch*
// @match        *://*.google.com.vc/*tbm=isch*
// @match        *://*.google.co.ve/*tbm=isch*
// @match        *://*.google.vg/*tbm=isch*
// @match        *://*.google.co.vi/*tbm=isch*
// @match        *://*.google.com.vn/*tbm=isch*
// @match        *://*.google.vu/*tbm=isch*
// @match        *://*.google.ws/*tbm=isch*
// @match        *://*.google.co.za/*tbm=isch*
// @match        *://*.google.co.zm/*tbm=isch*
// @match        *://*.google.co.zw/*tbm=isch*
// ==/UserScript==


function addButton(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.classList.contains('irc_ris')) {
      let container = node.closest('.irc_c');
      let thumbnail = document.querySelector('img[name="' + container.dataset.itemId + '"]');
      let meta = thumbnail.closest('.rg_bx').querySelector('.rg_meta');

      let metadata = JSON.parse(meta.innerHTML);
      let src = metadata.ou;

      let buttons = container.querySelector('.irc_but_r tr');

      let button = buttons.querySelector('td.mgisga');
      if (button === null) {
        let openButton = buttons.querySelector('td');

        button = openButton.cloneNode(true);
        button.classList.add('mgisga');
        button.querySelector('._WKw').innerText = 'View image';

        let link = button.querySelector('a');
        link.href = src;
        link.className = '';
        link.removeAttribute('data-cthref');
        link.removeAttribute('jsaction');

        openButton.after(button);
      }

      let link = button.querySelector('a');
      link.href = src;
    }
  } 
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        addButton(newNode);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

addButton(document.body);