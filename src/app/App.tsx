import { gql, useQuery } from '@apollo/client';

import Counter from '../plugins/counter/Counter';
import { plugins } from '../plugins/grid';
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

/**
 * Example to show how to work with a GraphQL queries.
 * @returns {JSX.Element|JSX.Element[]}
 * @constructor
 */
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
        <plugins.grid.View/>

        <div
            style={{
              width: "100%",
              height: "600px"
            }}
        >
          <div
              style={{
                display: "inline-block",
                width: "50%",
                height: "100%",
                paddingRight: "12px",
                boxSizing: "border-box"
              }}
          >
            <plugins.grid.ExcelLikeView/>
          </div>
          <div
              style={{
                display: "inline-block",
                width: "50%",
                height: "100%",
                paddingLeft: "12px",
                boxSizing: "border-box"
              }}
          >
            <plugins.grid.ExcelLikeView/>
          </div>
        </div>
      </div>
  );
}
