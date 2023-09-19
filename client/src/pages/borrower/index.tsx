import { useState, ChangeEvent, FC } from "react";
import Input from "../../components/input";
import { CreateBorrower, SocketSetup } from "../../utils/types";
import { request } from "../../utils/request";

type Props = {
  socket: SocketSetup;
};

const Borrower: FC<Props> = () => {
  const [formValue, setFormValue] = useState<CreateBorrower>({
    first_name: "",
    last_name: "",
    loan_amount: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreateBorrower() {
    const allFieldOk = Object.values(formValue).every(Boolean);

    if (!allFieldOk) {
      return alert("Please provide all required fields.");
    }

    const payload = {
      ...formValue,
      loan_amount: +formValue.loan_amount || 0,
    };

    try {
      await request.post("/borrower/create", payload);
      setFormValue({
        first_name: "",
        last_name: "",
        loan_amount: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error?.message);
    }
  }

  return (
    <form className="form-create-borrower mx-auto shadow-lg p-4 rounded">
      <h3 className="form-title text-center text-uppercase mb-4">
        Create Borrower
      </h3>

      <div className="d-flex flex-column gap-3">
        <Input
          name="first_name"
          label="First Name"
          required
          value={formValue.first_name}
          onChange={handleChange}
        />
        <Input
          name="last_name"
          label="Last Name"
          required
          value={formValue.last_name}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="loan_amount"
          label="Loan amount"
          required
          value={formValue.loan_amount}
          onChange={handleChange}
        />
      </div>

      <button
        type="button"
        className="btn btn-primary ms-auto mt-4 d-block"
        onClick={handleCreateBorrower}
      >
        Submit
      </button>
    </form>
  );
};

export default Borrower;
