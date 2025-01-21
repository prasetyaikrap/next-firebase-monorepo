import { useState } from "react";
import { ZodObject, ZodRawShape, ZodTypeAny } from "zod";

export type UseFormProps<T extends Record<string, any> = Record<string, any>> =
  {
    defaultValues: T;
    schema?: ZodObject<ZodRawShape, "strip", ZodTypeAny, T, T>;
  };

export function useForm<T extends Record<string, any> = Record<string, any>>({
  defaultValues,
  schema,
}: UseFormProps<T>) {
  const defaultErrorsObject = transformErrorObject<T>(defaultValues);
  const [fieldForm, setFieldForm] = useState<T>(defaultValues);
  const [errors, setErrors] = useState(defaultErrorsObject);
  const [formLoading, setFormLoading] = useState(false);

  const setValues = (values: Partial<T>) => {
    setFieldForm((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const setErrorsHandler = (values: Partial<typeof defaultErrorsObject>) => {
    setErrors((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const reset = () => {
    setFieldForm(defaultValues);
  };

  const validate = () => {
    if (!schema) {
      setErrors(defaultErrorsObject);
      return {
        success: true,
        message: "no schema for validation",
        data: fieldForm,
      };
    }

    const { success, data, error } = schema.safeParse(fieldForm);

    if (!success) {
      setErrors(() => {
        const result = defaultErrorsObject;
        error.errors.forEach((err) => {
          assignErrors(result, err.path, err.message);
        });

        return { ...result };
      });
      return { success, message: "validation failed", data };
    }

    setErrors(defaultErrorsObject);
    return { success, message: "validation success", data };
  };

  const handleSubmit = async (onValid?: (data: T) => Promise<void>) => {
    setFormLoading(true);
    if (schema) {
      const { success } = validate();
      if (!success) return;
    }

    await onValid?.(fieldForm);
    setFormLoading(false);
  };

  return {
    fieldForm,
    setValues,
    errors,
    setErrors: setErrorsHandler,
    reset,
    handleSubmit,
    formLoading,
    validate,
  };
}

type TransformedObject<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
    ? TransformedObject<U>[]
    : T[K] extends object
      ? TransformedObject<T[K]>
      : { message: string };
};

function transformErrorObject<T extends object>(
  input: T
): TransformedObject<T> {
  const result: any = {};

  for (const key in input) {
    const value = input[key];

    if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? transformErrorObject(item)
          : { message: "" }
      );
    } else if (typeof value === "object" && value !== null) {
      result[key] = transformErrorObject(value as object);
    } else {
      result[key] = { message: "" };
    }
  }

  return result as TransformedObject<T>;
}

function assignErrors(
  obj: any,
  keys: (string | number)[],
  value: string
): void {
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (typeof key === "number") {
      if (!Array.isArray(current)) {
        current = [];
      }
      if (!current[key]) {
        current[key] = {};
      }
    } else {
      if (!current[key as string]) {
        current[key as string] = {};
      }
    }

    current = current[key as string | number];
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey as string | number].message = value;
}
