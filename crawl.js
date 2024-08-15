import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const urlObj = new URL(url);


  let fullPath = `${urlObj.host}${urlObj.pathname}`;

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
    if (path.hasAttribute('href')) {
      let href = path.getAttribute('href')

      try {
        href = new URL(href, baseURL).href
        finalPaths.push(href)
      } catch (err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  }
  return finalPaths;

}


async function getPageData(url) {

  let res
  try {
    res = await fetch(url)
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


  return await res.text()
}


async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const currURLObj = new URL(currentURL)
  const baseURLObj = new URL(baseURL)

  if (currURLObj.hostname !== baseURLObj.hostname) {
    return pages
  }

  const normCurrURL = normalizeURL(currentURL)

  if (pages[normCurrURL] > 0) {
    pages[normCurrURL]++
    return pages
  }

  pages[normCurrURL] = 1

  let html = ''
  console.log(`Crawling page: ${currentURL}`)
  try {

    html = await getPageData(currentURL)
  } catch (err) {
    console.log(err.message)
    return pages
  }

  const nextURLs = getURLsFromHTML(html, baseURL)
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages)
  }


  return pages




}

export { normalizeURL, getURLsFromHTML, crawlPage };
