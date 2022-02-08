import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Container, Col, Row } from 'react-bootstrap';
import loginImg from "../assets/login.svg"
import Alert from '../common/Alert';
import "./SignupForm.css";


export default function SignupForm({ signup }) {
    const navigate = useNavigate();
    const INITIAL = {
        username: "",
        email: "",
        password: ""               
    }
    const [formData, setFormData] = useState(INITIAL);    
    const [formErrors, setFormErrors] = useState([]);
    
      
    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if(result.success) {
            navigate("/");
        } 
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    
    return (
      <Container className="LoginForm mt-5">
      <Row>
          <Col className="text-center mt-3 p-4">
              <h2 className='log mb-3'>Sign Up</h2>                                   
             
                  <form onSubmit={handleSubmit}>
                      <div className="form-group">                                
                          <input
                              className="form-control mb-4"
                              name="username"
                              placeholder='Enter username'                                    
                              value={formData.username}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      <div className="form-group">                                
                          <input
                              className="form-control mb-4"
                              name="email"
                              type="email"
                              placeholder='Enter email'                                    
                              value={formData.email}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      <div>                                
                          <input
                              className=" form-control mb-4"
                              type="password"
                              name="password"
                              placeholder='Password'                                    
                              value={formData.password}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      
                      {formErrors.length
                          ? <Alert type="danger" messages={formErrors} />
                          : null}

                      <button
                          className="btn btn-primary"
                          onSubmit={handleSubmit}  
                      >
                          Sign Up
                      </button>    
                  </form>                       
                  <div className='text-center'>
                      <p className='mt-4'>Do you have an account?</p>
                      <Link className='link-sign' to="/login">LOGIN NOW</Link>    
                  </div>                        
          </Col>
          <Col lg={8} md={6} sm={12}>
              <img src={loginImg} className="w-100" alt="login"/>            
          </Col> 
      </Row>             
  </Container>
    );
}
