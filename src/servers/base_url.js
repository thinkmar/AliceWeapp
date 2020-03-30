const getBaseUrl = (url) => {
  let BASE_URL = 'https://www.thinkmar.net';
  if (url.length > 0) {
    BASE_URL = url
  }
  return BASE_URL
}

export default getBaseUrl;
