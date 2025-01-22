import { Button, Stack } from "@mui/material";
import { UserProfileFormSchema } from "../type";
import { UseFormReturn } from "react-hook-form";

type ActionBoxProps = {
  formProps: UseFormReturn<UserProfileFormSchema>;
  editMode: boolean;
  toggleMode: () => void;
};

export function ActionBox({ editMode, toggleMode }: ActionBoxProps) {
  const onEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMode();
  };

  if (editMode) {
    return (
      <Stack direction="row" spacing="1rem">
        <Button type="reset" variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing="1rem">
      <Button type="button" variant="contained" onClick={onEdit}>
        Edit
      </Button>
    </Stack>
  );
}
