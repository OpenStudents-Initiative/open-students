import { TextField } from "@mui/material";

interface CreateReviewTextFieldProps {
    placeholder: string;
    reviewText: string;
    setReviewText: React.Dispatch<React.SetStateAction<string>>;
}

const CreateReviewTextField = ({ placeholder, reviewText, setReviewText }: CreateReviewTextFieldProps) =>
    <TextField
        placeholder={placeholder}
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ resize: 'vertical' }}
    />

export default CreateReviewTextField;