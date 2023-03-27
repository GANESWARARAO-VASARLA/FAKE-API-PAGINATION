//import sidebar from './sidebar'
import axios from 'axios';
import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import '../App.css';
const CountriesTables = () => {
    const [Countries,setCountries] = useState([])
    const [loading,setloading] = useState(false)
    const [modeldata,setModeldata] = useState({
      id:'',
      name:'',
      country:'',
      website:'',
      logo:'',
      slogan:'',
      head_quaters:'',
      established:''
   })
    const getCountries = async () => {
      try{
        const res = await axios.get("https://api.instantwebtools.net/v1/airlines")
        .then(res => {
            setCountries(res.data);
        })
        setloading(true)
      }catch (error){
          console.log(error);

      }
    } ;

    const showDetail = (id) =>
    {
      
      fetch(`https://api.instantwebtools.net/v1/airlines/${id}`)
      .then(resposne=> resposne.json())
      .then(res=>setModeldata(res))
    }
     
    const columns = [{
      name: "ID",
      selector:(row) =>row.id,
      sortable:true,

    },{
      name: "NAME",
      selector:(row) =>row.name,
    },
    {
      name: "AIRLINE",
      selector:(row) =>row.country,
    },
    {
      name: "Country Flag",
      selector:(row) =>
        <img  width={50} height={50} src={row.logo} />
       
    },
    {
        name: "ACTION",
        cell:(row) =><button className='btn btn-primary' onClick={(e)=>showDetail(row.id)} data-toggle="modal" data-target="#myModal">VIEW</button>
      },
    
  ];
   
  useEffect(() =>{
    getCountries();
   },[]);

    return (
      <div>
         {loading ?
   <div>
    <DataTable title="Passenger List" columns={columns} data={Countries} pagination fixedHeader fixedHeaderScrollHeight='450px' selectableRowsHighlight highlightOnHover />
    <div class="modal" id="myModal">
        <div class="modal-dialog" style={{width:"700px"}}>
          <div class="modal-content"> 
          <center>
             <p><img  width={60} height={60} src={modeldata.logo} /></p>   
    
              <p>ID  :   {modeldata.id}</p>   
              <p>NAME  :   {modeldata.name}</p>  
              <p>COUNTRY :   {modeldata.country}</p>
              <p>WEBSITE :   {modeldata.website}</p>
              <p>ESTABLISHED :  {modeldata.established}</p>
              <p>SLOGAN : {modeldata.slogan}</p>
              <p>HEAD_QUATERS : {modeldata.head_quaters}</p>
              </center>    
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
          </div>
          </div> </div>
     : <center><ReactBootstrap.Spinner animation="border" className='App-heade'/> </center>}
     </div>
);   
};
export default CountriesTables;