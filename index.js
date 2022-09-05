const core = require("@actions/core");
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

(async () => {
  try {
    const username = process.env.GITHUB_REPOSITORY.split("/")[0];
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1];
    const getOutputFile = await octokit
      .request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: username,
        repo: repo,
        path: core.getInput("path"),
      })
      .catch((e) => {
        console.error("Failed: ", e);
        core.setFailed("Failed: ", e.message);
      });
    const sha = getOutputFile.data.sha;

    const data = core.getInput("content");

    await octokit
      .request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner: username,
        repo: repo,
        path: core.getInput("path"),
        message: "(Automated) Update file",
        content: Buffer.from(data, "utf8").toString("base64"),
        sha: sha,
      })
      .then(() => {
        core.setOutput("Content written: ", data);
      })
      .catch((e) => {
        console.error("Failed: ", e);
        core.setFailed("Failed: ", e.message);
      });
  } catch (e) {
    console.error("Failed: ", e);
    core.setFailed("Failed: ", e.message);
  }
})();
