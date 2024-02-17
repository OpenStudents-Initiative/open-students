import { TextField, Typography } from "@mui/material";
import { useIntl } from "react-intl";

interface CreateReviewTextFieldProps {
  reviewText: string;
  setReviewText: (value: string) => void;
  showError: boolean;
  setShowError: (value: boolean) => void;
}

const CreateReviewTextField = ({
  reviewText,
  setReviewText,
  showError,
  setShowError,
}: CreateReviewTextFieldProps) => {
  const intl = useIntl();
  const textConstants = {
    createReviewText: intl.formatMessage({ id: "createReviewText" }),
    textfieldCannotBeEmpty: intl.formatMessage({
      id: "textfieldCannotBeEmpty",
    }),
  };

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setReviewText(e.target.value);
    setShowError(false); // Hide the error message if text field is not empty
  };

  const handleBlur = () => {
    // Show error message if text field is empty on blur
    setShowError(reviewText.trim().length < 5);
  };

  return (
    <div>
      <TextField
        placeholder={textConstants.createReviewText}
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={reviewText}
        onChange={handleTextFieldChange}
        onBlur={handleBlur}
        sx={{ resize: "vertical" }}
      />

      {showError && (
        <Typography variant="body2" sx={{ color: "red", marginTop: 1 }}>
          {textConstants.textfieldCannotBeEmpty}
        </Typography>
      )}
    </div>
  );
};

export default CreateReviewTextField;

