import axios from 'axios';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    header {
        width: 100%;
        height: 38px;
        padding: 0 15px;
        line-height: 38px;
        font-size: 16px;
        font-weight: 600;
    }
    #mail_form_wrapper {
        height: auto;
        background-color: #fff;
        header {
            color: white;
            background-color: lightskyblue;
        }
        & > form {
            padding: 20px;
            label {
                width: 1000px;
                height: 50px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.5);
                display: flex;
                line-height: 50px;
                justify-content: space-between;
                margin-bottom: 50px;
            }
        }
        input,
        textarea {
            width: calc(100% - 110px);
            height: auto;
            line-height: normal;
            padding: 0.8em 0.5em;
            font-family: inherit;
            border: none;
            border-radius: 0;
            outline-style: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            font-size: 20px;
            color: rgba(0, 0, 0, 0.5);
        }
        input::placeholder {
            color: #d4d4d4;
        }
        .message_label {
            border: none;
            margin: 0;
        }
        textarea {
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.5);
            resize: none;
        }
        #upload_button {
            border: none;
            width: 200px;
            height: 43px;
            border-radius: 4px;
            color: white;
            background-color: lightskyblue;
            text-align: center;
            line-height: 43px;
            font-size: 18px;
            font-weight: 600;
            display: block;
            margin: 20px auto;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            margin-bottom: 30px;
        }
    }
`;

type Props = {};

export default function MailForm({}: Props) {
    const [email, onChangeEmail] = useInput('');
    const [title, onChangeTitle] = useInput('');
    const [message, onChangeMessage] = useInput('');

    const [fileInfo, setFileInfo] = useState<string | null>(null);
    const fileCheck = useCallback((type) => {
        const filetype = type.split('/')[1];
        const extArr = ['jpg', 'jpeg', 'png'];
        return extArr.includes(filetype);
    }, []);
    const onSelectFile = useCallback((e) => {
        if (fileCheck(e.target.files[0].type)) {
            console.log(e.target.files[0]);
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                const base64 = reader.result;
                if (base64) {
                    let base64Sub = base64.toString();
                    setFileInfo(base64Sub);
                }
            };
        } else {
            alert('jpg, png 파일만 업로드 가능합니다.');
        }
    }, []);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (email && title && message && fileInfo) {
                console.log(email, title, message, fileInfo);
                const payload = { email: email, title: title, message: message, file: fileInfo };
                axios
                    .post('http://localhost:3005/back/mail', payload)
                    .then((res) => console.log(res))
                    .catch((err) => console.error(err));
            }
        },
        [email, title, message, fileInfo]
    );

    return (
        <Container>
            <div id="mail_form_wrapper">
                <header>Send a mail</header>
                <form onSubmit={onSubmit}>
                    <label>
                        <span>Email</span>
                        <input type="email" value={email} onChange={onChangeEmail} placeholder="Enter your email" required />
                    </label>
                    <label>
                        <span>Title</span>
                        <input type="text" value={title} onChange={onChangeTitle} placeholder="Enter a title" required />
                    </label>
                    <label className="message_label" htmlFor="message">
                        <span>Message</span>
                    </label>
                    <textarea name="message" cols={30} rows={15} id="message" value={message} onChange={onChangeMessage} required />
                    <label>
                        <input type="file" accept="image/jpeg,image/png" id="fileUpload" onChange={onSelectFile} />
                    </label>
                    <button type="submit" id="upload_button">
                        SEND
                    </button>
                </form>
            </div>
        </Container>
    );
}
