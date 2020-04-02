import React, { useContext, useState } from "react";
import { Context } from "./Context";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
export const Wrapper = styled.div`
  margin-top: 2rem;
`;
const Warning = styled.p`
  color: red;
`;
export default function FullAddress() {
  const { fullAddress, setFullAddress, isError, setIsError } = useContext(
    Context
  );
  const [isEditable, setIsEditable] = useState(false);

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };
  const handleBlur = value => {
    value ? setIsError(false) : setIsError(true);
    console.log(isError);
  };
  const validate = () => {};
  const separatedAddress = fullAddress.map(component => (
    <Wrapper key={`${component.long_name}  ${component.types}`}>
      <TextField
        autoFocus
        onChange={e => {
          component.long_name = e.target.value;
          setFullAddress([...fullAddress]);
        }}
        value={component.long_name}
        color="secondary"
        label={component.types}
        variant="outlined"
        disabled={isEditable ? false : true}
        error={component.long_name ? false : true}
        onBlur={component.long_name ? setIsError(false) : setIsError(true)}
      />
    </Wrapper>
  ));
  return (
    <div>
      {fullAddress.length > 0 && (
        <>
          <FormControl error={isError}>{separatedAddress}</FormControl>
          <div onClick={toggleEditable}>
            <EditIcon /> <span>{isEditable ? "Save" : "Edit"}</span>
          </div>
          {isError && <Warning>Please, fill all the fields</Warning>}
        </>
      )}
    </div>
  );
}
