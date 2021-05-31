import React from "react";
import MemeCreationPage from "./MemeCreationPage";

const MemeCreationPageWrapper = () => {
  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    // <ThemeProvider theme={theme}>
    // <CssBaseline />
    <MemeCreationPage />
    // </ThemeProvider>
  );
};

export default MemeCreationPageWrapper;
