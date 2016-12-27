import React from 'react';

export default class Card extends React.Component{
    
    loadModal(){
    	this.props.loadModal(this.props.card);
    }

    render(){
        let multiverseId = this.props.card.editions[0].multiverse_id,
            src="http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid="+multiverseId;
            

        
        return (
            <li className="card">
            	<img onClick={this.loadModal.bind(this)} src={src} alt={this.props.card.name} />

            </li>
        );
    }
}