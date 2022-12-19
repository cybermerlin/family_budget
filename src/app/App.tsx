import { gql, useQuery } from '@apollo/client';

import Counter from '../plugins/counter/Counter';
import GridView from '../plugins/grid/View';

import './App.scss';


const MISSIONS_QUERY = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function Locations() {
  let { loading, error, data } = useQuery(MISSIONS_QUERY);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error.message}</p>; }

  return data.locations.map(({ id, name, description, photo }) => (
      <div key={id}>
        <h3>{name}</h3>
        <img width="400" height="250" alt="location-reference" src={`${photo}`}/>
        <br/>
        <b>About this location:</b>
        <p>{description}</p>
        <br/>
      </div>
  ));
}

export default function App() {
  return (
      <div className={'App'}>
        <Locations/>
        <Counter/>
        <GridView/>
      </div>
  );
}
