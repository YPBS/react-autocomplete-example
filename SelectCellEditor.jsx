import React from 'react';
import Select from 'react-select';
import { AgGridReact } from 'ag-grid-react';
import RefData from './RefData';
import {reactSelectSampleData} from './utils';
import $ from 'jquery';

// import jQueryEditableSelect from 'jquery-editable-select';
// import DropdownInput from 'react-dropdown-input';
import { getStates, matchStateToTerm, sortStates, styles } from './reactAutoCompleteUtils';
import Autocomplete from 'react-autocomplete';

import 'react-select/dist/react-select.css';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';

class SelectCellEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.value = "";
    }

    render() {
        var options = reactSelectSampleData();
        var searchNames = ['Sydney', 'Melbourne', 'Brisbane', 
    'Adelaide', 'Perth', 'Hobart'];

        return (
            <div id="selectCellEditor">
          
            <Autocomplete
                ref="selector"
                value={this.state.value}
                inputProps={{name: "US state", id: "react-autocomplete-id"}}
                items={getStates()}
                getItemValue={(item) => item.name}
                shouldItemRender={matchStateToTerm}
                sortItems={sortStates}
                onChange={this.onChange.bind(this)}           //{(event, value) => this.setState({ value })}
                onSelect={this.onSelect.bind(this)}           //{value => this.setState({ value })}
                autoHighlight={true}
                renderItem={(item, isHighlighted) => (
                    <div
                    style={isHighlighted ? styles.highlightedItem : styles.item}
                    key={item.abbr}
                    >{item.name}</div>
                )}
            />
                
            </div>
        );
    }

    onChange(evt, value){
        this.setState({ value });
        console.log(evt);
        //console.log(value);
    }

    onSelect(value, obj){
        this.setState({value})
        console.log(obj);
    }

    componentDidMount() {
        console.log("Inside componentDidMount");      
    }

    getValue(){
        return this.state.value;
    }

    isPopup() {
        return false;
    }

    isCancelBeforeStart() {
        return false;
    }

    isCancelAfterEnd() {
        return false;
    }

    afterGuiAttached() {
        // get ref from React component
        var eInput = this.refs.selector;
        eInput.refs.input.focus()
        var self = this;
		eInput.refs.input.addEventListener('keydown', function (event) {
			let key = event.which || event.keyCode;
			if (key == 40 || key == 38 || key == 13) {
				event.stopPropagation();
				event.preventDefault();
				eInput.handleKeyDown(event);
			}
        });

        eInput.refs.input.select();
    }

}

export default SelectCellEditor;

SelectCellEditor.propTypes = {
    params: React.PropTypes.object
};