import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { FileArchive } from "lucide-react";
import axios from "axios";

export default function RadioButton({ transcription }) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleExtract = async () => {
    const baseUrl = "http://10.168.131.232:31460/api/v1/transcription-parser";
    if (transcription?.length === 0) {
      alert("Transcription is empty");
      return;
    }
    try {
      if (selectedValue === "progress") {
        const progressResponse = await axios.post(baseUrl, {
          transcription_type: "PROGRESS",
          text: transcription,
        });
        if (progressResponse?.data?.status.code < 300) {
          console.log(progressResponse.data?.response, "((((");
          navigate("/progress", { state: progressResponse.data?.response });
        }
      } else if (selectedValue === "soap") {
        const soapResponse = await axios.post(baseUrl, {
          transcription_type: "SOAP",
          text: transcription,
        });
        console.log(soapResponse.data?.response, "((((");
        if (soapResponse?.data?.status.code < 300) {
          navigate("/soap", { state: soapResponse.data?.response });
        }
      }
    } catch (error) {
      console.error("Error extracting report", error);
    }
  };

  return (
    <FormControl
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "right",
        gap: "100px",
      }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedValue}
        onChange={handleRadioChange}
        style={{ marginTop: "15px" }}>
        <FormControlLabel
          value="progress"
          control={<Radio />}
          label="Progress"
        />
        <FormControlLabel value="soap" control={<Radio />} label="SOAP" />
      </RadioGroup>

      <button
        onClick={handleExtract}
        disabled={!selectedValue}
        className="mt-4 bg-gradient-to-r from-[#79bcff] to-[#748bff] hover:shadow-md text-white font-semibold flex flex-row items-center gap-2.5 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed">
        <FileArchive size={20} />
        Extract
      </button>
    </FormControl>
  );
}
