import { test, expect } from '@jest/globals'
import { sortPages } from './report.js'


test('Testing the sorting of pages', () => {
  const pages = { a: 12, b: 8, c: 10 }
  const actual = sortPages(pages)
  const expected = { a: 12, c: 10, b: 8 }
  expect(actual).toEqual(expected)
})


test('Another test of sorting', () => {
  const pages = { a: 4, b: 20, c: 12, d: 17 }
  const actual = sortPages(pages)
  const expected = { b: 20, d: 17, c: 12, a: 4 }
  expect(actual).toEqual(expected)
})
