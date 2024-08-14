import { test, expect } from "@jest/globals";

import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test("Testing if the correct url is returned", () => {
  const url = "https://blog.boot.dev/path";
  const actual = normalizeURL(url);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("Test if slash removal", () => {
  const url = "https://blog.boot.dev/path/";
  const actual = normalizeURL(url);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("Test capitals", () => {
  const url = "https://BLOG.boot.dev/path";
  const actual = normalizeURL(url);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("Test http", () => {
  const url = "http://blog.boot.dev/path";
  const actual = normalizeURL(url);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("Test relative path to absolute path", () => {
  const htmlBody = `<html>
  <body>
    <a href="/locations"><span>Go to locations</span></a>
  </body>
</html>`;

  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = ["https://blog.boot.dev/locations"];
  expect(actual).toEqual(expected);
});

test("Test multiple paths", () => {
  const htmlBody = `<html>
  <body>
    <a href="/locations/first"><span>Go to locations</span></a>
  </body>
</html>`;

  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = ["https://blog.boot.dev/locations/first"];
  expect(actual).toEqual(expected);
});

test("Test for multiple tags", () => {
  const htmlBody =
    '<html><body><a href="/path/to/file"><span>Path to file</span></a><a href="https://www.google.com"><span>Google</span></a></body></html>';
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = [
    "https://blog.boot.dev/path/to/file",
    "https://www.google.com/",
  ];
  expect(actual).toEqual(expected);
});
