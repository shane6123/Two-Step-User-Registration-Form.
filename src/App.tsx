
import { Typography } from "@mui/material";
import Form from "./Components/Form"
import FormDataTable from "./Components/FormDataTable"
import { useSelector } from "react-redux";



function App() {
  const tableData = useSelector((state ) => state.tableData);
  console.log(tableData)
  // const data = [
   
  //   {
   
  //     name: "Tiger Nixon",
  //     position: "System Architect",
  //     salary: "$320,800",
  //     start_date: "2011/04/25",
  //     office: "Edinburgh",
  //     extn: "5421",
  //     phone:'1234567890',
  //     idType:'Aadhar',
  //     id:'1234567890',
  //     sex:'Male',
  //     address:'xyz',
  //     state:'Maharashtra',
  //     city:'Mumbai',
  //     country: 'India',
  //     pincode:'400001'

  //   },
  //   {
  
  //     name: "Garrett Winters",
  //     position: "Accountant",
  //     salary: "$170,750",
  //     start_date: "2011/07/25",
  //     office: "Tokyo",
  //     extn: "8422",
  //     phone:'1234567890',
  //     idType:'Aadhar',
     
     
  //     id:'1234567890',
  //     sex:'Male',
  //     address:'xyz',
  //     state:'Maharashtra',
  //     city:'Mumbai',
  //     country: 'India',
  //     pincode:'400001'

  //   },
  //  {
   
  //   name: "Ashton Cox",
  //   position: "Junior Technical Author",
  //   salary: "$86,000",
  //   start_date: "2009/01/12",
  //   office: "San Francisco",
  //   extn: "1562",
  //   phone:'1234567890',
  //   idType:'Aadhar',
  //   id:'1234567890',
  //   sex:'Male',
  //   address:'xyz',
  //   state:'Maharashtra',
  //   city:'Mumbai',
  //   country: 'India',
  //   pincode:'400001'
  //   },
  //   {
   
  //     name: "Cedric Kelly",
  //     position: "Senior Javascript Developer",
  //     salary: "$433,060",
  //     start_date: "2012/03/29",
  //     office: "Edinburgh",
  //     extn: "6224",
  //     phone:'1234567890',
  //     idType:'Aadhar',
  //     id:'1234567890',
  //     sex:'Male',
  //     address:'xyz',
  //     state:'Maharashtra',
  //     city:'Mumbai',
  //     country: 'India',
  //     pincode:'400001'
  //   },
  //   {
    
  //     name: "Airi Satou",
  //     position: "Accountant",
  //     salary: "$162,700",
  //     start_date: "2008/11/28",
  //     office: "Tokyo",
  //     extn: "5407",
  //     phone:'1234567890',
  //     idType:'Aadhar',
  //     id:'1234567890',
  //     sex:'Male',
  //     address:'xyz',
  //     state:'Maharashtra',
  //     city:'Mumbai',
  //     country: 'India',
  //     pincode:'400001'
  //   },
   
  // ];
  
  const columns = [
    { data: "fullName", title: "Full Name" },
    {data:"phone",title:"Phone"},
    {data:"idType",title:"Id Type"},
    {data:"id",title:"Id"},
    {data:"sex" , title :"Sex"},
    {data:"address",title:"Address"},
    {data:"state",title:"State"},
    {data:"city",title:"City"},
    {data:"country",title:"Country"},
    {data:"pincode",title:"Pincode"}
  ];
 

  return (
    <>
    <Form/>
    <hr 
    style={{
      color: 'blue',
      backgroundColor: 'black',
      height: 1,
      width:'100%',
      marginBottom:'30px'
    } 
  }
    
    />
    {/* <Typography variant="h4" component="h4" sx={{textAlign:'center',marginBottom:'30px'}}>Registration Data</Typography> */}

    <FormDataTable   data={tableData} columns={columns} />
    </>
  )
}

export default App
