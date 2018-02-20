// ==UserScript==
// @name            Google Search "View Image" Button
// @name:ru         Google Search кнопка "Показать в полном размере"
// @name:sl         Gumb "Ogled slike" na Google Slikah
// @name:lt         Google paieškos mygtukas "Rodyti vaizdą"
// @namespace       https://github.com/devunt/make-gis-great-again
// @icon            https://raw.githubusercontent.com/devunt/make-gis-great-again/master/icons/icon.png
// @version         1.3.1
// @description     This userscript adds "View Image" button to Google Image Search results.
// @description:ru  Этот скрипт добавляет кнопку "Показать в полном размере" к результатам Google Image Search.
// @description:sl  Ponovno prikaže gumb "Ogled slike" na Google Slikah.
// @description:lt  Šis vartotojo skriptas prideda mygtuką "Rodyti vaizdą" į Google vaizdo paieškos rezultatus.
// @description:pl  Ten skrypt przywraca przycisk "Pokaż Obraz" do wyszukiwarki obrazów Google
// @author          Bae Junehyeon
// @run-at          document-end
// @include         http*://*.google.tld/search*tbm=isch*
// @grant           GM_xmlhttpRequest
// @connect         images.google.com
// ==/UserScript==

const lang = {
  en: {
    viewImage: 'View Image',
    otherResolutions: 'Other resolutions'
  },
  ru: {
    viewImage: 'Показать в полном размере',
    otherResolutions: 'Все размеры'
  },
  uk: {viewImage: 'Показати зображення'},
  ja: {viewImage: '画像を表示'},
  he: {viewImage: 'הצג תמונה'},
  fr: {viewImage: 'Voir l\'image'},
  sl: {viewImage: 'Ogled slike'},
  ar: {viewImage: 'عرض الصورة'},
  de: {viewImage: 'Bild ansehen'},
  pt: {viewImage: 'Ver imagem'},
  lt: {viewImage: 'Rodyti vaizdą'},
  pl: {viewImage: 'Pokaż Obraz'},
  se: {viewImage: 'Visa bild'},
};

function getLocalizedString(string) {
  return lang[navigator.language][string] ?
         lang[navigator.language][string] :
         lang.en[string];
}

let linkToCurrentImage = '';

function processElement(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.classList.contains('irc_ris')) {
      let container = node.closest('.irc_c');

      let similarImages = node.querySelectorAll('.rg_l');
      [].forEach.call(similarImages, (image) => {
        image.addEventListener('click', updateLinkAfterClickOnSimilar);
      });

      let thumbnail = document.querySelector('img[name="' + container.dataset.itemId + '"]');
      let meta = thumbnail.closest('.rg_bx').querySelector('.rg_meta');

      let metadata = JSON.parse(meta.innerHTML);
      linkToCurrentImage = metadata.ou;

      let buttons = container.querySelector('.irc_but_r tr');

      let button = buttons.querySelector('td.mgisga_fullSize');
      if (button === null) {
        addButton(buttons, 'mgisga_fullSize', getLocalizedString('viewImage'), linkToCurrentImage);
        addButton(buttons, 'mgisga_otherRes', getLocalizedString('otherResolutions'), searchOtherResolutions);
      }

      let link = button.querySelector('a');
      link.href = src;
    }
  }
}

/* buttonReaction may be string-url or function-callback */
function addButton(buttonContainer, buttonClass, buttonText, buttonReaction) {
  let openButton = buttonContainer.querySelector('td');

  let button = openButton.cloneNode(true);
  button.classList.add(buttonClass);
  button.querySelector('._WKw').innerText = buttonText;

  let link = button.querySelector('a');
  link.className = '';
  link.removeAttribute('data-cthref');
  link.removeAttribute('jsaction');

  if (typeof buttonReaction === 'string') {
    link.href = buttonReaction;
  } else {
    link.removeAttribute('href');
    button.addEventListener('click', buttonReaction);
  }

  return openButton.after(button);
}

function searchOtherResolutions() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://images.google.com/searchbyimage?&image_url=' + linkToCurrentImage,
    onload: response=>{
      let imgID = response.responseText.match(/simg:([^&]+)/)[1];
      let tld = location.host.match(/\w+$/)[0];
      location.href = 'https://www.google.' + tld + '/search?tbm=isch&tbs=simg:' + imgID;
    }
  });
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
      processElement(newNode);
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
