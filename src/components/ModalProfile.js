import { Grid, TextField } from '@mui/material';
import React from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';
function ModalProfile({ open, setOpen, modalInfo }) {
    return (
        <Modal open={open}>
            <Modal.Header>프로필사진 올리기</Modal.Header>
            <Modal.Content image>
                <Image size="medium" src="/img/empty.png" wrapped />
                <Modal.Description style={{ flex: '1 1 auto' }}>
                    <Grid container spacing={2}>
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
                <Button content="등록" labelPosition="right" icon="checkmark" onClick={() => setOpen(false)} positive />
            </Modal.Actions>
        </Modal>
    );
}

export default ModalProfile;
