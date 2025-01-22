"use client";
import { Box, Stack } from "@mui/material";
import { ActionBox } from "./components/ActionBox";
import { userProfileFormSchema } from "./constants";
import { UserProfileFormSchema } from "./type";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { ProfileShow } from "./components/ProfileShow";
import { ProfileEdit } from "./components/ProfileEdit";
import { services } from "@/apis/services";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function DashboardPage() {
  const { userState, authStateHandler } = useFirebaseAuth();
  const [editMode, setEditMode] = useState(false);
  const defaultValues: UserProfileFormSchema = {
    id: userState.user?.id ?? "",
    name: userState.user?.name ?? "",
    email: userState.user?.email ?? "",
    avatar: userState.user?.avatar || "/profile-default.png",
    created_at: userState.user?.created_at ?? "",
    updated_at: userState.user?.updated_at ?? "",
    _avatar_render: userState.user?.avatar || "/profile-default.png",
    _avatar_current: userState.user?.avatar || "/profile-default.png",
  };

  const formProps = useForm<UserProfileFormSchema>({
    defaultValues,
    values: defaultValues,
    resolver: zodResolver(userProfileFormSchema),
  });
  const { reset, handleSubmit } = formProps;
  const toggleMode = () => setEditMode(!editMode);

  const onReset = () => {
    reset();
    toggleMode();
  };

  const onSubmit = async (data: UserProfileFormSchema) => {
    const { id, name, email, avatar } = data;
    const { success } = await services.updateUserById({
      params: { id },
      data: {
        name,
        email,
        avatar,
      },
    });

    if (!success) return;
    await authStateHandler(true);
    toggleMode();
  };

  return (
    <Stack
      direction="column"
      width="100%"
      p="1rem"
      spacing="1rem"
      alignItems="center"
    >
      <Box
        component="form"
        display="flex"
        width="100%"
        maxWidth={{ xs: "450px", md: "800px" }}
        justifyContent="flex-end"
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}
      >
        <ActionBox
          formProps={formProps}
          editMode={editMode}
          toggleMode={toggleMode}
        />
      </Box>
      {!editMode && <ProfileShow formProps={formProps} />}
      {editMode && <ProfileEdit formProps={formProps} />}
    </Stack>
  );
}
