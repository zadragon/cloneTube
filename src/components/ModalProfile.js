import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Image, Modal } from 'semantic-ui-react';
function ModalProfile({ open, setOpen, modalInfo }) {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const onChangePreview = e => {
        const file = e.target.files[0];
        setImage(file);
        setFile(URL.createObjectURL(file));
    };

    const onSubmitHandler = async e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('image', image);
        console.log(formData);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                // access: access,
            },
        };

        axios
            .post(`${process.env.REACT_APP_HOST}/api/profile`, formData, config)
            .then(res => {
                console.log(formData);
            })
            .catch(e => {
                console.log(e);
            });

        setImage(null);
    };

    return (
        <Modal open={open}>
            <Modal.Header>프로필사진 올리기</Modal.Header>
            <Modal.Content image>
                <div className="h-40 w-40">
                    {file ? (
                        <Image className="object-fit w-1/2 h-1/2 ml-10" src={file} alt={file} wrapped />
                    ) : (
                        <Image size="medium" src="/img/empty.png" wrapped />
                    )}
                </div>
                <Modal.Description style={{ flex: '1 1 auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form onSubmit={onSubmitHandler}>
                                <label className="mr-3">썸네일</label>
                                <input type="file" id="file" accept="image/*" onChange={onChangePreview} />
                                <button>썸네일저장</button>
                            </form>
                        </Grid>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    취소
                </Button>
                <Button content="완료" labelPosition="right" icon="checkmark" onClick={() => setOpen(false)} positive />
            </Modal.Actions>
        </Modal>
    );
}

export default ModalProfile;
