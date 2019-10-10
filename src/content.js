
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message === 'clicked_browser_action'){
        const baseHref = "https://anilist.co";
        var stripped = window.location.href.replace(baseHref + "/user/", "").replace("/animelist", "").split("/");

        const username = stripped[0];
        const listType = (stripped[1] === '') ? "planning" : stripped[1];

        console.log([username, listType]);


        const queryList = `{MediaListCollection(userId:247578, type:ANIME){lists{name entries{id mediaId}}}}`

        // https://anilist.co/user/barrettotte/animelist/Planning
        /*
        chrome.runtime.sendMessage({
            'message': 'open_new_tab', 
            'url': baseHref + href
        });
        */
    }
});
