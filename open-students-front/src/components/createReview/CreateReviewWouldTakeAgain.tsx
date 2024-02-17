import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useIntl } from "react-intl";

interface CreateReviewWouldTakeAgainProps {
  wouldTakeAgain: boolean;
  setWouldTakeAgain: (value: boolean) => void;
}

const CreateReviewWouldTakeAgain = ({
  wouldTakeAgain,
  setWouldTakeAgain,
}: CreateReviewWouldTakeAgainProps) => {
  const intl = useIntl();
  const textConstants = {
    wouldTakeAgainText: intl.formatMessage({ id: "wouldTakeAgainText" }),
    wouldNotTakeAgainText: intl.formatMessage({ id: "wouldNotTakeAgainText" }),
  };

  return (
    <ToggleButtonGroup
      value={wouldTakeAgain}
      exclusive
      onChange={() => setWouldTakeAgain(!wouldTakeAgain)}
    >
      <ToggleButton value={true} color="success" sx={{ textTransform: "none" }}>
        {textConstants.wouldTakeAgainText}
      </ToggleButton>
      <ToggleButton value={false} color="error" sx={{ textTransform: "none" }}>
        {textConstants.wouldNotTakeAgainText}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default CreateReviewWouldTakeAgain;
