import { useState,useEffect } from "react";

import {
  Row,
  Col,
  Card,
  Tag,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from "antd";

import ModelCard from "../components/ModelCard"

import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL

const queryModelDetailInfo = async (custId,modelId) => {
  const { data } = await axios.post(baseURL + '/queryModelDetailInfo.do',
  {custId,bussData:{"modelId":modelId}},
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  if(data&&data.resultCode=='SUCCESS'&&data.bussData){
    let { 
      modelName,
      modelFileLinks,
      sampleImgFileLinks,
      modelSubName,
      modelFileHashCodes,
      modelId,
      version,
      modelFileNames,
      negativePrompt,
      positivePromts
    }=data.bussData;
    // console.log(modelDetail,modelInfo)
    return {
    modelSubName:modelSubName?modelSubName.split(",").filter(f=>f):[],
    modelName,
    modelFileLinks,
    sampleImgFileLinks:sampleImgFileLinks?sampleImgFileLinks.split(",").filter(f=>f):[],
    modelFileHashCodes,
    modelId,
    version:version||1,
    modelFileNames,
    negativePrompt,
    positivePromts
  }
  }
}



function ModelDetail() {
  const custId=localStorage.getItem('_emc_hub_custId')||'';
  const [, setLoading] = useState(false);
  const [model,setModel]=useState({})
  const [modelDetail,setModelDetail]=useState({})

  useEffect(() => {
   const modelId= window.location.search.replace('?modelId=','')
    queryModelDetailInfo(custId,modelId).then(data=>{
      console.log('queryModelDetailInfo',data)
      if(data){
        // const {modelInfo,modelDetail}=data;
        setModel(data)
        setModelDetail(data)
      }
    }) 
  },[]);

  let tags=[model.category1]

  if(model.cateGory2){
    Array.from(model.cateGory2.split(','),t=>t&&tags.push(t))
  }

  if(model.modelSubName){
    tags=[...tags,...model.modelSubName].filter(f=>f)
  }

  // console.log('tag',tags)
  return (
    <div style={{
      marginTop: '12px'
    }}>
      {/* <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">Sarah Jacob</h4>
                  <p>CEO / Co-Founder</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
                <Radio.Button value="b">TEAMS</Radio.Button>
                <Radio.Button value="c">PROJECTS</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      ></Card> */}

      <Row gutter={[24, 0]} justify="center">
        <Col span={10}  className="mb-24">

        {ModelCard(model,440) }

        </Col>
        <Col span={6}   className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">{model.modelName}</h6>}
            className="header-solid h-full card-profile-information"
          //   extra={
          //    <Button type="link">{pencil}</Button>
          // }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >

{
         Array.from(tags.filter(f=>f),(c,i)=><Tag color={'blue'}>{c}</Tag>)
       }
<Descriptions >

              <Descriptions.Item label="version" span={3}>
                {modelDetail&&modelDetail.version}
              </Descriptions.Item>

              <Descriptions.Item label="ID" span={3}>
               {modelDetail&&modelDetail.modelId}
              </Descriptions.Item>
          
              {modelDetail&&modelDetail.modelFileLinks?
              <Descriptions.Item label="downLoadLink" span={3}>
                <a href={modelDetail.modelFileLinks}>URL</a>
              </Descriptions.Item>:''
              }

              
          
              {/* <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item> */}
            </Descriptions>
            <hr className="my-25" />
 
            <p className="text-dark">
              {" "}{modelDetail&&modelDetail.commonParams}{" "}
            </p>

{modelDetail&&modelDetail.positivePromts?<>
  <p>Positive Promts:</p>
            <p>
              {modelDetail&&modelDetail.positivePromts}
            </p></>:''}
         
         {
          modelDetail&&modelDetail.negativePromts?<> <p>Negative Promts:</p>
          <p>
            {modelDetail&&modelDetail.negativePromts}
          </p></>:''
         }
              
          </Card>
        </Col>
        {/* <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Conversations</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col> */}
      </Row>
      {/* <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Projects</h6>
            <p>Architects design houses</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Col span={24} md={12} xl={6}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader projects-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageURL ? (
                <img src={imageURL} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Card> */}
    </div>
  );
}

export default ModelDetail;
