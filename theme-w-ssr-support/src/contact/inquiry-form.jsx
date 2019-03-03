// inquiry-form.js
/**
 * External dependencies
 */
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import v4 from 'uuid/v4';

/**
 * Local dependencies
 */
import { Dialog, Message } from './dialog';
import Spinner from '../icons/spinner';
import SEND_INQUIRY from './send-inquiry';
import colors from '../lib/colors';

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 1em auto;
  position: relative;

  form {
    background: ${colors.white};
    color: ${colors.black};
    padding: 25px;
    box-shadow: 0 0 20px 0 ${colors.primary}, 0 5px 5px 0 rgba(155, 155, 155, 0.6);

    h2 {
      text-align: center;
      margin: 0 0 0.4em;
      font-weight: 700;

      &:nth-of-type(1) {
        margin-top: 1.5em;
      }

      &:nth-last-of-type(1) {
        margin-bottom: 1.5em;
        &::after {
          content: "";
          clear: both;
        }
      }
    }

    fieldset {
      border: medium none !important;
      margin: 0 0 10px;
      min-width: 100%;
      padding: 0;
      width: 100%;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="url"],
    textarea,
    button[type="submit"] {
      font: 400 .70em/1em 'Roboto', sans-serif;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="url"],
    textarea {
      width: 100%;
      border: 1px solid #ccc;
      background: #FFF;
      margin: 0 0 .3125em;
      padding: .625em;

      &:hover {
        transition: border-color 0.3s ease-in-out;
        border: .0625em solid #aaa;
      }
    }

    textarea {
      height: 100px;
      max-width: 100%;
      resize: none;
    }    

    button[type="submit"] {
      cursor: pointer;
      width: 100%;
      border: none;
      background: var(--accent-two);
      color: var(--white);
      margin: 0 0 5px;
      padding: 1em;
      font-family: 'Laila', serif;
      font-size: 1.22em;
      font-weight: 700;
    }

    button[type="submit"]:hover {
      background: var(--accent-one);
      transition: background-color 0.3s ease-in-out;
    }

    button[type="submit"]:active {
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    input:focus,
    textarea:focus {
      outline: 0;
      border: 1px solid #aaa;
    }

    ::-webkit-input-placeholder {
      color: #888;
    }

    :-moz-placeholder {
      color: #888;
    }

    ::-moz-placeholder {
      color: #888;
    }

    :-ms-input-placeholder {
      color: #888;
    }
  }

  @media screen and (min-width: 768px) {
    max-width: 646px;
    
    h3:nth-of-type(1) {
      margin-top: 0 !important;
    }
  }

  @media screen and (min-width:1024px) {
    form {
      h3 { font-size: 0.8em; }
      input[type="text"],
      input[type="email"],
      input[type="tel"],
      input[type="url"],
      textarea { font-size: 50%; }

      button[type="submit"] { font-size: 0.7em; }
    }
  }
`;

export default () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const getDialogPose = (data, error, loading) => {
    if (error) {
      return 'error';
    }
    if (loading || data) {
      return 'success';
    }
    return 'hide';
  };

  return (
    <Mutation mutation={SEND_INQUIRY}>
      {(sendInquiry, { data, loading, error }) => (
        <Container>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendInquiry({
                variables: {
                  clientId: v4(),
                  name,
                  email,
                  phone: phone !== '' ? phone : undefined,
                  url: url !== '' ? url : undefined,
                  message,
                },
              });
            }}
          >
            <h2>Contact Us</h2>
            <fieldset>
              <input
                placeholder="Your name"
                type="text"
                required
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                autoComplete="on"
              />
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Email Address"
                type="email"
                required
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                autoComplete="on"
              />
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Phone Number (optional)"
                type="tel"
                value={phone}
                onChange={({ target: { value } }) => setPhone(value)}
                autoComplete="on"
              />
            </fieldset>
            <fieldset>
              <input
                placeholder="Your Web Site (optional)"
                type="url"
                value={url}
                onChange={({ target: { value } }) => setUrl(value)}
                autoComplete="on"
              />
            </fieldset>
            <fieldset>
              <textarea
                placeholder="Type your message here...."
                required
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
              />
            </fieldset>
            <fieldset>
              <button type="submit">Send</button>
            </fieldset>
          </form>
          <Dialog pose={getDialogPose(data, error, loading)}>
            <Spinner pose={loading ? 'enter' : 'exit'} />
            <Message data={data} error={error} pose={data || error ? 'enter' : 'exit'} />
          </Dialog>
        </Container>
      )}
    </Mutation>
  );
};
