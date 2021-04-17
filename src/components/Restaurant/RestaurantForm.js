import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createRestaurant } from '../../graphql/mutations';

export const RestaurantForm = ({
	restaurant,
	setRestaurant,
	restaurants,
	setRestaurants,
}) => {
	const onChange = e => {
		setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
	};

	const create = async () => {
		setRestaurants([...restaurants, restaurant]);
		await API.graphql(
			graphqlOperation(createRestaurant, { input: restaurant })
		).then(setRestaurant({ name: '', description: '' }));
	};
	return (
		<>
			<div style={styles.inputContainer}>
				<input
					name='name'
					placeholder='restaurant name'
					onChange={onChange}
					value={restaurant.name}
					style={styles.input}
				/>
				<input
					name='description'
					placeholder='restaurant description'
					onChange={onChange}
					value={restaurant.description}
					style={styles.input}
				/>
			</div>
			<button style={styles.button} onClick={create}>
				Create Restaurant
			</button>
		</>
	);
};
const styles = {
	inputContainer: {
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
		width: 300,
	},
	button: {
		border: 'none',
		backgroundColor: '#ddd',
		padding: '10px 30px',
	},
	input: {
		fontSize: 18,
		border: 'none',
		margin: 10,
		height: 35,
		backgroundColor: '#ddd',
		padding: 8,
	},
};
