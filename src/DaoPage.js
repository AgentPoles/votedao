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

const DaoPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Box
        mr={{ base: 1, sm: 1, md: 7, lg: 20 }}
        ml={{ base: 1, sm: 1, md: 7, lg: 20 }}
        p={{ base: 1, sm: 1, md: 5, lg: 5 }}
        mt={5}
        borderWidth={1}
        borderColor={"#2C7A7B"}
        borderRadius={0}
      >
        <Statebar></Statebar>
        <Statistics member={0} proposals={0} votes={0}></Statistics>
        <Stack p={1}>
          <Proposals arraye={[1, 2, 3, 4]} />
        </Stack>
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
              placeholder="Enter Proposal"
              size="lg"
              alignSelf={"center"}
              borderColor={"#2C7A7B"}
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
              >
                Vote Proposal
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Box>
      <Footer></Footer>
    </div>
  );
};

export default DaoPage;
