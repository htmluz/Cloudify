import pg, { Pool } from 'pg';
import { 
	POSTGRES_USER, 
	POSTGRES_DB, 
	POSTGRES_HOST, 
	POSTGRES_PORT, 
	POSTGRES_PASSWORD
} from '../lib/constants';

const pool: pg.Pool = new Pool({
	user: POSTGRES_USER,
	host: POSTGRES_HOST,
	database: POSTGRES_DB,
	port: parseInt(POSTGRES_PORT, 10) || 5432,
	password: POSTGRES_PASSWORD,
})


export default pool;
