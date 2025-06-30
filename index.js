import express from 'express';
import dotenv from 'dotenv';
import urlRoutes from './src/routes/urlRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// For ES Modules to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (optional for CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});