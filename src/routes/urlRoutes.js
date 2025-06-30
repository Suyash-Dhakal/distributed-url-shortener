import express from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController.js';

const router= express.Router();

router.get('/about', (req, res) => {
  res.render('about');
});

router.post('/shorten', shortenUrl); // Route to shorten a URL
router.get('/:shortId', redirectUrl); // Route to redirect to the original URL using the short ID

router.get('/', (req, res) => {
  res.render('index', { shortUrl: null });
});


export default router;