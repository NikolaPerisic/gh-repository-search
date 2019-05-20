export const query = `
{
  search(query: "javascript", type: REPOSITORY, first: 10) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          url
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
  }
}
`;
