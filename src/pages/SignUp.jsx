import React, { Component } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,Spin
} from "antd";

import { Link  } from "react-router-dom";
 
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";



import axios from 'axios';
import { message } from "antd";


 
const baseURL = process.env.REACT_APP_BASE_URL

const applyRegister = async (json) => {
  const { data } = await axios.post(baseURL + '/applyRegister.do',
  json,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  if(data&&data.resultCode=='SUCCESS'&&data.bussData){
    const custId=data.bussData.custId
    console.log('_emc_hub_custId',custId)
    localStorage.setItem('_emc_hub_loginId',json.bussData.loginId)
    localStorage.setItem('_emc_hub_custId',custId)
    return custId
  }else if(data&&data.resultCode=="SYSFAIL"){
    console.log('SYSFAIL')
    return 
  }
}

const setAutoration = async (custId,authToken) => {

 const json= { 
  custId, 
  bussData:{ 
    identityType:"PASSWD", 
    authToken
  } }


  const { data } = await axios.post(baseURL + '/setAutoration.do',
  json,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  if(data&&data.resultCode=='SUCCESS'){
    return true
  }else{
    console.log('SYSFAIL')
    localStorage.setItem('_emc_hub_custId','')
    return false
  }
}


const { Title } = Typography;
const { Header, Footer, Content } = Layout;


class SignUp extends Component {

  constructor(props){
    super(props)
    this.state={
      loading:false
    }
  }

  render() {

    const onFinish = (values) => {
      const authToken=values.authToken;
      const res={
      "bussData":values
      }
      delete res.bussData.authToken;

      console.log("applyRegister:", JSON.stringify(values,null,2),authToken);

      this.setState({loading:true})
      applyRegister(res).then(custId=>{
        if(custId){
          //  设置密码
          setAutoration(custId,authToken).then(res=>{
            if(res){
            // 跳转至登录界面
            setTimeout(()=>this.props.nav('/login',custId),1000);
            
            }else{
              this.setState({loading:false})
              message.error('Register Failed')
            }
          })
            
        }else{
          this.setState({loading:false})
          message.error('Register Failed')
        }
      })

    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
      {this.state.loading&&<Spin tip="Loading" size="large">
        <div className="emc-hub-loading" />
      </Spin>}
        <div className="layout-default ant-layout layout-sign-up">
          <Header>
            <div className="header-col header-brand">
              <h5>(blue color background ),(infinity symbol), (square-shaped), (distinctive logo),3d,c4d,blender,uegel, generative art</h5>
            </div>
          </Header>

          <Content className="p-0">
            <div className="sign-up-header">
              <div className="content">
                <Title>Sign Up</Title>
                <p className="text-lg">
                Welcome to the new era of AI.
                </p>
              </div>
            </div>

            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={<h5>Register With</h5>}
              bordered="false"
            >
              {/* <div className="sign-up-gateways">
                <Button type="false">
                  <img src={logo1} alt="logo 1" />
                </Button>
                <Button type="false">
                  <img src={logo2} alt="logo 2" />
                </Button>
                <Button type="false">
                  <img src={logo3} alt="logo 3" />
                </Button>
              </div>
              <p className="text-center my-25 font-semibold text-muted">Or</p> */}
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <Form.Item
                  name="loginId"
                  rules={[
                    { required: true, message: "Please input your loginId!" },
                  ]}
                >
                  <Input placeholder="loginId" />
                </Form.Item>
                <Form.Item
                  name="nickName"
                  rules={[
                    { required: true, message: "Please input your nickName!" },
                  ]}
                >
                  <Input placeholder="nickName" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>

                <Form.Item
                  name="mobilePhoneNo"
                  rules={[
                    { required: true, message: "Please input your mobilePhone!" },
                  ]}
                >
                  <Input placeholder="mobilePhone" />
                </Form.Item>
                
                <Form.Item
                  name="authToken"
                  required
                  rules={[
                    { required: true, message: "Please input your authToken!" },
                  ]}
                >
                  <Input placeholder="authToken" />
                </Form.Item>


                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    I agree the{" "}
                    <a href="#" className="font-bold text-dark">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-dark">
                  Sign In
                </Link>
              </p>
            </Card>
          </Content>
          <Footer>
            <Menu mode="horizontal">
              {/* <Menu.Item>Company</Menu.Item> */}
              <Menu.Item>About Us</Menu.Item>
              {/* <Menu.Item>Teams</Menu.Item>
              <Menu.Item>Products</Menu.Item>
              <Menu.Item>Blogs</Menu.Item>
              <Menu.Item>Pricing</Menu.Item> */}
            </Menu>
            <Menu mode="horizontal" className="menu-nav-social">
              {/* <Menu.Item>
                <Link to="#">{<DribbbleOutlined />}</Link>
              </Menu.Item> */}
              <Menu.Item>
                <Link to="#">{<TwitterOutlined />}</Link>
              </Menu.Item>
              {/* <Menu.Item>
                <Link to="#">{<InstagramOutlined />}</Link>
              </Menu.Item> */}
              {/* <Menu.Item>
                <Link to="#">
                  <svg
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
                  </svg>
                </Link>
              </Menu.Item> */}
              <Menu.Item>
                <Link to="#">{<GithubOutlined />}</Link>
              </Menu.Item>
            </Menu>
            <p className="copyright">
              {" "}
              Copyright © 2023 EMC HUB by <a href="https://github.com/EMCProtocol-dev">EMCProtocol-dev</a>.{" "}
            </p>
          </Footer>
        </div>
      </>
    );
  }
}


export default SignUp;