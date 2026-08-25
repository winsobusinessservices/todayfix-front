const https = require('https');
const getHtml = (url) => new Promise((resolve) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
  }).on('error', () => resolve(''));
});
async function extract() {
  const urls = ['https://urbaniabangalore.com/', 'https://savariurbania.com/'];
  for (const url of urls) {
    const html = await getHtml(url);
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)];
    console.log('URL:', url);
    console.log('Images:', imgMatches.slice(0, 5).map(m => m[1]));
  }
}
extract();
