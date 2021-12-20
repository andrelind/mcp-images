// @ts-ignore
import download from 'image-downloader';
import chalk from 'chalk';
import fs from 'fs';
import sharp from 'sharp';

import characters from '../app/src/assets/characters';
// import crisis from '../app/src/assets/crisis';
// import tactics from '../app/src/assets/tactics';

const newLayout = [
  'blackpanther_tchalla',
  'bullseye_benjaminpoindexter',
  'captainamerica_steverogers',
  'captainmarvel_caroldanvers',
  'corvusglaive_corvusglaive',
  'ebonymaw_ebonymaw',
  'enchantress_amora',
  'gamora_gamora',
  'ghostrider_johnathonblaze',
  'greengoblin_normanosborn',
  'groot_iamgroot',
  'hulk_brucebanner',
  'ironman_tonystark',
  'kingpin_wilsonfisk',
  'medusa_medusalithamaquelinboltagon',
  'modok_georgetarleton',
  'okoye_okoye',
  'proximamidnight_proximamidnight',
  'rocketraccoon_rocketraccoon',
  'shuri_shuri',
  'starlord_peterquill',
  'ultron_ultron',
  'valkyrie_brunhilde',
  'wintersoldier_jamesbuckybarnes',
];
// 282x326
const centerLayout = ['antman_scottlang', 'wasp_janetvandyne'];

const log = console.log;

const downloadImage = async (url: string, dest: string) => {
  log(`Downloading ${chalk.blue(url)} => ${chalk.green(dest)}`);
  return await download.image({ url, dest });
};

const cleanName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s/g, '')
    .replace(/"/g, '')
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/'/g, '')
    .replace(/-/g, '');
};

async function start() {
  for await (const character of characters) {
    const name = cleanName(character.name);
    const alias = cleanName(character.alias);

    console.log({ name, alias });

    const id = `${name}_${alias}`;
    const dir = `./images/characters/${id}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (!fs.existsSync(`${dir}/healthy.png`)) {
      await Promise.all(
        [character.healthy, character.injured].map(
          (url, i) =>
            url &&
            downloadImage(url, `${dir}/${i === 0 ? 'healthy' : 'injured'}.png`)
        )
      );
    }

    if (fs.existsSync(`${dir}/healthy.png`)) {
      if (newLayout.includes(id)) {
        await sharp(`${dir}/healthy.png`)
          .resize(600, 401)
          // .extract({ width: 156, height: 250, left: 0, top: 128 })
          .extract({ width: 156, height: 125, left: 0, top: 128 })
          .toFile(`${dir}/portrait.png`)
          .catch((err) => console.log(err));
      } else if (centerLayout.includes(id)) {
        await sharp(`${dir}/healthy.png`)
          .resize(1406, 936)
          // .extract({ width: 282, height: 326, left: 490, top: 240 })
          .extract({ width: 282, height: 163, left: 490, top: 240 })
          .toFile(`${dir}/portrait.png`)
          .catch((err) => console.log(err));
      } else {
        await sharp(`${dir}/healthy.png`)
          .resize(1192, 1787)
          // .extract({ width: 432, height: 800, left: 0, top: 0 })
          .extract({ width: 432, height: 400, left: 0, top: 0 })
          .toFile(`${dir}/portrait.png`)
          .catch((err) => console.log(err));
      }
    }
  }
}

start();
