import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useIntl } from "react-intl";
import { Period } from "../../utils/types";
import { useEffect } from "react";

interface CreateReviewPeriodsProps {
  selectedPeriod: Period | null;
  setSelectedPeriod: (value: Period) => void;
  periods: Period[];
  showError: boolean;
  setShowError: (value: boolean) => void;
}

const CreateReviewPeriods = ({
  selectedPeriod,
  setSelectedPeriod,
  periods,
  showError,
  setShowError,
}: CreateReviewPeriodsProps) => {
  const intl = useIntl();
  const periodMap = new Map<string, Period>();

  useEffect(() => {
    periodMap.clear();
    periods.forEach((period) => {
      periodMap.set(period.id, period);
    });
  });

  const textConstants = {
    periodNotSelectedError: intl.formatMessage({
      id: "periodNotSelectedError",
    }),
    selectPeriodText: intl.formatMessage({ id: "selectPeriodText" }),
  };

  const handleSelectChange = (e: { target: { value: string } }) => {
    setSelectedPeriod(periodMap.get(e.target.value as string)!);
    setShowError(e.target.value === "");
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="selected-period-label">
        {textConstants.selectPeriodText}
      </InputLabel>
      <Select
        label={textConstants.selectPeriodText}
        labelId="selected-period-label"
        value={selectedPeriod ? selectedPeriod.name : ""}
        onChange={handleSelectChange}
      >
        <MenuItem value="" disabled>
          {textConstants.selectPeriodText}
        </MenuItem>
        {periods.map((period, index) => (
          <MenuItem value={period.id} key={index}>
            {period.name}
          </MenuItem>
        ))}
      </Select>
      {showError && (
        <Typography variant="body2" sx={{ color: "red", marginTop: 1 }}>
          {textConstants.periodNotSelectedError}
        </Typography>
      )}
    </FormControl>
  );
};

export default CreateReviewPeriods;
