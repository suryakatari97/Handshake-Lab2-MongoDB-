import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import swal from "sweetalert";
import { getUserName } from "../auth/HelperApis";
import { getUserType } from '../auth/HelperApis';
import NewResults from './NewResults';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './messages.css';


class NewConversation extends Component {
    constructor() {
        super()
        this.state = {
            comment: null,
            searchResults: null,
            searchElement: null
        }
    }
    handleSearchChange = (e) => {
        this.setState({
            searchElement: e.target.value,

        })
    }

    handleSearch = (e) => {
        e.preventDefault()
        const data = {
            findName: this.state.searchElement
        }
        axios.post('/findUsers', data)
            .then(response => {
                console.log('users data:', response.data)
                if (response.status === 200) {
                    this.setState({
                        searchResults: response.data
                    })
                    console.log(this.state.searchResults);
                }
                else {
                    console.log("Didn't get users")
                }
            }).catch((err) => {
                if (err) {
                    swal('error connecting to database')
                }
            });
    }

    startConversation = (userName) => {
        console.log('in start');
        var name = getUserName();
        let data = {
            // message: ' ',
            receiverUserName: userName,
            senderUserName: name
        }
        axios.post('/setMessage', data)
            .then(response => {
                console.log('messages data:', response.data)
                if (response.status === 200) {
                    console.log('response', response.data);
                    this.props.getConversationsfromModal()
                }
                else {
                    console.log("Didn't set message")
                }
            }).catch((err) => {
                if (err) {
                    swal('error connecting to database')
                }
            });
    }


    render() {
        if (!this.props.showNewConversationModal) {
            return null
        }
        let searchResults = null
        if (this.state.searchResults) {
            searchResults = <NewResults
                Results={JSON.stringify(this.state.searchResults)}
                startConversaton={this.startConversation}
                conversations={this.props.conversations}
            />
        }
        const closeBtn = <button className="close" onClick={() => this.props.startNewConversation()}>&times;</button>;


        return (
            <div>
                <Modal isOpen={this.props.showNewConversationModal} toggle={() => this.props.startNewConversation()} className='modal-popup' scrollable>
                    <ModalHeader toggle={() => this.props.startNewConversation()} close={closeBtn}></ModalHeader>
                    <ModalBody className="modal-body ">
                        <form className="form-inline">

                            <input onChange={this.handleSearchChange.bind(this)} className='form-control col-10 ' type='search' id='searchbar' placeholder='Search'></input>
                            <button onClick={this.handleSearch.bind(this)} className="btn btn-primary col-2" id='search-button' type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                        </form>
                {/* <form className="form-inline">

                    <input onChange={this.handleSearchChange.bind(this)} className='form-control col-10 ' type='search' id='searchbar' placeholder='Search'></input>
                    <button onClick={this.handleSearch.bind(this)} className="btn btn-primary col-2" id='search-button' type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </form> */}
                {searchResults}
                </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.props.startNewConversation()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default NewConversation;