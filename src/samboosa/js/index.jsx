import React from "react";
import styled from "@emotion/styled";
import { Colors } from "./components/colors";
import Navbar from "./components/Navbar";

class Index extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {
      users: [],
    };
  }

  // Process when the webpage is called
  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    fetch("/api/v1/users/", { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          users: data.users,
        });
      })
      .catch((error) => console.log(error));
  }

  // To display a user points
  userPoints(user) {
    return [
      <UserRow key={user[0]} className="user">
        <UserInfo>
          <UserImg src={user[4]} />
          <Username>{user[0]}</Username>
        </UserInfo>
        <Points>{user[1]}</Points>
      </UserRow>,
    ];
  }

  render() {
    // This line automatically assigns this.state.imgUrl to the const variable imgUrl
    // and this.state.owner to the const variable owner
    const { users } = this.state;
    // Render index
    return (
      <>
        <Navbar buttonLink="/battle/" buttonText="Battle!" />
        <Leaderboard>
          <Header>Leaderboard</Header>
          <UserInfoRow>
            <UsernameInfo>Username</UsernameInfo>
            <PointsInfo>Points</PointsInfo>
          </UserInfoRow>
          {users.map((user) => this.userPoints(user))}
        </Leaderboard>
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

// Create leaderboard by styling a FlexCol
const Leaderboard = styled(FlexCol)`
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

// Create a header span
const Header = styled.span`
  font-family: "Orbitron", sans-serif;
  font-size: 8vw;
  color: ${Colors.lightGray};
`;

// Create a User Row
const UserRow = styled(FlexRow)`
  font-family: "Orbitron", sans-serif;
  font-size: 5vw;
  width: 80%;
  justify-content: space-between;
  margin-top: 32px;
`;

// Create a info Row
const UserInfoRow = styled(FlexRow)`
  font-family: "Orbitron", sans-serif;
  border-radius: 25px;
  padding: 12px;
  width: 80%;
  margin-top: 24px;
  justify-content: space-between;
  align-items: center;
  font-size: 5vw;
  background: linear-gradient(${Colors.darkPurple}, ${Colors.brightPurple});
`;

// Create a points info span
const PointsInfo = styled.span`
  text-align: center;
  color: ${Colors.white};
  margin-right: 16px;
  width: 25%;
  font-size: 5vw;
  white-space: nowrap;
`;

// Create a points span
const Points = styled.span`
  text-align: center;
  color: ${Colors.white};
  margin-top: 32px;
  margin-right: 16px;
  width: 25%;
  font-size: 6vw;
  white-space: nowrap;
`;

// Create a User info row
const UserInfo = styled(FlexRow)`
  font-size: 5vw;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 32px;
  color: ${Colors.white};
`;

// Create a Username span
const Username = styled.span`
  color: ${Colors.white};
`;

// Create a Username info span
const UsernameInfo = styled.span`
  margin-left: 20px;
  color: ${Colors.white};
`;

// Create a User image
const UserImg = styled.img`
  border-radius: 25px;
  width: 120px;
  height: 120px;
`;
