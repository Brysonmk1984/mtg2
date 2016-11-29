import React from 'react';
import Header from './Header';
import CardContainer from './CardContainer';
import Footer from './Footer';

const DEFAULTS = {set : "KLD"};

export default class Layout extends React.Component{
    
    constructor(){
        super();
        this.state = {
            sets : [{}],
            cards : []
        };
    }
    
    fetch(config){
        
        let that = this;
        let request = new XMLHttpRequest();
            request.open('GET', config.endpoint , true);
            
            request.onload = function() {
              if (request.status >= 200 && request.status < 400) {
                let data = JSON.parse(request.responseText);
                config.resolve(data);
              }else{console.log('Reached Server, but it returned an error');}
            };
            request.onerror = function() {console.log("Connection Error");};
            request.send();
    }
    
    componentDidMount(){
        /*
        1. Fetch Sets
        2. Fetch cards from latest set
        */
        let initGetSets =  new Promise( /* executor */ (resolve, reject) => {
            this.fetch({endpoint : "https://api.deckbrew.com/mtg/sets", resolve, reject});
        }).then((data) =>{
            this.setState({sets : data});
            let initGetCards = new Promise( /* executor */ (resolve, reject) => {
                this.fetch({endpoint : "https://api.deckbrew.com/mtg/cards?set="+DEFAULTS.set, resolve, reject});
            }).then((data) =>{
                this.setState({cards : data});
            });
        });
    }
    
    getCards(config){
        console.log('in getCards');
        console.log('config',config);

        let endpoint = "https://api.deckbrew.com/mtg/cards?";
        
        endpoint += config.set ? ("set="+config.set) : "";
        endpoint += config.set ? ("&name="+config.name) : "";
        endpoint += config.rarity ? ("&rarity="+config.rarity) : "";
        endpoint += config.color ? ("&color="+config.color) : "";
        endpoint += config.type ? ("&type="+config.type) : "";
        
        console.log("finishedENdpoint", endpoint);
        
        
            
        let getCards = new Promise((resolve, reject) => {
            this.fetch({endpoint, resolve, reject});
        }).then((data) =>{
            this.setState({cards : data});
            console.log("STATE - ",this.state);
        });
    }
    
    render(){
       
       
        return (
            <div>
                <Header sets={this.state.sets}  getCards={this.getCards.bind(this)}/>
                <CardContainer cards={this.state.cards} />
                <Footer />
            </div>
        );
    }
  
}