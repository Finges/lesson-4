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
<div>
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
   <form onSubmit={this.props.addToOrder}>
   <button type='submit'>+</button>
   <input type='hidden' value={basket[pastry].name} ref={(input) => { this.pastryName = input }} />
   </form>
   <form onSubmit={this.props.removeFromOrder}>
   <input type='hidden' value={basket[pastry].name} ref={(input) => { this.pastryName = input }} />
   <button type='submit'>-</button>
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
  
   <form onSubmit={this.props.clearOrder}>
   <button type='submit'>Clear Order</button>
   </form>
  </div>



      )
    }
}

export default Basket
