import { useCallback, useState } from "react";

export const useInputMask = (mask: string) => {
  const [value, setValue] = useState("");

  const applyMask = useCallback((inputValue: string, maskPattern: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = inputValue.replace(/\D/g, "");

    let maskedValue = "";
    let numberIndex = 0;

    for (let i = 0; i < maskPattern.length && numberIndex < numbers.length; i++) {
      if (maskPattern[i] === "X") {
        maskedValue += numbers[numberIndex];
        numberIndex++;
      } else {
        maskedValue += maskPattern[i];
      }
    }

    return maskedValue;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const maskedValue = applyMask(inputValue, mask);
      setValue(maskedValue);
    },
    [mask, applyMask],
  );

  return {
    value,
    onChange: handleChange,
    setValue,
  };
};

// Máscaras específicas
export const useBirthdayMask = () => {
  return useInputMask("XX/XX/XXXX");
};

export const useCpfMask = () => {
  return useInputMask("XXX.XXX.XXX-XX");
};
