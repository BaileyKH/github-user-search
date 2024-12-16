const darkBtn = document.getElementById('dark-btn')
const userSearch = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
const noUser = document.getElementById('no-user')

const userImage = document.getElementById('user-avatar')
const name = document.getElementById('name')
const profileName = document.getElementById('username')
const biog = document.getElementById('biog')
const repos = document.getElementById('repos')
const followers = document.getElementById('followers')
const following = document.getElementById('following')
const userLocation = document.getElementById('user-location')
const website = document.getElementById('website')
const twitter = document.getElementById('twitter')
const company = document.getElementById('company')

async function getGitHubUser(){
    let username = document.getElementById('search').value
    try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (!res.ok){
            throw Error("Could not retrieve user")
        }
        const data = await res.json()

        userImage.src = data.avatar_url
        name.textContent = data.name
        profileName.textContent = `@${data.login}`
        biog.textContent = data.bio
        repos.textContent = data.public_repos
        followers.textContent = data.followers
        following.textContent = data.following

        if (!data.location) {
            userLocation.textContent = 'Not Available' 
            userLocation.classList.add('unavailable')
        } else {
            userLocation.textContent = data.location
        }

        if (!data.blog) {
            website.textContent = 'Not Available' 
            website.classList.add('unavailable')
        } else {
            website.textContent = data.blog
            website.href = `https://${data.blog}`
        }

        if (!data.twitter_username) {
            twitter.textContent = 'Not Available' 
            twitter.classList.add('unavailable')
        } else {
            twitter.textContent = data.twitter_username
        }

        if (!data.company) {
            company.textContent = 'Not Available' 
            company.classList.add('unavailable')
        } else {
            company.textContent = data.company
        }

    } catch(err) {
        console.log(err)
        noUser.textContent = 'No results'
    }
    
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

darkBtn.addEventListener('click', toggleDarkMode);
searchBtn.addEventListener('click', getGitHubUser)