import React, { useState } from "react";

import { Heading, VStack, Text, Divider } from "@chakra-ui/layout";
import { FormControl, FormLabel, Button } from "@chakra-ui/react";
import { questionPropsType } from "../types/quiz_types";

export const QuestionCard: React.FC<questionPropsType> = ({
  question,
  options,
  questionNo,
  score,
  callback,
}) => {
  const [selectedAns, setSelectedAns] = useState("");

  const handleSelection = (e: any) => {
    setSelectedAns(e.target.value);
  };

  return (
    <VStack
      backgroundColor="white"
      borderColor="grey.200"
      borderWidth="2px"
      p="8"
      borderRadius="lg"
      w="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "50vw" }}
    >
      <Heading as="h4" size="md" textColor="red.500">
        Score: {score}
      </Heading>
      <Divider />
      <div>
        <Heading as="h4" size="md" textColor="blackAlpha.700" mb="12">
          Question {questionNo + 1} / 10
        </Heading>
      </div>

      <div>
        <Text fontSize="lg" mb="4">
          <strong>Question: </strong> {question}
        </Text>
      </div>

      <form
        onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
      >
        <FormControl>
          <FormLabel>Select an option</FormLabel>
          {options.map((currentOption: string, ind: number) => {
            return (
              <div key={ind}>
                <input
                  type="radio"
                  name="opt"
                  required
                  value={currentOption}
                  checked={selectedAns === currentOption}
                  onChange={handleSelection}
                />{" "}
                {currentOption}
              </div>
            );
          })}

          <Button type="submit" mt="4" w="150px">
            Next
          </Button>
        </FormControl>
      </form>
    </VStack>
  );
};
