import React from 'react';

import Header from './Header';
import CardContainer from './CardContainer';
import Footer from './Footer';

export default class Layout extends React.Component{
    
    constructor(){
        super();
        this.state = {
            data:[],
            dataPageNum : 0,
            appPageInfo : {pageCount : 0, currentPage : 0, pagesArray : [[]]}
        };
    }
    
    createPages(){
        const CARDSPERPAGE = 50;
        let dataLength = this.state.data.length,
            pageCount = Math.ceil(dataLength / CARDSPERPAGE),
            pagesArray = [];
            
            for(var i=0;i<pageCount;i++){
                pagesArray.push(this.state.data.splice(0,CARDSPERPAGE));
            }
 
            this.setState({
                appPageInfo : {
                    pageCount,
                    currentPage : 0,
                    pagesArray
                }
            });
            
            console.log(this.state);
    }
    
    fetch(){
        let that = this;
        let request = new XMLHttpRequest();
            request.open('GET', 'https://api.magicthegathering.io/v1/cards?set=KLD' , true);
            
            request.onload = function() {
              if (request.status >= 200 && request.status < 400) {
                // Success!
                const data = JSON.parse(request.responseText);
                
                console.log(data);
                that.setState({
                    data : data.cards
                });
                
                that.createPages();
                
              } else {
                // We reached our target server, but it returned an error
                console.log('error');
              }
            };
            
            request.onerror = function() {
              // There was a connection error of some sort
              console.log("Connection Error");
            };
            
            request.send();
    }
    
    componentDidMount(){
        setTimeout(()=>{
            this.fetch();
        },2000);
        
    }
    
    render(){
       
       
        return (
            <div>
                <Header />
                <CardContainer pageData={this.state.appPageInfo.pagesArray[this.state.appPageInfo.currentPage]} />
                <Footer />
            </div>
        );
    }
  
}