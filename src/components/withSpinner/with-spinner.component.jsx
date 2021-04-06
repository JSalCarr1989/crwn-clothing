import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";
//HOC Component
// const withSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
//   return isLoading ? (
//     <SpinnerOverlay>
//       <SpinnerContainer />
//     </SpinnerOverlay>
//   ) : (
//     <WrappedComponent {...otherProps} />
//   );
// };

//HOC Mas explicito
const withSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

  return Spinner;
};

export default withSpinner;
