import { gql, useQuery } from '@apollo/client';

import Counter from '../plugins/counter/Counter';
import { plugins } from '../plugins/grid';
import './App.scss';


const MISSIONS_QUERY = gql`
  query GetLocation($locationId: ID! = "loc-1") {
    location(id: $locationId) {
      id
      name
      description
      photo
    }
  }
`;

function Locations(): JSX.Element {
  let { loading, error, data } = useQuery(MISSIONS_QUERY, {
    variables: {
      'locationId': 'loc-1'
    },
    notifyOnNetworkStatusChange: true
  });

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error.message}</p>; }

  return <>
    {[data.location].map(({ id, name, description, photo }) => (
        <div key={id}>
          <h3>{name}</h3>
          <img width="400" height="250" alt="location-reference" src={`${photo}`}/>
          <br/>
          <b>About this location:</b>
          <p>{description}</p>
          <br/>
        </div>
    ))}
  </>;
}

export default function App() {
  return (
      <div className={'App'}>
        <Locations/>
        <Counter/>
        <plugins.grid.View/>
      </div>
  );
}
