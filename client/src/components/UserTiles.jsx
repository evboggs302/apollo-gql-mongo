import { useQuery, gql } from "@apollo/client";

const allUsers = gql`
  query Query {
    allUsers {
      _id
      name
      email
    }
  }
`;

const UserTiles = () => {
  const { loading, error, data } = useQuery(allUsers);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(data);
    return <p>Error :(</p>;
  }

  return data.allUsers.map(({ _id, name, email }) => (
    <div key={_id}>
      <p>
        <strong>{name}</strong>: {email}
      </p>
    </div>
  ));
};

export default UserTiles;
