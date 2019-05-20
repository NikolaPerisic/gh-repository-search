import React from "react";
import "./App.css";
import axios from "axios";
import List from "./List";
import { query } from "./query";

class App extends React.Component {
  state = {
    query: query,
    variables: {},
    error: null,
    isLoaded: false,
    queryString: "javascript",
    items: []
  };
  componentDidMount() {
    this.getRepos(this.state.query, this.state.variables);
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
      this.setState(() => ({
        isLoaded: true,
        items: response.data.data.search.edges
      }));
    } catch (error) {
      this.setState(() => ({ error }));
    }
  };
  handleInputChange = e => {
    this.setState({ queryString: e.target.value });
    e.preventDefault();
  };
  handleSearch = () => {
    const newQueryTemplate = this.handleNewQuery(this.state.queryString);
    this.setState({ isLoaded: false });
    this.getRepos(newQueryTemplate, this.state.variables);
  };
  handleNewQuery = newQuery => `
  {
    search(query: "${newQuery}", type: REPOSITORY, first: 10) {
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

  render() {
    const inputValue = this.state.queryString;
    const { error, isLoaded, items } = this.state;
    let errorMessage = null,
      loading = null;
    if (error) errorMessage = <div>{error.message}</div>;
    if (!isLoaded) loading = <div>Loading...</div>;

    return (
      <div className="App">
        <div className="wrapper">
          <div className="label">Github repository search</div>
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              value={inputValue}
              placeholder="search..."
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit" onClick={this.handleSearch}>
            Search
          </button>
          <div className="results">
            {error ? errorMessage : loading}
            {items.map((item, key) => {
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
