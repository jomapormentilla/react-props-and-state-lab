import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = e => {
    let type = e.target.value

    this.setState({
      filters: {
        type: type
      }
    }, ()=>{console.log(this.state)})
  }

  onFindPetsClick = e => {
    let url = `/api/pets`

    if (this.state.filters.type !== 'all') {
      url += `?type=${ this.state.filters.type }`
    }

    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({ pets: data }, ()=>{console.log(this.state)})
    })
  }

  onAdoptPet = id => {
    this.setState(prevState => {
      let pet = this.state.pets.find(p => p.id === id)
      pet.isAdopted = true

      let idx = this.state.pets.findIndex(p => p.id === id)

      return {
        pets: [...prevState.pets.slice(0,idx), pet, ...prevState.pets.slice(idx + 1)]
      }
    }, ()=>{console.log(this.state)})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={ this.onChangeType } type={ this.state.filters.type } onFindPetsClick={ this.onFindPetsClick } />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={ this.state.pets } onAdoptPet={ this.onAdoptPet } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
