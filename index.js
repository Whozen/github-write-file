const core = require("@actions/core");
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

(async () => {
  try {
    const username = process.env.GITHUB_REPOSITORY.split("/")[0];
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1];

    const makeNewFile = core.getInput("newFile");
    const overwriteOrAppend = core.getInput("overwrite");
    const userContent = core.getInput("content");

    let sha = "";
    let fileContent = "";

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

    if (getOutputFile === undefined) {
      if (!makeNewFile) {
        return;
      }
    } else {
      sha = getOutputFile.data.sha;
      fileContent = getOutputFile.data.content;
    }

    const dataToWrite =
      overwriteOrAppend === "Append"
        ? `${fileContent} \n${userContent}`
        : userContent;

    const params = {
      owner: username,
      repo: repo,
      path: core.getInput("path"),
      message: "(Automated) Update file",
      content: Buffer.from(dataToWrite, "utf8").toString("base64"),
    };

    if (sha != "" && makeNewFile) {
      params.sha = sha;
    }

    await octokit
      .request("PUT /repos/{owner}/{repo}/contents/{path}", params)
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
