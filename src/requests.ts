import fetch, { RequestInit } from 'node-fetch';

export const get = async <T>(url: string, init?: RequestInit): Promise<T> => {
  // console.log(url);
  const res = await fetch(url, init);
  return res.json() as unknown as T;
};

export const post = async <T>(
  url: string,
  body: any,
  headers?: any
): Promise<T> => {
  // console.log(url);
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });
  return res.json() as unknown as T;
};

export const chunk = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
