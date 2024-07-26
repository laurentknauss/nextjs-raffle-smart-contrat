
import Image from 'next/image'; 
import styles from '../styles/Home.module.css'; 
import { ConnectButton } from "web3uikit";
import React, {useState, useEffect}  from 'react'; 


// Define a custom loader function for images
const customLoader = ({ src  }) => {
    return src ;
  };


export default function Header() {

    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setIsVisible(prev => !prev);
      }, 1000); // Toggle visibility every 1000ms (1 second)
  
      return () => clearInterval(intervalId);
    }, []);



    return (
        <>
            <nav className="flex flex-col md:flex-row items-center justify-between p-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-0">
                 Decentralized Raffle</h1>
            <div className={`${styles.imageContainer} w-full md:w-auto flex justify-center items-center mb-4 md:mb-0`}>
                <Image
                loader={customLoader} 
                src="/chainlink.png"
                alt="chainlink"
                width={300} 
                height={300}                
                priority
                />
                </div>


       <div className="w-full md:w-auto flex flex-col items-center md:items-end">
        <div className="text-3xl md:text text-4xl lg:text-6xl font-bold mb-4 md:mb-0"
         style={{ 
          visibility: isVisible ? 'visible' : 'hidden',
          color: '#fffaff', 
          text: '4xl',
          marginBottom: '120px' ,
          marginTop: '120px'
        }}
        >
           A random winner picked every 10 minutes 
        </div>
        </div>
        </nav> 

        <div className="w-full flex justify-center mt-8">    
                <ConnectButton 
                moralisAuth={false}
                
                />
                </div> 
            </>
        
    );
}