import { useIntl } from "react-intl";

const LandingPage = () => {
  const intl = useIntl();
  const textConstants = {
    landingTitleText: intl.formatMessage({ id: "landingTitle" }),
    landingDescriptor: intl.formatMessage({ id: "landingDescriptor" }),
    landingBulletSearch: intl.formatMessage({ id: "landingBulletSearch" }),
    landingBulletRead: intl.formatMessage({ id: "landingBulletRead" }),
    landingBulletReview: intl.formatMessage({ id: "landingBulletReview" }),
    landingStartedButton: intl.formatMessage({ id: "landingStartedButton" }),
  };

  return (
    <div>
      <h2>{textConstants.landingTitleText}</h2>
      <p>{textConstants.landingDescriptor}</p>
      <ul>
        <li>{textConstants.landingBulletSearch}</li>
        <li>{textConstants.landingBulletRead}</li>
        <li>{textConstants.landingBulletReview}</li>
      </ul>
      <button>{textConstants.landingStartedButton}</button>
    </div>
  );
};

export default LandingPage;
