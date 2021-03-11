const puppeteer = require("puppeteer");

(async () => {
    const options = {
        headless: true,
        ignoreHTTPSErrors: true
    };
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.goto("https://example.com");
    await page.click("a", {
        waitUntil: "networkidle2"
    });

    await page.waitForSelector("footer");

    const h1s = await page.$eval("h1", h => h.innerHTML);
    console.log(h1s);

    const h2s = await page.$$eval("h2", hs => hs.map(h => h.innerHTML));
    console.log(h2s.map(o => "\t" + o).join("\n"));

    const ahs = await page.$$eval("#sidebar_left li > a", as => {
        return as.map(a => {
            return `${a.innerText} [${a.href}]`;
        });
    });
    console.log(ahs.join("\n"));

    await browser.close();
})();
