import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Spinner = () => {
  return (
    <Dimmer active>
      <Loader content='Loading from firebase'/>
    </Dimmer>
  );
};

export default Spinner;
