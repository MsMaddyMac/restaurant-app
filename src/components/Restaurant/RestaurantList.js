import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRestaurants } from '../../graphql/queries';
import RestaurantCard from './RestaurantCard';
import { RestaurantForm } from './RestaurantForm';

const RestaurantList = () => {
	const [restaurants, setRestaurants] = useState([]);
	const [restaurant, setRestaurant] = useState({ name: '', description: '' });

	useEffect(() => {
		if (restaurants.length <= 0) {
			API.graphql(graphqlOperation(listRestaurants)).then(res =>
				setRestaurants(res.data.listRestaurants.items)
			);
		}
	});

	return (
		<div className='Restaurants Page'>
			<h1>Restaurants</h1>
			<RestaurantForm
				restaurant={restaurant}
				setRestaurant={setRestaurant}
				setRestaurants={setRestaurants}
				restaurants={restaurants}
			/>
			<div>
				{restaurants.map((rest, id) => (
					<RestaurantCard key={id} restaurant={rest} />
				))}
			</div>
		</div>
	);
};

export default RestaurantList;
