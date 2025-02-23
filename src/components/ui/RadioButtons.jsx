import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { FileArchive } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { showEmptyTranscriptionWarning } from "../../utils/errorModel/noTranscription";
import {
  saveTranscription,
  getStoredTranscription,
} from "../../utils/transcriptionStorage";
import { Loading } from "../ui/Loading";

export default function RadioButton({ transcription }) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const handleExtract = async () => {
    const baseUrl = "http://10.168.131.232:31460/api/v1/transcription-parser";

    if (transcription?.length === 0) {
      showEmptyTranscriptionWarning();
      return;
    }

    setIsLoading(true);

    // Save current transcription to local storage
    saveTranscription(transcription);

    toast.promise(
      (async () => {
        try {
          const currentTranscription = getStoredTranscription();

          if (selectedValue === "progress") {
            const progressResponse = await axios.post(baseUrl, {
              transcription_type: "Progress",
              text: currentTranscription,
            });
            if (progressResponse?.data?.status.code < 300) {
              navigate("/progress", { state: progressResponse.data?.response });
            }
          } else if (selectedValue === "soap") {
            const soapResponse = await axios.post(baseUrl, {
              transcription_type: "SOAP",
              text: currentTranscription,
            });
            if (soapResponse?.data?.status.code < 300) {
              navigate("/soap", { state: soapResponse.data?.response });
            }
          }
        } catch (error) {
          console.error("Error extracting report", error);
          throw error;
        } finally {
          setIsLoading(false);
        }
      })(),
      {
        loading: "Extracting report...",
        success: "Report extracted successfully!",
        error: "Failed to extract report",
      }
    );
  };

  return (
    <FormControl
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "right",
        gap: "100px",
      }}
    >
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedValue}
        onChange={handleRadioChange}
        style={{ marginTop: "15px" }}
      >
        <FormControlLabel
          value="progress"
          control={<Radio />}
          label="Progress"
        />
        <FormControlLabel value="soap" control={<Radio />} label="SOAP" />
      </RadioGroup>

      <button
        onClick={handleExtract}
        disabled={!selectedValue || isLoading}
        className="mt-4 bg-gradient-to-r from-[#79bcff] to-[#748bff] hover:shadow-md text-white font-semibold flex flex-row items-center gap-2.5 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <Loading size="sm" /> : <FileArchive size={20} />}
        {isLoading ? "Extracting..." : "Extract"}
      </button>
    </FormControl>
  );
}
