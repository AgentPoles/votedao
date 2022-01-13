import React, { useState } from "react";
import {
  Stack,
  HStack,
  Tag,
  TagLabel,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { FcLock } from "react-icons/fc";

export default function SimpleCookiePreference({ arraye }) {
  return (
    <Stack p="4" m="4" borderRadius="sm">
      <Box>
        <Text fontSize={20} pb={5} fontWeight={"bold"}>
          Proposals
        </Text>
      </Box>
      <HStack spacing={4}>
        {false ? (
          <Text textColor={"gra.300"}>Empty</Text>
        ) : (
          arraye.map((item) => (
            <Tag
              size={"md"}
              key={item}
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>{item}</TagLabel>
            </Tag>
          ))
        )}
      </HStack>
    </Stack>
  );
}
