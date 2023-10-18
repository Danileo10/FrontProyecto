import {useState} from 'react'
import PropTypes from 'prop-types'

export const CounterApp = ({value}) => {
    const [counter, setCounter] = useState(value);

    const func_suma = () => {
        setCounter(counter + 1);
    }

    const func_resta = () => {
        setCounter(counter - 1)
    }
  return (
    <div>
      <h1>CounterApp</h1>
      <h2>{counter}</h2>
      <button onClick={func_suma}>
        +1
      </button>
      <button onClick={func_resta} disabled={counter=== 0} >
        -1
      </button>
    </div>
  )
}

CounterApp.propTypes = {
    value: PropTypes.number.isRequired
}
