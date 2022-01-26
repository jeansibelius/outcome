import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import LoginForm from "./LoginForm";
import { isLoggedInVar } from "../cache";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ modalOpen, onClose }: Props) => {
  const [error, setError] = React.useState<string | undefined>();
  const [login] = useMutation<
    { login: { token: string; user: { first_name: string; last_name: string; spaces: string[] } } },
    { email: string; password: string }
  >(LOGIN, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem("token", login.token as string);
        localStorage.setItem("user", JSON.stringify(login.user));
        isLoggedInVar(true);
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  const submitLogin = async (email: string, password: string): Promise<string | undefined> => {
    try {
      const response = await login({
        variables: { email, password },
      });
      setError(undefined);
      onClose();
      const token = response.data?.login?.token;
      return token;
    } catch (error: unknown) {
      if (error && error instanceof Error) {
        //TODO handle error better
        setError(error.message);
      }
      console.log("error", error);
    }
  };

  return (
    <Modal className="p-2" open={modalOpen} onClose={onClose} centered={true} closeIcon>
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <LoginForm onSubmit={submitLogin} />
      </Modal.Content>
    </Modal>
  );
};

export default LoginModal;
