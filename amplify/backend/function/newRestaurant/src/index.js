const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createRestaurant = gql`
	mutation CreateRestaurant(
		$input: CreateRestaurantInput!
		$condition: ModelRestaurantConditionInput
	) {
		createRestaurant(input: $input, condition: $condition) {
			id
			name
			description
			_version
			_deleted
			_lastChangedAt
			createdAt
			updatedAt
		}
	}
`;

exports.handler = async event => {
	try {
		const url =
			'https://foodbukka.herokuapp.com/api/v1/restaurant/5f5eccf3e923d0aca3e7d41c';
		let response = await axios.get(url);

		const graphqlData = await axios({
			url: process.env.API_URL,
			method: 'post',
			headers: {
				'x-api-key': process.env.API_KEY,
			},
			data: {
				query: print(createRestaurant),
				variables: {
					input: {
						name: response.data.data.businessname,
						description: response.data.data.restauranttype,
					},
				},
			},
		});
		const body = {
			message: 'successfully created new restaurant!',
		};
		return {
			statusCode: 200,
			body: JSON.stringify(body),
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		};
	} catch (err) {
		console.log('error creating todo: ', err);
	}
};
