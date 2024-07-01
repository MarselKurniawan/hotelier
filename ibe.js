// const puppeteer = require('puppeteer');
// const fs = require('fs');

// async function scrapeAndSaveData() {
//   const browser = await puppeteer.launch({ headless: true, args: ['--ignore-certificate-errors'] });
//   const page = await browser.newPage();

//   await page.goto('https://cloud.sinergimax.com/booking/gapura-hotel-semarang_2828.html', { waitUntil: 'networkidle2' });
//   await page.goto('https://cloud.sinergimax.com/booking/cozzy-stay_2220.html', { waitUntil: 'networkidle2' });
//   await page.goto('https://cloud.sinergimax.com/booking/berlian-abadi-hotel_3052.html', { waitUntil: 'networkidle2' });
//   await page.goto('https://cloud.sinergimax.com/booking/hotel-youstay-semarang_3389.html', { waitUntil: 'networkidle2' });
//   await page.goto('https://cloud.sinergimax.com/booking/omni-rooms-semarang_12722.html', { waitUntil: 'networkidle2' });

//   // Extract data from the classes .rate and .roomtype-title
//   const rates = await page.$$eval('.rate', elements => elements.map(el => el.textContent.trim()));
//   const roomTypes = await page.$$eval('.roomtype-title', elements => elements.map(el => el.textContent.trim()));

//   // Filter out unwanted texts and remove duplicates
//   const filteredRates = [...new Set(rates.filter(rate => rate !== 'RATES INFORMATION' && rate !== 'NOT AVAILABLE'))];
//   const filteredRoomTypes = [...new Set(roomTypes.filter(roomType => roomType !== 'RATES INFORMATION' && roomType !== 'NOT AVAILABLE'))];

//   // Prepare data to save
//   const dataToSave = {
//     roomTypes: filteredRoomTypes,
//     rates: filteredRates
//   };

//   // Save data to a JSON file
//   fs.writeFileSync('data.json', JSON.stringify(dataToSave));

//   await browser.close();
// }

// scrapeAndSaveData();

const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeAndSaveData() {
  const browser = await puppeteer.launch({ headless: true, args: ['--ignore-certificate-errors'] });
  const page = await browser.newPage();

  // List of URLs to scrape
  const urls = [
    'https://cloud.sinergimax.com/booking/gapura-hotel-semarang_2828.html',
    'https://cloud.sinergimax.com/booking/cozzy-stay_2220.html',
    'https://cloud.sinergimax.com/booking/berlian-abadi-hotel_3052.html',
    'https://cloud.sinergimax.com/booking/hotel-youstay-semarang_3389.html',
    'https://cloud.sinergimax.com/booking/omni-rooms-semarang_12722.html'
  ];

  const results = {};

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract data from the classes .rate and .roomtype-title
    const rates = await page.$$eval('.rate', elements => elements.map(el => el.textContent.trim()));
    const roomTypes = await page.$$eval('.roomtype-title', elements => elements.map(el => el.textContent.trim()));

    // Filter out unwanted texts and remove duplicates
    const filteredRates = [...new Set(rates.filter(rate => rate !== 'RATES INFORMATION' && rate !== 'NOT AVAILABLE'))];
    const filteredRoomTypes = [...new Set(roomTypes.filter(roomType => roomType !== 'RATES INFORMATION' && roomType !== 'NOT AVAILABLE'))];

    // Store data for the current URL
    results[url] = {
      roomTypes: filteredRoomTypes,
      rates: filteredRates
    };
  }

  // Save data to a JSON file
  fs.writeFileSync('data.json', JSON.stringify(results, null, 2));

  await browser.close();
}

scrapeAndSaveData();

