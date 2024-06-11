import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Box bg="gray.100" p={4}>
      <Flex justify="space-between">
        <Button as={Link} to="/" variant="link">
          Home
        </Button>
        <Button as={Link} to="/rules" variant="link">
          Rules
        </Button>
      </Flex>
    </Box>
  );
};

export default Navigation;
