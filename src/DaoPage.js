import React from "react";
import {
  Flex,
  Spacer,
  Box,
  useColorModeValue,
  Button,
  SimpleGrid,
  Stack,
  Input,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Statistics from "./components/Statistics";
import Proposals from "./components/Proposals";
import "./App.css";
import Contents from "./components/Content";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { Container } from "@chakra-ui/react";
import Statebar from "./components/Statebar";
import Footer from "./components/Footer";
import Result from "./components/Result";

const DaoPage = ({
  totalNumberOfMembers,
  totalNumberOfProposals,
  totalVoteCount,
  currentState,
  joinDao,
  setProposal,
  vote,
  submitProposal,
  allowVoting,
  endVoting,
  refresh,
  result,
  resultReady,
  winningProposal,
  proposals,
  allowProposals,
}) => {
  const handleChange = (e) => {
    setProposal(e.target.value);
  };
  return (
    <div>
      <NavBar joinDao={joinDao}></NavBar>
      <Box
        mr={{ base: 1, sm: 1, md: 7, lg: 20 }}
        ml={{ base: 1, sm: 1, md: 7, lg: 20 }}
        p={{ base: 1, sm: 1, md: 5, lg: 5 }}
        mt={5}
        borderWidth={1}
        borderColor={"#2C7A7B"}
        borderRadius={0}
      >
        <Statebar
          allowVoting={allowVoting}
          endVoting={endVoting}
          refresh={refresh}
          result={result}
          allowProposals={allowProposals}
        ></Statebar>
        <Statistics
          member={totalNumberOfMembers}
          proposals={totalNumberOfProposals}
          votes={totalVoteCount}
          currentState={currentState}
        ></Statistics>
        <Stack p={1}>
          <Proposals arraye={proposals} />
        </Stack>
        {resultReady ? (
          <Result winningProposal={winningProposal}></Result>
        ) : (
          <Stack align={"center"}>
            <Flex
              p={10}
              alignContent={"center"}
              direction={"column"}
              w={"70%"}
              justifyContent={"center"}
            >
              <Input
                maxW={"400"}
                placeholder="Enter Proposal (number)"
                size="lg"
                alignSelf={"center"}
                type={"number"}
                borderColor={"#2C7A7B"}
                onChange={(e) => handleChange(e)}
              />

              <Flex
                directon={"row"}
                spacing="40px"
                justifyContents={"center"}
                alignSelf="center"
              >
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="green"
                  variant="solid"
                  maxW={"150"}
                  m={5}
                  fontSize={{ base: "12px", sm: "12", md: "14px", lg: "15px" }}
                  onClick={() => submitProposal()}
                >
                  Add Proposal
                </Button>
                <Spacer></Spacer>
                <Button
                  leftIcon={<CheckIcon />}
                  colorScheme="green"
                  variant="solid"
                  fontSize={{ base: "12px", sm: "12", md: "14px", lg: "15px" }}
                  maxW={"150"}
                  m={5}
                  onClick={() => vote()}
                >
                  Vote Proposal
                </Button>
              </Flex>
            </Flex>
          </Stack>
        )}
      </Box>
      <Footer></Footer>
    </div>
  );
};

export default DaoPage;
