import { useState,useEffect } from "react";
import {  Link } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Tag,
  Space,
  Radio,FloatButton 
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";


import ModelCard from "../components/ModelCard"

import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava4 from "../assets/images/logo-spotify.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";
import team4 from "../assets/images/team-4.jpg";
import card from "../assets/images/00047-212406482.png";


// import modelsAPI from '../api/models'

import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL

const getByPage = async () => {
  const { data } = await axios.post(baseURL + '/queryModelInfoForMainView.do',
    {
      "custId": "1685969357974",
      "bussData": { "pageIndex": 0, "pageSize": 50 }
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  if(data&&data.resultCode=='SUCCESS'&&data.bussData&&data.bussData.modelList){
    const modelList=JSON.parse(data.bussData.modelList)
    // console.log(modelList)
    return modelList
  }
}



function Home() {

  const custId=localStorage.getItem('_emc_hub_custId')||'';

  const { Title, Text } = Typography;

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [modelData,setModelData]=useState([])

  useEffect(() => {
    getByPage().then(data=>{
      data&& setModelData(data)
    })
    // console.log('执行了')
  },[]);

  
  console.log(modelData)
  return (
    <>
      <div className="layout-content">
      
      <Row gutter={[24, 0]}  style={{marginBottom:24}}>

        {/* NFT 预告 */}
        <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>EMC Hub will soon launch Lora NFT, the world's first AI model NFT </Title>
                  <p>EMC Hub is about to release Lora NFT, which is the industry's first AI model NFT.
                  This innovation represents EMC Hub's innovation in the AI+web3 field. Lora NFT will use AI technology to bring more possibilities and innovations to the NFT market, creating more revenue and value for AI model creators and collectors. Stay tuned for the release of Lora NFT!
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="#">
                    Read More
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card>
          </Col>

          {/* 公告 */}
          <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Built by the development team of EMC Hub</Text>
                      <Title level={5}>Model marketplace has been launched.</Title>
                      <Paragraph className="lastweek mb-36">
                      Model creators are welcome to upload their models to receive more rewards and create more value.
                      </Paragraph>
                    </div>
                    <div className="card-footer">
                      <a className="icon-move-right" href="https://github.com/EMCProtocol-dev">
                        Read More
                        {<RightOutlined />}
                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card} alt="" className="border10" />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>


        </Row>


        {/* 模型市场 */}

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">


              <div className="project-ant">
                <div>
                 <div>
                 <Title level={5}>Models</Title>
                  <Paragraph className="lastweek">
                  Total<span className="blue">20</span>
                  </Paragraph>
                  </div> 
                </div>
                <div className="ant-filtertabs emc-hub-upload">

                <div className="uploadfile shadow-none">

                <Link to="/uploadModel">
                <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                 Click to Upload
                  </Button>
                  </Link>

                </div>

                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="ALL">
                      <Radio.Button value="ALL">ALL</Radio.Button>
                      <Radio.Button value="CHECKPOINT">CHECKPOINT</Radio.Button>
                      <Radio.Button value="LORA">LORA</Radio.Button>
                      <Radio.Button value="CONTROLNET">CONTROLNET</Radio.Button>
                      <Radio.Button value="OTHER">OTHER</Radio.Button>
                    </Radio.Group>
                  </div>

                </div>
              </div>

             

              <div className="emc-hub-models">
                {
                  Array.from(modelData,model=>{
                   return <Link to={`/modelDetail?modelId=${model.modelId}`}>
                    {ModelCard(model) }
                   </Link>
                  })
                }
               
              </div>
  
            </Card>
          </Col>
       
        </Row>

        <FloatButton.BackTop />
      </div>
    </>
  );
}

export default Home;
