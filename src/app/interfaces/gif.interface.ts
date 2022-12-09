/**  GIFs trending request */
export interface gifTrendingRequest {
	api_key: string,
	limit?: number,
	offset?: number,
	rating?: string,
	random_id?: number,
	bundle?: string
}

/**  GIFs search request */
export interface gifSearchRequest {
	api_key: string,
	q?: string,
	limit?: number,
	offset?: number,
	rating?: string,
	random_id?: number,
	bundle?: string,
	lang?: string
}

/**  GIFs image response */
export interface gifImage {
	height: number,
	size: number,
	url: string,
	width: number
}

/**  GIFs user response */
export interface gifUser {
	avatar_url?: string,
	description?: string,
	website_url?: string,
	display_name?: string,
	username?: string
}

/**  GIFs response */
export interface gifResponse {
	id: string,
	images: {
		downsized: gifImage,
	},
	title: string,
	rating: string,
	type: string,
	user: gifUser,
	username: string,
	rowSpan: string,
}