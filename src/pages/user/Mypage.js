import React, { useEffect, useState } from 'react';
import { Button, Icon, Item } from 'semantic-ui-react';
import ModalVIdeoUpload from '../../components/ModalVIdeoUpload';
import ModalProfile from '../../components/ModalProfile';
import MetaTag from '../../components/MetaTag';
import { apiUser } from '../../api/api';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

const Mypage = () => {
    const [cookie] = useCookies();
    const param = useParams();
    const [openModalVIdeoUpload, setOpenModalVideoUpload] = useState(false);
    const [openModalProfile, setOpenModalProfile] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        header: '',
    });
    const [profileState, setProfileState] = useState(null);

    const openModalProfileAction = header => {
        setOpenModalProfile(true);
        //setModalInfo({ ...modalInfo, header });
    };

    const openModalVIdeoUploadAction = header => {
        setOpenModalVideoUpload(true);
        //setModalInfo({ ...modalInfo, header });
    };

    const {
        data: dataProfile,
        error: errorProfile,
        isLoading: isLoadingProfile,
        mutate: getProfileAction,
    } = useMutation('getProfile', payload => apiUser.getUserProfile(payload));

    useEffect(() => {
        if (cookie.token) {
            const payload = {
                token: { authorization: cookie.token },
                id: param.id,
            };
            getProfileAction(payload, {
                onSuccess: () => {
                    setProfileState(dataProfile);
                },
            });
        }
    }, []);

    console.log(isLoadingProfile);
    console.log(errorProfile);
    console.log(dataProfile);
    console.log(profileState);

    //console.log(dataProfile.data);

    //const { MyVideoCount, SubscriptCount, UserId, UserImage } = dataProfile.data.result_json;
    return (
        <>
            <MetaTag
                title="마이페이지 :: LoneTube"
                description="세계최대 동영상 서비스"
                keywords="론튜브, 영상, 유튜브"
            />
            <div className="flex max-w-full gap-3 border-solid border-b border-Slate-600 pt-5 pb-5">
                <div className="flex flex-col items-center gap-3">
                    <div className="rounded-full w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden">
                        <img src="/img/user/molly.png" />
                    </div>
                    <Button onClick={() => openModalProfileAction()}>
                        프로필 사진 올리기 <Icon name="user" style={{ marignLeft: '10px' }} />
                    </Button>
                </div>
                <div className="flex flex-col gap-1 py-5">
                    <strong>{dataProfile?.data.result_json.UserId}</strong>
                    <p>구독자 수 : {dataProfile?.data.result_json.SubscriptCount}명</p>
                    <p>동영상 {dataProfile?.data.result_json.MyVideoCount}개</p>
                </div>
            </div>
            <div className="myVideoArea flex flex-row pt-10 pb-5">
                <div className="flex  justify-center pr-10">
                    <div className="flex flex-col gap-2 items-center">
                        <div className="rounded-full w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500">
                            <img src="/img/icon-space.png" className="max-w-full" />
                        </div>
                        <Button color="youtube" onClick={() => openModalVIdeoUploadAction()}>
                            동영상 업로드
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
            <ModalVIdeoUpload
                open={openModalVIdeoUpload}
                setOpen={setOpenModalVideoUpload}
                UserId={dataProfile?.data.result_json.UserId}
            />
            <ModalProfile open={openModalProfile} setOpen={setOpenModalProfile} modalInfo={modalInfo} />
        </>
    );
};

export default Mypage;
