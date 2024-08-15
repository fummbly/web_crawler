import { argv } from 'node:process'
import { crawlPage } from './crawl.js'


function main(argv) {
  if (argv.length > 3) {
    console.log("Too many arguments")
    return
  } else if (argv.length < 3) {
    console.log("No baseURL provided")
    return
  }

  const url = argv[2]

  console.log(`Starting crawling with: ${url}`)



  crawlPage(url)

}

main(argv)
