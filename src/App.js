import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert';

class App extends Component {
  constructor() {
    super();

    this.state = {
      employeelist: [],
      text: '',
      user: false,
      addForm: false,
      emailtxt: '',
      pwdtxt: '',
      firstname: '',
      lastname: '',
      email: '',
      salary: '',
      jobstartdate: ''
    }

    this.add = this.add.bind(this);
    this.updateText = this.updateText.bind(this);
    this.cancel = this.cancel.bind(this);
    this.logout = this.logout.bind(this);

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  logout(){
    this.setState({ user: false, addForm: false });
  }

  login() {
    const { emailtxt, pwdtxt } = this.state;
    console.log(this.state.emailtxt, this.state.pwdtxt);
    if (emailtxt === 'admin@domain.com' && pwdtxt === 'admin') {
      this.setState({ user: true });
      console.log('clicked');
      swal("Good Job!", "Login Successful!", "success");
    }
    else{
      swal("Error", "Enter Correct Email/Password", "error");
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  renderLogin() {
    const { emailtxt, pwdtxt } = this.state;
    return <div>
      <input
        type="email"
        name="emailtxt"
        placeholder="admin@domain.com"
        value={emailtxt}
        onChange={this.handleChange}
      />

      <input
        type="password"
        name="pwdtxt"
        placeholder="admin"
        value={pwdtxt}
        onChange={this.handleChange}
      />

      <button value="Send" onClick={this.login}>Login</button>
    </div>
  }

  showTable() {
    return (<div>
      <div>
        <p>Admin Logged In <button onClick={this.logout}>Logout</button></p> 
      <h1>Employee Info</h1>
      <br />
      <br />
      <input
        type="text"
        name="firstname"
        placeholder="Enter First Name"
        value={this.state.firstname}
        onChange={this.handleChange}
      />

      <input
        type="text"
        name="lastname"
        placeholder="Enter Last Name"
        value={this.state.lastname}
        onChange={this.handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={this.state.email}
        onChange={this.handleChange}
      />

      <input
        type="text"
        name="salary"
        placeholder="Enter Salary"
        value={this.state.salary}
        onChange={this.handleChange}
      />
      <input
        type="date"
        name="jobstartdate"
        placeholder="Enter Your Last Name"
        value={this.state.jobstartdate}
        onChange={this.handleChange}
      />
    <button onClick={ this.add } className="floatingbtn">Add</button>
    </div>
    {this.renderemployeelist()}
    </div>
    
    
    )
  }

  addEmployeeForm() {
    return <div>form
      <button onClick={() => this.setState({ addForm: false })}>back</button>
    </div>
  }

  updateText(e) {
    this.setState({ text: e.target.value })
  }

  add() {
    const { firstname, lastname, email, salary, jobstartdate, employeelist } = this.state;
    const empobj = [ firstname+" | ", lastname+" | ", email+" | ", salary+" | ", jobstartdate+" "];
    employeelist.push(empobj);
    console.log(empobj);
    this.setState({ employeelist, firstname: '' , lastname: '' , email: '' , salary: '' , jobstartdate: ''});
    swal("Good job!", "Employee Added!", "success");
    // this.setState({addForm:true})
  }

  edit(index) {
    const { employeelist } = this.state;
    this.setState({ text: employeelist[index], currentIndex: index })
  }

  delete(index) {
    const { employeelist } = this.state;
    employeelist.splice(index, 1);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.setState({ employeelist, currentIndex: null });
          swal("Poof! Your info has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }

  cancel() {
    this.setState({ text: '', currentIndex: null })
  }

  renderHeader() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Assignment no.3</h1>
      </header>
    )
  }

  renderemployeelist() {
    const { employeelist } = this.state;
    const { user, addForm } = this.state;
    return <ol>{employeelist.map((item, index) => {
      return <li>
        {item}
        {/* <button onClick={this.edit.bind(this, index)}>Edit</button> */}
        <button onClick={this.delete.bind(this, index)}>Delete</button>
      </li>
    })}
    </ol>
  }

  render() {
    const { user, addForm } = this.state;
    return (
      <div className="App">
        {this.renderHeader()}
        <br />  
        <div>
          {!user && this.renderLogin()}
          {user && !addForm && this.showTable()}
          {user && addForm && this.addEmployeeForm()}
        </div>
        
      </div>
    );
  }
}

export default App;

