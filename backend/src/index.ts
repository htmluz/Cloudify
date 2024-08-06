import dotenv from 'dotenv';
dotenv.config();

import passport from "passport";
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { teste } from './config/database-config';

const app = express();
const PORT = 42069;

app.use(cors())
app.use(passport.initialize());


teste("pipokinha", "123", "al@g.com")
app.get('/', passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private']}));


app.listen(PORT, () => {
	console.log(`rodando UwU http://localhost:${PORT}`);
})
