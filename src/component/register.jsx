import { Button, Form, Input, Alert } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const nameRes = /([a-zA-Z]{3,30}s*)+/;
const emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const dateRes = /(19|20)[0-9][0-9]/;
function Register() {
  const [state, setState] = useState({
    batch: undefined,
    email: "",
    name: "",
  });
  const [errorValidation, setError] = useState({
    batch: false,
    email: false,
    name: false,
    error: false,
  });
  // const ClickCapture = (e) => {
  //   return new Promise((resolve, reject) => {
  //     if (nameRes.test(String(state.name))) {
  //       handleError({ ...errorValidation, name: true, error: true });
  //     }
  //     if (!emailRe.test(String(state.email))) {
  //       handleError({ ...errorValidation, email: true, error: true });
  //     }
  //     if (!dateRes.test(String(state.batch))) {
  //       handleError({ ...errorValidation, batch: true, error: true });
  //     }

  //     if (!errorValidation.error) {
  //       return resolve();
  //     } else {
  //       return reject();
  //     }
  //   });
  // };

  const handleClick = (e) => {
    // e.preventDefault();
    if (validateForm(errorValidation)) {
      const { name, email, batch } = state;
      axios
        .post(`${process.env.REACT_APP_PROD_URL}/post`, {
          name,
          email,
          batch,
        })
        .then((res) => {
          console.log(res);
          console.log("post succeded ! ");
        })
        .then(() => {
          setState({ name: "", email: "", batch: undefined });
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  const validateForm = (error) => {
    let valid = true;
    Object.values(error).forEach((val) => {
      if (val) {
        valid = false;
        return valid;
      }
    });
    console.log(valid, "valid");
    return valid;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // console.log(name, value);
    if (name === "batch") {
      value = +value;
    }
    console.log(value, " batch ");

    setState((prevState) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handleBlur = (e) => {
    let { name, value } = e.target;

    if (name === "batch") {
      value = +value;
    }
    // console.log(name, value, "blue ", errorValidation);
    console.log(state, errorValidation);
    console.log(value, typeof value);
    if (name === "name") {
      setError({
        ...errorValidation,
        name: !value.trim().length > 5,
        error: !value.trim().length > 5,
      });
    }

    if (name === "email") {
      setError({
        ...errorValidation,
        email: !emailRe.test(String(value)),
        error: !emailRe.test(String(value)),
      });
    }

    if (name === "batch") {
      setError({
        ...errorValidation,
        batch: !(!isNaN(value) && value < 2030 && value > 2000),
        error: !(!isNaN(value) && value < 2030 && value > 2000),
      });
    }
  };

  return (
    <Form {...layout} /*onSubmit={(e) => handleSubmit(e)}*/>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            // required: true,
            // message: "Please Enter your name",
          },
        ]}
      >
        {errorValidation.name && "name should be something alphabets"}
        <Input
          onChange={handleChange}
          name="name"
          onBlur={handleBlur}
          value={state.name}
          autoComplete={false}
        ></Input>
        {/* {errorValidation.name ? (? */}
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            // required: true,
            // message: "Need your Email-Id For mail",
          },
        ]}
      >
        {errorValidation.email && "email should be real!"}
        <Input
          autoComplete={false}
          onChange={handleChange}
          name="email"
          onBlur={handleBlur}
          value={state.email}
        ></Input>
        {/* {errorValidation.email ? (
          <Alert message="email address should be genuine" type="error" />
        ) : (
          ""
        )} */}
      </Form.Item>

      <Form.Item
        label="Batch"
        name="batch"
        rules={[
          {
            // message: "If you could specify	 your batch, not neccessary tho",
          },
        ]}
      >
        {errorValidation.batch && "batch should be number"}
        <Input
          autoComplete={false}
          onChange={handleChange}
          name="batch"
          onBlur={handleBlur}
          value={state.batch}
        ></Input>

        {/* {errorValidation.batch ? (
          <Alert
            message="batch should be number in format YYYY"
            type="error"
            closable={true}
          />
        ) : (
          ""
        )} */}
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={handleClick}>
          Add me
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Register;
