import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, SpinnerIcon } from "@chakra-ui/icons";

const Statebar = ({
  allowVoting,
  endVoting,
  refresh,
  result,
  allowProposals,
}) => {
  return (
    <div>
      <Flex direction={"row"} justifyContent={"space-between"}>
        <HStack>
          <Menu fontSize={{ base: "12px", sm: "12", md: "14px", lg: "15px" }}>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  fontSize={{ base: "10px", sm: "10", md: "14px", lg: "15px" }}
                  rightIcon={<ChevronDownIcon />}
                >
                  Change Status
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => allowProposals()}>
                    Receive Proposals
                  </MenuItem>
                  <MenuItem onClick={() => allowVoting()}>
                    Allow Voting
                  </MenuItem>
                  <MenuItem onClick={() => endVoting()}>End Voting</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
          <Button
            bgGradient='linear(to-r, green.200, pink.500) size="md"'
            fontSize={{ base: "10px", sm: "10", md: "14px", lg: "15px" }}
            onClick={() => result()}
          >
            Get Result
          </Button>
        </HStack>
        <Button
          leftIcon={<SpinnerIcon />}
          bg={"pink.700"}
          color={"white"}
          variant="solid"
          fontSize={{ base: "10px", sm: "10", md: "14px", lg: "15px" }}
          maxW={"150"}
          m={5}
          onClick={() => refresh()}
        >
          Refresh Dao
        </Button>
      </Flex>
    </div>
  );
};

export default Statebar;
