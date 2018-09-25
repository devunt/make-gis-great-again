// ==UserScript==
// @name            Google Search "View Image" Button
// @name:ru         Google Search кнопка "Показать в полном размере"
// @name:sl         Gumb "Ogled slike" na Google Slikah
// @name:uk         Google Search кнопка "Показати зображення"
// @name:lt         Google paieškos mygtukas "Rodyti vaizdą"
// @name:pl         Przycisk "Pokaż obraz" w wyszukiwarce obrazów Google
// @name:ja         Google検索「画像を表示」ボタン
// @name:nl         Google zoeken "Afbeelding bekijken" knop
// @name:hu         Google keresés "Kép megtekintése" gomb
// @namespace       https://github.com/devunt/make-gis-great-again
// @icon            https://raw.githubusercontent.com/devunt/make-gis-great-again/master/icons/icon.png
// @version         1.4
// @description     This userscript adds "View Image" button to Google Image Search results.
// @description:ru  Этот скрипт добавляет кнопку "Показать в полном размере" к результатам Google Image Search.
// @description:sl  Ponovno prikaže gumb "Ogled slike" na Google Slikah.
// @description:uk  Цей скрипт додає кнопку "Показати зображення" до результатів Google Image Search
// @description:lt  Šis vartotojo skriptas prideda mygtuką "Rodyti vaizdą" į Google vaizdo paieškos rezultatus.
// @description:pl  Ten skrypt przywraca przycisk "Pokaż obraz" do wyszukiwarki obrazów Google
// @description:ja  このUserScriptはGoogle検索結果に「画像を表示」ボタンを追加します。
// @description:nl  Voegt de "Afbeelding bekijken" knop aan toe aan Google Afbeeldingen.
// @description:hu  Ez a szkript hozzáadja a "Kép megtekintése" gombot a Google képkeresési találatokhoz.
// @author          Bae Junehyeon
// @run-at          document-end
// @include         http*://*.google.tld/search*tbm=isch*
// ==/UserScript==

const lang = {
  en: 'View image',
  ru: 'Показать в полном размере',
  'zh-CN': '查看原图',
  ja: '画像を表示',
  he: 'הצג תמונה',
  fr: 'Voir l\'image',
  sl: 'Ogled slike',
  ar: 'عرض الصورة',
  de: 'Bild ansehen',
  tr: 'Resmi görüntüle',
  pt: 'Ver imagem',
  lt: 'Rodyti vaizdą',
  pl: 'Pokaż obraz',
  nl: 'Afbeelding bekijken',
  se: 'Visa bild',
  uk: 'Показати зображення',
  it: 'Apri immagine',
  hu: 'Kép megtekintése'
};

const localizedViewImage = lang[(lang[navigator.language] ? navigator.language : 'en')];

function addButton(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.classList.contains('irc_ris')) {
      let container = node.closest('.irc_c');

      let similarImages = node.querySelectorAll('.rg_l');
      [].forEach.call(similarImages, (image) => {
        image.addEventListener('click', updateLinkAfterClickOnSimilar);
      });

      let thumbnail = node.querySelector('.irc_rimask.irc_rist');
      let src = unescape(thumbnail.querySelector('.rg_l').href.match(/imgurl=([^&]+)/)[1]);

      let buttons = container.querySelector('.irc_but_r tr');

      let button = buttons.querySelector('td.mgisga');
      if (button === null) {
        let openButton = buttons.querySelector('td');

        button = openButton.cloneNode(true);
        button.classList.add('mgisga');
        button.querySelector('a span:nth-child(2)').innerText = localizedViewImage;

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

function updateLinkAfterClickOnSimilar({target:node}) {
  let src = unescape(node.closest('.rg_l').href.match(/imgurl=([^&]+)/)[1]);
  let container = node.closest('.irc_c');
  let button = container.querySelector('.mgisga');
  let link = button.querySelector('a');
  link.href = src;
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

addButton(document.body);
