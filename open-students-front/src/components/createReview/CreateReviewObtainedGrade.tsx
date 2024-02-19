import { useIntl } from "react-intl";
import { Slider } from "../ui/slider";

interface CreateReviewObtainedGradeProps {
  obtainedGrade: number;
  setObtainedGrade: (value: number) => void;
}
const CreateReviewObtainedGrade = ({
  obtainedGrade,
  setObtainedGrade,
}: CreateReviewObtainedGradeProps) => {
  const intl = useIntl();
  const textConstants = {
    minimumGradeError: intl.formatMessage({ id: "minimumGradeError" }),
    obtainedGradeText: intl.formatMessage({ id: "obtainedGradeText" }),
  };
  const handleSliderChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setObtainedGrade(newValue);
  };

  return (
    <div>
      <Slider
        value={[obtainedGrade]}
        defaultValue={[2.5]}
        min={1.5}
        max={5}
        step={0.01}
        onValueChange={handleSliderChange}
        classNameTrack={`bg-red-500`}
        classNameThumb={`border-red-500`}
      />
      <span>{`${textConstants.obtainedGradeText}: ${obtainedGrade}`}</span>
    </div>
  );
};

export default CreateReviewObtainedGrade;
