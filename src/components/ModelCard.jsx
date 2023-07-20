import {
    Row,
    Col,
    Card,
    Tag,
    Space,
    Tooltip,
    Avatar,
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

  let img;
  
  // if(model.modelCover1!=null&&model.modelCover1!='null'&&model.modelCover1){
  //   // 
  //   if(typeof(model.modelCover1)=='string'){
  //     let imgs=JSON.parse(model.modelCover1)
  //     console.log(imgs)
  //   }
  // }

  if(model.modelCover&&model.modelCover.coverImgList ){
                    let modelCover= model.modelCover
                    img=modelCover.coverImgList[0];
                    
                    try {
                      if(typeof(img)=='string') img=JSON.parse(img)[0]
                    } catch (error) {
                      
                    }
                    if(img&&img.length>0)img=img[0];

                    if(img&&img.length<3) img=''
                    
                   }
                   let cateGory1=model.cateGory1,
                   cateGory2=model.cateGory2||[];

                   if(cateGory2&&typeof(cateGory2)==='string') cateGory2=cateGory2.split(",");

                   let modelId=model.modelId,modelName=model.modelName;

    return <Card
    hoverable
   style={{ width,margin:24 }}
     bordered={true}
     className="card-project"
     cover={<img alt={modelName||''} 
     src={img||defaultCard} />}
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