import { Button,Table,Modal,Form, Input,  DatePicker  } from 'antd';
import React ,{useState,useEffect} from 'react'
import {getCourseList} from '../../../../api/consoleApi'
import moment from 'moment'
import CourseTable from './CourseTable';

function CourseList() {
  const [state, setState] = useState()


  const fn = (data) => {
    setState({
        parentText: data //把父组件中的parentText替换为子组件传递的值
    },() =>{
       console.log(state);//setState是异步操作，但是我们可以在它的回调函数里面进行操作
    });

}
    return (
      <>
        <CourseTable></CourseTable>
      </>
    )
}

export default CourseList
