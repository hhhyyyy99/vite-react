import React from "react"

const Example = (props:any) => {
  const {value} = props;
  if(value && value < 5){
    console.log("value is less", value);
    return null
  }
  console.log(props);
  return (<>{value}</>)
}

export default Example