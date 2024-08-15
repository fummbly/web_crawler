

function sortPages(pages) {
  let pageArray = Object.keys(pages).map(function(key) {
    return [key, pages[key]];
  })

  pageArray.sort(function(first, second) {
    return second[1] - first[1]
  });

  let sortedPages = {}

  for (const v of pageArray) {
    sortedPages[v[0]] = v[1]
  }



  return sortedPages
}

function printReport(pages) {
  console.log('Starting Report...')

  const sortedPages = sortPages(pages)


  for (const key of Object.keys(sortedPages)) {
    console.log(`Found ${sortedPages[key]} internal links to ${key}`)
  }

}



export { sortPages, printReport }
