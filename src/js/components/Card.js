import React from 'react';

export default class Card extends React.Component{
    
    render(){
        let multiverseId = this.props.card.editions[0].multiverse_id,
            src="http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid="+multiverseId;
        return (
            <li className="card">
                {this.props.card.name}
            </li>
        );
    }
}