
import PropTypes from 'prop-types'



export const PrimeApp = ({nomb,edad}) => {
    return (
      <div>
        <h1>Mi nombre es {nomb}</h1>
        <h2>Y mi edad es {edad} </h2>
      </div>
    )
  }

  PrimeApp.propTypes = {
      nomb : PropTypes.string.isRequired,
      edad : PropTypes.number
  }
  

  