import "./App.css";
import React, { useState } from "react";
import {
  Provider,
  defaultTheme,
  Button,
  TextField,
  View,
  Text,
} from "@adobe/react-spectrum";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [colorScheme, setColorScheme] = useState(getSystemTheme());

  React.useEffect(() => {
    const listener = (e) => setColorScheme(e.matches ? "dark" : "light");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener);
    };
  }, []);

  const convertToRoman = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://roman-numeral-converter-green.vercel.app/convert?num=${input}`
        // `http://127.0.0.1:5000/convert?num=${input}` //to run API locally
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setOutput("");
      } else {
        setOutput(data.roman);
      }
    } catch (err) {
      setError("Failed to connect to a server");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Provider theme={defaultTheme} colorScheme={colorScheme}>
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
          <View marginTop="size-200">
            {loading && <Text>Loading...</Text>}
            {error && <Text UNSAFE_style={{ color: "red" }}>{error}</Text>}
            {output && (
              <Text>
                <b>Roman Numeral: </b>
                {output}
              </Text>
            )}
          </View>
        </View>
      </Provider>
    </div>
  );
}

export default App;
