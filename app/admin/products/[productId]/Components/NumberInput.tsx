"use client";

import "../styles/numberInput.css";
import { capitalizeAndReplace } from "@/utils";
import {
  CheckIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useContext, useRef } from "react";
import {
  Button,
  FieldError,
  Group,
  Input,
  Label,
  NumberField,
  Text,
} from "react-aria-components";
import { EditProductContext } from "./context";
import { Button as MUIButton } from "@mui/material";
import classNames from "classnames";
import { editAttribute } from "./EditAttribute.action";
import { TNumberAttributes } from "./ProductPage";

interface INumberInputProps {
  defaultValue?: number;
  maxValue?: number;
  minValue?: number;
  label: string;
  description?: string;
}

export default function NumberInput({
  defaultValue,
  maxValue,
  minValue,
  label,
  description,
}: INumberInputProps) {
  const { setEditState, editState, activeInput, setActiveInput, product } =
    useContext(EditProductContext);
  const inputRef = useRef(null);
  const isEditing = editState[label as TNumberAttributes].editing;

  return (
    <NumberField
      name={label}
      defaultValue={defaultValue || 0}
      minValue={minValue}
      maxValue={maxValue}
    >
      <Label>{capitalizeAndReplace(label)}</Label>
      <Group>
        <Button
          className={classNames(
            { "opacity-0 pointer-events-none cursor-not-allowed": !isEditing },
            "grid transition-all"
          )}
          slot="decrement"
        >
          <MinusIcon width={20} />
        </Button>
        <Input
          key={`${isEditing}`}
          disabled={!isEditing}
          autoFocus={isEditing}
          className={classNames(
            "transition-all border-2 border-transparent react-aria-Input",
            { "border-secondary-dark": isEditing }
          )}
          ref={inputRef}
        />
        <Button
          className={classNames(
            { "opacity-0": !isEditing },
            "grid transition-all"
          )}
          slot="increment"
          isDisabled={!isEditing}
        >
          <PlusIcon width={20} />
        </Button>

        <MUIButton
          type={isEditing ? "submit" : "button"}
          id={label}
          variant="outlined"
          color="secondary"
          onClick={async () => {
            setEditState((state: any) => ({
              ...state,
              [label]: {
                editing: !isEditing,
                text: (inputRef.current as any).value,
              },
            }));

            if (inputRef.current && isEditing) {
              await editAttribute(product?.id, {
                key: label,
                value: parseInt((inputRef.current as any).value),
              });
            }

            if (activeInput === label) {
              setActiveInput("");
              return;
            }

            if (activeInput) document.getElementById(activeInput)?.click();
            setActiveInput(label);
          }}
        >
          {!isEditing ? <PencilIcon width={25} /> : <CheckIcon width={25} />}
        </MUIButton>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError />
    </NumberField>
  );
}
