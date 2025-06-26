import express from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController.js';

const router= express.Router();

router.post('/shorten', shortenUrl); // Route to shorten a URL
router.get('/:shortId', redirectUrl); // Route to redirect to the original URL using the

export default router;