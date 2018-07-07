// Packages
import React, {Component} from 'react';
import Item from './Item.jsx';
import Sortable from 'sortablejs';

class ItemList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        }; 
    }

    componentDidMount(){
        Sortable.create(this.list, { 
            ghostClass: "sortable-ghost",  
            chosenClass: "sortable-chosen", 
            dragClass: "sortable-drag", 
            animation: 250,
            onUpdate: (e) => {
                //En un futuro debo arreglar el item.position del array... suerte.
            },
        });
    }

    render() {
        let props = this.props;
        let tasks = props.items;  

        let itemListStyle = { 
            marginRight: '15px',
            marginLeft: '15px',
            marginBottom: '10px',
        }
      
        const listedItems = tasks.map((item) => {
            return (
                <Item
                    item={item}
                    key={tasks.indexOf(item)}
                    list={tasks}
                    updateList={props.updateList}
                    completeTask={props.completeTask}
                    toggleDeleteConfirmation={props.toggleDeleteConfirmation}
                />
            );
        });

        return (
            <div ref={list => this.list = list} className="row ItemList" style={itemListStyle}> 
                {listedItems}
            </div>
        );
    }
}

export default ItemList;