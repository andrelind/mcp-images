const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');
const download = require('image-downloader');
const chalk = require('chalk');

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

      return {
        id: img.slice(0, 4).toLowerCase(),
        url,
        img,
      };
    });
  });

  for await (const o of res) {
    await downloadImage(
      o.url,
      `images/cp/${o.id}.${o.img.includes('.png') ? 'png' : 'jpg'}`
    );
  }
  console.log(res);

  await nightmare.end();
};

run();
