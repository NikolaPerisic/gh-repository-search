import React from "react";
import "./App.css";
import axios from "axios";
import List from "./List";

require("dotenv").config();
class App extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
  };
  componentDidMount() {
    const query = `
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
    const variables = {};
    this.getRepos(query, variables);
  }
  getRepos = async (query, variables) => {
    try {
      const response = await axios.post(
        "https://api.github.com/graphql",
        {
          query,
          variables
        },
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_TOKEN}`
          }
        }
      );
      console.log(response.data.data.search.edges);

      this.setState(() => ({
        isLoaded: true,
        items: response.data.data.search.edges
      }));
    } catch (error) {
      this.setState(() => ({ error }));
    }
  };
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <div className="label">Github repository search</div>
          <label htmlFor="search">
            <input type="text" name="search" placeholder="search..." />
          </label>
          <div className="results">
            {this.state.items.map((item, key) => {
              return (
                <List
                  key={key}
                  description={item.node.description}
                  url={item.node.url}
                  name={item.node.resourcePath}
                  stars={item.node.stargazers.totalCount}
                  forks={item.node.forks.totalCount}
                  updatedAt={item.node.updatedAt}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
