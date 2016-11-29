import React from 'react';

export default class Controls extends React.Component{
    constructor(props){
       super(props);
       this.state = {"set" : "",type : "", rarity : "", color : "", name : ""};
    }
    
    handleSetChange(event){
        this.setState({set:event.target.value});
        /* Since settings state is not synchronous, can't use the state value for set here */
        this.props.getCards({"set" : event.target.value, name : this.state.name, type : this.state.type, rarity : this.state.rarity, color : this.state.color});
    }
    handleNameChange(event){
        this.setState({name:event.target.value});
        /* Since settings state is not synchronous, can't use the state value for set here */
        //this.props.getCards({"set" : this.state.set, name : event.target.value, type : this.state.type, rarity : this.state.rarity, color : this.state.color});
    }
    handleTypeChange(event){
        this.setState({type:event.target.value});
        this.props.getCards({"set" : this.state.set, name : this.state.name,  type : event.target.value, rarity : this.state.rarity, color : this.state.color});
    }
    handleRarityChange(event){
        this.setState({rarity:event.target.value});
        this.props.getCards({"set" : this.state.set, name : this.state.name,  type : this.state.type, rarity : event.target.value, color : this.state.color});
    }
    handleColorChange(event){
        this.setState({color:event.target.value});
        this.props.getCards({"set" : this.state.set, name : this.state.name,  type : this.state.type, rarity : this.state.rarity, color : event.target.value});
    }
    
    render(){
        
        
            let setOptionNodes = this.props.sets.map(function(set,index){
            
                return <option key={index} value={set.id} id={"option-" + set.id}>{set.name}</option>
            });
           
        
        
        return (
            <div id="controlsContainer">
                <input placeholder="Search for card" value="" type="text "/>
                <select value={this.state.set} id="sets" onChange={this.handleSetChange.bind(this)}>
                    <option value="">Sets</option>
                    {setOptionNodes.sort()}
                </select>
                <input placeholder="Filter By Name" value={this.state.name} type="text" onChange={this.handleNameChange.bind(this)} />
                <select value={this.state.type} id="type" onChange={this.handleTypeChange.bind(this)}>
                    <option value="">Type</option>
                    <option value="artifact">Artifact</option>
                    <option value="creature">Creature</option>
                    <option value="enchantment">Enchantment</option>
                    <option value="instant">Instant</option>
                    <option value="land">Land</option>
                    <option value="planeswalker">Planeswalker</option>
                    <option value="sorcery">Sorcery</option>
                </select>
                <select value={this.state.rarity} id="Card Rarity" onChange={this.handleRarityChange.bind(this)}>
                    <option value="">Rarity</option>
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="mythic">Mythic Rare</option>
                </select>
                <select value={this.state.color} id="Color" onChange={this.handleColorChange.bind(this)}>
                    <option value="">Colors</option>
                    <option value="black">Black</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="white">White</option>
                    {/*<option value="colorless">Colorless</option>
                    <option value="multicolored">Multicolored</option>*/}
                </select>
            </div>
        );
    }
}