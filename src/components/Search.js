import React from 'react'
import {Card} from 'react-bootstrap'

class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            make_name: "",
            type: "",
            year: "",
            data: {},
            search: false,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const apiURL = this.state.make_name&&this.state.year&&this.state.type ? `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${this.state.make_name}/modelyear/${this.state.year}/vehicletype/${this.state.type}?format=json` 
        : this.state.make_name&&this.state.type ? `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${this.state.make_name}/vehicletype/${this.state.type}?format=json` 
        : this.state.make_name&&this.state.year ? `https://vpic.nhtsa.dot.gov/api//vehicles/GetModelsForMakeYear/make/${this.state.make_name}/modelyear/${this.state.year}?format=json`
        : this.state.make_name ? `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${this.state.make_name}?format=json`
        : `https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json`
        
        fetch(apiURL)
        .then((response) => response.json())
        .then((data) => this.setState({
            data: data,
            search: true
        }));
    }

    render(){

        const cars = this.state.search && this.state.data['Results'].map((result, index) => {
            return(
                <div key={index}>
                    <Card>
                        <Card.Body>
                            <Card.Text> Make ID: {result['Make_ID']}</Card.Text>
                            <Card.Text> Make Name: {result['Make_Name']}</Card.Text>
                            <Card.Text> Model ID: {result['Model_ID']}</Card.Text>
                            <Card.Text> Model Name: {result['Model_Name']}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        })

        return(
            <>
            <form onSubmit={this.handleSubmit}>
                <input
                name="make_name"
                type="text"
                value={this.state.make_name}
                onChange={event => this.setState({
                make_name: event.target.value
                })}
                placeholder="Search by Car Make" required/>

                <input type="text" name="type" 
                value={this.state.type}
                onChange={event => this.setState({
                type: event.target.value
                })}
                placeholder="Search by Car Type" />

                <input type="text" name="year" 
                value={this.state.year}
                onChange={event => this.setState({
                year: event.target.value
                })}
                placeholder="Search by Car Year" />

                <input type="submit" value="Search" className="btn"/>
            </form>
            <br/>

            <div className="results">
                {cars}
            </div>
            </>
        )
    }
}

export default Search