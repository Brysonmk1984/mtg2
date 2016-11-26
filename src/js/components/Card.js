import React from 'react';

export default class Card extends React.Component{
    
    render(){
        
        return (
            <li className="card">{this.props.name}</li>
        );
    }
}