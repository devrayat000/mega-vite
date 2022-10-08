import { useQuery } from "urql";

import urqlClient from "~/modules/urql-client";
import type {
  AllFilmsQuery,
  AllFilmsQueryVariables,
} from "~/types/graphql.generated";

const gql = String.raw;

export const FILMS_QUERY = gql`
  query AllFilms {
    allFilms {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          id
          title
          releaseDate
        }
      }
    }
  }
`;

export async function loader() {
  await urqlClient.query(FILMS_QUERY, {}).toPromise();
  return null;
}

function FilmsPage() {
  const [{ data, fetching }] = useQuery<AllFilmsQuery, AllFilmsQueryVariables>({
    query: FILMS_QUERY,
    context: { suspense: true },
  });

  return (
    <div>
      <h1>Films Page</h1>
      <ul>
        {data?.allFilms?.edges?.map((edge) => (
          <li key={edge?.node?.id}>{edge?.node?.title}</li>
        ))}
      </ul>
      {fetching && <div>Loading...</div>}
    </div>
  );
}

export default FilmsPage;
