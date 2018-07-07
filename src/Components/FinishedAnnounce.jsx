// Packages
import React, {Component} from 'react';

class FinishedAnnounce extends Component {
    
	render() {
	    if (this.props.percentDone === 100) {
		return (
	        <div className="row FinishedAnnounce animated bounceInUp">      
		        	{
			       		this.props.percentDone === 100 && this.props.showFinishedBar === true ? 
			            <i className="mdi mdi-menu-down hideButton" onClick={this.props.toggleFinishedBar}/>
			            :
			           	<i className="mdi mdi-menu-up hideButton" onClick={this.props.toggleFinishedBar}/>
		        	}  
			        {
			           	this.props.percentDone === 100 && this.props.showFinishedBar === true ? 
			           	<div className="announceIcon"> 
			               <i className="mdi mdi-checkbox-marked-circle-outline announceButton" /> 
			           	</div>
			           	: null
			        }
	        </div>
	    );
	    }else{
	    	return (<div></div>);
	    }
	}
};

export default FinishedAnnounce;