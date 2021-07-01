import { Form, FormTitle, Button, Input } from "../../styles/FormStyles";
import { ContactContainer } from "./style";
import axios from 'axios';
import {useState} from 'react';

export default function ContactUs (){
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    function handleContact(e){
        e.preventDefault();
        if(email.length === 0 || subject.length === 0 || message.length === 0){
            alert("Nenhum campo pode estar vazio.");
            return;
        }
        const body = {
            email,
            subject,
            message
        }
        const request = axios.post('http://localhost:4000/contact-us', body);
        request.then(()=>{
            setEmail("");
            setSubject("");
            setMessage("");
        });
        request.catch((err)=>alert(err.response.data.message));
    }

    return(
    <ContactContainer>
      <Form onSubmit = {handleContact}>
        <FormTitle>Contact us</FormTitle>
        <Input
        placeholder = "E-mail"
        value = {email}
        onChange={(e) => {
            setEmail(e.target.value);
        }}
        />
        <Input
        placeholder = "Subject"
        value = {subject}
        onChange={(e) => {
            setSubject(e.target.value);
        }}
        />
        <Input
        placeholder = "Type your message here"
        value = {message}
        onChange={(e) => {
            setMessage(e.target.value);
        }}
        />
        <Button type = "submit">
          Send
        </Button>
      </Form>
    </ContactContainer>
    )
}