import React from 'react';

import Controls from './Controls';
export default class Header extends React.Component{
    

    render(){
        
        /*this.props.getCards();*/
        
        return(
            <header>
                <div id="logo"></div>
                <Controls sets={this.props.sets} getCards={this.props.getCards} />
            </header>
        );
    }
    
}