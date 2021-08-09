import { Card ,Statistic , Row, Col} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React ,{useState,useEffect} from 'react'
import {getDeals,getTurnover,getUserNumber} from '../../../../api/systemApi'
import { LineChart ,Chart,Line,Point,Tooltip} from 'bizcharts';
function Display() {
  const [deals, setdDeals] = useState();
  const [turnover, setTurnover] = useState();
  const [userNumber, setUserNumber] = useState();
  const getData = async ()=>{
      setTurnover(await getTurnover());
      setdDeals(await getDeals());
      setUserNumber(await getUserNumber());
  }
  useEffect(async ()=>{
    getData()
  },[])
    return (
      <>
<div style={{display:'flex',flexFlow:'column'}}>
       
  <div style={{flex:1}}>
      <LineChart
        data={turnover?turnover.reverse():[]}
        title={{
          visible: true,
          text: <span style={{fontSize:25,marginBottom:50,display:'inline-block'}}>近6个月销售额</span>,
        }}
        description={{
          visible: true,
          text: '单位：(元)',
        }}
        xField='month'
        yField='price'
        interactions={[]}
      />
  </div>
  <div style={{flex:1,display:'flex',marginTop:50}}>
    <Card size="small" title="用户数量" style={{ width: '50%' }}>
        <div style={{display:'flex'}}>
            <span style={{fontSize:20}}>
            注册用户数：{userNumber&&userNumber[1].number}<br/>
            本月新增用户数：{userNumber&&userNumber[0].number}
            </span>
        </div>
      
    </Card>
    <Card size="small" title="本月交易笔数"  style={{ width: '50%' }}>
            <span style={{fontSize:50}}>{deals&&deals[0].number}</span>
    </Card>
  </div>
</div>

{/* <Chart
    appendPadding={[10, 0, 0, 10]}
    autoFit
    height={300}
    data={turnover}
    scale={{ value: { min: 0, alias: '近6个月销售额', type: 'linear-strict' }, year: { range: [0, 1] } }}
>

    <Line position="month*price" />
    <Point position="month*price" />
    <Tooltip showCrosshairs />
</Chart> */}




         {/* <Card title="用户数量" extra={<a href="#">More</a>} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card> */}
      </>
    )
}

export default Display
