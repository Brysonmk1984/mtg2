import React from 'react';
import Header from './Header';
import CardContainer from './CardContainer';
import Footer from './Footer';
import Modal from './Modal';

const DEFAULTS = {set : "KLD"};

export default class Layout extends React.Component{
    
    constructor(){
        super();
        this.state = {
            sets : [{}],
            cards : [],
            modal : {
                visible : false,
                content : {
                    editions : [],
                    types : [],
                    subtypes : [],
                    colors : "",
                    power : "",
                    toughness : ""
                }
            }
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

    loadModal(config){
        this.setState({
            modal : {
                visible:true,
                content : config
            }
        });
        
    }

    unloadModal(){
        this.setState({
            modal : {
                visible:false,
                content : {
                    editions : [],
                    types : [],
                    subtypes : [],
                    colors : "",
                    power : "",
                    toughness : ""
                }
            }
        });
    }

    
    
    render(){
        // Arrow key Functionality
        function keyClick(e){
           // escape click
           if(e.keyCode == '27' && this.state.modal.visible){
               this.unloadModal();
           }
        }
        
        document.onkeydown = keyClick.bind(this);
        let containerClasses = this.state.modal.visible ? 'modal_backdrop' : '';
        return (
            <div>
                
                <Header sets={this.state.sets}  getCards={this.getCards.bind(this)}/>
                <CardContainer cards={this.state.cards} loadModal={this.loadModal.bind(this)} />
                <Footer />
                <div className={containerClasses}></div>
                <Modal modal={this.state.modal} unloadModal={this.unloadModal.bind(this)} />

            </div>
        );
    }
  
}