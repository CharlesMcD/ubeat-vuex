import md5 from 'blueimp-md5';

export function formatAlbumArtworkUrl(originalUrl) {
  if (typeof originalUrl !== 'undefined') {
    const strippedUrl = originalUrl.substring(0, originalUrl.lastIndexOf('/'));
    return `${strippedUrl}/500x500bb.jpg`;
  }
  return originalUrl;
}

export function formatArtistArtworkUrl(originalUrl) {
  if (typeof originalUrl !== 'undefined') {
    const regex = new RegExp('^(.+)/([^/]+)/([^/]+)');
    return originalUrl.replace(regex, (match, group1, group2, group3) => `${group1}/500x500/${group3}`);
  }
  return originalUrl;
}

export function formatArtistBio(originalBio) {
  if (typeof originalBio !== 'undefined') {
    const regex = new RegExp('^([\\s\\S]+)(<a href.+a>)');
    return originalBio.replace(regex, (match, group1) => `${group1}`);
  }
  return originalBio;
}

export function trimSpecialCharactersAndReplaceSpace(originalName) {
  if (originalName) {
    return originalName.replace(/[^\w\s]/gi, '')
      .split(' ')
      .join('+');
  }
  return originalName;
}

export function onlyContainSpaces(str) {
  return !str.replace(/\s/g, '');
}

export function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function getGravatar(email) {
  const md5Email = md5(email.toLowerCase());
  return `https://www.gravatar.com/avatar/${md5Email}?s=200?d=http%3A%2F%2Fexample.com%2Fimages%2Favatar.jpg`;
}
