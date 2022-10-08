import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { retryExchange } from "@urql/exchange-retry";
import type { RetryExchangeOptions } from "@urql/exchange-retry/dist/types/retryExchange";
import { createClient, dedupExchange, fetchExchange } from "urql";

export const cache = cacheExchange({
  resolvers: {
    Query: {
      allPlanets: relayPagination(),
    },
  },
});

const retryOptions: RetryExchangeOptions = {
  initialDelayMs: 1000,
  maxDelayMs: 15000,
  randomDelay: true,
  maxNumberAttempts: Infinity,
  retryIf: (err) => !!(err && err.networkError),
};

const devtools = import.meta.env.DEV ? [devtoolsExchange] : [];

export default createClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  exchanges: [
    ...devtools,
    dedupExchange,
    cache,
    retryExchange(retryOptions),
    fetchExchange,
  ],
  // suspense: true,
});
