import PropTypes from "prop-types"; // Importe PropTypes para validação de props
import { TextField } from "@mui/material";
import { forwardRef } from "react";
import { PatternFormat } from "react-number-format";

const CustomTextField = forwardRef(function CustomTextField(
  { inputRef, ...other },
  ref
) {
  return <TextField {...other} inputRef={inputRef || ref} />;
});

CustomTextField.displayName = "CustomTextField";

CustomTextField.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export function InputCpf(props) {
  return (
    <PatternFormat
      format="###.###.###-##"
      mask="_"
      customInput={CustomTextField}
      required
      fullWidth
      label="CPF"
      id="cpf"
      {...props}
    />
  );
}

export function InputCep(props) {
  return (
    <PatternFormat
      format="#####-###"
      mask="_"
      customInput={CustomTextField}
      required
      fullWidth
      label="CEP"
      id="cep"
      {...props}
    />
  );
}
