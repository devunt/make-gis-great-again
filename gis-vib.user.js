// ==UserScript==
// @name            Google Search "View Image" Button
// @name:ja         Google検索「画像を表示」ボタン
// @name:lt         Google paieškos mygtukas "Rodyti vaizdą"
// @name:nl         Google zoeken "Afbeelding bekijken" knop
// @name:pl         Przycisk "Pokaż obraz" w wyszukiwarce obrazów Google
// @name:ru         Google Search кнопка "Показать в полном размере"
// @name:sl         Gumb "Ogled slike" na Google Slikah
// @name:uk         Google Search кнопка "Показати зображення"
// @namespace       https://github.com/devunt/make-gis-great-again
// @icon            https://raw.githubusercontent.com/devunt/make-gis-great-again/master/icons/icon.png
// @version         1.3.1
// @description     This userscript adds "View Image" button to Google Image Search results.
// @description:ja  このUserScriptはGoogle検索結果に「画像を表示」ボタンを追加します。
// @description:lt  Šis vartotojo skriptas prideda mygtuką "Rodyti vaizdą" į Google vaizdo paieškos rezultatus.
// @description:nl  Voegt de "Afbeelding bekijken" knop aan toe aan Google Afbeeldingen.
// @description:pl  Ten skrypt przywraca przycisk "Pokaż obraz" do wyszukiwarki obrazów Google
// @description:ru  Этот скрипт добавляет кнопку "Показать в полном размере" к результатам Google Image Search.
// @description:sl  Ponovno prikaže gumb "Ogled slike" na Google Slikah.
// @description:uk  Цей скрипт додає кнопку "Показати зображення" до результатів Google Image Search
// @author          Bae Junehyeon
// @run-at          document-end
// @include         http*://*.google.tld/search*tbm=isch*
// @include         http*://*.google.com.tld/search*tbm=isch*
// @include         http*://*.google.tld/imgres*
// @include         http*://*.google.com.tld/imgres*
// @grant           GM_xmlhttpRequest
// @connect         images.google.com
// ==/UserScript==

const lang = {
    ar: {viewImage: 'عرض الصورة'},
    de: {viewImage: 'Bild ansehen'},
    en: {
        viewImage: 'View Image',
        otherResolutions: 'Other resolutions'
    },
    fr: {viewImage: 'Voir l\'image'},
    he: {viewImage: 'הצג תמונה'},
    ja: {viewImage: '画像を表示'},
    lt: {viewImage: 'Rodyti vaizdą'},
    nl: {viewImage: 'Afbeelding bekijken'},
    pl: {viewImage: 'Pokaż Obraz'},
    pt: {viewImage: 'Ver imagem'},
    ru: {
        viewImage: 'Показать в полном размере',
        otherResolutions: 'Все размеры'
    },
    se: {viewImage: 'Visa bild'},
    sl: {viewImage: 'Ogled slike'},
    tr: {viewImage: 'Resmi görüntüle'},
    uk: {viewImage: 'Показати зображення'},
};

function getLocalizedString(string) {
    let localized = lang.en[string];
    if (lang[navigator.language] && lang[navigator.language][string])
        localized = lang[navigator.language][string];
    return localized;
}

let linkToCurrentImage = '';

function processElement(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.classList.contains('irc_ris')) {
            /* Track clicks on similar images */
            let similarImages = node.querySelectorAll('.rg_l');
            [].forEach.call(similarImages, (image) => {
                image.addEventListener('click', updateLinkAfterClickOnSimilar);
            });

            /* Find link on large image */
            let container = node.closest('.irc_c');
            let src = container.querySelector('.irc_mi').src;
            if (src === '') {
                let thumbnail = document.querySelector('img[name="' + container.dataset.itemId + '"]');
                let meta = thumbnail.closest('.rg_bx').querySelector('.rg_meta');

                let metadata = JSON.parse(meta.textContent);
                src = metadata.ou;
            }

            let buttons = container.querySelector('.irc_but_r tr');
            let button = buttons.querySelector('td.mgisga_fullSize');
            if (button === null) {
                addButton(buttons, 'mgisga_fullSize', getLocalizedString('viewImage'), src);
                addButton(buttons, 'mgisga_otherRes', getLocalizedString('otherResolutions'), searchOtherResolutions);
            } else {
                let link = button.querySelector('a');
                link.href = src;
            }

            linkToCurrentImage = src;
        }
    }
}

/* buttonReaction may be string-url or function-callback */
function addButton(buttonContainer, buttonClass, buttonText, buttonReaction) {
    let openButton = buttonContainer.querySelector('td');

    let button = openButton.cloneNode(true);
    button.classList.add(buttonClass);
    button.querySelector('span:first-child').remove();
    button.querySelector('span:last-child').textContent = buttonText;

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
    showSplashscreen();
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://images.google.com/searchbyimage?&image_url=' + linkToCurrentImage,
        onload: response => {
            let imgID = response.responseText.match(/simg:([^&]+)/)[1];
            let tld = location.host.match(/google\.(.+)$/)[1];
            location.href = 'https://www.google.' + tld + '/search?tbm=isch&tbs=simg:' + imgID;
        }
    });
}

function updateLinkAfterClickOnSimilar({target: node}) {
    let src = decodeURIComponent(node.closest('.rg_l').href.match(/imgurl=([^&]+)/)[1]);
    let container = node.closest('.irc_c');
    let button = container.querySelector('.mgisga_fullSize');
    let link = button.querySelector('a');
    link.href = src;
    linkToCurrentImage = src;
}

function showSplashscreen() {
    let splashscreen = document.body.appendChild(document.createElement('div'));
    splashscreen.classList.add('mgisga_splashscreen');
    splashscreen.style = `
background: black;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 666;
opacity: 0.7;
`;

    let spinner = splashscreen.appendChild(document.createElement('img'));
    spinner.src = 'https://www.google.com/images/spin-24.gif';
    spinner.style = `
position: fixed;
left: calc(50% - 12px);
top: calc(50% - 12px);
filter: invert();
`;
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
