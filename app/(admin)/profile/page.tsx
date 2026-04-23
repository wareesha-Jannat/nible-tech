import ChangePassword from "./change-password/ChangePassword";
import PersonalInfoSection from "./personal-info/PersonalInfoSection";

const page = () => {
  return (
    <>
      <PersonalInfoSection />
      <ChangePassword />
    </>
  );
};

export default page;
