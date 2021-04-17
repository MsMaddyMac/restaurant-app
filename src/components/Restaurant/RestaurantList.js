import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRestaurants } from '../../graphql/queries';
import RestaurantCard from './RestaurantCard'

const RestaurantList = () => {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		if (restaurants.length <= 0) {
			API.graphql(graphqlOperation(listRestaurants)).then(res =>
				setRestaurants(res.data.listRestaurants.items)
			);
		}
	});
	console.log(restaurants);
	return (
    <div className="Restaurant List">
     <h1>Restaurants</h1>
      {restaurants.map((restaurant, id) => (
        <RestaurantCard key={id} restaurant={restaurant}/>
      ))}
    </div>
  )
};

export default RestaurantList;
