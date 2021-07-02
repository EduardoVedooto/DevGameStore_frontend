import styled from "styled-components";
import QRCode from "qrcode.react";
import Select from "react-select";
import { Button as ButtonLayout } from "../styles/FormStyles";
import { useEffect, useState } from "react";
import Validate from "../utils/ValidateInputs";


export default function PaymentForm(props) {
  const { type, checkout } = props;
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");
  const [validMonth, setValidMonth] = useState("");
  const [validYear, setValidYear] = useState("");
  const months = [];
  const years = [];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'var(--color-darker)' : 'var(--color-dark)',
      backgroundColor: state.isSelected ? 'var(--color-primary)' : 'var(--color-lighter)',
      fontWeight: state.isSelected ? "700" : "400",
      padding: 20,
    }),
  }

  useEffect(() => {
    setCardName("");
    setCardNumber("");
    setCvv("");
    setValidMonth("");
    setValidYear("");
  }, [type]);

  for (let i = 1; i <= 12; i++) {
    months.push({
      value: i,
      label: i
    })
  }

  for (let i = 2021; i < 2039; i++) {
    years.push({
      value: i,
      label: i
    });
  }

  const verifyInputs = e => {
    e.preventDefault();

    const body = {
      number: cardNumber,
      name: cardName,
      cvv,
      month: validMonth,
      year: validYear
    };

    const validation = Validate(body, "checkout");
    if (!validation.result) {
      window.alert(validation.message);
      return;
    }
    checkout(body, type === "Debit" ? "deb" : "cre");
  }

  const finalizeOrder = e => {
    e.preventDefault();
    checkout();
  }


  if (type === "Pix") {
    return (
      <FormContainer>
        <strong>Pix</strong>
        <QRCode
          value="https://github.com/EduardoVedooto/DevGameStore_frontend"
          renderAs="svg"
          width={200}
          height={200}
          includeMargin={true}
        />
        <Message>Open your bank application and choose the option<br /> <Emphasis>"Scan QR Code"</Emphasis></Message>
      </FormContainer>
    );
  }
  else if (type === "Debit" || type === "Credit") {
    return (
      <FormContainer onSubmit={verifyInputs}>
        <strong>{type} Card</strong>
        <InputWrapper>
          <label htmlFor="CardNumber">Card number</label>
          <Input value={cardNumber} onChange={e => setCardNumber(e.target.value)} maxLength="16" placeholder="xxxx xxxx xxxx xxxx" id="CardNumber" required />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="CardName">Card name</label>
          <Input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="JOHN DOE" id="CardName" required />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="CVV">Card Security Code (CSC)</label>
          <Input value={cvv} onChange={e => setCvv(e.target.value)} maxLength="4" minLength="3" placeholder="xxx" id="CVV" required />
        </InputWrapper>
        <InputWrapper>
          <label>Expiry date</label>
          <InputWrapperHorizontal>
            <Select
              styles={customStyles}
              placeholder="Month"
              options={months}
              className="month-container"
              classNamePrefix="month"
              onChange={e => setValidMonth(e.label)}
            />
            <Select
              styles={customStyles}
              placeholder="Year"
              options={years}
              className="year-container"
              classNamePrefix="year"
              onChange={e => setValidYear(e.label)}
            />
          </InputWrapperHorizontal>

        </InputWrapper>
        <Button>Finish your order</Button>
      </FormContainer>
    );
  }

  else if (type === "Ticket") {
    return (
      <FormContainer onSubmit={finalizeOrder}>
        <strong>Ticket</strong>
        <Message>
          The Ticket will be sent to your e-mail in up to 15 minutes!<br /><br />
          Registered e-mail<br />
          <Emphasis>{JSON.parse(sessionStorage.getItem("session")).user.email}</Emphasis>
        </Message>

        <Button>Finish your order</Button>
      </FormContainer >
    );
  }
  else return null;

}

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  gap: 1.5rem;
  font-size: 1.8rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .7rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.5rem 1rem;
  border-radius: .5rem;
  border: none;
  outline: none;
  font-size: 1.8rem;
`;

const InputWrapperHorizontal = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .month-container,
  .year-container{
    width: 48%;
  }

  .month__control,
  .year__control{
    border: none;
    padding: .5rem;
  }

  .month__option,
  .year__option{
    color: var(--color-darker);
    :hover{
      background-color: var(--color-primary);
    }
  }
`;

const Button = styled(ButtonLayout)`
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  background-color: var(--color-primary);
  color: var(--color-darker);
`;

const Message = styled.h3`
  font-size: 2rem;
  text-align: center;
  line-height: 3rem;
`;

const Emphasis = styled.em`
  font-weight: 700;
  color: var(--color-primary);
  font-size: 2.2rem;
  padding-top: 1rem;
  word-break: keep-all;
`;