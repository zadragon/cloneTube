import { Grid, TextField } from '@mui/material';
import React, { useState, useRef } from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';
import { apiVideo } from '../api/api';
import { useCookies } from 'react-cookie';

function ModalVIdeoUpload({ open, setOpen, UserId }) {
    const [videoInfo, setVideoInfo] = useState({
        authorization: '',
        thumbnail: '',
        title: '',
        URL: '',
    });

    const [cookie] = useCookies();
    const imgRef = useRef();

    const onChangeImg = e => {
        const img = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = () => {
            console.log(reader.result);
            setVideoInfo({
                ...videoInfo,
                authorization: cookie.token,
                thumbnail: reader.result,
            });
        };
    };

    const onChange = e => {
        const { name, value } = e.target;
        setVideoInfo({ ...videoInfo, [name]: value });
    };
    const onSubmit = () => {
        apiVideo.videoUpload(videoInfo);
        alert('등록 되었습니다.');
        setOpen(false);
    };

    console.log('UserId', UserId);

    return (
        <Modal open={open}>
            <Modal.Header>영상 업로드</Modal.Header>
            <Modal.Content image>
                <Image size="medium" src={videoInfo.thumbnail || '/img/empty.png'} wrapped />
                <Modal.Description style={{ flex: '1 1 auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="title"
                                required
                                fullWidth
                                id="UserId"
                                label="제목"
                                autoFocus
                                value={videoInfo.title}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="URL"
                                required
                                fullWidth
                                id="UserId"
                                label="유튜브 url"
                                value={videoInfo.URL}
                                onChange={onChange}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label className="mr-3">썸네일 선택</label>
                            <input
                                type="file"
                                accept="image/jpg,image/png,image/jpeg,image/gif"
                                ref={imgRef}
                                name="profile_img"
                                onChange={onChangeImg}
                            />
                        </Grid>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button type="button" color="black" onClick={() => setOpen(false)}>
                    취소
                </Button>
                <Button
                    content="등록"
                    labelPosition="right"
                    icon="checkmark"
                    type="submit"
                    onClick={onSubmit}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

export default ModalVIdeoUpload;
