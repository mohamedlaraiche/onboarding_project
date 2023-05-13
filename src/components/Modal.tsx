import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import swal from "sweetalert";
import Slider from "@mui/material/Slider";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const schema = Yup.object().shape({
  Reference: Yup.string().required("Reference is required"),
  Brand: Yup.string().required("Brand is required"),
  Type: Yup.string().required("Type is required"),
  Maker: Yup.string().required("Maker is required"),
  Platinum: Yup.number().required("Platinum is required"),
  Rhodium: Yup.number().required("rhodium is required"),
  Palladium: Yup.number().required("palladium is required"),
  Weight: Yup.number()
    .typeError("Weight Must be a number")
    .required("Weight is Required"),
});

const createCatalytics = gql`
  mutation CreateCatalytic(
    $maker: String!
    $brand: String
    $type: String!
    $ref: String!
    $customMargin: Float!
    $platinum: Float!
    $rhodium: Float!
    $palladium: Float!
    $weight: Float!
  ) {
    createCatalytic(
      catalytic: {
        maker: $maker
        brand: $brand
        type: $type
        ref: $ref
        customMargin: $customMargin
        initialData: {
          platinum: $platinum
          rhodium: $rhodium
          palladium: $palladium
          weight: $weight
        }
        isGeneric: false
        createSample: false
      }
    )
  }
`;
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  outline: "none",
  borderRadius: "8px",
  p: 4,
};

export default function BasicModal({ open, handleOpen, handleClose }: any) {
  const [maker, setMaker] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [ref, setRef] = useState<string>("");
  const [platinum, setPlatinum] = useState<number>(0);
  const [rhodium, setRhodium] = useState<number>(0);
  const [palladium, setPalladium] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [customMargin, setCustomMargin] = useState<number>(0);
  const [createCatalytic] = useMutation(createCatalytics, {
    variables: {
      maker: maker,
      brand: brand,
      type: type,
      ref: ref,
      customMargin: Number(customMargin),
      platinum: Number(platinum),
      rhodium: Number(rhodium),
      palladium: Number(palladium),
      weight: Number(weight),
    },
  });
  const createNewCatHandler = (e: any) => {
    e.preventDefault();
    {
      !ref && <ErrorMessage name="Reference" />;
    }

    if (
      !maker ||
      !brand ||
      !type ||
      !ref ||
      !platinum ||
      !palladium ||
      !rhodium ||
      !weight ||
      !customMargin
    ) {
      swal("Oops", "Please fill all the fields!", "error");
    } else {
      createCatalytic();
      swal("YaaY !", "You create a new Catalytic. redirect...", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <section className="addSection">
            <h2>Create a new Catalytic</h2>
            <Formik
              initialValues={{
                Reference: maker,
                Brand: brand,
                Type: type,
                Maker: maker,
                Platinum: platinum,
                Rhodium: rhodium,
                Palladium: palladium,
                Weight: weight,
              }}
              validationSchema={schema}
              onSubmit={(e) => console.log(e)}>
              <Form onSubmit={createNewCatHandler}>
                <section className="form-grp">
                  <section className="input">
                    <Field
                      type="text"
                      placeholder="Reference"
                      name="Reference"
                      value={ref}
                      onChange={(e: any) => setRef(e.target.value)}
                    />
                    <section className="errMsg">
                      {!ref && <ErrorMessage name="Reference" />}
                    </section>
                  </section>
                  <section className="input">
                    <Field
                      type="text"
                      placeholder="Brand"
                      name="Brand"
                      value={brand}
                      onChange={(e: any) => setBrand(e.target.value)}
                    />
                    <section className="errMsg">
                      {!brand && <ErrorMessage name="Brand" />}
                    </section>
                  </section>
                </section>
                <section className="form-grp">
                  <section className="input">
                    <Field
                      type="text"
                      placeholder="Type"
                      name="Type"
                      value={type}
                      onChange={(e: any) => setType(e.target.value)}
                    />
                    <section className="errMsg">
                      {!type && <ErrorMessage name="Type" className="errMsg" />}
                    </section>
                  </section>
                  <section className="input">
                    <Field
                      type="text"
                      placeholder="Maker"
                      name="Maker"
                      value={maker}
                      onChange={(e: any) => setMaker(e.target.value)}
                    />
                    <section className="errMsg">
                      {!maker && (
                        <ErrorMessage name="Maker" className="errMsg" />
                      )}{" "}
                    </section>
                  </section>
                  <Field
                    type="text"
                    name=""
                    id="createsimple"
                    value={"false"}
                    readOnly
                    style={{ display: "none" }}
                  />
                </section>
                <section className="form-grp">
                  <span className="cm">costum margin:</span>
                  <Slider
                    style={{
                      width: "60%",
                      color: "#1dbc79",
                    }}
                    defaultValue={0}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    size="medium"
                    onChange={(e: any) => {
                      setCustomMargin(e.target.value / 100);
                      console.log(customMargin);
                    }}
                  />
                </section>
                <section className="form-grp">
                  <section className="input">
                    <Field
                      type="number"
                      name="Platinum"
                      placeholder="platinum"
                      value={platinum}
                      onChange={(e: any) => setPlatinum(e.target.value)}
                    />
                    <section className="errMsg">
                      {!platinum && (
                        <ErrorMessage name="Platinum" className="errMsg" />
                      )}{" "}
                    </section>
                  </section>
                  <section className="input">
                    <Field
                      type="number"
                      name="Rhodium"
                      placeholder="rhodium"
                      value={rhodium}
                      onChange={(e: any) => setRhodium(e.target.value)}
                    />
                    <section className="errMsg">
                      <section className="errMsg">
                        {!rhodium && <ErrorMessage name="Rhodium" />}
                      </section>{" "}
                    </section>
                  </section>
                  <section className="input">
                    <Field
                      type="number"
                      name="Palladium"
                      placeholder="palladium"
                      value={palladium}
                      onChange={(e: any) => setPalladium(e.target.value)}
                    />
                    <section className="errMsg">
                      {!palladium && (
                        <ErrorMessage name="Palladium" className="errMsg" />
                      )}
                    </section>
                  </section>
                  <section className="input">
                    <Field
                      type="number"
                      name="Weight"
                      placeholder="weight"
                      value={weight}
                      onChange={(e: any) => setWeight(e.target.value)}
                    />
                    <section className="errMsg">
                      {!weight && (
                        <ErrorMessage name="Weight" className="errMsg" />
                      )}
                    </section>{" "}
                  </section>
                </section>
                <section className="createRow">
                  <button onClick={handleClose} className="cancelBtn">
                    Cancel
                  </button>
                  <button type="submit" className="createBtn">
                    Create
                  </button>
                </section>
              </Form>
            </Formik>
          </section>
        </Box>
      </Modal>
    </section>
  );
}
