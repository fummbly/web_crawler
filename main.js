import { getURLsFromHTML } from "./crawl.js";

const htmlBody =
  '<html><body><a href="/path/one"><span>Boot.dev</span></a><a href="https://www.google.com"><span>Google</span></a></body></html>';

const baseURL = "https://blog.boot.dev";

console.log(getURLsFromHTML(htmlBody, baseURL));
