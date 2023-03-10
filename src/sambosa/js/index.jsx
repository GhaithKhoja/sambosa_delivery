import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Modal, Box, TextField } from "@mui/material";
import { Colors } from "./components/colors";
import sambosaIcon from "../static/images/sambosa_icon.png";

class Index extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {
      sambosaCount: [],
      orderMode: false,
      modalOpen: false,
      address: "",
      zip: "",
      phone: "",
      instructions: "",
      sambosaRequest: 1
    };
    // Bind functions
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleInstructionsChange = this.handleInstructionsChange.bind(this)
    this.handleSambosaRequestChange = this.handleSambosaRequestChange.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
  openModal() {
    this.setState({ modalOpen: true });
  }

  // Sets modal opened to false
  closeModal() {
    this.setState({ modalOpen: false });
  }


  render() {
    // This line automatically assigns this.state to their respective consts
    const { 
      sambosaCount,
      orderMode,
      modalOpen,
      address,
      zip,
      phone,
      instuctions,
      sambosaRequest
    } = this.state;
    // Render index
    return (
      <>
        {orderMode ? 
          (
            <span>hi</span>
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
                  <ServiceButton onClick={this.openModal}>New</ServiceButton>
                  <ServiceButton>Track</ServiceButton>
                </ServiceRow>
              </Col>
              <Modal
                open={modalOpen}
                onClose={this.closeModal}
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
                      onClick={() => {this.closeModal();}}
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
