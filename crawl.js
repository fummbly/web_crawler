import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const urlObj = new URL(url);

  let fullPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (fullPath.endsWith("/")) {
    fullPath = fullPath.slice(0, -1);
  }

  return fullPath;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const htmlObj = new JSDOM(htmlBody);
  const aTags = htmlObj.window.document.querySelectorAll("a");
  let finalPaths = [];

  for (const path of aTags) {
    if (path.href[0] === "/") {
      finalPaths.push(`${baseURL}${path.href}`);
    } else {
      finalPaths.push(path.href);
    }
  }
  return finalPaths;
}

export { normalizeURL, getURLsFromHTML };
