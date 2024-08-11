import { QueryResult } from "pg";
import pool from "../config/database-config"

interface User {
	id: Number;
	username: string;
	password: string;
	email: string;
	created_at: Date;
}

export const createUser = async (username: string, spotify_id: string, access_token: string, refresh_token: string, photos: string[]): Promise<User> => {
	const res: QueryResult<User> = await pool.query(
		'INSERT INTO users (username, spotify_id, access_token, refresh_token, photos) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
		[username, spotify_id, access_token, refresh_token, photos]
	);
	return res.rows[0]
}

export const findUserbyId = async (spotify_id: string): Promise<User> => {
	const res: QueryResult<User> = await pool.query(
		'SELECT * FROM users WHERE spotify_id = $1',
		[spotify_id]
	);
	return res.rows[0]
}

export const returnSpotifyToken = async (spotify_id: string): Promise<string | null> => {
	const res: QueryResult = await pool.query(
		'SELECT access_token FROM users WHERE spotify_id = $1',
		[spotify_id]
	);
	if (res.rows.length > 0) {
		return res.rows[0].access_token;
	}
	return null;
}
