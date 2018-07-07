// Packages
import React from 'react';
import ItemOptions from './ItemOptions';

const Item = (props) => {

    let name = props.item.task,
        completed = props.item.completed,
        listClass = (completed) ? 'ItemDivDone' : 'ItemDiv',
        listClassP = (completed) ? 'ItemPDone' : 'ItemP';
    
    const markDone = () => {
        let currentTask = props.item;
        props.completeTask(currentTask);
    };

    return (
        <div className={listClass}>
            <div className="col-xs-7 col-sm-9 col-md-10 col-lg-10 ItemDesc animated fadeIn" onClick={markDone}>
                <p className={listClassP}>{name}</p>
            </div>
            <ItemOptions
                item={props.item}
                markDone={props.markDone}
                itemList={props.list}
                updateList={props.updateList}
                completeTask={props.completeTask}
                toggleDeleteConfirmation={props.toggleDeleteConfirmation}
            />
        </div>
    );
};

export default Item;