import pg, { Pool, QueryResult } from 'pg';
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

interface User {
	id: Number;
	username: string;
	password: string;
	email: string;
	created_at: Date;
}

export const teste = async (username: string, password: string, email: string): Promise<User> => {
	const res: QueryResult<User> = await pool.query(
		'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *;',
		[username, password, email]
	);
	console.log(res.rows[0])
	return res.rows[0]
}

export default pool;
