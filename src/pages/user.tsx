import React, { useContext } from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
} from "zmp-ui";
import HeaderBase from "../components/headerBase";
import { ProfileContext } from "../components/userProfileContext";
import logo from '../../assets-src/logo1.png'

const UserPage = () => {

  const profieContext = useContext(ProfileContext);
  const { userProfile, setUserProfile } = profieContext;


  return (
    <div>
      <HeaderBase
        isHome={true}
      />
      <Page className="page mt-20">
        <Box
          flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Avatar
              story="default"
              size={96}
              online
              src={userProfile?.userInfo?.avatar ? userProfile?.userInfo?.avatar : logo}
            >
              {userProfile?.userInfo?.avatar}
            </Avatar>
          </Box>
          <div className="mt-2">
            <Box flex flexDirection="row" alignItems="center">
              <Box>
                <Text.Title>{userProfile?.userInfo?.name ? userProfile?.userInfo?.name : ''}</Text.Title>
              </Box>
              {/* <Box ml={4}>
              <Button
                onClick={() => {
                  navigate("/form");
                }}
                size="small"
                icon={<Icon icon="zi-edit" />}
              />
            </Box> */}
            </Box>
          </div>

        </Box>
        <Box m={0} p={0} mt={4}>
          <div className="section-container">
            <List>
              <List.Item title="Name" subTitle={userProfile?.userInfo?.name ? userProfile?.userInfo?.name : ''} />
              {/* <List.Item title="Display Name" subTitle={displayName} /> */}
              <List.Item title="ID" subTitle={userProfile?.userInfo?.id ? userProfile?.userInfo?.id : ''} />
            </List>
          </div>
        </Box>
      </Page>
    </div>

  );
};

export default UserPage;
