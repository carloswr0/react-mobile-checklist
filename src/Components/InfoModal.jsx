import React, {Component} from 'react';

class InfoModal extends Component {
  render(){ 
    return (
      <div className="DeleteConfirmation-Transparency animated fadeIn">
        <div className="DeleteConfirmation animated fadeIn">
          
          <i className="mdi mdi-information-outline infoIcon" />
          
          <div className="DeleteTitle">

            <span className="DeleteTitleH3">
              The pre-saved tasks came from a JSON Object to simulate the result of a request.
            </span>
    

          </div>



        </div>
      </div>
    ); 
  }
}

export default InfoModal;