import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';
import { apiVideo } from '../api/api';
function ModalVIdeoUpload({ open, setOpen, UserId }) {
    // const [videoInfo, setVideoInfo] = useState({
    //     // authorization: String,
    //     // UserId: number,
    //     // Title: string,
    //     // URL: string,
    // });

    // //apiVideo.videoUpload()
    console.log('UserId', UserId);

    const videoRegiste = () => {
        setOpen(false);
    };

    return (
        <Modal open={open}>
            <Modal.Header>영상 업로드</Modal.Header>
            <Modal.Content image>
                <Image size="medium" src="/img/empty.png" wrapped />
                <Modal.Description style={{ flex: '1 1 auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="UserId"
                                required
                                fullWidth
                                id="UserId"
                                label="제목"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="UserId"
                                required
                                fullWidth
                                id="UserId"
                                label="유튜브 url"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label className="mr-3">썸네일 선택</label>
                            <input type="file" />
                        </Grid>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    취소
                </Button>
                <Button content="등록" labelPosition="right" icon="checkmark" onClick={videoRegiste} positive />
            </Modal.Actions>
        </Modal>
    );
}

export default ModalVIdeoUpload;
