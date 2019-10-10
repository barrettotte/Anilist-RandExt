# Anilist-RandExt

Since I'm indecisive on what anime to watch, I decided to solve the problem by making a 
chrome extension to randomly select anime for me.

This isn't super complex because I just wanted a practical introduction to developing browser extensions.


## Extension Behavior
By default going to any url prefixed with https://anilist.co/user/username/ and clicking the extension will open a new tab with a
random anime from your 'planning' list.

If you wish to use a specific list, click on the list you want and then click the extension.

Example:  Clicking on 'completed' list (navigates to https://anilist.co/user/username/animelist/Completed) and clicking the extension
retrieves a random entry from your 'completed' list.


## GraphQL Queries
* Get user by username ```{User(search:"${username}"){id name}}```
* Get anime list by userId and status ```{MediaListCollection(userId:${id},type:ANIME,status:${status}){lists{entries{mediaId}}}}```


