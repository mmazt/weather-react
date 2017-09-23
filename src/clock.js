import React from 'react'
import moment from 'moment'

class Clock extends React.Component{
  constructor(props){
    super(props)
    this.state = {time: ''}
  }
  componentDidMount(){
    setInterval(() => {this.handleTime()},1000)
  }

  handleTime = () => {
    this.setState({time: moment(Date.now()).format('LTS')})
  }

  render(){
    return(
      <span style={{fontSize:'1.2em'}}>{this.state.time}</span>
    )
  }
}

export default Clock