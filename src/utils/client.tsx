import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const mainToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NhY2RkOTA2MjZmMzY0MGY3NmMzZDIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODEyNTU4MTl9.ldhyc-NFGl1hR1DHiAou894bmVy9DMKasmBT4INnjRc";
const httpLink = createHttpLink({
  uri: "https://dev.catalyticworks.com/graphql",
});

const authLink = setContext(() => {
  return {
    headers: {
      Authorization: "Bearer " + mainToken,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
