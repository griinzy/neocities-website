const commitPanel = document.getElementById('commit-panel');

const repo = 'neocities-website'
const githubUrl = `http://api.gunjicordia.xyz/github/commits/${repo}`;

const githubTemplate = document.getElementById('github-commit-template');

fetch(githubUrl)
    .then(response => response.json())
    .then(data => {
        let index = 0;
        while(index < 5 && index < data.length) {
            let commitUrl = data[index].html_url;
            let commitMessage = data[index].commit.message;
            let commitDate = new Date(data[index].commit.committer.date).toLocaleDateString('en-GB').replaceAll('/','.');

            let githubCommitElem = githubTemplate.content.cloneNode(true);
            githubCommitElem.querySelector('.commit-message').href = commitUrl;
            githubCommitElem.querySelector('.commit-text').innerText = commitDate + " - " + commitMessage.split('\n')[0];

            commitPanel.appendChild(githubCommitElem);
            if(index < 4) {
                let separator = document.createElement('hr');
                commitPanel.appendChild(separator);
            }
            index++;
        }
    })