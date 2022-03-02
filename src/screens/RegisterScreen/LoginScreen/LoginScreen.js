import axios from "axios"
import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import MainScreen from "../../components/MainScreen/MainScreen"
import "./LoginScreen.css"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          "Content-type": "aplication/json",
        },
      }
      setLoading(true)
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      )
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <MainScreen title="Login Page">
      <div className="loginContainer">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Row>
          <Col>
            New Customer ?<Link to="/register">Register</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default LoginScreen
