import * as React from 'react';
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
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { apiUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MetaTag from '../../components/MetaTag';

export default function Login() {
    const [inputs, setInputs] = useState({
        UserId: '',
        password: '',
    });

    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies();
    const dispatch = useDispatch();

    useEffect(() => {}, [cookies]);

    /* 아이디 비밀번호 setInput */
    const onChangeHandler = e => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value, // name 키를 가진 값을 value 로 설정
        });
    };

    /* 로그인 버튼 */
    const onSubmitHandler = e => {
        e.preventDefault(); // 버튼 기본동작 막음
        if (inputs.UserId == '') {
            alert('아이디를 입력해주세요.');
            return;
        } else if (inputs.password == '') {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        apiUser.userLogin(inputs, setCookies, navigate, dispatch);
    };

    return (
        <>
            <MetaTag title="로그인 :: LoneTube" description="세계최대 동영상 서비스" keywords="론튜브, 영상, 유튜브" />
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
                        로그인
                    </Typography>
                    <Box component="form" onSubmit={onSubmitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="UserId"
                            label="아이디"
                            name="UserId"
                            value={inputs.UserId}
                            onChange={onChangeHandler}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="off"
                            value={inputs.password}
                            onChange={onChangeHandler}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            로그인
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/" variant="body2">
                                    홈으로
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/member/signup" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
