import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { UserProfileFormSchema } from "../type";
import { UseFormReturn } from "react-hook-form";

type ProfileEditProps = {
  formProps: UseFormReturn<UserProfileFormSchema>;
};
export function ProfileEdit({ formProps }: ProfileEditProps) {
  const {
    register,
    watch,
    formState: { errors, isLoading, isSubmitting },
    setValue,
  } = formProps;
  const formLoading = isLoading || isSubmitting;

  const { name, avatar, _avatar_render, _avatar_current } = watch();

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      width="100%"
      spacing="3rem"
      maxWidth={{ xs: "450px", md: "800px" }}
      minHeight="300px"
    >
      <Card elevation={4} sx={{ flex: 3, width: "full", p: "1em" }}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              {...register("name")}
              type="text"
              placeholder="Buddy E."
              autoFocus
              required
              fullWidth
              variant="outlined"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              color={errors.name?.message ? "error" : "primary"}
              disabled={formLoading}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              {...register("email")}
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              color={errors.email?.message ? "error" : "primary"}
              disabled={formLoading}
            />
          </FormControl>
        </CardContent>
      </Card>
      <Card elevation={4} sx={{ flex: 2, width: "full", p: "1em" }}>
        <CardMedia
          component="img"
          sx={{
            height: { xs: "300px", md: "250px" },
            objectFit: { xs: "contain", md: "cover" },
          }}
          onError={() => setValue("avatar", _avatar_current)}
          image={avatar}
          alt={name}
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", width: "full" }}
        >
          <FormControl sx={{ width: "full" }}>
            <FormLabel htmlFor="_avatar_render">Add your image url</FormLabel>
            <Stack width="full" direction="row" spacing="1rem">
              <TextField
                {...register("_avatar_render")}
                placeholder="https://your-image-url"
                autoFocus
                required
                fullWidth
                variant="outlined"
                error={Boolean(errors._avatar_render)}
                helperText={errors._avatar_render?.message}
                color={errors._avatar_render?.message ? "error" : "primary"}
                disabled={formLoading}
              />
              <Button
                type="button"
                onClick={() => {
                  setValue("avatar", _avatar_render);
                }}
              >
                Set
              </Button>
            </Stack>
          </FormControl>
        </CardContent>
      </Card>
    </Stack>
  );
}
