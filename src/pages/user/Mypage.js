import React, { useEffect, useState } from 'react';
import { Button, Icon, Item } from 'semantic-ui-react';
import ModalVIdeoUpload from '../../components/ModalVIdeoUpload';
import ModalProfile from '../../components/ModalProfile';
import MetaTag from '../../components/MetaTag';
import { apiUser } from '../../api/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProfileImg } from '../../redux/modules/profileSlice';

const Mypage = () => {
    const [cookie] = useCookies();
    const param = useParams();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [openModalVIdeoUpload, setOpenModalVideoUpload] = useState(false);
    const [openModalProfile, setOpenModalProfile] = useState(false);

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

    const {
        data: videoData,
        error,
        isLoading,
        mutate: getMyVideo,
    } = useMutation('getMyVideo', () => apiUser.getMyVideo({ authorization: cookie.token }));

    useEffect(() => {
        if (cookie.token) {
            const payload = {
                token: { authorization: cookie.token },
                id: param.id,
            };
            getProfileAction(payload, {
                onSuccess: () => {
                    // Invalidate and refresh
                    // 이렇게 하면, todos라는 이름으로 만들었던 query를
                    // invalidate 할 수 있어요.
                    queryClient.invalidateQueries({ queryKey: ['getProfile'] });
                },
            });
            getMyVideo(payload, {
                onSuccess: () => {
                    // Invalidate and refresh
                    // 이렇게 하면, todos라는 이름으로 만들었던 query를
                    // invalidate 할 수 있어요.
                    queryClient.invalidateQueries({ queryKey: ['getMyVideo'] });
                },
            });

            dispatch(setProfileImg(dataProfile?.data.result_json.UserImage));
        } else {
            navigator('/');
        }
    }, []);

    useEffect(() => {
        dispatch(setProfileImg(dataProfile?.data.result_json.UserImage));
    }, [dataProfile]);

    return (
        <>
            <MetaTag
                title="마이페이지 :: LoneTube"
                description="세계최대 동영상 서비스"
                keywords="론튜브, 영상, 유튜브"
            />
            <div className="flex max-w-full gap-3 border-solid border-b border-Slate-600 pt-5 pb-5">
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center rounded-full w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden">
                        <img src={dataProfile?.data.result_json.UserImage} />
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
                        {videoData?.data.MyVideoList.map((item, idx) => {
                            return (
                                <Item key={idx}>
                                    <Item.Image size="tiny" src={item.ThumbNail} />
                                    <Item.Content>
                                        <Item.Header as="a">{item.Title}</Item.Header>
                                        <Item.Meta>조회수 : {item.View}</Item.Meta>
                                    </Item.Content>
                                </Item>
                            );
                        })}
                    </Item.Group>
                </div>
            </div>
            <ModalVIdeoUpload
                open={openModalVIdeoUpload}
                setOpen={setOpenModalVideoUpload}
                UserId={dataProfile?.data.result_json.UserId}
                getMyVideo={getMyVideo}
            />
            <ModalProfile
                open={openModalProfile}
                setOpen={setOpenModalProfile}
                getProfileAction={getProfileAction}
                dataProfile={dataProfile?.data.result_json.UserImage}
            />
        </>
    );
};

export default Mypage;
