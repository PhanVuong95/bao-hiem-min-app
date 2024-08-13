import React from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
  Button,
  Icon,
  useNavigate,
} from "zmp-ui";
import { useRecoilValue } from "recoil";
import { displayNameState, userState } from "../state";
import HeaderBase from "../components/headerBase";

const UserPage = () => {
  const { userInfo: user } = useRecoilValue(userState);
  const displayName = useRecoilValue(displayNameState);
  const navigate = useNavigate();
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
              src={user.avatar.startsWith("http") ? user.avatar : undefined}
            >
              {user.avatar}
            </Avatar>
          </Box>
          <div className="mt-2">
            <Box flex flexDirection="row" alignItems="center">
              <Box>
                <Text.Title>{displayName || user.name}</Text.Title>
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
              <List.Item title="Name" subTitle={user.name} />
              {/* <List.Item title="Display Name" subTitle={displayName} /> */}
              <List.Item title="ID" subTitle={user.id} />
            </List>
          </div>
        </Box>
      </Page>
    </div>

  );
};

export default UserPage;
