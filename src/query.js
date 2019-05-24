export const query = `
query($first: Int!, $after: String, $query: String!, $type: SearchType!)
{
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
  search(first: $first, after: $after, query: $query, type: $type) {
    edges {
      node {
        ... on Repository {
          name
          url
          homepageUrl
          resourcePath
          description
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          updatedAt
        }
      }
    }
    pageInfo {
      startCursor
      hasNextPage
      endCursor
    }
  }
}
`;
export const variables = {
  first: 15,
  after: null,
  query: "javascript",
  type: "REPOSITORY"
};
