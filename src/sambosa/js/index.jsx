import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Colors } from "./components/colors";
import sambosaIcon from "../static/images/sambosa_icon.png";

class Index extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {
      sambosaCount: [],
    };
  }

  // Process when the webpage is called
  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    fetch("/api/v1/resources/", { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          sambosaCount: data.sambosa_count,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    // This line automatically assigns this.state.imgUrl to the const variable imgUrl
    // and this.state.owner to the const variable owner
    const { sambosaCount } = this.state;
    // Render index
    return (
      <Col>
        <Header>
          <SambosaImg src={sambosaIcon} />
          <span>Ghaith's <SambosaColor>Sambosa</SambosaColor> Delivery</span>
        </Header>
        <SambosaSpan>{sambosaCount} Sambosas left!</SambosaSpan>
        <OrderSpan>Order</OrderSpan>
        <ServiceRow>
          <ServiceButton>New</ServiceButton>
          <ServiceButton>Track</ServiceButton>
        </ServiceRow>
      </Col>
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

// Create the front page column
const Col = styled(FlexCol)`
  justify-content: center;
  text-align: center;
`

// Create a header for the service
const Header = styled(FlexRow)`
  font-size: 36px;
  font-style: italic;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  margin-top: 24vh;
`

// Create a span styling that will display the sambosa count
const SambosaSpan = styled.span`
  margin-top: 12px;
  font-size: 28px;
  font-weight: 600;
`

// Styling for the sambosa icon
const SambosaImg = styled.img`
  width: 64px;
  height: auto;
`

// A span with the sambosa color
const SambosaColor = styled.span`
  color: ${Colors.fried};
`

// Styled span for the word 'order'
const OrderSpan = styled.span`
  font-size: 36px;
  font-weight: 700;
  margin-top: 16px;
`

// Styled row to display service buttons
const ServiceRow = styled(FlexRow)`
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
`

// Create service button
const ServiceButton = styled(Button)(() => ({
  fontSize: "24px",
  fontFamily: "Orbitron",
  fontWeight: "500",
  width: "160px",
  color: Colors.black,
  backgroundColor: Colors.fried,
  borderRadius: "12px",
  padding: "16px",
  '&:hover': {
    backgroundColor: Colors.darkFried,
    color: Colors.lightFried,
  }
}));