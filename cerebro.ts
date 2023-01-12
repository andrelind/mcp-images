import download from 'image-downloader';
import fs from 'fs';
import sharp from 'sharp';
import { cleanName, downloadImage } from './helpers';

type CerebroChar = {
  Affiliations: string;
  Alias: string;
  Alt_Card: string;
  Alt_Card_Back: string;
  CID: string;
  CP: string;
  Card_Healthy: string;
  Card_Injured: string;
  Cost: number;
  Date: string;
  Errata: string;
  GemLimit: number;
  Gems: string;
  ID: number;
  Leadership: string;
  Name: string;
  back_health: number;
  checkAlias: string;
  extraPower: number;
  front_health: number;
  grunt_health: number;
  grunt_name: string;
  grunt_thumbnail: string;
  layout: string;
  needsAlias: string;
  tags: string;
  thumbnail: string;
  token: string;
};

const runner = async () => {
  console.log('Fetching list');
  const list: CerebroChar[] = await fetch(
    'https://api.cerebromcp.com/characters'
  ).then((r) => r.json());

  for await (const character of list) {
    const name = cleanName(character.Name);
    const alias = cleanName(character.Alias);
    const id = `${name}_${alias}`;
    const dir = `${process.cwd()}/images/characters/${id}`;

    console.log(name, alias);

    try {
      await Promise.all(
        [
          `https://cerebromcp.com/MCPImages/Characters/${character.Card_Healthy}`,
          `https://cerebromcp.com/MCPImages/Characters/${character.Card_Injured}`,
          //   `https://cerebromcp.com/MCPImages/Thumbnails/${character.thumbnail}`,
        ].map((url, i) => {
          switch (i) {
            case 0:
              return downloadImage(url, `${dir}/healthy.png`);
            case 1:
              return downloadImage(url, `${dir}/injured.png`);
            case 2:
              return downloadImage(url, `${dir}/portrait.png`);
          }
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }
};

runner();
