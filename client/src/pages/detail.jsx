import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from "react-hot-toast";

const Detail = () => {
  const [courseDetail, setCourseDetail] = React.useState();

  const courseID = useParams().courseID;
  const navigate = useNavigate();

  const findCourse = () =>{

  }

  if (!courseID) {
    navigate("/catalog");
    toast.error("Course Not Found!")
  }

  return (
    <div>Detail</div>
  )
}

export default Detail