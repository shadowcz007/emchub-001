import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  message,
  Button,
  Select,
  Input,
  Steps , Form, Checkbox,Upload 
} from "antd";

import { nanoid } from 'nanoid/non-secure';

import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined,FileTextOutlined,UploadOutlined  } from "@ant-design/icons";
 

const { TextArea } = Input;

const tagOptions=Array.from(`PERSON,WEDDING,WOMEN,PHOTOREALISTIC,HIGHLY DETAILED`.split(","),t=>{
  return {
    value:t,
    label:t
  }
})

const categoryOptions=Array.from(`CHECKPOINT,LORA,CONTROLNET,OTHER`.split(","),t=>{
  return {
    value:t,
    label:t
  }
})


const step1=[
  {
    title: 'EDIT INFO',
    status: 'process',
    icon: <LoadingOutlined />,
  },
  {
    title: 'EDIT DETAIL',
    status: 'wait',
    icon: <SolutionOutlined />,
  },
  {
    title: 'UPLOAD',
    status: 'wait',
    icon: <UserOutlined />,
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
    title: 'EDIT DETAIL',
    status: 'process',
    icon: <LoadingOutlined />,
  },
  {
    title: 'UPLOAD',
    status: 'wait',
    icon: <UserOutlined />,
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
    title: 'EDIT DETAIL',
    status: 'finish',
    icon: <SolutionOutlined />,
  },
  {
    title: 'UPLOAD',
    status: 'process',
    icon: <LoadingOutlined />,
  },
  {
    title: 'PUBLISH',
    status: 'wait',
    icon: <SmileOutlined />,
  },
]


// 上传接口

const uploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};




function UploadModel() {
  const [form] = Form.useForm();

  const [currentStep,setCurrentStep]=useState(1)
 
  const [steps,setSteps]=useState(step1)

  const onFinish = (values) => {
    
    if(currentStep==1){

      const res= {
        "custId": nanoid(),
        "bussData":JSON.stringify(values,null,2)
      }
  
      console.log(JSON.stringify(res,null,2))


      setSteps(step2)
      setCurrentStep(2)
    }

    if(currentStep==2){
      const res={
        "custId":"",
        "bussData":{modelDetail:{
          ...values

        }}
      }
      console.log(JSON.stringify(res,null,2))

      setSteps(step3);
      setCurrentStep(3)
    }
    

  };

 
  return (
    <>
      <Row gutter={[24, 0]}>

      

        {/* 上传步骤 */}
        <Col xs={24} md={16}>

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
                  defaultValue={[]}
               
                  style={{ width: '100%' }}
                  options={categoryOptions}
                />
              </Form.Item>
        
        
              <Form.Item
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
              </Form.Item>
        
              <Form.Item
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
              </Form.Item>
        
              <Form.Item>
                <Button type="primary" htmlType="submit">NEXT</Button>
              </Form.Item>
        
            </Form>:''
            }


   
{currentStep===2?<Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
             
              <Form.Item label="Model Version"  name="version" 
              required 
              // tooltip="This is a required field"
              >
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item label="Detail Description"  name="modelDesc" 
              required 
              // tooltip="This is a required field"
              >
                 <TextArea 
                  allowClear
            
                  autoSize={{ minRows: 4, maxRows: 6 }} 
                  placeholder="xxx" 
                  maxLength={160} 
                  showCount={true} />
              </Form.Item>
        
              <Form.Item>
                <Button type="primary" htmlType="submit">NEXT</Button>
              </Form.Item>
        
            </Form>:''
            }


            {
              currentStep===3?<Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>:''
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
