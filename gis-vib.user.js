// ==UserScript==
// @name            Google Search "View Image" Button
// @name:ru         Google Search кнопка "Показать в полном размере"
// @name:sl         Gumb "Ogled slike" na Google Slikah
// @name:uk         Google Search кнопка "Показати зображення"
// @name:lt         Google paieškos mygtukas "Rodyti vaizdą"
// @name:pl         Przycisk "Pokaż obraz" w wyszukiwarce obrazów Google
// @name:ja         Google 検索「画像を表示」ボタン
// @name:ko         Google 검색 ‘이미지 보기’ 버튼
// @name:nl         Google zoeken "Afbeelding bekijken" knop
// @name:sk         Tlačidlo "Zobraziť obrázok" pre Google Search
// @name:tr         Google Görseller "Resmi Görüntüle" butonu
// @namespace       https://github.com/devunt/make-gis-great-again
// @icon            https://raw.githubusercontent.com/devunt/make-gis-great-again/master/icons/icon.png
// @version         1.5.0.19
// @description     This userscript adds "View Image" button to Google Image Search results.
// @description:ru  Этот скрипт добавляет кнопку "Показать в полном размере" к результатам Google Image Search.
// @description:sl  Ponovno prikaže gumb "Ogled slike" na Google Slikah.
// @description:uk  Цей скрипт додає кнопку "Показати зображення" до результатів Google Image Search.
// @description:lt  Šis vartotojo skriptas prideda mygtuką "Rodyti vaizdą" į Google vaizdo paieškos rezultatus.
// @description:pl  Ten skrypt przywraca przycisk "Pokaż obraz" do wyszukiwarki obrazów Google.
// @description:ja  この UserScript は Google 画像検索結果に「画像を表示」ボタンを追加します。
// @description:ko  이 유저스크립트는 Google 이미지 검색 결과에 ‘이미지 보기’ 버튼을 추가합니다.
// @description:nl  Voegt de "Afbeelding bekijken" knop aan toe aan Google Afbeeldingen.
// @description:sk  Toto rozšírenie pridáva tlačidlo "Zobraziť obrázok" do výsledkov vyhľadávania Google Search.
// @description:tr  Bu betik Google Görseller arama sonuçlarına "Resmi Görüntüle" düğmesini ekler.
// @author          Bae Junehyeon
// @run-at          document-end
// @include         http*://*.google.tld/search*tbm=isch*
// @include         http*://*.google.tld/imgres*
// ==/UserScript==

const lang = {
    ar: 'عرض الصورة',
    cs: 'Zobrazit obrázek',
    da: 'Vis billede',
    de: 'Bild ansehen',
    en: 'View image',
    es: 'Ver imagen',
    fi: 'Näytä kuva',
    fr: 'Voir l\'image',
    he: 'הצג תמונה',  // also 'iw'
    hu: 'Kép megtekintése',
    it: 'Apri immagine',
    iw: 'הצג תמונה',  // same as 'he'
    ja: '画像を表示',
    ko: '이미지 보기',
    lt: 'Rodyti vaizdą',
    nl: 'Afbeelding bekijken',
    no: 'Se bilde',
    pl: 'Pokaż obraz',
    pt: 'Ver imagem',
    ru: 'Показать в полном размере',
    se: 'Visa bild',  // also 'sv'
    sk: 'Zobraziť obrázok',
    sl: 'Ogled slike',
    sv: 'Visa bild',  // same as 'se'
    tr: 'Resmi Görüntüle',
    uk: 'Показати зображення',
    zh: '查看原图',
    'zh-CN': '查看原图',  // also 'zh'
    },
  srch = {
    cs: 'Vyhledat podle obrázku',
    da: 'Søg efter billede',
    de: 'Zur "Bildersuche"',
    en: 'Search by image',
    es: 'Buscar por imagen',
    fr: 'Recherche par image',
    he: 'חפש לפי תמונה',  // also 'iw'
    hu: 'Keresés kép alapján',
    it: 'Ricerca tramite immagine',
    iw: 'חפש לפי תמונה',  // same as 'he'
    ja: '画像を検索',
    ko: '이미지로 검색',
    nl: 'Afbeelding zoeken',
    no: 'Søk med bilde',
    pl: 'Wyszukiwanie obrazem',
    pt: 'Pesquisar por imagem',
    ru: 'Поиск по картинке',
    se: 'Fler storlekar',  // also 'sv'
    sk: 'Vyhľadať podľa obrázku',
    sl: 'Iskanje s sliko',
    sv: 'Fler storlekar',  // same as 'se'
    tr: 'Görselle Ara',
    zh: '以图搜图',
    };

const pgL=document.documentElement.lang;
const localizedViewImage = lang[pgL] || lang[pgL.split('-')[0]] || lang[navigator.language] || lang[navigator.language.split('-')[0]] || lang['en'];
const SBItxt = srch[pgL] || srch[pgL.split('-')[0]] || srch[navigator.language] || srch[navigator.language.split('-')[0]] || srch['en'];

var Btn_1, Btn_2;
var RE=new RegExp('^(?:'+location.origin+')?\/imgres[\?&]imgurl=([^&]*)');

var dataN;
document.querySelectorAll('script').forEach((s)=>{
  let c=s.innerText;
  if (c.startsWith('AF_initDataCallback') && c.length>100) {
    dataN=s;
    }
  })

function addButton(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.classList.contains('irc_ris') || node.classList.contains('Y6heUd') || node.classList.contains('BfYA2c') || node.classList.contains('irc_mi')) {
      let container;
      if (node.classList.contains('Y6heUd') || node.classList.contains('BfYA2c')) container = node;
      else container = node.closest('.irc_c');

      let inView = container.parentNode.style.display !== "none";

      let similarImages = node.querySelectorAll('.rg_l');

      if (!similarImages.length) {
        let block = container.querySelector('div[jsname="ofUehf"]');
        if (block) block.addEventListener('click', function(ev){
          if (ev.target.classList.contains('rg_i')) updateLinkAfterClickOnSimilar(ev);
          });
        }

      [].forEach.call(similarImages, (image) => {
        image.addEventListener('click', updateLinkAfterClickOnSimilar);
      });


      let data=dataN.innerText.replace(/^AF_initDataCallback\((.*)\);$/s,"$1");
      
      let findSrc, focus, tbnID, t;
      try{
        findSrc=((t=container.querySelector(':scope .irc_t .irc_mi, :scope .n3VNCb, :scope .r48jcc')) && t.src) || ((t=container.querySelector(':scope .irc_t .irc_mut')) && t.src);

        focus=document.querySelector('.irc-s');
        if (!focus) {
          tbnID=container.parentNode.dataset['tbnid'];
          if (tbnID) focus=document.querySelector('div[data-tbnid="'+tbnID+'"]');
          }
        if (badImg(findSrc) && focus) {
          for (let k of focus.querySelectorAll('a')) {
            if (RE.test(k.href)) {
              findSrc=unescape(RegExp.$1);
              break;
              }
            }
          }

        if (badImg(findSrc) && dataN) {
          let u= new RegExp('"'+tbnID+'".*?\\[.*?\\[(".*?"),','s').exec(dataN.innerText);
          if (u && u[1]) findSrc=unescape(JSON.parse(u[1]));
          }

      }catch(e){}

if (focus && inView && badImg(findSrc)) {
  obsFocus.observe(focus,{
    childList: false,
    subtree: true,
    attributes: true,
    attributeFilter: [ "href", "src" ]
    });
  }

      let thumbnail = node.querySelector('.irc_rimask.irc_rist');
      let src = bigSrc[findSrc] || findSrc || unescape(thumbnail.querySelector('.rg_l').href.match(/imgurl=([^&]+)/)[1]);

      let buttons = container.querySelector('.irc_but_r tr');
      // new version
      let nv=false;
      if (!buttons) {
        buttons = container.querySelector('.Qc8zh > .irc_ab');
        nv=1;
        }
      if (!buttons) {
        buttons = container.querySelector('.fwCBrd');
        nv=2;
        }
      if (!buttons) {
        buttons = container.querySelector('.kEwVtd, .QCk63e');
        nv=3;
        }
      if (!buttons) {
        buttons = container.querySelector('[jsname="St5Dhe"]');
        nv=4;
        }

      let button = buttons.querySelector(nv? 'a.mgisga' : 'td.mgisga'),
          pn=false;

      if (button === null) {
        let openButton = buttons.querySelector(nv ? (nv >= 3 ? 'a.ZsbmCf, a.J2oL9c, a.jAklOc, a.uZ49bd, a.wvfN0b' : 'a' ) : 'td');

        button = openButton.cloneNode(true);
        if ( (nv == 4) && (openButton.parentNode.childNodes.length == 1) ) {
          openButton=openButton.parentNode;
          button = openButton.cloneNode(true);
          pn=true;
          }
        let sp=button.querySelector(nv ? ( nv >= 3 ? 'div span':'div span:nth-child(2)' ) : 'a span:nth-child(2)');
        if (!sp && (nv == 4)) {
          button.firstChild.firstChild.innerHTML='<span style="margin: 0 10px; color: var(--uv-styles-color-text-emphasis);"></span>';
          sp=button.firstChild.firstChild.firstChild;
          }
        sp.innerText = localizedViewImage;
        sp.style.padding='0';
        // remove icon and style
        try{sp.parentNode.removeChild(sp.previousElementSibling);}catch(e){}
        if (nv==1) sp.className='';

        let link = nv && !pn ? button : button.querySelector('a');
        link.href = src;
        if (!nv) link.className = '';
        link.removeAttribute('data-cthref');
        link.removeAttribute('jsaction');
        link.removeAttribute('data-ved');

        button.classList.remove('irc_lth');
        button.classList.add('mgisga');
        if (nv && button.classList.contains('irc_hol')) button.style='margin-left: 8px;';

        if (nv >= 3) openButton.before(button);
        else openButton.after(button);

        // adding "Search by image"
        let lnks = container.querySelector('.irc_b .irc_hd .irc_dsh');
        let style = 'margin-left:1em', cls = 'o5rIVb SBIlnk dPO1Qe';


        if (!lnks) {
          lnks = (lnks=container.querySelector('.irc_ft, .yKbIbb, .Beeb4e')) && lnks.parentNode;
          cls = cls.replace(/dPO1Qe/,'');
          cls += ' irc_help PvkmDc So4Urb';
          style = '';
          }

        if (lnks) {
          let lnkSBI = document.createElement('a');
          let RE=/.*[\?&](hl=[^&]+)/.exec(location.search); // catch last &hl=xx parameter
          lnkSBI.setAttribute('hrefbase','/searchbyimage?'+(RE?RE[1]+'&':'')+'image_url=');
          lnkSBI.setAttribute('target','_blank');
          lnkSBI.setAttribute('class',cls);
          lnkSBI.setAttribute('style',style);
          lnkSBI.innerText= SBItxt;
          lnks.appendChild(lnkSBI);
          }
      }

      let link = nv ? button : button.querySelector('a');
      link.href = src;
      link = container.querySelector('.SBIlnk');
      link.href = link.attributes.hrefbase.value + encodeURIComponent(src);
      if (inView) {
        Btn_1=button;
        Btn_2=link;
        }
    }
  }
}

function badImg(u) {
  if (!u || u.startsWith('data:') || /^https?:\/\/[^\/]*?\.gstatic\.com\//.test(u)) {
    return true;
    }
}

function updButton(url,src) {
  let u;
  if ( ((u=RE.exec(url)) && (u=u[1])) || (u=src) ) {
    u=unescape(u);
    Btn_1.href=u;
    Btn_2.href=Btn_2.attributes.hrefbase.value + encodeURIComponent(u);
  }
}

var bigSrc={};
function updateLinkAfterClickOnSimilar({target:node}) {
  let src = unescape(node.closest('.rg_l, a').href.match(/imgurl=([^&]+)/)[1]);
  let i = node.src;
  if (i) bigSrc[i]=src;
  let container = node.closest('.irc_c');
  let button = container.querySelector('.mgisga');
  let link = button.querySelector('a');
  if (!link) link = button;
  link.href = src;
  link = container.querySelector('.SBIlnk');
  link.href = link.attributes.hrefbase.value + encodeURIComponent(src);
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const addedNodes = mutation.addedNodes || [];

    [].forEach.call(addedNodes, (newNode) => {
        addButton(newNode);
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

var obsFocus = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    updButton(mutation.target.href, mutation.target.src);
    });
  });

addButton(document.body);
