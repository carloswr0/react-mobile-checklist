// Packages
import React, {Component} from 'react';
import '../Assets/iconfont/materialdesignicons.min.css';
import '../Assets/animate.css';
import '../CSS/Checklist.css';

// Components
import AddItem from './AddItem.jsx';
import ItemList from './ItemList.jsx';
import Stats from './Stats.jsx';
import FinishedAnnounce from './FinishedAnnounce.jsx';
import DeleteConfirmation from './DeleteConfirmation.jsx';
import InfoModal from './InfoModal.jsx';

const addCss = (css, styleID) => {
    const style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    style.id = styleID;
    document.body.appendChild(style);
};

class Checklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
            finished: 0,
            percentDone: 0,
            showFinishedBar: true,
            showDeleteConfirmation: false,
            showInfoModal: false,
            highlightedTask: {},
        }; 
        this.addItem = this.addItem.bind(this);
        this.countFinishedTasks = this.countFinishedTasks.bind(this);
        this.updateListAfterDeletion = this.updateListAfterDeletion.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.toggleFinishedBar = this.toggleFinishedBar.bind(this);
        this.toggleDeleteConfirmation = this.toggleDeleteConfirmation.bind(this);
        this.toggleInfoModal = this.toggleInfoModal.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.cancelDeleteConfirmation = this.cancelDeleteConfirmation.bind(this);
    }

    componentDidMount(){
        if (this.props.incomingChecklistObject){
            let totalIncomingTask = this.props.incomingChecklistObject.ChecklistSample.length;
            let ChecklistObj = this.props.incomingChecklistObject.ChecklistSample;
            for (let x = 0; x < totalIncomingTask; x++) {
               this.addItemFromIncomingObj(ChecklistObj[x]);
            };
        }
    }

    addItemFromIncomingObj(item) {
        let taskList = this.state.taskList,
            task = {task: item.task, completed: item.completed, id: item.id, position: item.position };
        taskList.push(task);
        this.setState({taskList}, () => {
            this.countFinishedTasks();
        });
    }

    addItem(item) {
        let taskList = this.state.taskList,
            task = {task: item, completed: false, id: Date.now() };
        taskList.push(task);
        this.setState({taskList}, () => {
            this.countFinishedTasks();
        });
    }

    completeTask(task) {
        let listItems = this.state.taskList;

        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].id === task.id) {
                listItems[i].completed = !listItems[i].completed;
                this.setState({taskList: listItems}, () => {
                    this.countFinishedTasks();
                });
                break;
            }
        }
    }

    countFinishedTasks(){
        let listItems = this.state.taskList;
        let finished = 0;
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].completed) {
                finished++;
            }
        }
        this.setState({ finished }, () => {
            this.percentCompletion();
        });
    }

    percentCompletion() {
        let totalTasks = this.state.taskList.length,
            finishedTasks = this.state.finished,
            percentDone = Math.floor((finishedTasks / totalTasks) * 100);
        percentDone = isNaN(percentDone) ? 0 : percentDone;
        this.setState({percentDone});
    }

    updateListAfterDeletion(taskList) {
        this.setState({
            taskList, 
            highlightedTask: {},
            showDeleteConfirmation: false}, () => {
            this.countFinishedTasks();
        });
        const child = document.getElementById("modal-opened");
        child.parentNode.removeChild(child);
    }

    toggleFinishedBar() {
        this.setState({showFinishedBar: !this.state.showFinishedBar})
    }

    toggleDeleteConfirmation(task){
        this.setState({
            highlightedTask: task,
            showDeleteConfirmation: !this.state.showDeleteConfirmation
        })
        const css = `html, body {margin: 0; height: 100%; overflow: hidden}`;
        addCss(css, "modal-opened");
    }


    toggleInfoModal(){
        if(this.state.showInfoModal){
            this.setState({
                showInfoModal: true
            })
            const css = `html, body {margin: 0; height: 100%; overflow: hidden}`;
            addCss(css, "modal-opened");
        }else{
            this.setState({
                showInfoModal: false
            })
            const child = document.getElementById("modal-opened");
            child.parentNode.removeChild(child);
        }
    }

    cancelDeleteConfirmation(){
        this.setState({
            highlightedTask: {},
            showDeleteConfirmation: false,
        })
        const child = document.getElementById("modal-opened");
        child.parentNode.removeChild(child);
    }

    removeItem(e){
        let itemList = this.state.taskList,
            i = 0,
            found = false;
            // Remove this todo from the array
            while (i < itemList.length && !found) {
                if (this.state.highlightedTask === itemList[i]) {
                  itemList.splice(i, 1); // remove that item from array
                  found = true;
                } else {
                  i++;
                }
            }
        // Then call the update local storage method
        this.updateListAfterDeletion(itemList);
    };

    render() {
        const props = this.props
        let taskList = this.state.taskList
       
        return (
            <div className="container-fluid Checklist">
                <div className="row ChecklistTitleRow" style={{marginRight: '0px',marginLeft: '0px'}}>
                    <h2 className="ChecklistTitle">{props.checklistTitle}</h2>
                </div>
                <Stats
                    list={taskList}
                    finished={this.state.finished}
                    percent={this.state.percentDone}
                />
                <AddItem 
                    addItemPlaceholder={props.addItemPlaceholder}
                    addItem={this.addItem} 
                />
                {
                    this.state.showDeleteConfirmation ? 
                    <DeleteConfirmation
                        cancelDelete={this.cancelDeleteConfirmation}
                        removeItem={this.removeItem}
                    /> : null
                }
                {
                    this.state.showInfoModal ? 
                    <InfoModal
                        cancelDelete={this.cancelDeleteConfirmation}
                        removeItem={this.removeItem}
                    /> : null
                }
                <ItemList
                    items={taskList}
                    updateList={this.updateListAfterDeletion}
                    completeTask={this.completeTask}
                    toggleDeleteConfirmation={this.toggleDeleteConfirmation}
                />
                <FinishedAnnounce 
                    toggleFinishedBar={this.toggleFinishedBar}
                    percentDone={this.state.percentDone}
                    showFinishedBar={this.state.showFinishedBar}
                />
            </div>
        );
    }
}

export default Checklist;