import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem("loggedIn");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => user.email === loggedInUserEmail);

    if (foundUser) {
      if (!foundUser.sentRequests) {
        foundUser.sentRequests = [];
      }
      setCurrentUser(foundUser);
    }
  }, []);

  // send frnd req function
  const sendFriendRequest = (userEmail) => {
    if (!userEmail) {
      alert("Please select a user.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const selectedUserObj = users.find((user) => user.email === userEmail);

    if (!selectedUserObj) {
      console.error("Selected user not found.");
      return;
    }

    if (!selectedUserObj.pendingFriendRequests) {
      selectedUserObj.pendingFriendRequests = [];
    }

    if (
      !selectedUserObj.pendingFriendRequests.includes(currentUser.email) &&
      !currentUser.friends.includes(userEmail)
    ) {
      selectedUserObj.pendingFriendRequests.push(currentUser.email);
      localStorage.setItem("users", JSON.stringify(users));
      setSelectedUser("");
      //toast after sending request
      toast.success("Friend request sent to " + selectedUserObj.name, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (currentUser.friends.includes(userEmail)) {
      alert("You are already friends with this user.");
    } else {
      alert("Friend request already sent.");
    }
  };

  // accept req 
  const acceptFriendRequest = (senderEmail) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserObj = users.find(
      (user) => user.email === currentUser.email
    );
    const senderUserIndex = users.findIndex(
      (user) => user.email === senderEmail
    );

    if (senderUserIndex !== -1) {
      users[senderUserIndex].pendingFriendRequests = users[
        senderUserIndex
      ].pendingFriendRequests.filter((email) => email !== currentUser.email);
      users[senderUserIndex].friends.push(currentUser.email);
      currentUserObj.pendingFriendRequests =
        currentUserObj.pendingFriendRequests.filter(
          (email) => email !== senderEmail
        );
      currentUserObj.friends.push(senderEmail);
      localStorage.setItem("users", JSON.stringify(users));
      setCurrentUser(currentUserObj);
    } else {
      console.error("Sender user object not found.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div>
      <h2 className="text-center my-3">Home</h2>
      <h3 className="text-center mb-3">Welcome {currentUser.name}</h3>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="shadow rounded">
            <Card.Body>
              <h3 className="mb-3">Pending Friend Requests:</h3>
              <ul>
                {currentUser.pendingFriendRequests.map((requestEmail) => (
                  <li key={requestEmail}>
                    {requestEmail}
                    <Button
                      variant="success"
                      className="ms-2"
                      onClick={() => acceptFriendRequest(requestEmail)}
                    >
                      Accept
                    </Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow rounded">
            <Card.Body>
              <h3 className="mb-3">Registered Users on SocialBook:</h3>
              <ul>
                {users
                  .filter((user) => user.email !== currentUser.email)
                  .map((user) => (
                    <li className="mb-3" key={user.email}>
                      {user.name}
                      {currentUser.friends.includes(user.email) ? (
                        <Button
                          variant="info"
                          className="ms-2"
                          onClick={() => {}}
                        >
                          Friends
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          className="ms-2"
                          onClick={() => sendFriendRequest(user.email)}
                        >
                          Send Friend Request
                        </Button>
                      )}
                    </li>
                  ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow rounded">
            <Card.Body>
              <h3 className="mb-3">Friends:</h3>
              <ul>
                {currentUser.friends.map((friendEmail) => {
                  const friend = users.find(
                    (user) => user.email === friendEmail
                  );
                  return (
                    <li key={friendEmail}>
                      {friend && `${friend.name} (${friend.email})`}
                    </li>
                  );
                })}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center mt-3">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
