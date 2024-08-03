import Header from "../components/Header";
import AppFooter from "./modules/viewsCefetMoney/AppFooter";
import FirstSection from "./modules/viewsCefetMoney/FirstSection";
import SecondSection from "./modules/viewsCefetMoney/SecondSection";
import ThirdSection from "./modules/viewsCefetMoney/ThirdSection";

export default function CefetMoney() {
  return (
    <>
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <AppFooter />
    </>
  );
}
