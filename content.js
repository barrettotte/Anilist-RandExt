
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message === 'clicked_browser_action'){
        const baseHref = 'https://anilist.co';

        const items = document
            .getElementById('app')
            .getElementsByClassName('page-content')[0]
            .getElementsByClassName('user')[0]
            .getElementsByClassName('content')[0]
            .getElementsByClassName('medialist')[0]
            .getElementsByClassName('lists')[0]
            .getElementsByClassName('list-wrap')[0]
            .getElementsByClassName('list-section')[0]
            .getElementsByClassName('list-entries')[0]
            .getElementsByClassName('entry-card')
        ;
        const href = items[Math.floor(Math.random() * items.length)]
            .getElementsByClassName('title')[0]
            .getElementsByTagName('a')[0]
            .getAttribute('href')
        ;
        console.log(items.length);

        chrome.runtime.sendMessage({
            'message': 'open_new_tab', 
            'url': baseHref + href
        });
    }
});
