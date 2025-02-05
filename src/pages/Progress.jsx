import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Box,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import { progressResponse } from "../lib/data";
import { useLocation } from "react-router-dom";
import { generatePDF } from "../services/PDFGenerator";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // indigo
    },
    secondary: {
      main: "#7986cb", // light indigo
    },
    background: {
      default: "#e8eaf6", // very light indigo
    },
  },
});

const Progress = () => {
  const location = useLocation();
  const data = location.state || {};

  const [progressData, setProgressData] = useState(data);

  const handleInputChange = (key, value, parentKey = null) => {
    setProgressData((prevData) => {
      const newData = { ...prevData };

      if (parentKey) {
        newData[parentKey] = { ...newData[parentKey], [key]: value };
      } else {
        newData[key] = value;
      }

      return newData;
    });
  };

  const renderField = (key, value, depth = 0, parentKey = null) => {
    if (value === null || value === undefined) return null; 

    const labelText = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    if (typeof value === "object" && !Array.isArray(value)) {
      return (
        <Card key={key} variant="outlined" sx={{ mt: 2, ml: depth * 2 }}>
          <CardHeader
            title={
              <Typography variant="h6" color="primary">
                {labelText}
              </Typography>
            }
          />
          <CardContent>
            {Object.entries(value).map(([subKey, subValue]) => {
              if (subValue === value) {
                console.warn(
                  `Skipping potential infinite recursion for key: ${key}`
                );
                return null;
              }

              return subValue
                ? renderField(subKey, subValue, depth + 1, key)
                : null;
            })}
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Box key={key} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            {labelText}:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={value || ""}
            onChange={(e) => handleChange(key, e.target.value, parentKey)}
            multiline
            rows={value?.length > 100 ? 4 : 2}
          />
        </Box>
      );
    }
  };

  const handleDownload = async () => {
    await generatePDF(progressData, "Progress Notes");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{ py: 4, bgcolor: "background.default", minHeight: "100vh" }}>
        <Card elevation={3}>
          <CardHeader
            title={
              <Typography
                variant="h4"
                align="center"
                color="#ffffff"
                gutterBottom>
                Progress Notes
              </Typography>
            }
            sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}
          />
          <CardContent>
            {progressData &&
              Object.entries(progressData).map(([key, value]) =>
                renderField(key, value)
              )}
          </CardContent>
        </Card>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}>
            Download
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Progress;
