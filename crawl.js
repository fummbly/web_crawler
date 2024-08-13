

function normalizeURL(url) {
  const urlObj = new URL(url)

  let fullPath = `${urlObj.hostname}${urlObj.pathname}`

  if (fullPath.endsWith('/')) {
    fullPath = fullPath.slice(0, -1)
  }

  return fullPath
  

}


export { normalizeURL };
