
import './App.css'

export default function Square({value, onSquareClick}){
  console.log(value)
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}
