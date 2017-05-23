import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
  Switch
} from 'react-router-dom'

import pastries from './database/pastries'

import App from './components/App'
import PastryList from './components/PastryList'
import PastryPage from './components/PastryPage'
import NotFound from './components/NotFound'
import Basket from './components/Basket'

class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      pastries,
      order: {}
    }
    this.addToOrder = this.addToOrder.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
  }

  addToOrder (e) {
    e.preventDefault()
    const order = Object.assign({}, this.state.order)
    const pastry = e.target.querySelector('input').value
    const exists = Object.keys(order).some(p => p === pastry)
    const pastryList = Object.keys(this.state.pastries).map(key=>this.state.pastries[key])
    const pastryInfo = pastryList.find(p => p.name === pastry)

    if (exists) {
      order[pastry].quantity += 1
      order[pastry].totalPrice = order[pastry].price * order[pastry].quantity
    } else {
      order[pastry] = Object.assign({}, pastryInfo, { quantity: 1}, { totalPrice: pastryInfo.price })
    }

    this.setState({
      order
    })
    console.log(order)
    console.log(this.state.order)
  }

  removeFromOrder (e) {
    e.preventDefault()
    const order = Object.assign({}, this.state.order)
    const pastry = e.target.querySelector('input').value
    const exists = Object.keys(order).some(p => p === pastry)

    if (exists) {
      order[pastry].quantity -= 1
      order[pastry].totalPrice = order[pastry].price * order[pastry].quantity
      if (order[pastry].quantity === 0) {
        delete order[pastry]
      }
    }
    this.setState({
      order
    })
    console.log(exists)
  }

  clearOrder (e) {
    e.preventDefault()
    let order = Object.assign({}, this.state.order)
    order = {}
    this.setState({
      order
    })
  }

  render () {
    return (
      <Router history={hashHistory}>
        <App>
          <Switch>
            <Route exact path='/' render={props => (
              <PastryList pastries={this.state.pastries} />
            )} />
            <Route exact path='/basket' render={props => (
              <Basket
                order={this.state.order}
                clearOrder={this.clearOrder}
                removeFromOrder={this.removeFromOrder}
                addToOrder={this.addToOrder}
              />
            )}/>
            <Route path='/:pastry' render={props => {
              const pastryName = props.match.params.pastry
              const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
              const pastry = pastries.find(p => p.name === pastryName)
              if (pastry) {
                return (
                  <PastryPage pastry={pastry} addToOrder={this.addToOrder} />
                )
              } else {
                return (
                  <Route path='*' status={404} component={NotFound} />
                )
              }
            }} />
          </Switch>
        </App>
      </Router>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
