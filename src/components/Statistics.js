import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
// import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { BsPlusSquareDotted } from "react-icons/bs";

function StatsCard(props) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"1"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"} flexWrap={"wrap"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            fontWeight={"medium"}
            isTruncated
            fontSize={{ base: "13px", sm: "13", md: "15px", lg: "18px" }}
          >
            {title}
          </StatLabel>
          <StatNumber
            fontSize={{ base: "20px", sm: "20", md: "24px", lg: "26px" }}
            fontWeight={"medium"}
          >
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("green.800", "green.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics(props) {
  const { member, proposals, votes, currentState } = props;
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Flex direction={"row"} align={"center"} justifyContent={"center"}>
        {" "}
        <Text
          textAlign={"center"}
          fontSize={{ base: "18px", sm: "18", md: "19px", lg: "20px" }}
          py={10}
          pr={1}
          fontWeight={"bold"}
          textColor={"pink.500"}
        >
          Current State:
        </Text>
        <Text
          textAlign={"center"}
          fontSize={{ base: "16px", sm: "16", md: "18px", lg: "19px" }}
          py={10}
          pl={1}
          fontWeight={"bold"}
        >
          {currentState}
        </Text>
      </Flex>
      <SimpleGrid columns={{ base: 3, md: 3 }} spacing={{ base: 3, lg: 5 }}>
        <StatsCard
          title={"members"}
          stat={member}
          icon={<BsPerson size={"2em"} />}
        />
        <StatsCard
          title={"proposals"}
          stat={proposals}
          icon={<FiServer size={"2em"} />}
        />
        <StatsCard
          title={"vote count"}
          stat={votes}
          icon={<BsPlusSquareDotted size={"2em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
