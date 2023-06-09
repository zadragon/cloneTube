import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';
import { apiUser } from '../api/api';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
function ModalProfile({ open, setOpen, getProfileAction, dataProfile }) {
    const [cookie] = useCookies();
    const param = useParams();
    const [imgSendData, setImgSendData] = useState({
        authorization: '',
        thumbnail: '',
    });
    const imgRef = useRef();

    const onChange = e => {
        const img = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = () => {
            setImgSendData({ ...imgSendData, authorization: cookie.token, thumbnail: reader.result });
        };
    };

    const onSubmit = () => {
        console.log('imgSendData', imgSendData);
        apiUser.addUserProfileImg(imgSendData);

        const payload = {
            token: { authorization: cookie.token },
            id: param.id,
        };
        getProfileAction(payload);

        alert('등록 되었습니다.');
        setOpen(false);
    };

    return (
        <Modal open={open}>
            <Modal.Header>프로필사진 올리기</Modal.Header>
            <Modal.Content image>
                <Image size="medium" src={imgSendData.thumbnail || dataProfile || '/img/user/daniel.jpg'} wrapped />
                <Modal.Description style={{ flex: '1 1 auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <label className="mr-3">썸네일 선택</label>
                            <input
                                type="file"
                                accept="image/jpg,image/png,image/jpeg,image/gif"
                                name="profile_img"
                                ref={imgRef}
                                onChange={e => onChange(e)}
                            ></input>
                        </Grid>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    취소
                </Button>
                <Button content="등록" labelPosition="right" icon="checkmark" onClick={() => onSubmit()} positive />
            </Modal.Actions>
        </Modal>
    );
}

export default ModalProfile;
