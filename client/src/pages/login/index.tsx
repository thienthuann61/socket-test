import { ChangeEvent, useState, FC } from "react";
import { FormLogin, Token } from "../../utils/types";
import Input from "../../components/input";
import { request } from "../../utils/request";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  setupSocket: () => void;
};
const Login: FC<Props> = ({ setupSocket }) => {
  const [formValue, setFormValue] = useState<FormLogin>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin() {
    const allFieldOk = Object.values(formValue).every(Boolean);

    if (!allFieldOk) {
      return alert("Please provide all required fields.");
    }

    try {
      const { data }: AxiosResponse<Token> = await request.post(
        "/auth/login",
        formValue
      );
      const { token } = data || {};

      if (!token) {
        return alert("Something went wrong");
      }

      localStorage.setItem("socket-test-token", token);
      setupSocket();
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      alert("Login failed: " + error?.response?.data?.message);
    }
  }
  return (
    <form className="form-create-borrower mx-auto shadow-lg p-4 rounded">
      <h3 className="form-title text-center text-uppercase mb-4">Login</h3>

      <div className="d-flex flex-column gap-3">
        <Input
          name="email"
          label="Email"
          required
          value={formValue.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          required
          value={formValue.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary ms-auto mt-4 d-block"
        onClick={handleLogin}
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
