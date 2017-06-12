import Layout from '../components/layout'
import {Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button} from 'react-bootstrap'
import Authentication from '../services/auth'
import Router from 'next/router'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount() {
    if(!this.props.serverMode) {
      let auth = new Authentication()
      console.log(auth.isLoggedIn())
      if(auth.isLoggedIn()) {
        Router.replace("/app")
      }
    }
  }
  async handleChange() {
    let auth = new Authentication()
    let data = await auth.loginAndSave(this.email.value, this.password.value)
    Router.replace("/app")
  }
  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" inputRef={ref => {this.email = ref; }} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" inputRef={ref => {this.password = ref; }}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.handleChange}>
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default class IndexPage extends React.Component {
  static getInitialProps({req}) {
    if(req) {
      return {serverMode: true}
    }
  }
  render() {
    return (
      <Layout>
        <Grid>
          <Row>
            <Col md={6} mdOffset={3}>
              <h1 className="centered">Login to DealGrok</h1>
              <LoginForm serverMode={this.props.serverMode}/>
            </Col>
          </Row>
        </Grid>
        <style jsx>{`
      .centered { text-align: center; }
    `}
  </style>
</Layout>
    )
  }
}
