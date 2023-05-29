import React, { useState } from 'react';
import { Button, Icon, Item } from 'semantic-ui-react';
import ModalTemp from '../../components/Modal';

const Mypage = () => {
    const [openMadal, setOpenModal] = useState(false);

    const [modalInfo, setModalInfo] = useState({
        header: '',
    });

    const openModal = header => {
        setOpenModal(true);
        setModalInfo({ ...modalInfo, header });
    };
    return (
        <>
            <div className="flex max-w-full gap-3 border-solid border-b border-Slate-600 pt-5 pb-5">
                <div className="flex flex-col items-center gap-3">
                    <div className="rounded-full w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden">
                        <img src="/img/user/molly.png" />
                    </div>
                    <Button onClick={() => openModal('프로필 사진 올리기')}>
                        프로필 사진 올리기 <Icon name="user" style={{ marignLeft: '10px' }} />
                    </Button>
                </div>
                <div className="flex flex-col gap-1 py-5">
                    <strong>사용자 아이디</strong>
                    <p>구독자 수 : 10명</p>
                    <p>동영상 갯수 10개</p>
                </div>
            </div>
            <div className="myVideoArea flex flex-row pt-10 pb-5">
                <div className="flex  justify-center pr-10">
                    <div className="flex flex-col gap-2 items-center">
                        <div className="rounded-full w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500">
                            <img src="/img/icon-space.png" className="max-w-full" />
                        </div>
                        <Button color="youtube" onClick={() => openModal('동영상 업로드')}>
                            동영상 업로드 <Icon name="video paly" style={{ marignLeft: '5px' }} />
                        </Button>
                    </div>
                </div>
                <div className="pb-5">
                    <Item.Group>
                        <Item>
                            <Item.Image size="tiny" src="/img/image.png" />

                            <Item.Content>
                                <Item.Header as="a">영상제목</Item.Header>
                                <Item.Meta>조회수</Item.Meta>
                                <Item.Description>Description</Item.Description>
                            </Item.Content>
                        </Item>

                        <Item>
                            <Item.Image size="tiny" src="/img/image.png" />

                            <Item.Content>
                                <Item.Header as="a">영상제목</Item.Header>
                                <Item.Meta>조회수</Item.Meta>
                                <Item.Description>Description</Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </div>
            </div>
            <ModalTemp open={openMadal} setOpen={setOpenModal} modalInfo={modalInfo} />
        </>
    );
};

export default Mypage;
