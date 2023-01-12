import download from 'image-downloader';

export const downloadImage = async (url: string, dest: string) => {
  // log(`Downloading ${chalk.blue(url)} => ${chalk.green(dest)}`);
  return await download.image({ url, dest });
};

export const cleanName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s/g, '')
    .replace(/"/g, '')
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/'/g, '')
    .replace(/-/g, '')
    .replace(/\?/g, '')
    .replace(/\!/g, '')
    .replace(/�/g, '')
    .replace(/é/g, 'e');
};
