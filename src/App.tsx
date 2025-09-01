import { Flex, Image, MantineProvider, Stack } from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider forceColorScheme="dark">
      <Stack w="95vw" h="100vh">
        <Flex className="topbar" justify="space-between">
          <div>Siena</div>
          <div style={{ position: "relative" }}>
            0% Complete
            <Image
              className="lulog"
              src="https://lumonmerchandising.com/cdn/shop/files/lumon_logo-black-png_4a7c637e-96dd-45e7-a02e-eba67561a7e7.png?v=1743065319"
              h="3.6em"
              w="auto"
              pos="absolute"
              top="-1em"
              right="-6.5em"
            />
          </div>
        </Flex>
        <div style={{ position: "relative" }}>
          <div className="line" style={{ position: "absolute", top: "-1em" }} />
          <div className="line" style={{ position: "absolute", top: "-0.4em" }} />
        </div>
      </Stack>
    </MantineProvider>
  );
}

export default App;
