import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage"
import Loading from "../../components/Loading"
import MainScreen from "../../components/MainScreen/MainScreen"
import "./LoginScreen.css"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../actions/userActions.js"

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes")
    }
  }, [history, userInfo])

  return (
    <MainScreen title="Login Page">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
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
