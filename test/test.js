const form = document.querySelector("#anilist-search");

const getUserQuery = (search) => `{User(search: "${search}") {id name siteUrl stats {watchedTime}}}`;

const output = ({ data }) => console.log(data);

const loadAnilist = (ev) => {
  ev.preventDefault();
  const options = {
    method: "post", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({query: getUserQuery(form.elements["search"].value)})
  };
  fetch("https://graphql.anilist.co", options).then(res => res.json()).then(output);
  form.reset();
}

form.addEventListener("submit", loadAnilist);
