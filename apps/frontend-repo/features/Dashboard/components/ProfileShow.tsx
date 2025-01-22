import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { UserProfileFormSchema } from "../type";
import { getFormattedDate } from "@/utils/general";
import { UseFormReturn } from "react-hook-form";

type ProfileShowProps = {
  formProps: UseFormReturn<UserProfileFormSchema>;
};

export function ProfileShow({ formProps }: ProfileShowProps) {
  const { getValues } = formProps;
  const { name, email, avatar, created_at, updated_at } = getValues();
  const { formattedDate: createdAtDate, timeZone: createdAtTimeZone } =
    getFormattedDate({ date: created_at });
  const { formattedDate: updatedAtDate, timeZone: updatedAtTimeZone } =
    getFormattedDate({ date: updated_at });

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      width="100%"
      spacing="3rem"
      maxWidth={{ xs: "450px", md: "800px" }}
      minHeight="300px"
    >
      <Card sx={{ flex: 3, width: "full", p: "1em" }}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
        >
          <Stack direction="column" width="full">
            <Typography fontWeight={700} fontSize="1rem">
              Name
            </Typography>
            <Typography>{name}</Typography>
          </Stack>
          <Stack direction="column" width="full">
            <Typography fontWeight={700} fontSize="1rem">
              Email
            </Typography>
            <Typography>{email}</Typography>
          </Stack>
          <Stack direction="column" width="full">
            <Typography fontWeight={700} fontSize="1rem">
              Joined
            </Typography>
            <Typography>{`${createdAtDate} (${createdAtTimeZone})`}</Typography>
          </Stack>
          <Stack direction="column" width="full">
            <Typography fontWeight={700} fontSize="1rem">
              Last Updated
            </Typography>
            <Typography>{`${updatedAtDate} (${updatedAtTimeZone})`}</Typography>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ flex: 2, width: "full" }}>
        <CardMedia
          component="img"
          sx={{
            height: "100%",
            maxHeight: { xs: "300px", md: undefined },
            objectFit: { xs: "contain", md: "cover" },
          }}
          image={avatar}
          alt={name}
        />
      </Card>
    </Stack>
  );
}
