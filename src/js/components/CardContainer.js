import React from 'react';

import Card from './Card';

export default class CardContainer extends React.Component{
    
   
    
   
    
    render(){
        let cardsArray = this.props.cards.map((card, index)=>{
            return <Card key={index} card={card} />;
        });
        
        console.log("bryson Ia");
        
        
        return (
            <div id="cardContainer">
                <ul>
                    {cardsArray}
                </ul>
            </div>
        );
    }
}