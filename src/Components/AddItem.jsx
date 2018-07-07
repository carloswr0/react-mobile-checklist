// Packages
import React, {Component} from 'react';

class AddItem extends Component {
    
    constructor(props){
    super(props);
        this.state = { 
          taskText: '',
          remainingCharacters: 75,
        };
    }

    //Funcion de agregar.
    onInputEnter(e) {
        if (e.key === 'Enter') {
            if (e.target.value){
                let item = e.target.value;
                // Now add it to the 'items' array state
                this.props.addItem(item);
                // On enter, remove the value from the input
                e.target.value = '';
                this.setState({remainingCharacters: 75});
            }
        }
    }

    //Funcion de agregar con el evento por presionar el Icono
    onIconPress(e) {   
        if (e){
            let item = e;
            // Now add it to the 'items' array state
            this.props.addItem(item);
            // On enter, remove the value from the input
            this.input.value = '';
            this.setState({taskText: "", remainingCharacters: 75});
        }
    }

    handleChange(event) {
        let input = event.target.value;
        this.setState({
            remainingCharacters : 75 - (input.length),
            taskText : (input)
        });
    }

    render() {
        const props = this.props
        return (
            <div className="row ChecklistAddItemRow" style={{marginRight: '0px',marginLeft: '0px'}}>
                <div className="col-xs-9 col-sm-10 col-md-10 col-lg-10 AddItem">
                    <input
                        type='text'
                        placeholder={props.addItemPlaceholder}
                        onKeyPress={this.onInputEnter.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        ref={input => this.input = input}
                        maxLength="75"
                    />
                </div>
                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 remainingChars">
                    <span>
                        {this.state.remainingCharacters}
                    </span>
                </div>
                <i 
                    className="col-xs-2 col-sm-1 col-md-1 col-lg-1 mdi mdi-plus-circle AddItemButtonIcon" 
                    onClick={this.onIconPress.bind(this,this.state.taskText)}
                />
            </div>
        );
    }
}

export default AddItem;