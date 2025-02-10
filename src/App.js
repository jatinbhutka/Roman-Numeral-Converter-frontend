import "./App.css";
import React, { useState } from "react";
import {
  Provider,
  defaultTheme,
  Button,
  TextField,
  View,
  Text,
  Form,
} from "@adobe/react-spectrum";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertToRoman = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/romannumeral?query=${input}`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setOutput("");
      } else {
        setOutput(data.output);
      }
    } catch (err) {
      setError("Failed to connect to a server");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Provider theme={defaultTheme} colorScheme="dark">
        <h1>Roman Numeral Converter</h1>
        <View padding="size-200" maxWidth="size-3600">
          <TextField
            label="Enter a number (1-3999)"
            value={input}
            onChange={setInput}
            type="number"
          />

          <Button
            variant="accent"
            onPress={convertToRoman}
            isDisabled={loading}
            marginTop="size-200"
          >
            Convert to roman numeral
          </Button>

          {loading && <Text>Loading...</Text>}
          {error && (
            <View marginTop="size-200">
              <Text color="negative">{error}</Text>
            </View>
          )}
          {output && (
            <View marginTop="size-200">
              <Text>Roman Numeral: {output}</Text>
            </View>
          )}
        </View>
      </Provider>
    </div>
  );
}

export default App;
