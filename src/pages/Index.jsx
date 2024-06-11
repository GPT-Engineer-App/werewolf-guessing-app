import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Button, Box, HStack, useToast } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

const roles = ["人狼", "人狼", "村人", "村人", "村人", "占い師", "怪盗"];
const names = ["いちろう", "じろう", "さぶろう", "ななこ", "はなこ"];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [messages, setMessages] = useState([]);
  const [finalRoles, setFinalRoles] = useState([]);
  const [initialRoles, setInitialRoles] = useState([]);
  const [gameResult, setGameResult] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      evaluateGame();
    }
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    const shuffledRoles = shuffleArray([...roles]).slice(0, 5);
    const initialRoles = names.map((name, index) => ({ name, role: shuffledRoles[index] }));
    setInitialRoles(initialRoles);
    const finalRoles = [...initialRoles];
    const messages = [];

    initialRoles.forEach((player, index) => {
      if (player.role === "占い師") {
        const target = getRandomElement(initialRoles.filter((_, i) => i !== index));
        messages.push(`${player.name}は占い師です。${target.name}は${target.role}です。`);
      } else if (player.role === "村人") {
        messages.push(`${player.name}は村人です。`);
      } else if (player.role === "人狼") {
        const randomMessage = Math.random();
        if (randomMessage < 0.33) {
          messages.push(`${player.name}は村人です。`);
        } else if (randomMessage < 0.66) {
          const target = getRandomElement(initialRoles.filter((_, i) => i !== index && initialRoles[i].role !== "占い師"));
          messages.push(`${player.name}は占い師です。${target.name}は村人です。`);
        } else {
          const target = getRandomElement(initialRoles.filter((_, i) => i !== index && initialRoles[i].role !== "人狼"));
          messages.push(`${player.name}は占い師です。${target.name}は人狼です。`);
        }
      } else if (player.role === "怪盗") {
        const target = getRandomElement(initialRoles.filter((_, i) => i !== index));
        const targetRole = target.role;
        finalRoles[index].role = targetRole;
        finalRoles[names.indexOf(target.name)].role = "怪盗";
        if (targetRole !== "人狼") {
          messages.push(`${player.name}は怪盗でした。${target.name}と役職を交換して${targetRole}になりました。`);
        } else {
          const randomMessage = Math.random();
          if (randomMessage < 0.5) {
            messages.push(`${player.name}は村人です。`);
          } else {
            const otherTarget = getRandomElement(initialRoles.filter((_, i) => i !== index && initialRoles[i].name !== target.name));
            messages.push(`${player.name}は怪盗でした。${otherTarget.name}は村人です。`);
          }
        }
      }
    });

    setMessages(messages);
    setFinalRoles(finalRoles);
    setGameStarted(true);
  };

  const evaluateGame = (selectedPlayer = null) => {
    const werewolves = finalRoles.filter((player) => player.role === "人狼");
    if (selectedPlayer) {
      if (selectedPlayer.role === "人狼") {
        setGameResult("プレイヤーの勝利！");
      } else {
        setGameResult("プレイヤーの敗北");
      }
    } else {
      if (werewolves.length === 0) {
        setGameResult("プレイヤーの勝利！");
      } else {
        setGameResult("プレイヤーの敗北");
      }
    }
  };

  const handlePlayerSelection = (player) => {
    evaluateGame(player);
  };

  const resetGame = () => {
    setGameStarted(false);
    setTimeLeft(180);
    setMessages([]);
    setFinalRoles([]);
    setInitialRoles([]);
    setGameResult(null);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {!gameStarted ? (
        <VStack spacing={4}>
          <Text fontSize="2xl">昨晩「たろう」が亡くなりました。</Text>
          <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={startGame}>
            スタート
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Text fontSize="2xl">ゲーム開始！</Text>
          <Text>
            残り時間: {Math.floor(timeLeft / 60)}分{timeLeft % 60}秒
          </Text>
          {messages.map((message, index) => (
            <Text key={index}>{message}</Text>
          ))}
          <HStack spacing={4}>
            {names.map((name, index) => (
              <Button key={index} colorScheme="teal" onClick={() => handlePlayerSelection(finalRoles[index])}>
                {name}を吊る
              </Button>
            ))}
            <Button colorScheme="red" onClick={() => evaluateGame()}>
              誰も吊らない
            </Button>
          </HStack>
          {gameResult && (
            <Box>
              <Text fontSize="2xl" color={gameResult.includes("勝利") ? "black" : "red"}>
                {gameResult}
              </Text>
              <Button
                colorScheme="blue"
                onClick={() =>
                  toast({
                    title: "役職確認",
                    description: (
                      <Box>
                        <Text>初期役職:</Text>
                        {initialRoles.map((player, index) => (
                          <Text key={index}>
                            {player.name}: {player.role}
                          </Text>
                        ))}
                        <Text>最終役職:</Text>
                        {finalRoles.map((player, index) => (
                          <Text key={index}>
                            {player.name}: {player.role}
                          </Text>
                        ))}
                      </Box>
                    ),
                    status: "info",
                    duration: null,
                    isClosable: true,
                  })
                }
              >
                誰がどの役職かを確認する
              </Button>
              <Button colorScheme="green" onClick={resetGame}>
                リトライ
              </Button>
            </Box>
          )}
        </VStack>
      )}
    </Container>
  );
};

export default Index;
