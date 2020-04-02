import React, { useState, useContext } from "react";
import PlacesAutocomplete, {
  geocodeByAddress
} from "react-places-autocomplete";
import Input from "@material-ui/core/Input";
import { Context } from "./Context";
import FullAddress from "./FullAddress";
import styled from "styled-components";

export default function AddressInput() {
  const [address, setAddress] = useState("");
  const { setFullAddress } = useContext(Context);
  const handleSelect = async value => {
    try {
      const results = await geocodeByAddress(value);

      setAddress(value);
      setFullAddress(results[0].address_components);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input {...getInputProps({ placeholder: "Type address" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <FullAddress />
    </div>
  );
}
