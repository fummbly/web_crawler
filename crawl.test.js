import { test, expect } from "@jest/globals";

import { normalizeURL } from "./crawl.js";



test('Testing if the correct url is returned', () => {
  const url = 'https://blog.boot.dev/path'
  const actual = normalizeURL(url)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
});


test('Test if slash removal', () => {
  const url = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(url)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
});


test('Test capitals', () => {
  const url = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(url)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
});


test('Test http', () => {
  const url = 'http://blog.boot.dev/path'
  const actual = normalizeURL(url)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
});


