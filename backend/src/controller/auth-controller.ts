import * as UserDB from "../db/user"

export const loginOrCreate = async (username: string, spotify_id: string, access_token: string, refresh_token: string, photos: string[]) => {
	const u = await UserDB.findUserbyId(spotify_id);
	if (u) {
		console.log("já existe")
	} else {
		UserDB.createUser(username, spotify_id, access_token, refresh_token, photos)
	}
}
