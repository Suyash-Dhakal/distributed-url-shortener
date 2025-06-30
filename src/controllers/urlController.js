import shortid from 'shortid';
import { saveUrl, getUrl} from '../services/redisService.js';

export const shortenUrl= async (req,res)=>{
    const { url, ttl } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    console.log(`reached here with url: ${url} and ttl: ${ttl}`);
    
    try {
        const shortId= shortid.generate();
        await saveUrl(shortId, url, ttl);
        const shortUrl = `http://localhost:${process.env.PORT}/${shortId}`;
        res.render('index', { shortUrl, url });
    } catch (error) {
        console.error('Error shortening URL:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  console.log(`redirecting for shortId: ${shortId}`);

  if (!shortId) {
    return res.status(400).json({ error: 'Short ID is required' });
  }

  try {
    const url = await getUrl(shortId);
    if (!url) {
      console.log(`cache miss for shortId ${shortId}`);
      return res.status(404).json({ error: 'URL not found' });
    }
    console.log(`cache hit for shortId ${shortId}`);
    return res.redirect(url);
  } catch (error) {
    console.error('Error redirecting URL:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
