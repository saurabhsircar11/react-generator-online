import React, {Component} from 'react';
import './App.css';
import PackageService from "./PackageService";
import _ from 'lodash'
import {CustomInput} from "reactstrap";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const apiUrl = 'https://node-app-generator.herokuapp.com/package'

//const apiUrl= 'http://localhost:4000/package'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            packageName: '',
            additionalPackages: []
        }

    }

    handleKeyPress = (e) => {
        this.setState({
            packageName: e.target.value,

        })
    };

    async onGenerate() {
        let regex = new RegExp('^(?:@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$');
        if (this.state.packageName.length > 0 && regex.test(this.state.packageName)) {
            let response = await new PackageService().createPackage(this.state.packageName, this.state.additionalPackages)
            if (response !== null) {
                this.notifySuccess("Package generated please download")
            }
            else {
                this.notifyError('Something went wrong. Please try after sometime.')
            }
        }
        else if (this.state.packageName.length === 0) {
            this.notifyError('Please enter a package name')
        }
        else {
            this.notifyError('Please enter a valid name')
        }
    }

    notifySuccess = (msg) => toast.success(msg);

    notifyError = (msg) => toast.error(msg);

    handleChange = (e) => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        let additionalPackages = this.state.additionalPackages.map((items) => {
            if (items.dependencyName === item) {
                items.isChecked = isChecked
            }
            return items
        });

        this.setState({additionalPackages})

    }


    async componentDidMount() {
        let response = await new PackageService().getAdditionalPackages();
        let additionalPackages = response.additionalPackages;
        if (additionalPackages !== null) {
            this.setState({additionalPackages})
        }
    }


    render() {
        return (
            <div className="container">
                <h1 className="text-center">React boilerplate code</h1>
                <div className="text-center">
                    <p>
                        Make sure you have node, npm or yarn is installed in your system<br/>
                        Please run npm install after unzipping the zip.
                    </p>

                </div>
                <div className="row m-2 d-flex align-items-center">
                    <label className="col-sm-3 text-right">Project Name:</label>
                    <input type="text" className="col-sm-8" id="project-name" value={this.state.packageName}
                           onChange={this.handleKeyPress}/>
                </div>
                <div className="row d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary m-2" id="generate-btn" onClick={() => {
                        this.onGenerate()
                    }}>Generate
                    </button>
                    <a href={`${apiUrl}/download/${this.state.packageName}`}
                       className={'btn btn-primary m-2'}>Download</a>
                </div>
                <div className="row mt-5">
                    <h4>
                        Additional Libraries
                    </h4>
                </div>
                <div className="row">
                    <ul className="col-sm-6">
                        {
                            this.state.additionalPackages.map((items, index) => {
                                return (
                                    <li key={index}>
                                        <div key={'div' + index}>
                                            <CustomInput
                                                name={items.dependencyName}
                                                type="checkbox"
                                                id={items.dependencyName}
                                                label={_.startCase(items.dependencyName)}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <ToastContainer/>
            </div>
        );
    }
}

export default App;
