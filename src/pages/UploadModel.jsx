import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  message,
  Button,
  Select,
  Input,Image,
  Steps , Form, Typography ,Upload ,InputNumber ,Result
} from "antd";

import {  Link } from "react-router-dom";

import axios from 'axios';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined,FileTextOutlined,UploadOutlined,PlusOutlined   } from "@ant-design/icons";
 
const { Paragraph } = Typography;

const { TextArea } = Input;


const tagOptions=Array.from(`PERSON,WEDDING,WOMEN,PHOTOREALISTIC,HIGHLY DETAILED`.split(","),t=>{
  return {
    value:t,
    label:t
  }
})

//CHECKPOINT,LORA,CONTROLNET,OTHER
const categoryOptions=Array.from(`CHECKPOINT`.split(","),t=>{
  return {
    value:t,
    label:t
  }
})

const getBase64 = (file )  =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result );
    reader.onerror = (error) => reject(error);
  });



const step1=[
  {
    title: 'EDIT INFO',
    status: 'process',
    icon: <LoadingOutlined />,
  },
  {
    title: 'UPLOAD',
    status: 'wait',
    icon: <UserOutlined />,
  }, {
    title: 'EDIT DETAIL',
    status: 'wait',
    icon: <SolutionOutlined />,
  },
  {
    title: 'PUBLISH',
    status: 'wait',
    icon: <SmileOutlined />,
  },
]

const step2=[
  {
    title: 'EDIT INFO',
    status: 'finish',
    icon:<FileTextOutlined/> ,
  },
  {
    title: 'UPLOAD',
    status: 'wait',
    icon:<LoadingOutlined />,
  },
  {
    title: 'EDIT DETAIL',
    status: 'process',
    icon: <SolutionOutlined />,
  },
  {
    title: 'PUBLISH',
    status: 'wait',
    icon: <SmileOutlined />,
  },
]



const step3=[
  {
    title: 'EDIT INFO',
    status: 'finish',
    icon:<FileTextOutlined/> ,
  },
  {
    title: 'UPLOAD',
    status: 'process',
    icon: <UserOutlined />,
  },
  {
    title: 'EDIT DETAIL',
    status: 'finish',
    icon: <LoadingOutlined />,
  },
  {
    title: 'PUBLISH',
    status: 'wait',
    icon: <SmileOutlined />,
  },
]


const step4=[
  {
    title: 'EDIT INFO',
    status: 'finish',
    icon:<FileTextOutlined/> ,
  },
  {
    title: 'UPLOAD',
    status: 'process',
    icon: <UserOutlined />,
  },
  {
    title: 'EDIT DETAIL',
    status: 'finish',
    icon: <SolutionOutlined />,
  },
  {
    title: 'PUBLISH',
    status: 'wait',
    icon: <SmileOutlined />,
  },
]



const baseURL = process.env.REACT_APP_BASE_URL

const addNewModel = async (json) => {
  const { data } = await axios.post(baseURL + '/addNewModel.do',
  json,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  if(data&&data.resultCode=='SUCCESS'&&data.loginStatus=="true"&&data.bussData&&data.bussData.modelId){
    const modelId=data.bussData.modelId;
    return modelId
  }else{
    // 失败
    
  }
}

const modModelDetailInfo = async (json) => {
  const { data } = await axios.post(baseURL + '/modModelDetailInfo.do',
  json,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  if(data&&data.resultCode=='SUCCESS'&&data.loginStatus=="true"){
    return true
  }else{
    // 失败
    return false
  }
}
 

function UploadModel() {

  const custId=localStorage.getItem('_emc_hub_custId')||'';

  const [form] = Form.useForm();

  const [currentStep,setCurrentStep]=useState(1)
 
  const [steps,setSteps]=useState(step1)

  const [modelId,setModelId]=useState('');

  const [version,setVersion]=useState(1);


  const [fileListForImage, setFileListForImage] = useState([]);
  const [uploadingForImage, setUploadingForImage] = useState(false);

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [fileUrlsForImage,setFileUrlsForImage]=useState([])
  const [fileUrls,setFileUrls]=useState([])
 
const uploadPropsForImage ={
  onRemove: (file) => {
    const index = fileListForImage.indexOf(file);
    const newFileList = fileListForImage.slice();
    newFileList.splice(index, 1);
    setFileListForImage(newFileList);
  },
  beforeUpload: (file) => {
    setFileListForImage([...fileListForImage, file])
    return false;
  },
  fileList:fileListForImage,
};

const uploadProps ={
  onRemove: (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  },
  beforeUpload: (file) => {
    setFileList([...fileList, file]);
    return false;
  },
  fileList,
};

  const handleUpload = (type) => {
    
    const formData = new FormData();
    if(type=='images'){
      fileListForImage.forEach((file) => {
        formData.append('file', file);
      });
      setUploadingForImage(true);
    }else{
      fileList.forEach((file) => {
        formData.append('file', file);
      });
      setUploading(true);
    }
    
    // You can use any AJAX library you like
    fetch(baseURL + '/fileUpload.do', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.resultCode=='SUCCESS'&&res.bussData&&res.bussData.file_link){
          const urls=res.bussData.file_link.split(',')
          console.log(type,fileUrlsForImage,fileListForImage)
          if(type=='images'){
            setFileListForImage([]);
            setFileUrlsForImage( [...fileUrlsForImage,...urls])
          }else{
            setFileList([]);
            setFileUrls( [...fileUrls,...urls])
          }
          message.success('upload successfully.');
        }
        
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        if(type=='images'){
          setUploadingForImage(false);
        }else{
          setUploading(false);
        }
      });
  };


 

  const onFinish = (values) => {
    
    if(currentStep==1){

      let modelSubName=values.modelSubName;

      const res= {
        "custId":custId,
        "bussData":{...values,modelSubName:modelSubName.join(",")}
      }
  
      console.log(JSON.stringify(res,null,2))

      addNewModel(res).then(id=>{
        if(id){
          setSteps(step2)
          setCurrentStep(2)
          setModelId(id)
        }else{
          message.error('addNewModel Fail')
          setModelId('')
        }
      })

    }

    if(currentStep==2){
      // console.log(fileUrlsForImage,fileUrls)
      setSteps(step3)
      setCurrentStep(3)
    }
    
    if(currentStep==3){
        // console.log(values)
        const v=values.version||version;
        let info=values.modelDetailInfo?JSON.parse(values.modelDetailInfo):{}
        const res={
          "custId":custId,
          "bussData":{
            ...info,
            version:v,
            modelId,
            modelFileLinks:fileUrls[0],
            sampleImgFileLinks:fileUrlsForImage.join(',')
          }}

        modModelDetailInfo(res).then(d=>{
          if(d){
            setSteps(step4);
            setCurrentStep(4);
          }else{
            setModelId('')
          }
        })

        console.log(JSON.stringify(res,null,2))
    }

  };

 
  return (
    <>
      <Row gutter={[24, 0]}>

      

        {/* 上传步骤 */}
        <Col xs={24} md={24}>

        <Card >
        <Steps
              items={steps}
        /></Card>

          <Row gutter={[24, 0]}>
            <Col span={24} md={24} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Upload</h6>]}
            extra={[
              // <Button type="primary">
              //   <span>VIEW ALL</span>
              // </Button>,
            ]}
          >     
            
            {
              currentStep===1?<Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
             
              <Form.Item label="Model Name"  name="modelName" 
              required 
              // tooltip="This is a required field"
              >
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item
                label="Tags"
                required
                name="modelSubName" 
                // tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
              >
                <Select
                  mode="tags"
                  size={'large'}
                  placeholder="Please select"
                  defaultValue={[]}
                  style={{ width: '100%' }}
                  options={tagOptions}
                />
              </Form.Item>
        
              <Form.Item
                label="Category"
                required
                name="cateGory1" 
                // tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
              >
                <Select
                   
                  size={'large'}
                  placeholder="Please select"
                  // defaultValue={categoryOptions.length==1?categoryOptions[0].value:[]}
                  style={{ width: '100%' }}
                  options={categoryOptions}
                />
              </Form.Item>
        
        
              {/* <Form.Item
                label="Model Describe"
                name="modelDescribe" 
                // required
                // tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
              >
                  <TextArea 
                  allowClear
            
                  autoSize={{ minRows: 4, maxRows: 6 }} 
                  placeholder="xxx" 
                  maxLength={160} 
                  showCount={true} />
              </Form.Item> */}
        
              {/* <Form.Item
                label="How to use"
                name="ModelUse" 
                // required
                // tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
              >
                    <Checkbox.Group
              options={[{
                 label: 'public to eveyone', value: 'public to eveyone' },
                 {
                  label:'share with principle',value:'share with principle'
                 }
               ]}
           
            />
              </Form.Item> */}
        
              <Form.Item>
                <Button type="primary" htmlType="submit">NEXT</Button>
              </Form.Item>
        
            </Form>:''
            }

            {
              currentStep===2?<>
<p>Images</p>
<Upload
      {...uploadPropsForImage}
 
    >
      <Button icon={<UploadOutlined />}
      style={{ marginBottom:24 }}
      >Select Images</Button>
    </Upload>
 
    <Button
        type="primary"
        onClick={()=>handleUpload('images')}
        disabled={fileListForImage.length === 0}
        loading={uploadingForImage}
        style={{ marginBottom: 32 }}
      >
        {uploadingForImage ? 'Uploading' : 'Start Upload'}
      </Button>

      <div style={{
        display:'flex',
        flexWrap:'wrap',
        marginBottom:56
      }}>
      {
        Array.from(fileUrlsForImage,url=><Image src={url} width={72}/>)
      }
      </div>


     <Paragraph copyable={{ tooltips: false,text:modelId }}>Model Id : {modelId}</Paragraph>
             

             <p>Model File (ckpt pt safetenors bin zip)</p>

              <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>

      <Button
        type="primary"
        onClick={()=>handleUpload('model')}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
      <br></br>
      
      {fileUrls[0]&&<a href={fileUrls[0]}>Model link</a>}
      <hr></hr>
      <Button type="primary" htmlType="submit" onClick={onFinish}>NEXT</Button>
            
            </>:''
            }


             
{currentStep===3?<Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >

              <Paragraph copyable={{ tooltips: false,text:modelId }}
              style={{marginBottom:24}}
              >Model ID : {modelId}</Paragraph>
             
              <Form.Item label="Model Version"  
              name="version" 
              required 
              // tooltip="This is a required field"
              >
                <InputNumber placeholder="1" defaultValue={version} min={1} max={999}/>
              </Form.Item>


              <div style={{display:'flex',alignItems: 'center'}}>
              <p> Detail Description  </p>
              <Paragraph 
              style={{margin:0,paddingLeft:48}}
              copyable={{ tooltips: false,text:JSON.stringify({
                "guideLink":"", 
                "paramsGuideLink":"", 
                "sampleCodeLink":"", 
                "invokeGuide":"", 
                "positivePromts":"", 
                "negativePrompt":"", 
                "enhancePromt":"", 
                "numInferenceSteps":"",
                "seed":-1
              },null,2) }}>Copy Template</Paragraph>

              </div>
              
             
              <Form.Item 
              name="modelDetailInfo" 
              required
              >
                 <TextArea 
                  allowClear
                  autoSize={{ minRows: 8, maxRows: 28 }} 
                  placeholder={JSON.stringify({
                    "guideLink":"", 
                    "paramsGuideLink":"", 
                    "sampleCodeLink":"", 
                    "invokeGuide":"", 
                    "positivePromts":"", 
                    "negativePrompt":"", 
                    "enhancePromt":"", 
                    "numInferenceSteps":"",
                    "seed":-1, 
                   
                  },null,2)}
                  maxLength={1200} 
                  showCount={true}
                  />
              </Form.Item>
        
              <Form.Item>
                <Button type="primary" htmlType="submit">NEXT</Button>
              </Form.Item>
        
            </Form>:''
            }


{
  currentStep==4?<>
   <Result
    status="success"
    title="Successfully Publish the Model!"
    subTitle={modelId}
    extra={[
      <Link to={`/modelDetail?modelId=${modelId}`}>
      <Button type="primary" key="console">
        View
      </Button>
      </Link>,
     
    ]}
  />
   </>:''
}
            
          </Card>
        </Col>
     
          </Row>

          
        </Col>
      
      </Row>
 
    </>
  );
}

export default UploadModel;
