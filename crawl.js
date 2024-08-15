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


async function crawlPage(baseURL) {

  let res
  try {
    res = await fetch(baseURL)
  } catch (err) {
    throw new Error(`Got Network err: ${err.message}`)
  }

  if (res.status >= 400) {
    console.log(`Got HTTP error: ${res.status} ${res.statusText}`)
    return
  }


  const contentType = res.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    console.log(`Not HTML response: ${contentType}`)
  }


  const html = await res.text()

  console.log(html)


}

export { normalizeURL, getURLsFromHTML, crawlPage };
