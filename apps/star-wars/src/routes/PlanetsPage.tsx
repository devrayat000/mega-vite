import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { gql, useQuery } from "urql";

import urqlClient from "~/modules/urql-client";
import type {
  AllPlanetsQuery,
  AllPlanetsQueryVariables,
} from "~/types/graphql.generated";

export const PLANETS_QUERY = gql`
  query AllPlanets($after: String, $first: Int) {
    allPlanets(after: $after, first: $first) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
          gravity
        }
        cursor
      }
    }
  }
`;

const PLANETS_LIMIT = 12;

export async function loader() {
  await urqlClient
    .query<AllPlanetsQuery, AllPlanetsQueryVariables>(PLANETS_QUERY, {
      first: PLANETS_LIMIT,
    })
    .toPromise();
  return null;
}

type PlanetsProps = {
  limit?: number;
};
export const Planets = ({ limit }: PlanetsProps) => {
  const [cursor, setCursor] = useState<string | null | undefined>(null);
  const [{ data, fetching, error }] = useQuery<
    AllPlanetsQuery,
    AllPlanetsQueryVariables
  >({
    query: PLANETS_QUERY,
    variables: {
      first: limit ?? PLANETS_LIMIT,
      ...(cursor ? { after: cursor } : {}),
    },
  });

  const [sentry] = useInfiniteScroll({
    hasNextPage: !!data?.allPlanets?.pageInfo.hasNextPage,
    loading: fetching,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
    onLoadMore: () => {
      setCursor(data?.allPlanets?.pageInfo.endCursor);
    },
  });

  return (
    <section>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.allPlanets?.edges?.map((edge) => (
          <li
            key={edge?.node?.id}
            className="p-5 rounded-md border border-gray-300 h-80 grid place-items-center"
          >
            {edge?.node?.name}
          </li>
        ))}
      </ul>
      {data?.allPlanets?.pageInfo.hasNextPage && (
        <div ref={sentry}>Loading...</div>
      )}
    </section>
  );
};

const PlanetsPage = () => {
  return (
    <div>
      <h1>Planets Page</h1>
      <Planets />
    </div>
  );
};

export default PlanetsPage;
