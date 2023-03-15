import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Modal, Box, TextField } from "@mui/material";
import { Colors } from "./components/colors";
import MapContainer from "./components/map";
import sambosaIcon from "../static/images/sambosa_icon.png";

class Index extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {
      sambosaCount: [],
      orderMode: false,
      orderModalOpen: false,
      trackModalOpen: false,
      orderID: "",
      address: "",
      zip: "",
      phone: "",
      instructions: "",
      sambosaRequest: 1,
      deliveryDetails: {},
      GOOGLE_API_KEY: ""
    };
    // Bind functions
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
    this.handleTrackSubmit = this.handleTrackSubmit.bind(this)
    this.handleIdChange = this.handleIdChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleInstructionsChange = this.handleInstructionsChange.bind(this)
    this.handleSambosaRequestChange = this.handleSambosaRequestChange.bind(this)
    this.orderOpenModal = this.orderOpenModal.bind(this);
    this.orderCloseModal = this.orderCloseModal.bind(this);
    this.trackOpenModal = this.trackOpenModal.bind(this);
    this.trackCloseModal = this.trackCloseModal.bind(this);
  }

  // Process when the webpage is called
  componentDidMount() {
    // This line automatically assigns sambosa count to the const sambosaCount
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
      // Handle websocket
  }

  // Handle sambosa order submit request
  handleOrderSubmit = () => {
    fetch(
        `/api/v1/order/?request=${this.state.sambosaRequest}&address=${this.state.address}&zip=${this.state.zip}&phone=${this.state.phone}&instructions=${this.state.instructions}`,
        { credentials: "same-origin", method: "POST" }
      )
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          deliveryDetails: data,
          orderMode: true,
          orderID: data.external_delivery_id,
          sambosaCount: this.state.sambosaCount - this.state.sambosaRequest
        });
      })
      .catch((error) => console.log(error));
      console.log('hi');
      // Fetch API every 5 seconds
      setInterval(() => {
        fetch(
          `/api/v1/order/?ID=${this.state.orderID}`,
          { credentials: "same-origin", method: "GET" }
        )
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          this.setState({
            deliveryDetails: data,
            orderMode: true,
            GOOGLE_API_KEY: data.map_api_key
          });
        })
        .catch((error) => console.log(error));
      }, 5000); // 5 seconds
      console.log('hi');
  }

  // Handle sambosa order track request
  handleTrackSubmit = () => {
      // Fetch API every 5 seconds
      setInterval(() => {
        fetch(
          `/api/v1/order/?ID=${this.state.orderID}`,
          { credentials: "same-origin", method: "GET" }
        )
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          this.setState({
            deliveryDetails: data,
            orderMode: true,
            GOOGLE_API_KEY: data.map_api_key
          });
        })
        .catch((error) => console.log(error));
      }, 5000); // 5 seconds
  }

  // Handle order id change
  handleIdChange = (event) => {
    this.setState({ orderID: event.target.value });
  }

  // Handle address change
  handleAddressChange = (event) => {
    this.setState({ address: event.target.value });
  }

  // Handle zip change
  handleZipChange = (event) => {
    this.setState({ zip: event.target.value });
  }

  // Handle phone change
  handlePhoneChange = (event) => {
    this.setState({ phone: event.target.value });
  }

  // Handle insturctions change
  handleInstructionsChange = (event) => {
    this.setState({ instructions: event.target.value });
  }

  // Handle sambosa request change
  handleSambosaRequestChange = (event) => {
    let { value, max } = event.target;
    // Set the max of what the user can request
    let userRequest = Math.min(Number(max), Number(value));
    // Set points request
    this.setState({ sambosaRequest: userRequest });
  }

  // Sets modal opened to true
  orderOpenModal() {
    this.setState({ orderModalOpen: true });
  }

  // Sets modal opened to false
  orderCloseModal() {
    this.setState({ orderModalOpen: false });
  }

  // Sets modal opened to true
  trackOpenModal() {
    this.setState({ trackModalOpen: true });
  }

  // Sets modal opened to false
  trackCloseModal() {
    this.setState({ trackModalOpen: false });
  }


  render() {
    // This line automatically assigns this.state to their respective consts
    const { 
      sambosaCount,
      orderMode,
      orderModalOpen,
      trackModalOpen,
      orderID,
      address,
      zip,
      phone,
      instuctions,
      sambosaRequest,
      deliveryDetails,
      GOOGLE_API_KEY
    } = this.state;
    // Render index
    return (
      <>
        {orderMode ? 
          (
            <Col>
              <div style={{ width: '720px', height: '360px', marginTop: '12vh' }}>
                <MapContainer
                  google={this.props.google}
                />
              </div>
              <h1>Order ID: {deliveryDetails['external_delivery_id']}</h1>
              <SaveIdSpan>Save this ID to able to track the order later!</SaveIdSpan>
              <h1>Order Status: {deliveryDetails['delivery_status'].replace(/_/g, " ")}</h1>
              <h1>Order Amount: {deliveryDetails['order_value']}</h1>
            </Col>
          ) 
          : 
          (
            <>
              <Col>
                <Header>
                  <SambosaImg src={sambosaIcon} />
                  <span>Ghaith's <SambosaColor>Sambosa</SambosaColor> Delivery</span>
                </Header>
                <SambosaSpan>{sambosaCount} Sambosas left!</SambosaSpan>
                <OrderSpan>Order</OrderSpan>
                <ServiceRow>
                  <ServiceButton onClick={this.orderOpenModal}>New</ServiceButton>
                  <ServiceButton onClick={this.trackOpenModal}>Track</ServiceButton>
                </ServiceRow>
              </Col>
              <Modal
                open={orderModalOpen}
                onClose={this.orderCloseModal}
              >
                <ModalBox>
                  <Col>
                    <OrderSpan>Create a New Order</OrderSpan>
                    <InputText
                      id="filled-number"
                      label="Number of Sambosas"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      value={Number(sambosaRequest).toString()}
                      onChange={this.handleSambosaRequestChange}
                      InputProps={{ inputProps: { min: 1, max: sambosaCount } }}
                    />
                    <InputText
                      required
                      id="filled-required"
                      label="Address"
                      variant="filled"
                      value={address}
                      onChange={this.handleAddressChange}
                    />
                    <InputText
                      required
                      id="filled-required"
                      label="Zip Code"
                      variant="filled"
                      value={zip}
                      onChange={this.handleZipChange}
                    />
                    <InputText
                      required
                      id="filled-required"
                      label="Phone Number"
                      variant="filled"
                      value={phone}
                      onChange={this.handlePhoneChange}
                    />
                    <InputText
                      id="filled-basic"
                      label="Delivery Instructions"
                      variant="filled"
                      value={instuctions}
                      onChange={this.handleInstructionsChange}
                    />
                    <SubmitButton 
                      onClick={() => {this.orderCloseModal(); this.handleOrderSubmit();}}
                    >
                      Submit
                    </SubmitButton>
                  </Col>
                </ModalBox>
              </Modal>
              <Modal
                open={trackModalOpen}
                onClose={this.trackCloseModal}
              >
                <ModalBox>
                  <Col>
                    <OrderSpan>Track an Order</OrderSpan>
                    <InputText
                      required
                      id="filled-required"
                      label="Order ID"
                      variant="filled"
                      value={orderID}
                      onChange={this.handleIdChange}
                    />
                    <SubmitButton 
                      onClick={() => {this.orderCloseModal(); this.handleTrackSubmit();}}
                    >
                      Submit
                    </SubmitButton>
                  </Col>
                </ModalBox>
              </Modal>
            </>
          )
        }
      </>
    )  
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
  align-items: center;
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

// Styled span to tell to track order
const SaveIdSpan = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${Colors.brightRed};
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

// Create submit button
const SubmitButton = styled(ServiceButton)(() => ({
  marginTop: '24px',
  marginBottom: '24px',
}));

// Create a styled box for the modal
const ModalBox = styled(Box)(() => ({
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: Colors.paper,
  border: '1px solid #000',
  boxShadow: 24,
  outline: 'none'
}));

// Create a styled input text field
const InputText = styled(TextField)(() => ({
  width: '80%',
  marginTop: '8px',
}));
