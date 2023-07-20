import {
    Row,
    Col,
    Card,
    Tag,
    Space,
    Tooltip,
    Carousel,
    Radio,
    Switch,
    Upload,
    message,
  } from "antd";
  
  import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    VerticalAlignTopOutlined,
  } from "@ant-design/icons";


  import EllipsisMiddle from "./EllipsisMiddle"

  import defaultCard from "../assets/images/00068-212406485.png";


  const getRandomColor=()=>{
    const colors=["magenta","red","volcano","gold","lime","green","cyan","geekblue","purple"]
    return colors[Math.ceil(Math.random()*colors.length)-1]
  }

  

const card=(model,width=240)=>{
  model=model||{}
  let imgs=model.sampleImgFileLinks||[];
  
  let cateGory1=model.cateGory1,
   cateGory2=model.cateGory2||[];

  if(cateGory2&&typeof(cateGory2)==='string') cateGory2=cateGory2.split(",");

  let modelId=model.modelId,modelName=model.modelName;

    return <Card
    hoverable
    style={{ width,margin:24 }}
     bordered={true}
     className="card-project"
     cover={<Carousel autoplay>
      {
        Array.from(imgs,img=>{
        return <div>
          <img alt={modelName||''} 
              src={img||defaultCard} />
        </div>
        })
      }
    </Carousel>}
   >

<Tooltip placement="top" title={modelId}>
<Tag 
    style={{width:120,marginBottom:12}}
    color={'orange'}
    ><EllipsisMiddle suffixCount={12}>
{modelName||''}
</EllipsisMiddle></Tag>
        </Tooltip>

    
     <Space size={[0, 8]} wrap>
       {
         Array.from([cateGory1,...cateGory2].filter(f=>f),(c,i)=><Tag color={i==0?'blue':getRandomColor()}>{c}</Tag>)
       }
   </Space>
    
     {/* <Row gutter={[6, 0]} className="card-footer">
       <Col span={12}>
         <Button type="button">VIEW MODEL</Button>
       </Col>
       <Col span={12} className="text-right">
         <Avatar.Group className="avatar-chips">
           <Avatar size="small" src={profilavatar} />
           <Avatar size="small" src={convesionImg} />
           <Avatar size="small" src={convesionImg2} />
           <Avatar size="small" src={convesionImg3} />
         </Avatar.Group>
       </Col>
     </Row> */}
   </Card>
}

export default card