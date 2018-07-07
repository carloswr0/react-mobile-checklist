import React, {Component} from 'react';

class ItemOptions extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }; 
    this.confirmDelete = this.confirmDelete.bind(this);
    this.markDone = this.markDone.bind(this);
  }
  
  confirmDelete(e){ 
    this.props.toggleDeleteConfirmation(this.props.item);
  }

  markDone(e){ 
    let currentTask = this.props.item;
    this.props.completeTask(currentTask);
  }

  render(){ 
    return (
      <div className="col-xs-5 col-sm-3 col-md-2 col-lg-2 TaskOptions">
        <div className="iconContainer">
          {
            this.props.item.completed ?  
            <i className="mdi mdi-checkbox-marked-outline Marked" onClick={this.markDone}/> 
              : 
            <i className="mdi mdi-checkbox-blank-outline notMarked" onClick={this.markDone} />
          }
        </div>
        <div className="iconContainer">
          <i className="mdi mdi-delete DeleteIcon" onClick={this.confirmDelete}/>
        </div>
      </div>
    ); 
  }
}

export default ItemOptions;