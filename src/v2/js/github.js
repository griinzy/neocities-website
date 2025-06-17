const commitPanel = document.getElementById('commit-panel');
const lastUpdate = document.getElementById('last-update');

const repo = 'neocities-website'
const githubUrl = `https://api.gunjicordia.xyz/github/commits/${repo}`;

const githubTemplate = document.getElementById('github-commit-template');

fetch(githubUrl)
    .then(response => response.json())
    .then(data => {
        const commits = data.commits;
        let index = 0;
        while(index < 5 && index < commits.length) {
            let separator = document.createElement('hr');
            commitPanel.appendChild(separator);

            let commitUrl = commits[index].html_url;
            let commitMessage = commits[index].commit.message;
            let commitDate = new Date(commits[index].commit.committer.date).toLocaleDateString('en-GB').replaceAll('/','.');

            let githubCommitElem = githubTemplate.content.cloneNode(true);
            githubCommitElem.querySelector('.commit-message').href = commitUrl;
            githubCommitElem.querySelector('.commit-text').innerText = commitDate + " - " + commitMessage.split('\n')[0];
            
            commitPanel.appendChild(githubCommitElem);

            lastUpdate.innerText = formatTime(data.cacheAge);

            index++;
        }
    })

function formatTime(seconds) {
    const units = [
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const unit of units) {
        if (seconds >= unit.seconds) {
            const value = Math.floor(seconds / unit.seconds);
            return `${value} ${unit.label}${value !== 1 ? "s" : ""}`;
        }
    }

    return "0 seconds";
}