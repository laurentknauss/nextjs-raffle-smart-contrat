
import Image from 'next/image'; 
import styles from '../styles/Home.module.css'; 
import { contractAddresses, abi } from "../constants"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { FaHourglassHalf } from 'react-icons/fa';
import { useNotification } from "web3uikit"
import { ethers } from "ethers"



export default function LotteryEntrance() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    // console.log(`ChainId is ${chainId}`)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // State hooks
    // https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables
    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const [raffleState, setRaffleState] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        msgValue: entranceFee,
        params: {},
    })

       
    const { runContractFunction : getRaffleState } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, 
        functionName: "getRaffleState",
        params: {},
    }) 


    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getPlayersNumber } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUIValues() {
        // Another way we could make a contract call:
        // const options = { abi, contractAddress: raffleAddress }
        // const fee = await Moralis.executeFunction({
        //     functionName: "getEntranceFee",
        //     ...options,
        // })
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getPlayersNumber()).toString()
        const raffleStateFromCall = (await getRaffleState()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall)
        setNumberOfPlayers(numPlayersFromCall)
        setRaffleState(raffleStateFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])
    // no list means it'll update everytime anything changes or happens
    // empty list means it'll run once after the initial rendering
    // and dependencies mean it'll run whenever those things in the list change

    // An example filter for listening for events, we will learn more on this next Front end lesson
    // const filter = {
    //     address: raffleAddress,
    //     topics: [
    //         // the name of the event, parnetheses containing the data type of each event, no spaces
    //         utils.id("RaffleEnter(address)"),
    //     ],
    // }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>            
            
                <h1 className={styles.heading}> 
                <br />         
                 Powered by
                 <br /> 
                 Chainlink
                  <br /> 
                 VRF & Automation
                  <br />
            </h1>
            <br /> 
            <br /> 

            {raffleAddress ? (
                <>
                {raffleState ==="1"?(
                    <div className="flex flex-col items-center text-white">
                        <FaHourglassHalf size={50} className="animate-spin bg-blue-500"/>
                        <p>Raffle is calculating the winner right now , please wait a few moments...</p> 
                        </div> 
                ):( 
                <div> 
                    <p className="text-[#1877f2] text-center font-bold  py-4 px-4  text-2xl">OPEN   
                        <br /> 
                        <br /> 
                     </p>
                    
                    <button className="flex justify-center  items-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                           onClick={async () =>
                            await enterRaffle({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <p> 
                            Enter the Lottery for only{''} {ethers.utils.formatUnits(entranceFee, "ether")} ETH 
                            </p>
                        )}
                    </button>
                    
                    <div className="text-[#fffaff] py-4 px-4 font-bold text-2xl"> 
                        <br /> 
                      <br />                    
                    <div className="justify-center  text-center">
                    Current number of players <br /> 
                      [ {numberOfPlayers} ] <br /> 
                    
                    <br /> 
                    <span className="justify-center flex text-center "> 
                    Previous winner<br />
                     {recentWinner} 
                    <br />  
                  </span> 
               </div>
            </div>
         </div>        
       )}
         </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    
  );
}