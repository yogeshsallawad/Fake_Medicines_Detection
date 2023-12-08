/*
import React, { useState } from 'react'
import './LoginSignup.css'

import user_icon from '../Imges/person.png'
import medicine_icon from '../Imges/drug.png'
import password_icon from '../Imges/password.png'
import calendar_icon from '../Imges/calendar.png'


const LoginSignup = () => {

    const [action,setAction] = useState(" AddMedicine ");
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action==="Verify"?<div></div>:<div className='input'>
                    <img src={user_icon} alt='icon' />
                    <input  placeholder='Manufacturer' type='text' />
                </div> }


                {action==="Verify"?<div></div>:<div className='input'>
                    <img src={medicine_icon} alt='' />
                    <input type='text' placeholder='Medicine Name' />
                </div> }

                
                {action==="Verify"?<div></div>: <div className='input'>
                    <img src={calendar_icon} alt='' />
                    <input type='text' placeholder='Manufacture Date' />
                </div>}
                
                {action==="Verify"?<div></div>:  <div className='input'>
                    <img src={calendar_icon} alt='' />
                    <input type='text' placeholder='Expiry Date' />
                </div>}
  
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input type='text' placeholder='Batch Number' />
                </div>

            </div>     
            <div className='submit-container'>
                <div className={action==="Verify"?"Submit gray":"submit"} onClick={()=>{setAction("AddMedicine")}}> AddMedicine</div>
                <div className={action==="Addmedicine"?"Submit gray":"submit"} onClick={()=>{setAction("Verify")}}>Verify</div>
            </div>
        </div>
    )
}

export default LoginSignup
*/

import React, { useState } from 'react';
import './LoginSignup.css';
import Web3 from 'web3';

const user_icon = require('../Imges/person.png');
const medicine_icon = require('../Imges/drug.png');
const password_icon = require('../Imges/password.png');
const calendar_icon = require('../Imges/calendar.png');
const web3 = new Web3(window.ethereum);
//const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"); // Replace with your Infura project ID
const contractAddress = "0xD0bd3cDC55d6b72fb9E529CCaCEA05e2c03B949e"; // Replace with your contract address
const contractABI = [[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "batchId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "medicineName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "manufacturer",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "manufacturingDate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			}
		],
		"name": "MedicineAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "batchId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "medicineName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "manufacturer",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "manufacturingDate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			}
		],
		"name": "MedicineVerified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_medicineName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_manufacturer",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_batchNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_manufacturingDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_expiryDate",
				"type": "uint256"
			}
		],
		"name": "addMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_batchId",
				"type": "bytes32"
			}
		],
		"name": "verifyMedicine",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
]; // Replace with your contract's ABI

const contract = new web3.eth.Contract(contractABI, contractAddress);

const LoginSignup = () => {
  const [action, setAction] = useState("AddMedicine");
  const [manufacturer, setManufacturer] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [batchNumber, setBatchNumber] = useState('');

  const addMedicine = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];

      await contract.methods
        .addMedicine(manufacturer, medicineName, manufactureDate, expiryDate, batchNumber)
        .send({ from: walletAddress });

      setManufacturer('');
      setMedicineName('');
      setManufactureDate('');
      setExpiryDate('');
      setBatchNumber('');

      console.log('Medicine details added successfully');
    } catch (error) {
      console.error("Error:", error);

    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === "Verify" ? <div></div> : <div className='input'>
          <img src={user_icon} alt='icon' />
          <input
            placeholder='Manufacturer'
            type='text'
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
        </div>}

        {action === "Verify" ? <div></div> : <div className='input'>
          <img src={medicine_icon} alt='' />
          <input
            type='text'
            placeholder='Medicine Name'
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
        </div>}

        {action === "Verify" ? <div></div> : <div className='input'>
          <img src={calendar_icon} alt='' />
          <input
            type='text'
            placeholder='Manufacture Date'
            value={manufactureDate}
            onChange={(e) => setManufactureDate(e.target.value)}
          />
        </div>}

        {action === "Verify" ? <div></div> : <div className='input'>
          <img src={calendar_icon} alt='' />
          <input
            type='text'
            placeholder='Expiry Date'
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>}

        <div className='input'>
          <img src={password_icon} alt='' />
          <input
            type='text'
            placeholder='Batch Number'
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
        </div>
      </div>
      <div className='submit-container'>
		
        <div className={action === "Verify" ? "Submit gray" : "submit"} onClick={() => { setAction("AddMedicine") }}> Add Medicine</div>
        <div className={action === "AddMedicine" ? "Submit gray" : "submit"} onClick={() => { setAction("Verify") }}>Verify</div>
        
      </div>
    </div>
  );
};

export default LoginSignup;




