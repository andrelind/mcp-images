import fs from 'fs';
import { cleanName, downloadImage } from './helpers';
import sharp from 'sharp';
import characters from '../app/src/assets/characters';
import crisis from '../app/src/assets/crisis';
import tactics from '../app/src/assets/tactics';
import fetchCPS from './fetch-cps';

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
  'blackswan_blackswan',
  'heimdalltheallseeing_heimdall',
  'skurgetheexecutioner_skurge',
  'supergiant_supergiant',
  // 'crimsondynamo_dimitribukharin',
  // 'darkstar_layniapetrovna',
  'malekiththeaccursed_malekith',
  // 'ursamajor_mikhailursus',
  'arnimzola_arnimzola',
  'baronstrucker_wolfgangvonstrucker',
  'nickfuryandthehowlingcommandos_nicholasfurysrtimothydumdumdugangabrieljones',
  'redskullmasterofhydra_johannschmidt',
  'steverogerscaptainamerica_steverogers',
  'theoriginalhumantorch_jimhammond',
  'sentinelmk4_sentinelmk4',
  'sentinelprimemk4_sentinelprimemk4',
  'theblob_freddukes',
  'pyro_stjohnallerdyce',
  'loganthewolverine_jamesloganhowlett',
  'sabretoothapexpredator_victorcreed',
  'helaqueenofhel_hela',
  'thorprinceofasgard_thorodinson',
  'lokigodofmischief_lokilaufeyson',
  'rhino_alekseisytsevich',
  'agentvenom_flashthompson',
  'spiderwoman_jessicadrew',
  'betaraybill_bill',
];
// 282x326
const centerLayout = [
  'antman_scottlang',
  'msmarvel_kamalakhan',
  'wasp_janetvandyne',
];

const log = console.log;

const runner = async () => {
  for await (const character of characters) {
    const name = cleanName(character.name);
    const alias = cleanName(character.alias);

    log(name);

    const id = `${name}_${alias}`;
    const dir = `${process.cwd()}/images/characters/${id}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // if (!fs.existsSync(`${dir}/healthy.png`)) {
    try {
      await Promise.all(
        [character.healthy, character.injured].map(
          (url, i) =>
            url &&
            downloadImage(url, `${dir}/${i === 0 ? 'healthy' : 'injured'}.png`)
        )
      );
    } catch (error) {
      console.log({ error });
    }
    // }

    // if (fs.existsSync(`${dir}/healthy.png`)) {
    if (newLayout.includes(id)) {
      await sharp(`${dir}/healthy.png`)
        .resize(600, 401)
        // .extract({ width: 156, height: 250, left: 0, top: 128 })
        .extract({ width: 156, height: 125, left: 0, top: 128 })
        .toFile(`${dir}/portrait.png`)
        .catch((err) => console.log(err));

      // await sharp(`${dir}/healthy.png`)
      //   .resize(600, 401)
      //   // .extract({ width: 282, height: 326, left: 490, top: 240 })
      //   .extract({ width: 140, height: 73, left: 10, top: 52 })
      //   .toFile(`${dir}/stats.png`)
      //   .catch((err) => console.log(err));
    } else if (centerLayout.includes(id)) {
      await sharp(`${dir}/healthy.png`)
        .resize(1406, 936)
        // .extract({ width: 282, height: 326, left: 490, top: 240 })
        .extract({ width: 282, height: 163, left: 490, top: 240 })
        .toFile(`${dir}/portrait.png`)
        .catch((err) => console.log(err));

      // await sharp(`${dir}/healthy.png`)
      //   .resize(1406, 936)
      //   // .extract({ width: 282, height: 326, left: 490, top: 240 })
      //   .extract({ width: 320, height: 120, left: 545, top: 135 })
      //   .toFile(`${dir}/stats.png`)
      //   .catch((err) => console.log(err));
    } else {
      await sharp(`${dir}/healthy.png`)
        .resize(1192, 1787)
        // .extract({ width: 432, height: 800, left: 0, top: 0 })
        .extract({ width: 432, height: 400, left: 0, top: 0 })
        .toFile(`${dir}/portrait.png`)
        .catch((err) => console.log(err));

      // await sharp(`${dir}/healthy.png`)
      //   .resize(1192, 1787)
      //   // .extract({ width: 432, height: 800, left: 0, top: 0 })
      //   .extract({ width: 650, height: 160, left: 505, top: 165 })
      //   .toFile(`${dir}/stats.png`)
      //   .catch((err) => console.log(err));
    }

    // await sharp(`${dir}/healthy.png`)
    //   .toFile(`${dir}_portrait.png`)
    //   .catch((err) => console.log(err));
    // // }
  }

  for await (const c of crisis) {
    const name = cleanName(c.crisis);
    const dir = `${process.cwd()}/images/crisis`;

    log(name);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // if (!fs.existsSync(`${dir}/${name}.png`)) {
    try {
      await downloadImage(c.image, `${dir}/${name}.png`);
    } catch (error) {
      console.log({ error });
    }
    // }
  }

  for await (const t of tactics) {
    const name = cleanName(t.tactic);
    const dir = `${process.cwd()}/images/tactics`;

    log(name);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // if (!fs.existsSync(`${dir}/${name}.png`)) {
    try {
      await downloadImage(t.image, `${dir}/${name}.png`);
    } catch (error) {
      console.log({ error });
    }
    // }
  }

  await fetchCPS();
};

runner();
