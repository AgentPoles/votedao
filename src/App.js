import DaoPage from "./DaoPage";
import { useState, useEffect, useRef } from "react";
import { ethers, utils } from "ethers";
import abi from "./contracts/Dao.json";
import Result from "./components/Result";
import { useToast, Box, Flex, Spinner, Text } from "@chakra-ui/react";

function App() {
  const isMountedComponent = useRef(true);
  const toast = useToast();
  let proposes = [];

  //useState hooks
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isDaoCreator, setIsDaoCreator] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [totalNumberOfMember, setTotalNumberOfMembers] = useState(0);
  const [totalNumberOfProposal, setTotalNumberOfProposals] = useState(0);
  const [totalVoteCount, setTotalVoteCount] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [watchStates, setWatchStates] = useState(1);
  const [newProposal, setNewProposal] = useState(null);
  const [newVote, setNewVote] = useState();
  const [winningProposal, setWinningProposal] = useState();
  const [resultReady, setResultReady] = useState(false);
  const [error, setError] = useState(null);
  const [proposas, setProposas] = useState([]);

  //contract info
  const contractAddress = "0x2f101EaCa561b61d5e2C202Eb56f9fA7A91F8082";
  const contractABI = abi.abi;

  //functions
  const processArray = (array) => {
    proposes = [];
    array.map((item) => {
      proposes.push(item.toString());
    });
    setProposas(proposes);
  };

  const showMessageDefault = () => {
    toast({
      position: "bottom",
      render: () => (
        <Box color="white" p={3} bg="pink.600">
          <Flex direction={"row"}>
            <Text ml={2}>
              {
                "No Wallet detected, Please install a MetaMask wallet to use the Dao."
              }
            </Text>
          </Flex>
        </Box>
      ),
    });
  };

  const showMessage = (message) => {
    toast({
      position: "bottom",
      render: () => (
        <Box color="white" p={3} bg="blue.600">
          <Flex direction={"row"}>
            <Spinner mr={2} />
            <Text ml={2}>{message}</Text>
          </Flex>
        </Box>
      ),
    });
  };
  const showMessageb = (message) => {
    toast({
      position: "bottom",
      render: () => (
        <Box color="white" p={3} bg="pink.600">
          <Flex direction={"row"}>
            <Spinner mr={2} />
            <Text ml={2}>{message}</Text>
          </Flex>
        </Box>
      ),
    });
  };

  const showResultMessage = (message, status) => {
    toast({
      title: message,
      variant: "subtle",
      status: status,
      isClosable: true,
    });
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setIsWalletConnected(true);
        setUserAddress(account);
        console.log("Account Connected: ", account);
      } else {
        showMessageDefault();
        setError("Please install a MetaMask wallet to use the Dao.");
        console.log("No Metamask detected");
      }
    } catch (error) {}
  };

  const getTotalNumberOfMembers = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let total = await daoContract.totalNumberOfMembers();
        setTotalNumberOfMembers(total.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalNumberOfProposals = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let total = await daoContract.totalNumberOfProposals();
        setTotalNumberOfProposals(total.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalVoteCount = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let total = await daoContract.totalNumberOfVotes();
        setTotalVoteCount(total.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalProposals = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let total = await daoContract.totalNumberOfMembers();
        setTotalNumberOfMembers(total.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentState = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let total = await daoContract.currentState();
        console.log(total.toString());
        if (total.toString() === "0") {
          setCurrentState(" receiving Proposals");
        } else {
          if (total.toString() === "1") {
            setCurrentState(" receiving votes");
          } else {
            if (total.toString() === "2") {
              setCurrentState(" voting ended, get results");
            } else {
              setCurrentState(" dont get");
            }
          }
        }
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinDao = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        showMessageb("trying to connect your wallet");
        const txn = await daoContract.joinDao();

        showMessage("trying to register you");
        showResultMessage("you'll get notified when its completed", "info");
        await txn.wait();
        showResultMessage("you joined!", "success");
        console.log("you joined!");
        if (watchStates !== 0) {
          setWatchStates(5);
        }
      } else {
        showMessageDefault();
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to join the Dao.");
      }
    } catch (error) {
      showResultMessage(error.error.message, "error");
      console.log(error);
    }
  };

  const Vote = async () => {
    if (newProposal != null && newProposal.toString().length > 0) {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const daoContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          showMessageb("trying to connect your wallet");
          const txn = await daoContract.vote(newProposal);
          showMessage("trying to place your vote");
          showResultMessage("you'll get notified when its completed", "info");
          console.log("placing vote");

          await txn.wait();
          showResultMessage("you voted!", "success");
          console.log("voted", txn.hash);
          if (watchStates !== 0) {
            setWatchStates(6);
          }
        } else {
          showMessageDefault();
          console.log("Ethereum object not found, install Metamask.");
          setError("Please install a MetaMask wallet to use the Dao.");
        }
      } catch (error) {
        showResultMessage(error.error.message, "error");
        console.log(error);
      }
    }
  };

  const submitProposal = async () => {
    if (newProposal != null && newProposal.toString().length > 0) {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const daoContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          showMessageb("trying to connect your wallet");
          const txn = await daoContract.submitProposal(newProposal);
          showMessage("trying to submit your proposal");
          showResultMessage("you'll get notified when its completed", "info");
          console.log("submitting Proposal");

          await txn.wait();
          showResultMessage("proposal submitted!", "success");
          console.log("Proposal Submitted", txn.hash);
          if (watchStates !== 0) {
            setWatchStates(7);
          }
        } else {
          showMessageDefault();
          console.log("Ethereum object not found, install Metamask.");
          setError("Please install a MetaMask wallet to use the Dao.");
        }
      } catch (error) {
        showResultMessage(error.error.message, "error");
        console.log(error);
      }
    }
  };

  const allowProposals = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        showMessageb("trying to connect your wallet");
        const txn = await daoContract.allowProposals();
        showMessage("allowing submission of Proposals and new members");
        showResultMessage("you'll get notified when its done", "info");
        console.log("allowing proposals and new members");

        await txn.wait();
        setResultReady(false);
        // showResultMessage("no longer receiving proposals", "warning");
        showResultMessage(
          "Dao is receiving proposals and new Members!",
          "success"
        );
        console.log("You can Submit Proposals and Join Dao!", txn.hash);
        if (watchStates !== 0) {
          setWatchStates(8);
        }
      } else {
        showMessageDefault();
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      showResultMessage(error.error.message, "error");
      console.log(error);
    }
  };

  const allowVoting = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        showMessageb("trying to connect your wallet");
        const txn = await daoContract.allowVoting();
        showMessage("closing proposal submission and opening voting");
        showResultMessage("you'll get notified when its done", "info");
        console.log("ending proposal reception and allowing voting");

        await txn.wait();
        setResultReady(false);
        showResultMessage("no longer receiving proposals", "warning");
        showResultMessage("voting begins!", "success");
        console.log("voting begins!", txn.hash);
        if (watchStates !== 0) {
          setWatchStates(8);
        }
      } else {
        showMessageDefault();
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      showResultMessage(error.error.message, "error");
      console.log(error);
    }
  };

  const endVoting = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        showMessageb("trying to connect your wallet");
        const txn = await daoContract.endVoting();
        showMessage("closing voting and preparing results");
        showResultMessage("you'll get notified when its done", "info");
        console.log("ending proposal reception and allowing voting");

        await txn.wait();
        setResultReady(false);
        showResultMessage("no longer receiving votes", "warning");
        showResultMessage("voting ended!", "success");
        console.log("voting ended!", txn.hash);
        if (watchStates !== 0) {
          setWatchStates(9);
        }
      } else {
        showMessageDefault();
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      showResultMessage(error.error.message, "error");
      console.log(error);
    }
  };

  const refreshDao = async () => {
    showResultMessage(
      "Refreshing Dao causes records to be hypothetically lost",
      "warning"
    );

    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        showMessageb("trying to connect your wallet");
        const txn = await daoContract.refresh();
        showMessage("trying to reset the Dao");
        showResultMessage("you'll get notified when its completed", "info");
        console.log("refreshing Dao");

        await txn.wait();
        setResultReady(false);
        showResultMessage("Dao is clean", "success");
        console.log("Refreshed!", txn.hash);
        if (watchStates !== 0) {
          setWatchStates(10);
        }
      } else {
        showMessageDefault();
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      showResultMessage(error.error.message, "error");
      console.log(error);
    }
  };

  const getResult = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        showMessageb("trying to connect your wallet");
        const txn = await daoContract.getResults();
        showMessage("fetching result");
        showResultMessage("you'll get notified when its completed", "info");
        await txn.wait();
        showResultMessage("Results have been fetched!", "success");
        console.log("fetching Result");
        getWinningProposal();
        console.log("Results Ready!", txn.hash);
        setResultReady(true);
        if (watchStates !== 0) {
          setWatchStates(11);
        }
      } else {
        showMessageDefault();
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      showResultMessage(error.error.message, "error");
      console.log(error);
    }
  };

  const getListOfProposals = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let total = await daoContract.getProposals();
        processArray(total);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWinningProposal = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const daoContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let total = await daoContract.winningProposal();
        setWinningProposal(total.toString());

        console.log(proposas);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use the Dao.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isMountedComponent.current) {
      checkIfWalletIsConnected();
      getTotalNumberOfMembers();
      getTotalNumberOfProposals();
      getTotalVoteCount();
      getCurrentState();
      getListOfProposals();
      setWatchStates(1);
    } else {
      return () => {
        isMountedComponent.current = false;
      };
    }
  }, [
    isWalletConnected,
    totalNumberOfMember,
    totalNumberOfProposal,
    totalVoteCount,
    currentState,
    watchStates,
  ]);

  return (
    <div className="App">
      <DaoPage
        totalNumberOfMembers={totalNumberOfMember}
        totalNumberOfProposals={totalNumberOfProposal}
        totalVoteCount={totalVoteCount}
        currentState={currentState}
        joinDao={joinDao}
        setProposal={setNewProposal}
        vote={Vote}
        submitProposal={submitProposal}
        allowProposals={allowProposals}
        allowVoting={allowVoting}
        endVoting={endVoting}
        refresh={refreshDao}
        result={getResult}
        resultReady={resultReady}
        winningProposal={winningProposal}
        proposals={proposas}
      ></DaoPage>
    </div>
  );
}

export default App;
