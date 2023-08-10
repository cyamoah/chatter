import axios from 'axios';

const base = axios.create({
	// baseURL: 'localhost:3000',
	headers: {
		'Content-Type': 'application/json',
		'Accept-Language': 'en-US,en;q=0.9',
	},
});

export default base;
