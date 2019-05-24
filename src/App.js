import React from "react";
import "./App.css";
import axios from "axios";
import List from "./List";
import { query } from "./query";
import { variables } from "./query";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faCodeBranch, faStar);

class App extends React.Component {
  state = {
    query: query,
    variables: variables,
    error: null,
    isLoaded: false,
    queryString: "javascript",
    items: [],
    pageInfo: {}
  };
  componentDidMount() {
    this.getRepos(this.state.query, this.state.variables);
    window.addEventListener("scroll", this.onScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }
  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      this.state.items.length &&
      this.state.isLoaded
    ) {
      this.addContent();
    }
  };
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
      let newItems = [...this.state.items].concat(
        response.data.data.search.edges
      );
      this.setState(() => ({
        isLoaded: true,
        items: newItems,
        pageInfo: response.data.data.search.pageInfo
      }));
    } catch (error) {
      this.setState(() => ({ error }));
    }
  };
  handleInputChange = e => {
    this.setState({ queryString: e.target.value });
  };
  handleSearch = e => {
    e.preventDefault();
    let newVariables = this.state.variables;
    newVariables.query = this.state.queryString;
    this.setState({ variables: newVariables, isLoaded: false, items: [] });
    this.getRepos(this.state.query, this.state.variables);
  };
  addContent = () => {
    let newVariables = this.state.variables;
    newVariables.after = this.state.pageInfo.endCursor;
    this.setState({ isLoaded: false });
    this.getRepos(this.state.query, newVariables);
  };
  render() {
    const inputValue = this.state.queryString;
    const { error, isLoaded, items } = this.state;
    let errorMessage = null,
      loading = null;
    if (error) errorMessage = <div>{error.message}</div>;
    if (!isLoaded) loading = <div className="loading-text">Loading...</div>;

    return (
      <div className="App">
        <div className="wrapper">
          <div className="label">Github repository search</div>
          <p className="label-caption">Scrolling just got more fun</p>
          <div>
            <form className="search" onSubmit={this.handleSearch}>
              <label htmlFor="search" />
              <input
                type="text"
                name="search"
                value={inputValue}
                placeholder="search..."
                onChange={this.handleInputChange}
              />
              <button type="submit">Search</button>
            </form>
          </div>

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
                  homepageUrl={item.node.homepageUrl}
                />
              );
            })}
          </div>
          <div
            className="loader"
            style={
              this.state.isLoaded ? { display: "none" } : { display: "unset" }
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
