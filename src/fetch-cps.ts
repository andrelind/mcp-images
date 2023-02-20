import puppeteer from 'puppeteer';
import fs from 'fs';
import download from 'image-downloader';
import sharp from 'sharp';

const downloadImage = async (url: string, dest: string) => {
  console.log(`Downloading ${url} => ${dest}`);
  return await download.image({ url, dest });
};

export const fetchCPS = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const result: { id: string; url: string; img: string }[] = [];

  try {
    await page.goto(
      'https://www.atomicmassgames.com/gallery-index#gallery-sets'
    );

    const res = await page.evaluate(() => {
      const images = document.querySelectorAll('.sqs-gallery-design-grid');

      console.log({ images: images[1] });

      const boxes = images[1].children;

      // const images = document.querySelector('.sqs-gallery-design-grid').children;

      return Object.keys(boxes).map((key) => {
        // @ts-ignore
        const e = boxes[key].children[0].children[0].children[1];

        const cp = e.getAttribute('alt');
        const url = e.getAttribute('data-src') as string;
        const img = url.substring(url.lastIndexOf('/') + 1) as string;
        const id = img.toLowerCase().split('_')[0].replace('en', '') as string;

        return {
          id,
          url,
          img,
        };
      });
    });

    // Filter result to remove duplicates

    res.forEach((r) => {
      const index = result.findIndex((rr) => rr.id === r.id);

      if (index === -1) {
        result.push(r);
      } else {
        result[index] = r;
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    await page.close();
  }
  for await (const o of result) {
    const loc = `../../images/contentpacks/${o.id}.png`;
    await downloadImage(o.url, loc);
    // const buffer = await sharp(loc)
    //   .resize(720, 720)
    //   .extract({ width: 370, height: 510, left: 180, top: 100 })
    //   .toBuffer();
    // await sharp(buffer).toFile(loc);
    // .catch((err) => console.log(err));
  }
  console.log(result);
  await browser.close();
};

export default fetchCPS;
