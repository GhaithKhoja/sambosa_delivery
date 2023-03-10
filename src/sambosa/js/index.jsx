import React from "react";
import styled from "@emotion/styled";
import { Colors } from "./components/colors";

class Index extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {
      urls: [],
    };
  }

  // Process when the webpage is called
  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    fetch("/api/v1/", { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          urls: data.urls,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    // This line automatically assigns this.state.imgUrl to the const variable imgUrl
    // and this.state.owner to the const variable owner
    const { urls } = this.state;
    // Render index
    return (
      <>
        <span>Hello world!</span>
      </>
    );
  }
}
export default Index;

// Create a flex row display div
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

// Create a flex column display div
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
