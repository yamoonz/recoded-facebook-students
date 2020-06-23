import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import db from "./firebase";
import firebase from "firebase";
const SignUpPage = () => {
  const [ID_user, setID_user] = React.useState(firebase.auth().currentUser);
  const [ID_profile, setID_profile] = React.useState("");
  const [ID_city, setID_city] = React.useState("");
  const handleClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user;
        setID_user(user);
      })
      .catch(function (error) {
        if (error) {
          alert(JSON.stringify(error));
        }
      });
  };
  const submitButton = async (e) => {
    e.preventDefault();
    await db.collection("profiles").doc(ID_user.uid).set({
      userId: ID_user.uid,
      name: ID_user.displayName,
      profile: ID_profile,
      city: ID_city,
      imageUrl: ID_user.photoURL,
    });
    alert("successfully submitted :D");
  };

  return (
    <div>
      <Form>
        <Form.Group>
          {!ID_user && (
            <div onClick={handleClick}>
              <img src={require("./google-signin.png")} alt=" " />
            </div>
          )}
          {ID_user && <div>You're logged in as {ID_user.email}</div>}
          <Form.Control
            placeholder="Profile"
            onChange={(e) => setID_profile(e.target.value)}
          />
          <Form.Control
            placeholder="City"
            onChange={(e) => setID_city(e.target.value)}
          />
          <Button variant="primary" type="submit" onClick={submitButton}>
            Submit
            </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
export default SignUpPage;