import React from 'react';

export default class Modal extends React.Component{
	render(){
		let modalClasses = `modal ${ this.props.modal.visible ? '' : 'hide'}`;
		console.log(this.props.modal);

		let card = this.props.modal.content,
		multiverseId = card.editions[0] ? card.editions[0].multiverse_id : "",
		src = "http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid="+multiverseId;
		
		return(
			<div id="cardModal" className={modalClasses}>
				<div className="modal_dialog">
					<div className="modal_content">
						<div className="modal_body">
							<button onClick={this.props.unloadModal} id="closeCardModal" type="button" className="close"><span>×</span></button>
							<div id="leftSideContainer">	
					      		<div id="largeCardImageContainer"><img id="largeCardImage" src={src} /></div>
					      	</div>
					      	<div id="extraInfoContainer" className="">
      			      			<div id="modalCardName" className="modalCardInfo"><strong>{card.name}</strong></div>
      			      			<div id="modalCardType" className="modalCardInfo text-center"><strong>{card.types[0]}</strong></div>
      			      			<div className="well">
      			      				<div id="modalCardColors"><strong>Subtype: </strong><span>{card.subtypes[0]}</span></div>
      				      			<div id="modalCardColors"><strong>Colors: </strong><span>{card.colors[0]}</span></div>
      				      			<div id="modalCardPT"><strong>Power / Toughness: </strong>{card.power} / {card.toughness}</div>
      				      			<div id="modalCardRarity"><strong>Rarity: </strong>{card.editions[0] ? card.editions[0].rarity : ""}</div>
      				      			<div id="modalCardSet"><strong>Set: </strong>{card.editions[0] ? card.editions[0].set : ""}</div>
      				      			<div id="modalCardFlavor"><em>{card.editions[0] ? card.editions[0].flavor : ""}</em></div>
      				      		</div>
      			      		</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}