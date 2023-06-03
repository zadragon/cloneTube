import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { apiUser } from '../../api/api';
import MetaTag from '../../components/MetaTag';

export default function SignUp() {
    const [inputs, setInputs] = useState({
        payload: {
            UserId: '',
            password: '',
        },
        pwValid: '',
    });
    const navigate = useNavigate();

    const onSubmitHandler = e => {
        e.preventDefault();

        const { UserId, password } = inputs.payload;
        const { pwValid } = inputs;
        if (UserId == '') {
            alert('아이디를 입력해주세요.');
            return;
        } else if (password !== pwValid) {
            alert('비밀번호를 확인해주세요.');
            return;
        }

        apiUser.userSignUp(inputs.payload, navigate, setInputs);
    };

    const onChangeHandler = e => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            payload: {
                ...inputs.payload,
                [name]: value, // name 키를 가진 값을 value 로 설정
            },
        });
    };

    const onPwValidCheck = e => {
        setInputs({
            ...inputs,
            pwValid: e.target.value,
        });
    };

    return (
        <>
            <MetaTag
                title="회원가입 :: LoneTube"
                description="세계최대 동영상 서비스"
                keywords="론튜브, 영상, 유튜브"
            />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'lightgray' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        회원가입
                    </Typography>
                    <Box component="form" noValidate onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="UserId"
                                    required
                                    fullWidth
                                    id="UserId"
                                    label="아이디"
                                    value={inputs.payload.UserId}
                                    onChange={onChangeHandler}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="비밀번호"
                                    name="password"
                                    type="password"
                                    value={inputs.payload.password}
                                    onChange={onChangeHandler}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="비밀번호 확인"
                                    type="password"
                                    id="passwordCheck"
                                    value={inputs.pwValid}
                                    onChange={onPwValidCheck}
                                    autoComplete="off"
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            회원가입
                        </Button>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    홈으로
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/member/login" variant="body2">
                                    이미 계정이 있으신가요? 로그인
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
