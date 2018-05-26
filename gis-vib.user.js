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
// @namespace       https://github.com/devunt/make-gis-great-again
// @icon            https://raw.githubusercontent.com/devunt/make-gis-great-again/master/icons/icon.png
// @version         1.4
// @description     This userscript adds "View Image" button to Google Image Search results.
// @description:ru  Этот скрипт добавляет кнопку "Показать в полном размере" к результатам Google Image Search.
// @description:sl  Ponovno prikaže gumb "Ogled slike" na Google Slikah.
// @description:uk  Цей скрипт додає кнопку "Показати зображення" до результатів Google Image Search.
// @description:lt  Šis vartotojo skriptas prideda mygtuką "Rodyti vaizdą" į Google vaizdo paieškos rezultatus.
// @description:pl  Ten skrypt przywraca przycisk "Pokaż obraz" do wyszukiwarki obrazów Google.
// @description:ja  この UserScript は Google 画像検索結果に「画像を表示」ボタンを追加します。
// @description:ko  이 유저스크립트는 Google 이미지 검색 결과에 ‘이미지 보기’ 버튼을 추가합니다.
// @description:nl  Voegt de "Afbeelding bekijken" knop aan toe aan Google Afbeeldingen.
// @author          Bae Junehyeon
// @run-at          document-end
// @include         http*://*.google.tld/search*tbm=isch*
// ==/UserScript==

const lang = {
  en: 'View image',
  ru: 'Показать в полном размере',
  'zh-CN': '查看原图',
  ja: '画像を表示',
  ko: '이미지 보기',
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
  it: 'Apri immagine'
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
