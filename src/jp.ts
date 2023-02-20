import { Attack, Side, SuperPower } from '../../app/src/types/mcp';
import { get } from './requests';

export interface StatCard {
  slug: string;
  name: string;
  alterEgo: string;
  secondFormCard: boolean;
  artist: string;
  secondSideArtist?: any;
  frontSide: JPCardSide;
  backSide: JPCardSide;
  squished: boolean;
  boxSets: string[];
  erratas: any[];
}

export interface JPCardSide {
  type: string;
  nameOverride?: any;
  physicalDefense: string;
  energyDefense: string;
  mysticDefense: string;
  stamina: string;
  threatLevel: string;
  size: string;
  secondFormSize: string;
  speed: string;
  secondFormSpeed: string;
  attacks: Attack[];
  superPowers: SuperPower[];
}

export interface JPCharacter {
  id: number;
  name: string;
  sanitizedName: string;
  alterEgo: string;
  sanitizedAlterEgo: string;
  slug: string;
  isGrunt: boolean;
  threatLevel: number;
  baseSize?: any;
  secondFormSlug?: any;
  secondFormBaseSize?: any;
  boxSets: string[];
  releaseDate: string;
  affiliations: any[];
  statCard: StatCard;
  secondStatCard?: any;
}

export interface JPAffiliation {
  characterSlug: string;
  characterName: string;
  slug: string;
  name: string;
  isLeader: boolean;
  isLeaderWithTeamTactics?: any;
  affiliatedSince?: any;
}

export interface JPListCharacter {
  id: number;
  name: string;
  sanitizedName: string;
  alterEgo: string;
  sanitizedAlterEgo: string;
  slug: string;
  isGrunt: boolean;
  threatLevel: number;
  baseSize: number;
  secondFormSlug?: any;
  secondFormBaseSize?: any;
  boxSets: string[];
  releaseDate: string;
  affiliations: JPAffiliation[];
}

export interface JPBoxSetListItem {
  id: number;
  type: string;
  name: string;
  sanitizedName: string;
  code: string;
  releaseDate: string;
  content: any[];
}

export interface JPBoxSetContent {
  itemId: number;
  itemSlug: string;
  redundantItem: boolean;
  itemSlugReplaced?: any;
  itemType: string;
  name: string;
}

export interface JPBoxSet {
  id: number;
  type: string;
  name: string;
  sanitizedName: string;
  code: string;
  releaseDate: string;
  content: JPBoxSetContent[];
}

export const convertCard = (c?: JPCardSide): Side | undefined => {
  if (!c) {
    return undefined;
  }

  return {
    type: c.type.includes('healthy') ? 'healthy' : 'injured',
    defense: {
      physical: parseInt(c.physicalDefense, 10),
      energy: parseInt(c.energyDefense, 10),
      mystic: parseInt(c.mysticDefense, 10),
    },
    stamina: parseInt(c.stamina, 10),
    size: parseInt(c.size, 10),
    secondFormSize: c.secondFormSize
      ? parseInt(c.secondFormSize, 10)
      : undefined,
    speed: c.speed === 'S' ? 'Small' : c.speed === 'M' ? 'Medium' : 'Long',
    attacks: c.attacks,
    superPowers: c.superPowers,
  };
};

export const getCharacters = async () => {
  const json = await get<JPListCharacter[]>(
    'http://www.jarvis-protocol.com/api/characters',
    {
      headers: {
        'Content-Type': 'application/json',
        Referer: 'http://www.jarvis-protocol.com/characters',
      },
    }
  );
  return json;
};

export const getCharacter = async (slug: string) => {
  const json = await get<JPCharacter>(
    'http://www.jarvis-protocol.com/api/characters/' + slug,
    {
      headers: {
        'Content-Type': 'application/json',
        Referer: 'http://www.jarvis-protocol.com/characters',
      },
    }
  );

  //   console.log({ json });
  return json;
};

export const getBoxSets = async () => {
  const json = await get<JPBoxSetListItem[]>(
    'https://www.jarvis-protocol.com/api/box_sets',
    {
      headers: {
        'Content-Type': 'application/json',
        Referer: 'http://www.jarvis-protocol.com/characters',
      },
    }
  );
  return json;
};

export const getBoxSet = async (s: string) => {
  const json = await get<JPBoxSet>(
    'https://www.jarvis-protocol.com/api/box_sets/' + s,
    {
      headers: {
        'Content-Type': 'application/json',
        Referer: 'http://www.jarvis-protocol.com/characters',
      },
    }
  );
  return json;
};
