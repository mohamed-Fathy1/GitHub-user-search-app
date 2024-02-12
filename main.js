import './style.css'


// get github user data
const getUserData = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`)
    return response.json()
}

const userDetail = ['location', 'company', 'blog', 'twitter_username']


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search').addEventListener('click', async () => {
        const username = document.getElementById('username').value
        const userData = await getUserData(username)
            .then(data => {
                document.getElementById('name').innerText = data.name
                document.getElementById('handle').innerText = `@${data.login}`
                document.getElementById('avatar').src = data.avatar_url
                document.getElementById('bio').innerText = data.bio ? 'This person is a developer' : 'This profile has no bio'
                document.getElementById('followers').innerText = data.followers
                document.getElementById('following').innerText = data.following
                document.getElementById('repos').innerText = data.public_repos

                userDetail.forEach(detail => {
                    if (data[detail] === null || data[detail] === '') {
                        document.getElementById(detail).innerText = 'Not Available'
                        document.getElementById(detail).parentElement.style.color = '#8E94A4'
                    } else {
                        document.getElementById(detail).innerText = data[detail]
                        document.getElementById(detail).parentElement.style.color = '#FFFFFD'
                    }
                })
                // years since account was created
                // example: joind 1 year ago
                const joined = new Date(data.created_at)
                const today = new Date()
                const years = today.getFullYear() - joined.getFullYear()
                document.getElementById('joined').innerText = `Joined ${years} years ago`
            })
    })


    const darkModeToggle = document.getElementById('theme-switcher');
    const body = document.body;
    const darkMode = localStorage.getItem('darkMode') || false;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem('darkMode', !darkMode);
    });

    // Check if dark mode preference is stored in localStorage
    if (darkMode) {
        body.classList.toggle('dark-theme', JSON.parse(darkMode));
    }
})
