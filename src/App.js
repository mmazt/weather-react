import React, { Component } from 'react'
import blockDay from './images/block_day.svg'
import blockNight from './images/block_night.svg'
import inferno from './images/sun-inferno.svg'
import {Grid, List, Image, Loader, Dimmer, Modal, Button} from 'semantic-ui-react'
import moment from 'moment'
// eslint-disable-next-line
import BR from 'moment/locale/pt-br'
import {geo_locate} from './ajax'
import WeatherClock from'./clock'
import background from './background'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {data: {}, loading: true, error: false}
  }

  componentDidMount(){
    this.handleAjax()

  }

  handleAjax = () => {
    geo_locate()
    .then(response => {
      this.setState({data: response, loading: false})
    })
    .catch(err =>{
      this.setState({loading: false, error: true})
    }) 
  }


  handleDate = () => {
    moment.locale('pt-br')
    return moment(Date.now()).format('dddd, DD MMMM YYYY')
  }

  handleModal = () => {
    this.handleAjax()
  }


  render() {
    const {main, weather, cidade} = this.state.data
    const date = this.handleDate()
    const bg = weather ? background(weather[0].icon) : ''
    const block_bg = weather && weather[0].icon.indexOf('n') !== -1 ? blockNight : blockDay
    const local = cidade ? cidade.city + ', ' + cidade.region_code : ''
    return (

      <div style={{height:'100%', margin:'0', backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>

      <Grid centered relaxed style={{height: 'auto', minHeight:'40%', position:'relative', top:'25%', margin: '0 auto',backgroundImage: `url(${block_bg})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
      
      <Grid.Row >
      <Grid.Column computer={6} mobile={9} tablet={9} widescreen={16} verticalAlign='middle' textAlign='center' className='bloco' >

      <p><span style={{fontSize:'1.3em'}}>{local}<br /></span></p>
        <span style={{fontSize:'1.2em'}}>{date}<br /></span>
        <WeatherClock /><br /> <br />
        <span style={{fontSize:'1.3em'}}>Clima:</span>
        <br />
        <List horizontal >
        <List.Item><strong>Min. {main ? main.temp_min : ''}&ordm;</strong></List.Item>
        <List.Item><strong>Max. {main ? main.temp_max : ''}&ordm;</strong></List.Item>
        <List.Item><strong>Umidade: {main ? main.humidity  : ''}%</strong></List.Item>
        </List>
      </Grid.Column>
      </Grid.Row>
      </Grid>

      {weather && weather[0].icon.indexOf('n') === -1 && main && main.temp_max >= 32 ? 
      <Image src={inferno} style={{position: 'fixed', top:'0', right:'0'}} size='tiny'/> : ''}

      <Modal
        open={this.state.error}
        onClose={this.handleModal}
      >
      <Modal.Header>Erro de Conexão</Modal.Header>
      <Modal.Content>Não foi possível contatar o servidor nesse momento. Tentar de novo?</Modal.Content>
      <Modal.Actions><Button onClick={this.handleModal}>Ok</Button></Modal.Actions>
      </Modal>
      <Dimmer active={this.state.loading} >
      <Loader >Carregando </Loader>
      </Dimmer>
      </div>

    )
  }
}

export default App;
