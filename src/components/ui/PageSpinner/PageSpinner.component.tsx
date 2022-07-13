import React, { useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authAwaitSelector } from "../../../store/auth/reducers/auth.reducer";

// eslint-disable-next-line react/require-default-props
const PageSpinner = (props: {spin?: boolean | null;}) => {
  const {
    spin = null,
  } = props;

  const authAwait = useSelector(authAwaitSelector);

  const isLoading = useMemo(() => authAwait || (spin !== null && spin), [authAwait, spin]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="page-spainner__wrap">
      <div className="page-spainner">
        <Spinner animation="border" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  )
}

export default PageSpinner;