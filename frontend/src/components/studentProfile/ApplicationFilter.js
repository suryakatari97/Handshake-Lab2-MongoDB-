import React, { Component } from 'react';
import axios from 'axios';
import { getID } from "../auth/HelperApis";
import Moment from "react-moment";

class ApplicationFilter extends Component {
    constructor() {
        super();
        this.state = {
            appliedjobs: [],
            Keyword: "",
            appType: "",
            errors: {}
        };
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
        this.searchChangeHandler1 = this.searchChangeHandler1.bind(this);
        
    }
    searchChangeHandler(e) {
        this.setState({ Keyword: e.target.value });
    }
    searchChangeHandler1(e) {
        this.setState({ appType: e.target.value });
    }
    async componentDidMount() {
        axios.defaults.withCredentials = true;
        console.log("in componentDidMount");
        axios.defaults.withCredentials = true;
        const userId = getID();
        const user = { "user_id": userId }
        console.log(userId);
        //List of all applied jobs
        await axios.post('/jobs/getAppliedJobDetails', user)
            .then(res => {
                const { appliedjobs } = res.data;
                this.setState({ appliedjobs: appliedjobs });
                console.log(appliedjobs);
            })
    }

    render() {
        console.log(this.state.Keyword);
        //const sty = {"max-width" : "18rem"};
        let appliedJobs = this.state.appliedjobs.map(job => {
            console.log(job.app_status);
            console.log(this.state.appType);
            let str = job.app_deadline;
            let date = str.substring(0, str.indexOf('T'));
            
            if (
                job.app_status
                    .toUpperCase()
                     .includes(this.state.appType.toUpperCase())
            ) {
                return (
                    <div class="col-sm-6">
                        <div class="card" id="eventscard">
                            <div class="card-body">
                                <h5 class="card-title">{job.job_title}</h5>
                                <p class="card-text"><strong>{job.company_name}</strong>
                                </p>
                                <p class="card-text"><strong>Status:</strong> {job.app_status}
                                </p>
                                <p class="card-text"><strong>Applied date:</strong>
                                    <Moment format="YYYY/MM/DD">{date}</Moment>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
        })

        return (
            <div id="ApplicationFilter">
            <div className="container">
                <form onSubmit={this.onSubmit} className="container">
                    <div className="form-row align-items-center">
                        <div className="form-group col-md-4">
                            <label for="Keyword">Search</label>
                            <input type="search"
                                class="form-control"
                                name="Keyword"
                                placeholder="Enter a Keyword"
                                onChange={this.searchChangeHandler}
                                value={this.state.Keyword} />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="appType">Application Type</label>
                            <input type="text"
                                class="form-control"
                                id="appType"
                                name="appType"
                                value={this.state.appType}
                                onChange={this.searchChangeHandler1}
                                placeholder="Status:Pending Approved Declined.." />
                        </div>
                    </div>
                </form>
                <div className="container">
                    {appliedJobs}
                </div>
            </div> 
            </div>
        )
    }
}

export default ApplicationFilter;