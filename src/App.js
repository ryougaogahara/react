import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

function LoginForm() {
  // useForm 初期化
  const { handleSubmit, control, formState: { errors } } = useForm();

  // 送信時の処理
  const onSubmit = (data) => {
    console.log("送信データ:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          ログイン
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "メールアドレスは必須です",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "メールアドレスの形式が正しくありません"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="メールアドレス"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "パスワードは必須です" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="パスワード"
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;
