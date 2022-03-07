import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

// class App extends React.Component{
//   constructor(){
//     super();
//     this.state=({
//       pokemon:[],
//       name:'',
//       height:'',
//       weight:'',
//       type:'',
//       logo:''
//     })
//   }


//   componentDidMount = () =>{  
//    const URL = 'https://pokeapi.co/api/v2/pokemon/squirtle'
//    axios(URL).then((resultat) =>{
//      console.log(resultat.data);
//      this.setState({
//        name: resultat.data.name,
//        height: resultat.data.height,
//        weight:resultat.data.weight,
//        logo: resultat.data.sprites.front_default,
    
//      })
//     })
//     this.getPokemons();
//     this.logoPokemon()
//   }
  
//   getPokemons = () =>{
//     const URL = 'https://pokeapi.co/api/v2/pokemon/'
//     axios(URL).then((resultat) =>{ 
//         const pokemons = resultat.data.results;
//         pokemons.map((pokemon)=>{
//           console.log(pokemon.name);

//           this.setState({
//             pokemon: pokemons
//           })
          
//         })
//     })
//     console.log("fontion getpokemons");
//   }

//   logoPokemon = () =>{
//     const URL = 'https://pokeapi.co/api/v2/pokemon/'
//     axios(URL).then((resultat) =>{
    
//     })

//   }


//   render(){
//     return(
//       <div className='container-fluid'>
//         <div className='row bg-dark text-white'>
//           <div className='col text-center'><img src={this.state.logo}/></div>
//           <div className='col d-inline-block'>
//             <p>Nom: {this.state.name}</p>
//             <p>Taille: {this.state.height}</p>
//             <p>Poids: {this.state.weight}</p>
//             <p>Type: {this.state.type}</p>
//           </div>
//         </div>
//           <div>
//             {this.state.pokemon.map(pokemon => <p>{pokemon.name}</p> )}
//           </div>
//       </div>
//     )
//   }
// }


export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          pokemons: []
      }
  }
  componentDidMount() {
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
      axios(URL).then(reponse => {
          const pokemons = reponse.data.results;
        //   console.log(reponse);
          pokemons.forEach(pokemon => {
              axios(pokemon.url).then((reponse) => {
                // console.log(reponse);
                  let newPokemons = [...this.state.pokemons]; // On copie le tableau
                  const pokemonDetail = reponse.data
                  newPokemons.push(pokemonDetail)
                  this.setState({
                      pokemons: newPokemons,
                  })
              });
          })
      })
  }
   getPokemonDetails = (pokemon)  =>{
    console.log(pokemon.types[0].type.name);
       this.setState({
        name:pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        type: pokemon.types[0].type.name,
        sprites: pokemon.sprites.other['official-artwork'].front_default
    })
   }
   render() {
       return (
      <>
                              <div className='container-fluid clickDiv'>
                                <div className=' col-6 text-center pt-2 nameDiv'><img height={200} src={this.state.sprites}/></div>
                                <div className='col-6 text-center pt-4 spritesDiv'>
                                    
                                    <p>Name: {this.state.name}</p>
                                    <p>Height: {this.state.height} m</p>
                                    <p>Weight: {this.state.weight} kg</p>
                                    <p>Type: {this.state.type}</p>

                                </div>
                              </div>
          <div className="cards">
              {
                  this.state.pokemons.map((pokemon, index) => { // parcourir tout le state avec la méthode map
                    return (
                        
                        <div className='container d-inline-block col-lg-4 col-md-6 col-sm-6 col-6 text-center' key={index+pokemon.name}>
                              <p>
                                  <span><img onClick={()=>this.getPokemonDetails(pokemon)} src={pokemon.sprites.front_default} /></span><br/>
                                  {pokemon.name}
                              </p>
                          </div>
                      )
                  })
              }
          </div>
      </>
      )
  }
}

// export default App;
