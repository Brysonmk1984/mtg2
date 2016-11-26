import React from 'react';

import Card from './Card';

export default class CardContainer extends React.Component{
    
   
    
   
    
    render(){
        let currentPageCardArray = this.props.pageData.map(card=>{
            return <Card key={card.number} name={card.name} />;
        });
        
        
        
        
        return (
            <div id="cardContainer">
                <ul>
                    {currentPageCardArray}
                </ul>
            </div>
        );
    }
}