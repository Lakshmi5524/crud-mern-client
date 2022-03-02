import React from "react"
import { Container, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <h1 className="title">Welcome to Note Books</h1>
            <p className="subtitle">One safe place all your notes</p>

            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  logIn
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  SignUp
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
