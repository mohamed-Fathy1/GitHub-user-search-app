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
                document.getElementById('bio').innerText = data.bio || 'This profile has no bio'
                document.getElementById('followers').innerText = data.followers
                document.getElementById('following').innerText = data.following
                document.getElementById('repos').innerText = data.public_repos

                userDetail.forEach(detail => {
                    if (data[detail] === null || data[detail] === '') {
                        document.getElementById(detail).innerText = 'Not Available'
                        document.getElementById(detail).parentElement.style.color = '#8E94A4'
                    } else {
                        document.getElementById(detail).innerText = data[detail]
                        document.getElementById(detail).parentElement.style.color = 'var(--font-color-primary)'
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

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        localStorage.setItem('darkMode', !darkMode);
        if (body.classList.contains('dark-theme')) {
            this.firstElementChild.innerText = 'Dark';
            this.lastElementChild.innerHTML = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-moon">
                <path d="M9.598 1.591a.749.749 0 0 1 .785-.175 7.001 7.001 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786Zm1.616 1.945a7 7 0 0 1-7.678 7.678 5.499 5.499 0 1 0 7.678-7.678Z"></path></svg>`;
        } else {
            this.firstElementChild.innerText = 'Light';
            this.lastElementChild.innerHTML = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                            data-view-component="true" class="octicon octicon-sun">
                            <path
                                d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm5.657-8.157a.75.75 0 0 1 0 1.061l-1.061 1.06a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.06-1.06a.75.75 0 0 1 1.06 0Zm-9.193 9.193a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0ZM8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0ZM3 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 3 8Zm13 0a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 16 8Zm-8 5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13Zm3.536-1.464a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061ZM2.343 2.343a.75.75 0 0 1 1.061 0l1.06 1.061a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-1.06-1.06a.75.75 0 0 1 0-1.06Z">
                            </path>
                        </svg>`;

        }
    });

    // Check if dark mode preference is stored in localStorage
    if (darkMode) {
        body.classList.toggle('dark-theme', JSON.parse(darkMode));
    }
})
