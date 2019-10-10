

Array.prototype.pickRandom = function(){
    return this[Math.floor(Math.random() * this.length)];
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


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message === 'clicked_browser_action'){
        try{
            const gqlHref = 'https://graphql.anilist.co';
            const baseHref = 'https://anilist.co';

            var stripped = window.location.href.replace(baseHref + '/user/', '').replace('/animelist', '').split('/');
            const username = stripped[0];
            const status = ((stripped[1] === '') ? 'planning' : stripped[1]).toUpperCase();
            const queryUser = `{User(search:"${username}"){id name}}`;
            
            queryGqlAsync(queryUser, gqlHref).then(userData => {
                const id = userData['data']['User']['id'];
                const queryList = `{MediaListCollection(userId:${id},type:ANIME,status:${status}){lists{entries{mediaId}}}}`;

                queryGqlAsync(queryList, gqlHref).then(listData => {
                    const list = listData['data']['MediaListCollection']['lists'][0]['entries'];
                    chrome.runtime.sendMessage({
                        'message': 'open_new_tab',
                        'url': baseHref + '/anime/' + list.pickRandom()['mediaId']
                    });
                });

            });
        } catch(error){
            console.error(error);
        }
    }
});
