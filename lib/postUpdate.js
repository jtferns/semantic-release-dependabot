const fetch = require("node-fetch");
const SemanticReleaseError = require("@semantic-release/error");

const dependabotURL =
  "https://api.dependabot.com/release_notifications/private";

const accessToken = process.env.GH_TOKEN;

function checkStatus(res) {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res;
  } else {
    throw SemanticReleaseError(
      new Error().stdout,
      `FAILED UPDATE: ${res.statusText}`
    );
  }
}

async function postUpdate(update) {
  await fetch(dependabotURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Personal ${accessToken}`
    },
    body: JSON.stringify(update)
  })
    .then(checkStatus)
    .catch(e => {
      throw new SemanticReleaseError(e.stdout, "DEPENDABOT UPDATE FAILED: ");
    });
}

module.exports = postUpdate;
