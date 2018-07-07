import React, {Component} from 'react';

class DeleteConfirmation extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }; 
  
  };

  render(){ 
    return (
      <div className="DeleteConfirmation-Transparency animated fadeIn">
        <div className="DeleteConfirmation animated fadeIn">
          
          <i className="mdi mdi-information-outline infoIcon" />
          
          <div className="DeleteTitle">
            <h3 className="DeleteTitleH3">Are you sure?</h3>
          </div>

          <div className="DeleteOptions">
            <span className="keepIcon" onClick={this.props.cancelDelete}>Cancel.</span>
            <span className="deleteIcon" onClick={this.props.removeItem}>Yes, delete it.</span>
          </div>

        </div>
      </div>
    ); 
  }
}

export default DeleteConfirmation;