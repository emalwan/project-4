import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';

export default function Signin(props) {
  const [newUser, setNewUser] = useState({});
//   const history = useHistory();

  const changeHandler = (e) => {
    const user = { ...newUser };
    user[e.target.name] = e.target.value;
    console.log(user);
    setNewUser(user);
  };

  const loginHandler = () => {
    props.login(newUser);
    // history.push('/home'); // Redirect to home page
  };

  return (
    <div>
      <h1>Signin</h1>
      <Container>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control name="emailAddress" onChange={changeHandler}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" onChange={changeHandler}></Form.Control>
        </Form.Group>

        <Button onClick={loginHandler} variant="primary">
          Login
        </Button>
      </Container>
    </div>
  );
}
