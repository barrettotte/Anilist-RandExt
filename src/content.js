
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message === 'clicked_browser_action'){
        try{
            const gqlHref = 'https://graphql.anilist.co';
            const baseHref = 'https://anilist.co';

            var split = window.location.href.split('/');
            const username = split[4];
            const status = convertStatus(split[6]);
            const queryUser = `{User(search:"${username}"){id name}}`;

            queryGqlAsync(queryUser, gqlHref).then(userData => {
                const id = userData['data']['User']['id'];
                const queryList = `{MediaListCollection(userId:${id},type:ANIME,status:${status}){lists{entries{mediaId}}}}`;

                queryGqlAsync(queryList, gqlHref).then(listData => {
                    const lists = listData['data']['MediaListCollection']['lists'];
                    
                    if(lists.length > 0){
                        chrome.runtime.sendMessage({
                            'message': 'open_new_tab',
                            'url': baseHref + '/anime/' + lists[0]['entries'].pickRandom()['mediaId']
                        });
                    }
                });
            });
        } catch(error){
            console.error(error);
        }
    }
});

Array.prototype.pickRandom = function(){
    return this[Math.floor(Math.random() * this.length)];
}

// List titles and actual statuses are slightly different
function convertStatus(status){
    status = (typeof status === 'undefined' || status === null) ? "PLANNING" : status.toUpperCase();
    const conversions = {
       "WATCHING": "CURRENT",
       "REWATCHING": "REPEATING",
       "COMPLETED": "COMPLETED",
       "PAUSED": "PAUSED",
       "DROPPED": "DROPPED",
       "PLANNING": "PLANNING"
    };
    return (status in conversions) ? conversions[status] : "PLANNING";
}

async function queryGqlAsync(query, url){
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: query})
    };
    const response = await fetch(url, options);
    const json = await response.json()
    return json;
}



