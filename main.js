import { argv } from 'node:process'
import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main(argv) {
  if (argv.length > 3) {
    console.log("Too many arguments")
    return
  } else if (argv.length < 3) {
    console.log("No baseURL provided")
    return
  }

  const url = argv[2]

  console.log(`Starting crawling with: ${url}`)



  const pages = await crawlPage(url)

  printReport(pages)


}

main(argv)
