import React from 'react'
import PropTypes from 'prop-types'


function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}


class Basket extends React.Component {
  static propTypes = {
     order : PropTypes.object,
     clearOrder : PropTypes.func,
     checkOut : PropTypes.func,
     removeFromOrder : PropTypes.func
  };

  render () {
    const basket = Object.assign({}, this.props.order)
      console.log('basket')
      console.log(basket)
      console.log(Object.keys(basket))
    return (
<div> yay
<table>
<tbody>
<tr>
<th>Type</th>
<th colSpan="2">Quantity</th>
<th>Price</th>
<th>Total</th>
</tr>
{Object.keys(basket).map(pastry => {
 return (
   <tr>
   <td>{basket[pastry].name}</td> 
   <td>{basket[pastry].quantity}</td>
   <td>
   <form action="/basket" method='POST' onSubmit={this.props.addToOrder}>
   <button onClick='submit'>+</button>
   <input type='hidden' value={basket[pastry].name} ref={(input) => { this.pastryName = input }} />
   </form>
   <form action="" method='POST' onSubmit={this.props.removeFromOrder}>
   <input type='hidden' value={basket[pastry].name} ref={(input) => { this.pastryName = input }} />
   <button onClick='submit'>-</button>
   </form>
   </td>
   <td>{formatPrice(basket[pastry].price)}</td>
   <td>{formatPrice(basket[pastry].totalPrice)}</td>
   </tr>



   );
 })
}
</tbody>
</table>
  </div>



      )
    }
}

export default Basket
