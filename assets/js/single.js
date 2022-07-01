var issuesContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // make a request to the url
    fetch(apiUrl).then(function(response) {
    // if successful
        if (response.ok) {
            response.json().then(function(data) {
                // console.log(data);
                // pass response data to dom function
                displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!");
        }
        
    });
};
getRepoIssues("Boywondr84/quiz-game");

// Turn Github issue data in DOM elements
var displayIssues = function(issues) {
        // check if api returned any issues
    if (issues.length === 0) {
        issuesContainerEl.textContent = "No open issues found.";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        
        // create a link element to take users to the issue on github
        var issueNameEl = document.createElement("a");
        issueNameEl.classList = "list-item flex-row justify-space-betwen align-center";
        issueNameEl.setAttribute("href", issues[i].html_url);
        issueNameEl.setAttribute("target", "_blank");
        // create a span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueNameEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");
        
        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueNameEl.appendChild(typeEl);

        // append to html
        issuesContainerEl.appendChild(issueNameEl);
    }
};