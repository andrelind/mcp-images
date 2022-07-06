const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');
const download = require('image-downloader');
const chalk = require('chalk');
const sharp = require('sharp');

const downloadImage = async (url, dest) => {
  console.log(`Downloading ${chalk.blue(url)} => ${chalk.green(dest)}`);
  return await download.image({ url, dest });
};

const run = async () => {
  await nightmare.goto(
    'https://www.atomicmassgames.com/gallery-index#gallery-sets'
  );
  // .wait(1000);

  const res = await nightmare.evaluate(() => {
    const images = document.querySelectorAll('.sqs-gallery-design-grid');

    console.log({ images: images[1] });

    const boxes = images[1].children;

    // const images = document.querySelector('.sqs-gallery-design-grid').children;

    return Object.keys(boxes).map((key) => {
      const e = boxes[key].children[0].children[0].children[1];

      const cp = e.getAttribute('alt');
      const url = e.getAttribute('data-src');
      const img = url.substring(url.lastIndexOf('/') + 1);
      const id = img.toLowerCase().split('_')[0].replace('en', '');

      return {
        id,
        url,
        img,
      };
    });
  });

  // Filter result to remove duplicates
  const result = [];
  res.forEach((r) => {
    const index = result.findIndex((rr) => rr.id === r.id);

    if (index === -1) {
      result.push(r);
    } else {
      result[index] = r;
    }
  });

  for await (const o of result) {
    const loc = `images/contentpacks/${o.id}.png`;
    await downloadImage(o.url, loc);
    // const buffer = await sharp(loc)
    //   .resize(720, 720)
    //   .extract({ width: 370, height: 510, left: 180, top: 100 })
    //   .toBuffer();
    // await sharp(buffer).toFile(loc);
    // .catch((err) => console.log(err));
  }
  console.log(result);

  await nightmare.end();
};

run();
