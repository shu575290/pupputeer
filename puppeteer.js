const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

let getlinks = async function() {
    const browser = await puppeteer.launch({
        headless: false
    })

    const page = await browser.newPage()
    await page.goto('https://www.toutiao.com/ch/news_game/')

    async function autoScroll(page) {
        await page.evaluate(function() {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= 6000) {
                    clearInterval(timer);
                }
            }, 100);
        })

        body = await page.content();
        $ = cheerio.load(body);
        var links = $('.title-box .link.title')
            .map((index, obj) => {
                return $(obj).attr('href');
            }).get()
        console.log(links + "\n")
    }
    autoScroll(page)
}

getlinks()