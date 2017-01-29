import React from 'react';
import Select from 'react-select';
import { AgGridReact } from 'ag-grid-react';
import RefData from './RefData';
import SelectCellEditor from './SelectCellEditor.jsx';
import _ from 'underscore';

//import  './styles.css';
import 'react-select/dist/react-select.css';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';

class App extends React.Component {

	constructor() {
		super();

		this.state = {
			quickFilterText: null,
			showGrid: true,
			showToolPanel: false,
			columnDefs: this.createColDefs(),
			rowData: this.createRowData(),
			icons: {
				columnRemoveFromGroup: '<i class="fa fa-remove"/>',
				filter: '<i class="fa fa-filter"/>',
				sortAscending: '<i class="fa fa-long-arrow-down"/>',
				sortDescending: '<i class="fa fa-long-arrow-up"/>',
				groupExpanded: '<i class="fa fa-minus-square-o"/>',
				groupContracted: '<i class="fa fa-plus-square-o"/>',
				columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
				columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
			}
		};
	}


	render() {
		return (
			<div style={{width: '1200px'}}>
				
				<div style={{ height: 400 }} className="ag-fresh">
					<AgGridReact
						gridOptions={this.gridOptions}
						onGridReady={this.onGridReady.bind(this)}
						onRowSelected={this.onRowSelected.bind(this)}
						onCellClicked={this.onCellClicked.bind(this)}
						icons={this.state.icons}
						columnDefs={this.state.columnDefs}
						rowData={this.state.rowData}
						onKeyDown={this.onKeyDown.bind(this)}
						enableColResize="true"
						rowHeight="24"
						debug="true"
					/>
				</div>

			</div>
		);
	}

	logChange(val) {
		console.log("Selected: " + val);
	}

	onShowGrid(show) {
		this.setState({
			showGrid: show
		});
	}

	onToggleToolPanel(event) {
		this.setState({ showToolPanel: event.target.checked });
	}

	onGridReady(params) {
		this.api = params.api;
		this.columnApi = params.columnApi;
	}

	onCellClicked(event) {
		console.log('onCellClicked: ' + event.data.name + ', col ' + event.colIndex);
	}

	onRowSelected(event) {
		console.log('onRowSelected: ' + event.node.data.name);
	}

	onRefreshData() {
		var newRowData = new RowDataFactory().createRowData();
		this.setState({
			rowData: newRowData
		});
	}

	createColDefs() {
		var columnDefs = [
			{
				headerName: 'Name', width: 120,  field: 'name', editable : true
			},
			{
				headerName: 'Age', width: 120,  field: 'years', editable : true,
					cellClass : ['numeric-text']
			},
			{
				headerName: 'Language', width: 80,  field: 'language'
			},
			{
				headerName: 'Continent', width: 80,  field: 'continent'
			},
			{
				headerName: 'Proficiency', width: 50,  field: 'proficiency'
			},
			{
				headerName: 'Address', width: 160,  field: 'address'
			},
			{
				headerName: 'Selector', width: 200,  field: 'language', editable: true,
					cellEditorFramework : SelectCellEditor,
					cellEditorParams : {
						onKeyDown : this.onKeyDown
					}
			}
		];
		return columnDefs;
	}



	createRowData() {
		var rowData = [];

		for (var i = 0; i < 1000; i++) {
			var countryData = RefData.COUNTRIES[i % RefData.COUNTRIES.length];
			rowData.push({
				name: RefData.FIRST_NAMES[i % RefData.FIRST_NAMES.length] + ' ' + RefData.LAST_NAMES[i % RefData.LAST_NAMES.length],
				skills: {
					android: Math.random() < 0.4,
					html5: Math.random() < 0.4,
					mac: Math.random() < 0.4,
					windows: Math.random() < 0.4,
					css: Math.random() < 0.4
				},
				address: RefData.ADDRESSES[i % RefData.ADDRESSES.length],
				years: Math.round(Math.random() * 100),
				proficiency: Math.round(Math.random() * 100),
				country: countryData.country,
				continent: countryData.continent,
				language: countryData.language,
				mobile: '123456789',
				landline: '987654321'
			});
		}

		return rowData;
	}

	onKeyDown(event) {
        
    }

}

export default App;
