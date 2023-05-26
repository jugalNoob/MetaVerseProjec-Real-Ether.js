import React,{useEffect,useState} from 'react'
import * as THREE from 'three';
import { ethers } from 'ethers';
import abi from './ABI.json';
import "./style/meta.css"
import { useHistory } from 'react-router-dom';

function Meta() {


  
  const history=useHistory();

  
  const [userData , setUserData]=useState()


  const callAbout=async()=>{

    try {
      const res=await fetch("/Cont",{
method:"GET",
headers:{
  Accept:"application/json",
  "Content-Type": "application/json",
},
credentials:"include"

      })

      const data=await res.json()
      console.log(data)
      setUserData(data)
      if(!res.status===200){
        const error=new Error(res.error)
        throw error;
      }
      

    } catch (error) {

      console.log(error)
      history.push("/login")
     
      
    }

  }
  useEffect(()=>{
    callAbout()
  },[])



 //Web3 Provider ///////
 const [state , setState]=useState({
    provide:null,
    signer:null,
    address:null
})


const contractAddress="0x6C18560b700074CF1Fdc20220489f4BC9844Fb37";


//address
const [Addresss, setAddresss]=useState();

useEffect(()=>{
const Checker=async()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const account=await provider.send("eth_requestAccounts", []);
  const signer=provider.getSigner()
  const address = await signer.getAddress()
  // console.log("this is account " + account)
  // console.log("this is signer " + signer.toString())
  // console.log(address)
  setAddresss(address)
  setState({provider , signer , address})   


}

Checker()
},[])


const [bal, setBal] = useState();

useEffect(() => {
  const All = async () => {
    const { provider, address } = state;
    if (provider) { // Check if provider is defined before accessing its methods
      const balance = await provider.getBalance(address);
      const balaether = ethers.utils.formatEther(balance, "ether");
      setBal(balaether);
    }
  };
  All();
}, [state]);



useEffect(() => {
    const initMetaverse = async () => {
      const { signer } = state;
      const contract = new ethers.Contract(contractAddress, abi, signer);
  
      try {
        const ownedNFTs = await contract.getOwnerObjects();
        console.log("jugal");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
  
        const geometry_area = new THREE.BoxGeometry(100, 0.2, 50);
        const material_area = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const area = new THREE.Mesh(geometry_area, material_area);
        scene.add(area);
        camera.position.z = 5;
  
        document.body.appendChild(renderer.domElement);
        const nftMeshes = []; // Array to store NFT meshes
  
        for (let i = 0; i < ownedNFTs.length; i++) {
          const nftInfo = ownedNFTs[i];
          const geometry = new THREE.BoxGeometry(nftInfo.w, nftInfo.h, nftInfo.d);
          const material = new THREE.MeshBasicMaterial({ color: 0x008200 });
          const nft = new THREE.Mesh(geometry, material);
          scene.add(nft);
          nft.position.set(nftInfo.x, nftInfo.y, nftInfo.z);
          nftMeshes.push(nft); // Store the NFT mesh in the array
        }
  
        const animate = () => {
          for (let i = 0; i < nftMeshes.length; i++) {
            const nft = nftMeshes[i]; // Access the NFT mesh from the array
            nft.rotation.x += 0.01;
            nft.rotation.y += 0.01;
          }
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
  
        animate();
      } catch (error) {
        console.error("Error calling getOwnerObjects():", error);
      }
    };
  
    initMetaverse();
  }, [state]);
  



  //Inputes metahods start row class//////////!SECTION
const [name , setName]=useState()
const [width , setWidth]=useState()
const [height , setHeight]=useState()
const [depth , setDepth]=useState()
const [nft_x , setNft_x]=useState()
const [nft_y , setNft_Y]=useState()
const [nft_z , setNft_Z]=useState()


const Mintes=async()=>{

    const {signer}=state;
    const contract = new ethers.Contract(contractAddress, abi, signer);
   const overrides = {
        value: ethers.utils.parseEther('0.1'), // the cost of minting
      };
    const mints=await contract.mint(name , width , height , depth , nft_x , nft_y , nft_z , overrides)

    console.log(mints)

}



  return (
    <div>
        {/* <h1>{bal}</h1> */}
<h1>{Addresss  ? Addresss  : "not connect"}</h1>
<h1>{bal ? bal :" balance not show"}</h1>

<div className="metaver-mint">

<center>


<input type="text" name="" id=""  onChange={(e)=>setName(e.target.value)} placeholder='enter  name'/>

<input type="text" name="" id=""    onChange={(e)=>setHeight(e.target.value)} placeholder='enter width'/>

<input type="text" name="" id=""   onChange={(e)=>setWidth(e.target.value)} placeholder='enter  height'/>

<input type="text" name="" id=""   onChange={(e)=>setDepth(e.target.value)}  placeholder='enter  depth'/>

<input type="text" name="" id=""   onChange={(e)=>setNft_x(e.target.value)} placeholder='enter  x'/>

<input type="text" name="" id=""   onChange={(e)=>setNft_Y(e.target.value)} placeholder='enter  y'/>

<input type="text" name="" id=""   onChange={(e)=>setNft_Z(e.target.value)}  placeholder='enter  z'/>
<br />
<button onClick={Mintes}>nft-mints</button>
</center>
</div>

    </div>
  )
}

export default Meta