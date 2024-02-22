import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import { useSetRecoilState } from "recoil";
import { currentNavbarFocus } from "@/atoms/defaultAtoms";

const LandingPage = () => {
  const intl = useIntl();
  const setSearchBarFocus = useSetRecoilState(currentNavbarFocus);

  const textConstants = {
    landingTitleText: intl.formatMessage({ id: "landingTitle" }),
    landingDescriptor: intl.formatMessage({ id: "landingDescriptor" }),
    landingBulletSearch: intl.formatMessage({ id: "landingBulletSearch" }),
    landingBulletRead: intl.formatMessage({ id: "landingBulletRead" }),
    landingBulletReview: intl.formatMessage({ id: "landingBulletReview" }),
    landingStartedButton: intl.formatMessage({ id: "landingStartedButton" }),
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl mb-2 text-primary mt-40">
        {textConstants.landingTitleText}
      </h2>
      <p className="mb-12 text-primary">{textConstants.landingDescriptor}</p>
      <ul className="mb-12 text-xl text-gray-500">
        <li>• {textConstants.landingBulletSearch}</li>
        <li>• {textConstants.landingBulletRead}</li>
        <li>• {textConstants.landingBulletReview}</li>
      </ul>
      <Button className="w-64" onClick={() => setSearchBarFocus(true)}>
        {textConstants.landingStartedButton}
      </Button>
    </div>
  );
};

export default LandingPage;
