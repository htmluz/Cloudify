import { QueryResult } from "pg";
import pool from "../config/database-config"

interface User {
	id: Number;
	username: string;
	password: string;
	email: string;
	created_at: Date;
}

//TODO: Padronizar
export const createUser = async (username: string, spotify_id: string, access_token: string, refresh_token: string, photos: string[]): Promise<User> => {
	const res: QueryResult<User> = await pool.query(
		'INSERT INTO users (username, spotify_id, access_token, refresh_token, photos) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
		[username, spotify_id, access_token, refresh_token, photos]
	);
	return res.rows[0]
}

//TODO: Padronizar
export const findUserbyId = async (spotify_id: string): Promise<User> => {
	const res: QueryResult<User> = await pool.query(
		'SELECT * FROM users WHERE spotify_id = $1;',
		[spotify_id]
	);
	return res.rows[0]
}

//TODO: Padronizar
export const returnSpotifyToken = async (spotify_id: string): Promise<string | null> => {
	const res: QueryResult = await pool.query(
		'SELECT access_token FROM users WHERE spotify_id = $1;',
		[spotify_id]
	);
	if (res.rows.length > 0) {
		return res.rows[0].access_token;
	}
	return null;
}

export const getRefreshTokenSpotify = async (spotify_id: string): Promise<string | null> => {
  const r: QueryResult = await pool.query(
    'SELECT refresh_token FROM users WHERE spotify_id = $1;',
    [spotify_id]
  );
  return r.rows[0].refresh_token;
}

export const updateAccessTokenSpotify = async (
  spotify_id: string, 
  access_token: string, 
  refresh_token: string | null
): Promise<boolean> => {
  try {
    const query = `UPDATE users SET access_token = $1 WHERE spotify_id = $2;`;
    const r: QueryResult = await pool.query(query, [access_token, spotify_id])
    console.log(r)
    return true
  } catch {
    return false
  }
}
